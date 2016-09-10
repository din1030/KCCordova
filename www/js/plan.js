$(document).one("pagebeforeshow", "[data-role='page']", function() {
	if (window.localStorage.getItem('auth') == null || window.localStorage.getItem('user_id') == null) {
		alert('您尚未登入！');
		document.location.href = './index.html';
	}
});

$(document).on('pagebeforecreate', '#pay', function() {
	$.ajax({
		url: api_base + 'get_policy.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			$('#pay_block').html(data.result.pay_method.replace(/。\n/g, "。<br><br>").replace(/\n/g, "<br>"));
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});
