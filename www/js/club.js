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
		$('#website-link').attr('href', club.website);
		$('#club-intro .add-fav-btn').click(function(event) {
			$.ajax({
				url: 'http://52.69.53.255/KellyClub/api/add_fav.php?user_id=' + window.localStorage.getItem('user_id') + '&type=2&item_id=' + get_club_id,
				dataType: 'json',
				success: function(result) {
					alert(result.message);
				}
			});
		});
		if (club.publish_plan == 0) {
			$('#brief_block, #map_block').hide();
		} else {
			$('#brief_block, #map_block').show();
			$('#intro_content').text(club.description);
			if (club.video_url.length > 0) {
				$('#intro_content').append('<div><iframe id="video-player" type="text/html" width="100%" height="350" src="' + club.video_url + '" frameborder="0"></iframe></div>');
			}
			initialize(club.address);
		}
	});
});

var map;
var marker;

function initialize(address) {
	console.log(address);
	//初始化地圖時的定位經緯度設定
	var latlng = new google.maps.LatLng(23.973875, 120.982024); //台灣緯度Latitude、經度Longitude：23.973875,120.982024
	//初始化地圖options設定
	var mapOptions = {
		zoom: 15,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	//初始化地圖
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	//加入標記點
	marker = new google.maps.Marker({
		draggable: false,
		position: latlng,
		map: map
	});

	var map_center;
	geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		'address': address //此處帶入Request屬性
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			LatLng = results[0].geometry.location;
			map.setCenter(LatLng); //將地圖中心定位到查詢結果
			marker.setPosition(LatLng); //將標記點定位到查詢結果
			marker.setTitle(address); //重新設定標記點的title
		}
	});
}

$(document).on('pagebeforeshow', '#club-job-info', function() {
	var get_club_id = window.localStorage.getItem('get_club_id');
	console.log(get_club_id);
	$.ajax({
		url: 'http://52.69.53.255/KellyClub/api/get_club_offer.php?club_id=' + get_club_id,
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			var club = data.result[0];
			$('#interviewer').html(club.interviewer);
			$('#tel').text(club.tel);
			$('#line').text(club.line);
			if (typeof(club.offer_content) !== 'undefined') {
				club.offer_content = club.offer_content.replace(/\n/g, "<br>")
			}
			if (typeof(club.welfare) !== 'undefined') {
				club.welfare = club.welfare.replace(/\n/g, "<br>")
			}
			$('#offer_content').html(club.offer_content);
			$('#offer_welfare').html(club.welfare);
			$('#club-job-info .add-fav-btn').click(function(event) {
				$.ajax({
					url: 'http://52.69.53.255/KellyClub/api/add_fav.php?user_id=' + window.localStorage.getItem('user_id') + '&type=2&item_id=' + get_club_id,
					dataType: 'json',
					success: function(result) {
						alert(result.message);
					}
				});
			});
		} else {
			$('#interviewer').text(data.message);
			$('#tel').text(data.message);
			$('#line').text(data.message);
			$('#offer_content').html(data.message);
			$('#offer_welfare').html(data.message);
		}
	});
});

$(document).on('pagebeforeshow', "#club-intro, #club-service", function() {
	// 沒有權限觀看應徵資訊的提示
	var mask = '<div style="display:block;" class="page_mask text-center" data-position-to="window" data-dismissible="true"><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>您不是求職者會員<br>店家應徵資訊僅供求職者會員瀏覽</p></div>';
	if (window.localStorage.getItem('auth') != '0' && window.localStorage.getItem('auth') != '3') {
		$("a[href='#club-job-info']").click(function(event) {
			event.preventDefault();
			$("[data-role='page']").prepend(mask);
			$(".page_mask .ui-icon-delete").click(function(event) {
				$(".page_mask").remove();
			});
		});
	}
});

$(document).on('pagebeforehide', '#club-intro', function() {
	// window.localStorage.removeItem('get_club_id');
});

// 改變小區塊 navbar 的 class
$(document).on('pagebeforeshow', "#club-service", function() {
	$("#first_tabs").tabs({
		activate: function(event, ui) {
			ui.newTab.children('a').addClass('active');
			ui.oldTab.children('a').removeClass('active');
		}
	});
	$("#second_tabs").tabs({
		activate: function(event, ui) {
			ui.newTab.children('a').addClass('active');
			ui.oldTab.children('a').removeClass('active');
		}
	});
});
