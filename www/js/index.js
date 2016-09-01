$(document).on('pagecreate', "[data-role='page']", function() {
	if (window.localStorage.getItem('user_id') != null && window.localStorage.getItem('auth') != null) {
		console.log(window.localStorage.getItem('user_id'));
		$.mobile.changePage("#home");
	}
});

$(document).on('pagecreate', '#login', function() {
	$('#fb_login_btn').click(function(event) {
		facebookConnectPlugin.getLoginStatus(
			function(response) {
				// alert("login current status: " + JSON.stringify(response));
				if (response.status === 'connected') {
					$.ajax({
							url: 'http://52.69.53.255/KCCordova/api/user_action.php',
							dataType: 'json',
							type: 'POST',
							data: {
								action: 'fb_log',
								fb_id: response.authResponse.userID
							}
						})
						.done(function(result) {
							if (result.status) {
								window.localStorage.setItem('user_id', result.user_id);
								window.localStorage.setItem('fb_id', response.authResponse.userID);
								window.localStorage.setItem('user', result.user);
								window.localStorage.setItem('auth', result.auth);
								window.localStorage.setItem('name', result.name);
								window.localStorage.setItem('country_id', result.country_id);
								window.localStorage.setItem('area_id', result.area_id);
								// alert(window.localStorage.getItem('name') + ' ' + window.localStorage.getItem('user') + '(' + window.localStorage.getItem('auth') + ')');
								$.mobile.changePage("#home");
							} else {
								// alert(result.message + '(login)' + result.sql);
								facebookConnectPlugin.logout(function() {}, function() {});

							}
						});
				} else {
					// the user isn't logged in to Facebook.
					fbLogin();
				}
			}
		);
	});
});

$(document).on('pagecreate', '#app-reg', function() {
	$('#app-reg-form').validate({
		submitHandler: function(form) {
			$('#app-reg-form').ajaxSubmit({
				url: 'http://52.69.53.255/KCCordova/api/user_action.php',
				data: {
					action: 'reg',
					formData: $('#app-reg-form').serialize()
				},
				type: 'POST',
				async: 'true',
				dataType: 'json',
				beforeSend: function() {
					$.mobile.loading('show');
				},
				complete: function() {
					// This callback function will trigger on data sent/received complete
					$.mobile.loading('hide');
				},
				success: function(result) {
					if (result.status) {
						alert(result.message);
						$.mobile.changePage("#app-log-in");
					} else {
						alert(result.message);
					}
				},
				error: function(request, error) {
					alert('請確認您的網路連線狀態！');
				}
			});
		},
		rules: {
			rg_pswd_chk: {
				equalTo: "#rg_pswd"
			},
			rg_gender: {
				required: true
			}
		},
		messages: {
			rg_email: {
				required: "請填寫註冊帳號(Email)",
				email: "請填寫有效 E-mail 格式"
			},
			rg_pswd: {
				required: "這是必填欄位",
				minlength: $.validator.format("密碼長度不得少於{0}字元"),
				rangelength: $.validator.format("密碼長度需為 {0} 到 {1} 字元之間")
			},
			rg_pswd_chk: {
				required: "請再次輸入密碼",
				equalTo: "密碼不一致"
			},
			rg_recommend: {
				required: "請填寫推薦人之帳號(Email)",
				email: "請填寫有效 E-mail 格式"
			},
			rg_name: {
				required: "請填寫您的姓名"
			},
			rg_gender: {
				required: "請選擇您的性別"
			},
			// rg_birthday: {
			// 	required: "請填寫您的生日"
			// },
			rg_tel: {
				required: "請填寫您的電話"
			},
			rg_mobile: {
				required: "請填寫您的手機號碼"
			},
			rg_codes: {
				required: "請輸入驗證碼"
			}
		},
		errorElement: "div",
		errorClass: "form-hint",
		errorPlacement: function(error, element) {
			if (element.is(':radio') || element.is(':checkbox')) {
				var eid = element.attr('name');
				error.appendTo($('input[name=' + eid + ']:last').parents('.ui-field-contain'));
			} else {
				error.appendTo(element.parents('.ui-field-contain'));
			}
		}
	});

	$('#reg-submit-btn').click(function() {
		$('#app-reg-form').valid();
		// return false; // cancel original event to prevent form submitting
	});
});

