$(document).on('pagebeforecreate', '#favorite', function() {
	$.ajax({
		url: 'http://52.69.53.255/KellyClub/api/get_fav.php?user_id=' + window.localStorage.getItem('user_id'),
		dataType: 'json'
	}).success(function(data) {
		$.each(data.result, function(idx, obj) {
			var fav_div = $('<div></div>').addClass('detail_block msg_block').attr('data-type', obj.type).attr('data-admin-id', obj.admin_id)
				.append('<div class="ui-bar ui-bar-a"><sapn>【店家】收藏</sapn><button class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-right ui-icon-delete ui-btn-icon-notext del-fav-btn" type="button" name="button" data-shadow="false">x</button></div><a href="./club.html#club-intro" data-ajax="false"><div class="ui-body ui-body-a"><div class="avatar msg-avatar float-left"></div><strong>' + obj.name + '</strong><br>' + obj.country + '｜' + obj.area + '</div></a>');
			$(fav_div).appendTo($('[data-role="main"]'));
		});
		$('.detail_block').click(function(event) {
			var type = $(this).jqmData("type");
			if (type == 2) {
				var admin_id = $(this).jqmData("admin-id");
				window.localStorage.setItem('get_club_id', admin_id);
				$.mobile.changePage($('#club-intro'), {
					// dataUrl: "#club-intro?id=" + admin_id,
					// data: {
					// 	'admin_id': admin_id
					// },
					reloadPage: true,
					changeHash: true
				});
			}
		});
	});
});
