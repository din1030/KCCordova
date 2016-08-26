$(document).on('pagebeforecreate', '#club', function() {
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_club_info.php',
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			var clubs = data.result;
			$.each(clubs, function(idx, obj) {
				var club_li = $('<li></li>').attr('data-icon', 'false').attr('data-admin-id', obj.admin_id)
					.append('<a href="" data-admin-id="' + obj.admin_id + '" data-ajax="false"><img class="club-thumbnail" src="http://52.69.53.255/KCCordova/www/img/' + obj.pic1 + '"><h2>' + obj.name + '</h2><p>' + obj.country + ' ' + obj.area + '｜</p><div class="slogan">' + obj.slogan + '</div><p class="update-time">更新時間 ' + obj.updated + '</p></a>');
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
		}
	});
});

$(document).on('pagebeforeshow', '#club-intro', function() {
	var get_club_id = window.localStorage.getItem('get_club_id');
	console.log(get_club_id);
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_club_info.php?club_id=' + get_club_id,
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			var club = data.result[0];
			$('#club_title').text(club.name);
			$('#club_address, #map_addr').text('地址：' + club.address);
			$('#club_tel').text('電話：' + club.club_tel);
			$('#opentime').empty();
			for (var i = 1; i < 6; i++) {
				var otindex = 'opentime' + i;
				if ($.trim(club[otindex].length) > 0) {
					$('#opentime').append(club[otindex] + '<br>');
				}
			}
			$('#website-link').attr('href', club.website);
			var slideContainer = '<ul class="slides">';
			$.each(club.pic, function(idx, pic) {
				slideContainer += '<li><img src="http://52.69.53.255/KCCordova/www/img/' + pic + '"></li>'
			});

			slideContainer += '</ul>';

			$('.flexslider').html(slideContainer);
			$('#club-intro .add-fav-btn').click(function(event) {
				$.ajax({
					url: 'http://52.69.53.255/KCCordova/api/add_fav.php?user_id=' + window.localStorage.getItem('user_id') + '&type=2&item_id=' + get_club_id,
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
		url: 'http://52.69.53.255/KCCordova/api/get_club_offer.php?club_id=' + get_club_id,
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
			$('.no_data').hide();
			$('#club-job-info-main').show();

			$('#club-job-info .add-fav-btn').click(function(event) {
				$.ajax({
					url: 'http://52.69.53.255/KCCordova/api/add_fav.php?user_id=' + window.localStorage.getItem('user_id') + '&type=2&item_id=' + get_club_id,
					dataType: 'json',
					success: function(result) {
						alert(result.message);
					}
				});
			});
		} else {
			$('.no_data').show();
			$('#club-job-info-main').hide();
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

$(document).on('pagebeforeshow', "#club-service", function() {
	var get_club_id = window.localStorage.getItem('get_club_id');
	console.log(get_club_id);
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_club_consume.php?club_id=' + get_club_id,
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			var club = data.result[0];
			$('#contact_name').html(club.contact_name);
			$('#contact_tel').text(club.contact_tel);
			$('#contact_line').text(club.contact_line);
			if (typeof(club.promo_content) !== 'undefined') {
				club.promo_content = club.promo_content.replace(/\n/g, "<br>");
			}
			$('#promo_content').html(club.promo_content);
			var week = [0, '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
			if (club.title1 != null) {
				var tabs = ['<div data-role="tabs" id="first_tabs" class="service-tabs"><div data-role="navbar"><ul>'];
				var tab_content = [];
				$('#consume_first > .ui-bar > h3').text(club.title1);
				for (var no = 1; no < 6; no++) {
					var day = 'day1' + no;
					var content = 'content1' + no;
					if (club[day] != null) {
						// var li = $('<li></li>').append('<a href="#' + day + '" data-ajax="false">' + club[day] + '</a>');
						tabs.push('<li><a href="#' + day + '" data-ajax="false">' + week[club[day]] + '</a></li>')
							// $('#first_tabs ul').append(li);
						var tab_div = '<div id="' + day + '" class="ui-body-d ui-content">' + club[content] + '</div>';
						tab_content.push(tab_div);
					}
				}
				tabs.push('</ul></div>');
				$.merge(tabs, tab_content);
				$('#consume_first .tab_wrap_block').html(tabs.join('')).trigger('create');
				$("#first_tabs").tabs({
					active: 0,
					activate: function(event, ui) {
						ui.newTab.children('a').addClass('active');
						ui.oldTab.children('a').removeClass('active');
					}
				});
				$('#consume_first').show();
			} else {
				$('#consume_first').hide();
			}
			if (club.title2 != null) {
				var tabs = ['<div data-role="tabs" id="second_tabs" class="service-tabs"><div data-role="navbar"><ul>'];
				var tab_content = [];
				$('#consume_second > .ui-bar > h3').text(club.title2);
				for (var no = 1; no < 6; no++) {
					var day = 'day2' + no;
					var content = 'content2' + no;
					if (club[day] != null) {
						tabs.push('<li><a href="#' + day + '" data-ajax="false">' + week[club[day]] + '</a></li>')
						var tab_div = '<div id="' + day + '" class="ui-body-d ui-content">' + club[content] + '</div>';
						tab_content.push(tab_div);
					}
				}
				tabs.push('</ul></div>');
				$.merge(tabs, tab_content);
				$('#consume_second .tab_wrap_block').html(tabs.join('')).trigger('create');
				$("#second_tabs").tabs({
					active: 0,
					activate: function(event, ui) {
						ui.newTab.children('a').addClass('active');
						ui.oldTab.children('a').removeClass('active');
					}
				});
				$('#consume_second').show();
			} else {
				$('#consume_second').hide();
			}
			$('[data-role="tabs"] li:first-child a').each(function() {
				$(this).addClass('active');
			});
			$('[data-role="tabs"] a:first').click();
			$('.no_data').hide();
			$('#club-service-main').show();

		} else {
			$('.no_data').show();
			$('#club-service-main').hide();
		}
	});
});