$(document).on('pagecreate', '#fb-reg', function() {
	facebookConnectPlugin.getLoginStatus(
		function(response) {
			// alert("fb-reg current status: " + JSON.stringify(response));
			if (response.status === 'connected') {
				facebookConnectPlugin.api("/me?fields=name,email", null,
					function(result) {
						// alert("Result: " + JSON.stringify(result));
						$('#fb-reg-form #rg_email').val(result.email);
						$('#fb-reg-form #rg_name').val(result.name);
					},
					function(error) {
						alert("Failed: " + error);
					});
			} else {
				// the user isn't logged in to Facebook.
				fbLogin();
			}
		}
	);
	$('#fb-reg-form').validate({
		submitHandler: function(form) {
			$('#fb-reg-form').ajaxSubmit({
				url: 'http://52.69.53.255/KCCordova/api/user_action.php',
				data: {
					action: 'fb_reg',
					formData: $('#fb-reg-form').serialize(),
					fb_id: window.localStorage.getItem('fb_id')
				},
				type: 'POST',
				async: 'true',
				dataType: 'json',
				beforeSend: function() {
					$.mobile.loading('show');
				},
				complete: function() {
					$.mobile.loading('hide');
				},
				success: function(result) {
					if (result.status) {
						alert(result.message);
						window.localStorage.setItem('user_id', result.user_id);
						window.localStorage.setItem('user', result.user);
						window.localStorage.setItem('auth', result.auth);
						window.localStorage.setItem('name', result.name);
						window.localStorage.setItem('country_id', result.country_id);
						window.localStorage.setItem('area_id', result.area_id);
						// alert(window.localStorage.getItem('name') + ' ' + window.localStorage.getItem('user') + '(' + window.localStorage.getItem('auth') + ')');
						$.mobile.changePage("#home");
					} else {
						alert(result.message + '(fb-reg)' + result.sql);
						facebookConnectPlugin.logout(function() {}, function() {});

					}
				},
				error: function(request, error) {
					alert('請確認您的網路連線狀態！');
				}
			});
		},
		rules: {
			rg_gender: {
				required: true
			}
		},
		messages: {
			rg_email: {
				required: "請填寫您的 E-mail",
				email: "請填寫有效 E-mail 格式"
			},
			rg_recommend: {
				required: "請填寫推薦人之會員編號",
			},
			rg_name: {
				required: "請填寫您的姓名"
			},
			rg_gender: {
				required: "請選擇您的性別"
			},
			// rg_birthday: {
			// 	required: "請填寫您的生日"
			// },
			rg_tel: {
				required: "請填寫您的電話"
			},
			rg_mobile: {
				required: "請填寫您的手機號碼"
			}
		},
		errorElement: "div",
		errorClass: "form-hint",
		errorPlacement: function(error, element) {
			if (element.is(':radio') || element.is(':checkbox')) {
				var eid = element.attr('name');
				error.appendTo($('input[name=' + eid + ']:last').parents('.ui-field-contain'));
			} else {
				error.appendTo(element.parents('.ui-field-contain'));
			}
		}
	});

	$('#fb-reg-submit-btn').click(function() {
		$('#fb-reg-form').valid();
		// return false; // cancel original event to prevent form submitting
	});
});

