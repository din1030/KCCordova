$(document).on('pagecreate', "[data-role='page']", function() {
	if (window.localStorage.getItem('user_id') != null && window.localStorage.getItem('auth') != null) {
		console.log(window.localStorage.getItem('user_id'));
		$.mobile.changePage("#home");
	}
});

$(document).on('pagebeforeshow', '#disclaimer', function() {
	$.ajax({
		url: api_base + 'get_policy.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			$('#pre_service_policy').html('<p>' + data.result.service + '</p>');
			$('#pre_privacy_policy').html('<p>' + data.result.privacy + '</p>');
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});

$(document).on('pagebeforeshow', '#language', function() {
	$('#lang-next').click(function(event) {
		window.localStorage.setItem('lang_id', $('[name="default_lang"]:radio:checked').val());
		// console.log(window.localStorage.getItem('lang_id'));
	});
});

$(document).on('pagecreate', '#login', function() {
	$('#fb_login_btn').click(function(event) {
		facebookConnectPlugin.getLoginStatus(
			function(response) {
				// alert("login current status: " + JSON.stringify(response));
				if (response.status === 'connected') {
					$.ajax({
						url: api_base + 'user_action.php',
						dataType: 'json',
						type: 'POST',
						data: {
							action: 'fb_log',
							fb_id: response.authResponse.userID
						}
					}).done(function(result) {
						if (result.status) {
							window.localStorage.setItem('user_id', result.user_id);
							window.localStorage.setItem('fb_id', response.authResponse.userID);
							window.localStorage.setItem('user', result.user);
							window.localStorage.setItem('auth', result.auth);
							window.localStorage.setItem('approved', result.approved);
							window.localStorage.setItem('name', result.name);
							window.localStorage.setItem('country_id', result.country_id);
							window.localStorage.setItem('area_id', result.area_id);
							// alert(window.localStorage.getItem('name') + ' ' + window.localStorage.getItem('user') + '(' + window.localStorage.getItem('auth') + ')');
							// $.mobile.changePage("#home");
							document.location.href = './index.html#home';
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
				url: api_base + 'user_action.php',
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
	$.ajax({
		url: api_base + 'get_policy.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			$('#service_policy').html('<p>' + data.result.service + '</p>');
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
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
				url: api_base + 'user_action.php',
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
						window.localStorage.setItem('approved', result.approved);
						window.localStorage.setItem('name', result.name);
						window.localStorage.setItem('country_id', result.country_id);
						window.localStorage.setItem('area_id', result.area_id);
						// alert(window.localStorage.getItem('name') + ' ' + window.localStorage.getItem('user') + '(' + window.localStorage.getItem('auth') + ')');
						document.location.href = './index.html#home';
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
				url: api_base + 'user_action.php',
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
						window.localStorage.setItem('approved', result.approved);
						window.localStorage.setItem('name', result.name);
						window.localStorage.setItem('country_id', result.country_id);
						window.localStorage.setItem('area_id', result.area_id);
						// alert(window.localStorage.getItem('name') + ' ' + window.localStorage.getItem('user') + '(' + window.localStorage.getItem('auth') + ')');
						document.location.href = './index.html#home';
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
	$('#forget-pswd-form').on('submit', function(e) {
		e.preventDefault();
		var reset_email = $('#forget-pswd-form #reset_email').val();
		$(this).ajaxSubmit({
			url: api_base + 'send_reset_mail.php',
			type: 'POST',
			dataType: 'json',
			beforeSend: function() {
				$.mobile.loading('show');
			},
			complete: function() {
				$.mobile.loading('hide');
			},
			success: function(result) {
				if (result.status) {
					window.localStorage.setItem('reset_email', reset_email);
					alert(result.message);
					$.mobile.changePage("#reset-password");
				} else {
					alert(result.message);
				}
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		});
	});
});

$(document).on('pagebeforeshow', '#reset-password', function() {
	$("#reset-pswd-form").trigger('reset');
	$('#rst_email').val(window.localStorage.getItem('reset_email'));
	$('#reset-pswd-form').off();
	$('#reset-pswd-form').on('submit', function(e) {
		e.preventDefault();
		$(this).ajaxSubmit({
			url: api_base + 'reset_password.php',
			type: 'POST',
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
					$.mobile.changePage("#app-log-in");
				} else {
					alert(result.message);
				}
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		});
	});
});

$(document).on('pagebeforeshow', '#home', function() {
	$('#home-main').hide();
	$.ajax({
		url: api_base + 'get_home_setting.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var setting = data.result;
			var home_img = $('.home-img');
			$.each(setting, function(idx, obj) {
				$(home_img).eq(idx).attr('src', img_base + '' + obj.pic);
				$(home_img).eq(idx).parent('a').attr('href', link_to_url(obj.link));
			});
			// 沒有登入的提示
			var club_login_mask = '<div style="display:block;" class="page_mask text-center" data-position-to="window" data-dismissible="true"><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>您尚未登入<br>求職者資訊僅供店家管理者會員瀏覽</p><a href="index.html#login" class="ui-btn ui-btn-inline purple-btn ui-corner-all" data-ajax="false">註冊/登入</a></div>';
			// 沒有權限觀看求職者的提示
			var not_club_mask = '<div style="display:block;" class="page_mask text-center" data-position-to="window" data-dismissible="true"><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>您不是店家管理者<br>求職者資訊僅供店家管理者瀏覽</p></div>';
			// 店家尚未審核的提示
			var not_approved_mask = '<div style="display:block;" class="page_mask text-center" data-position-to="window" data-dismissible="true"><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>您的身分尚未通過審核<br>暫時無法瀏覽求職者資訊</p></div>';

			$("a[href='./jobseeker.html']").off();
			$("a[href='./jobseeker.html']").click(function(event) {
				if (window.localStorage.getItem('auth') == null || typeof window.localStorage.getItem('auth') == 'undefined') {
					event.preventDefault();
					$.mobile.activePage.prepend(club_login_mask);
					$(".page_mask a").click(function(event) {
						$(".page_mask").remove();
					});
				} else if (window.localStorage.getItem('auth') != '0' && window.localStorage.getItem('auth') != '100' && window.localStorage.getItem('auth') != '2') {
					event.preventDefault();
					$.mobile.activePage.prepend(not_club_mask);
					$(".page_mask a").click(function(event) {
						$(".page_mask").remove();
					});
				} else if (window.localStorage.getItem('auth') == '2' && window.localStorage.getItem('approved') == '0') {
					event.preventDefault();
					$.mobile.activePage.prepend(not_approved_mask);
					$(".page_mask a").click(function(event) {
						$(".page_mask").remove();
					});
				}
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
			case 'website':
				return 'http://www.kelly-club.com/'
				break;
			default:
				return "#";
				break;
		}
	}
});

function fbLogin() {
	facebookConnectPlugin.login(['email', 'public_profile'], function(response) {
		// alert('logged in successfully');
		// alert('now logged, ID: ' + response.authResponse.userID);
		window.localStorage.setItem('fb_id', response.authResponse.userID);
		$.ajax({
				url: api_base + 'user_action.php',
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
					// $.mobile.changePage("#home");
					document.location.href = './index.html#home';

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
