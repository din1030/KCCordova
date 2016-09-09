$(document).one("pagebeforeshow", "[data-role='page']", function() {
	if (window.localStorage.getItem('auth') == null || window.localStorage.getItem('user_id') == null) {
		alert('您尚未登入！');
		document.location.href = './index.html';
	}
});

$(document).on('pagebeforecreate', '#favorite', function() {
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_fav.php?user_id=' + window.localStorage.getItem('user_id'),
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			$.each(data.result, function(idx, obj) {
				var type_word;
				var user_id, name, link;
				if (obj.type == 2) {
					type_word = '【店家】收藏';
					user_id = obj.admin_id;
					name = obj.name;
					link = './club.html#club-intro';
				} else if (obj.type == 3) {
					type_word = '【求職者】收藏';
					user_id = obj.u_id;
					name = obj.nickname;
					link = './jobseeker.html#jobseeker-resume';
				} else if (obj.type == 4) {
					type_word = '【生活服務】收藏';
					user_id = obj.id;
					name = obj.name;
					link = './lifeservice.html#lifeservice-detail';
				}
				var fav_div = $('<div></div>').addClass('detail_block msg_block').attr('data-type', obj.type).attr('data-user-id', user_id)
					.append('<div class="ui-bar ui-bar-a"><sapn>' + type_word + '</sapn><button class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-right ui-icon-delete ui-btn-icon-notext del-fav-btn" type="button" name="button" data-fav-id="' + obj.fav_id + '" data-shadow="false">x</button></div><a href="' + link + '" data-ajax="false"><div class="ui-body ui-body-a"><div class="avatar msg-avatar float-left"><img src="http://52.69.53.255/KCCordova/www/img/' + obj.pic1 + '" style="width: 70px; height: 70px; border-radius: 50%;" alt=""></div><strong>' + name + '</strong><br>' + obj.country + '｜' + obj.area + '</div></a>');
				$(fav_div).appendTo($('[data-role="main"]'));

			});
			$('.del-fav-btn').click(function(event) {
				var btn = $(this);
				var fav_id = $(this).jqmData('fav-id');
				if (confirm('確定刪除此收藏？') === true) {
					$.ajax({
						url: 'http://52.69.53.255/KCCordova/api/remove_fav.php',
						type: 'POST',
						dataType: 'json',
						data: {
							fav_id: fav_id
						}
					}).done(function() {
						$(btn).parents('.detail_block').remove();
					}).fail(function() {
						alert('請確認您的網路連線狀態！');
					});
				}
			});
		} else {
			$('<div>' + data.message + '</div>').appendTo($('[data-role="main"]'));
		}
		$('.detail_block').click(function(event) {
			var type = $(this).jqmData("type");
			if (type == 2) {
				var admin_id = $(this).jqmData("user-id");
				window.localStorage.setItem('get_club_id', admin_id);
			} else if (type == 3) {
				var u_id = $(this).jqmData("user-id");
				window.localStorage.setItem('get_seeker_id', u_id);
			} else if (type == 4) {
				var id = $(this).jqmData("user-id");
				window.localStorage.setItem('get_life_id', id);
			}
		});
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});