$(document).on('pagecreate', '#app-log-in', function() {
	$('#app-log-form').validate({
		submitHandler: function(form) {
			$('#app-log-form').ajaxSubmit({
				url: 'http://52.69.53.255/KCCordova/api/user_action.php',
				data: {
					action: 'log',
					formData: $('#app-log-form').serialize()
				},
				type: 'POST',
				async: 'true',
				dataType: 'json',
				beforeSend: function() {
					$.mobile.loading('show');
				},
				complete: function() {
					// This callback function will trigger on data sent/received complete
					$.mobile.loading('hide');
				},
				success: function(result) {
					if (result.status) {
						window.localStorage.setItem('user_id', result.user_id);
						window.localStorage.setItem('user', result.user);
						window.localStorage.setItem('auth', result.auth);
						window.localStorage.setItem('name', result.name);
						window.localStorage.setItem('country_id', result.country_id);
						window.localStorage.setItem('area_id', result.area_id);
						// alert(window.localStorage.getItem('name') + ' ' + window.localStorage.getItem('user') + '(' + window.localStorage.getItem('auth') + ')');
						$.mobile.changePage("#home");
					} else {
						alert(result.message);
					}
				},
				error: function(request, error) {
					alert('請確認您的網路連線狀態！');
				}
			});
		},
		messages: {
			lg_email: {
				required: "請填寫您的帳號(Email)",
				email: "請填寫有效 E-mail 格式"
			},
			lg_pswd: {
				required: "這是必填欄位"
			}
		},
		errorElement: "div",
		errorClass: "form-hint",
		errorPlacement: function(error, element) {
			if (element.is(':radio') || element.is(':checkbox')) {
				var eid = element.attr('name');
				error.appendTo($('input[name=' + eid + ']:last').parents('.ui-field-contain'));
			} else {
				error.appendTo(element.parents('.ui-field-contain'));
			}
		}
	});
	$('#login-btn').click(function() {
		$('#app-log-form').valid();
		// return false; // cancel original event to prevent form submitting
	});
});

$(document).on('pagecreate', '#home', function() {
	$('#home-main').hide();
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_home_setting.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var setting = data.result;
			var home_img = $('.home-img');
			$.each(setting, function(idx, obj) {
				$(home_img).eq(idx).attr('src', 'http://52.69.53.255/KCCordova/www/img/' + obj.pic);
				$(home_img).eq(idx).parent('a').attr('href', link_to_url(obj.link));
			});
		}
		$('#home-main').show();
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});

	function link_to_url(link) {
		switch (link) {
			case 'club':
				return './club.html'
				break;
			case 'seeker':
				return "./jobseeker.html";
				break;
			case 'life':
				return './lifeservice.html'
				break;
			case 'news':
				return "./menu.html#news";
				break;
			case 'homepages':
				return 'http://www.kelly-club.com/'
				break;
			default:
				return "#";
				break;
		}
	}
	// $.ajax('http://52.69.53.255/KCCordova/api/getAdsHome.json')
	// 	.done(function(res) {
	// 		var result = res[0];
	// 		// caches
	// 		var ads1 = $('#ads-home .ui-block-a');
	// 		var ads2 = $('#ads-home .ui-block-b');
	//
	// 		if (result.status) {
	// 			// console.log('yes');
	// 			// console.log(ads1);
	// 			ads1.find('a').attr('href', result.ads[0].adsUrl);
	// 			ads2.find('a').attr('href', result.ads[1].adsUrl);
	// 			ads1.find('img').attr('src', 'http://52.69.53.255/KCCordova/www/img/' + result.ads[0].adsImage);
	// 			ads2.find('img').attr('src', 'http://52.69.53.255/KCCordova/www/img/' + result.ads[1].adsImage);
	//
	// 			$('#ads-home').show();
	// 		}
	// 	})
});

function fbLogin() {
	facebookConnectPlugin.login(['email', 'public_profile'], function(response) {
		// alert('logged in successfully');
		// alert('now logged, ID: ' + response.authResponse.userID);
		window.localStorage.setItem('fb_id', response.authResponse.userID);
		$.ajax({
				url: 'http://52.69.53.255/KCCordova/api/user_action.php',
				dataType: 'json',
				type: 'POST',
				data: {
					action: 'fb_log',
					fb_id: response.authResponse.userID
				}
			})
			.done(function(result) {
				if (result.status) {
					window.localStorage.setItem('user_id', result.user_id);
					window.localStorage.setItem('fb_id', response.authResponse.userID);
					window.localStorage.setItem('user', result.user);
					window.localStorage.setItem('auth', result.auth);
					window.localStorage.setItem('name', result.name);
					window.localStorage.setItem('country_id', result.country_id);
					window.localStorage.setItem('area_id', result.area_id);
					// alert(window.localStorage.getItem('name') + ' ' + window.localStorage.getItem('user') + '(' + window.localStorage.getItem('auth') + ')');
					$.mobile.changePage("#home");
				} else {
					// alert(result.message + '/' + result.sql);
					// facebookConnectPlugin.logout(function() {}, function() {});
					$.mobile.changePage("#fb-reg");

				}
			});

	}, function(err) {
		alert('log in error:' + JSON.stringify(err));
	});
}
