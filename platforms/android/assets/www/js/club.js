$(document).on('pagebeforecreate', '#club', function() {
	$.ajax({
		url: 'http://52.69.53.255/KellyClub/api/get_club_info.php',
		dataType: 'json'
	}).success(function(data) {
		$.each(data, function(idx, obj) {
			var club_li = $('<li></li>').attr('data-icon', 'false').attr('data-admin-id', obj.admin_id)
				.append('<a href="" data-admin-id="' + obj.admin_id + '" data-ajax="false"><img src="./img/square_img.jpg"><h2>' + obj.name + '</h2><p>' + obj.country + ' ' + obj.area + '｜</p><div class="slogan">' + obj.slogan + '</div><p class="update-time">更新時間 ' + obj.updated + '</p></a>');
			$(club_li).appendTo($('#club_list'));
		});
		$('#club_list').listview('refresh');
		$('#club_list li').click(function(event) {
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

		});
	});
});

$(document).on('pagebeforeshow', '#club-intro', function() {
	var get_club_id = window.localStorage.getItem('get_club_id');
	console.log(get_club_id);
	$.ajax({
		url: 'http://52.69.53.255/KellyClub/api/get_club_info.php?club_id=' + get_club_id,
		dataType: 'json'
	}).success(function(data) {
		var club = data[0];
		$('#club_title').text(club.name);
		$('#club_address, #map_addr').text('地址：' + club.address);
		$('#club_tel').text('電話：' + club.tel);
		$('#opentime').empty();
		for (var i = 1; i < 6; i++) {
			var otindex = 'opentime' + i;
			if ($.trim(club[otindex].length) > 0) {
				$('#opentime').append(club[otindex] + '<br>');
			}
		}
		$('#intro_content').text(club.description);
	});
});

$(document).on('pagebeforehide', '#club-intro', function() {
	window.localStorage.removeItem('get_club_id');
});
