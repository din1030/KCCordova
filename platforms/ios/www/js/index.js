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
			rg_birthday: {
				required: "請填寫您的生日"
			},
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
						window.localStorage.setItem('user_info', result.user_info);
						alert(window.localStorage.getItem('name') + ' ' + window.localStorage.getItem('user') + '(' + window.localStorage.getItem('auth') + ')');
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
