var api_base = 'http://52.69.53.255/KCCordova/api/';
var img_base = 'http://52.69.53.255/KCCordova/www/img/';

var memberType = 1;
var memberId;

$(document).ready(function() {
	$("[data-role='navbar']:not(.internal)").navbar();
	$("[data-role='footer']:not(.internal)").toolbar();

	memberType = parseInt(window.localStorage.getItem('auth'));
	memberId = parseInt(window.localStorage.getItem('user_id'));


});

// Update the contents of the toolbars
$(document).on("pagebeforeshow", "[data-role='page']", function() {
	// Each of the four pages in this demo has a data-title attribute
	// which value is equal to the text of the nav button
	// For example, on first page: <div data-role="page" data-title="Info">
	var current = $(this).jqmData("title");
	// Remove active class from nav buttons
	$("[data-role='navbar'] a div.active").removeClass("active");
	// Add active class to current nav button
	$("[data-role='navbar'] a div").each(function() {
		if ($(this).jqmData("title") === current) {
			$(this).addClass("active");
		}
	});
	// 動態顯示登入使用者
	var member = '（未登入！）';
	switch (window.localStorage.getItem('auth')) {
		case '0':
		case '100':
			member = '會員：系統管理者｜'.concat(window.localStorage.getItem('name'));
			break;
		case '1':
			member = '會員：一般會員｜'.concat(window.localStorage.getItem('name'));
			break;
		case '2':
			member = '會員：店家管理者｜'.concat(window.localStorage.getItem('name'));
			break;
		case '3':
			member = '會員：求職者｜'.concat(window.localStorage.getItem('name'));
			break;
	}
	$('span.member').text(member);

	// 沒有權限觀看求職者的提示
	var mask = '<div style="display:block;" class="page_mask text-center" data-position-to="window" data-dismissible="true"><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>您不是店家管理者<br>求職者資訊僅供店家管理者瀏覽</p></div>';
	$("a[href='./jobseeker.html']").click(function(event) {
		if (window.localStorage.getItem('auth') != '0' && window.localStorage.getItem('auth') != '100' && window.localStorage.getItem('auth') != '2') {
			event.preventDefault();
			$("[data-role='page']").prepend(mask);
			$(".page_mask .ui-icon-delete").click(function(event) {
				$(".page_mask").remove();
			});
		}
	});
	$.ajax({
		url: api_base + '/get_country_menu.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var c_list = '';
			$.each(data.result, function(idx, obj) {
				c_list += '<option value="' + obj.id + '">' + obj.country + '</option>';
			});
			var page_id = $.mobile.activePage.attr('id');
			$('#' + page_id + ' select.country-select').html(c_list);

			var current_country_id = (window.localStorage.getItem('country_id') != null) ? window.localStorage.getItem('country_id') : 1;
			$('#' + page_id + ' select.country-select').val(current_country_id).selectmenu('refresh');

			var a_list = '';
			$.each(data.result, function(idx, obj) {
				if (obj.id == current_country_id) {
					$.each(obj.area, function(idx, area) {
						a_list += '<option value="' + area.a_id + '">' + area.name + '</option>';
						$('#' + page_id + ' select.area-select').html(a_list);
						$('#' + page_id + ' select.area-select').selectmenu('refresh');
					});
				}
			});
			$('#' + page_id + ' select.area-select').html(a_list);
			$('#' + page_id + ' select.area-select').selectmenu('refresh');

			$('#' + page_id + ' select.country-select').change(function(event) {
				a_list = '';
				var c_id = $(this).val();
				console.log(c_id);
				$.each(data.result, function(idx, obj) {
					// console.log(obj.id);
					if (obj.id == c_id) {
						// console.log(obj.id);
						$.each(obj.area, function(idx, area) {
							// console.log(obj.id);
							a_list += '<option value="' + area.a_id + '">' + area.name + '</option>';
							$('#' + page_id + ' select.area-select').html(a_list);
							$('#' + page_id + ' select.area-select').selectmenu('refresh');
						});
					}
				});
			});
		}
	});
});

$(document).on('pagecreate', function() {
	var href;
	var admin_li = '';
	if (window.localStorage.getItem('auth') == '0') {
		// Admin 才會有後台選項
		admin_li = '<li><a href="./admin.html" class="ui-btn" data-ajax="false"><div class="menu-icon icon8"></div> 管理者後台 </a></li>';

		// $('#profile-link').attr('href', './profile.html#member-profile');
		href = './profile.html#member-profile';
	} else if (window.localStorage.getItem('auth') == '1') {
		href = './profile.html';
		// $('#profile-link').attr('href', './profile.html#member-profile');
	} else if (window.localStorage.getItem('auth') == '2') {
		href = './profile_club.html';
		// $('#profile-link').attr('href', './profile.html#club-profile');
	} else if (window.localStorage.getItem('auth') == '3') {
		href = './profile_seeker.html';
		// $('#profile-link').attr('href', './profile.html#jobseeker-profile');
	}
	var panel = '<div data-role="panel" id="menu-panel" data-display="push" data-theme="a" data-position-fixed="true">' + '<div class="ui-panel-inner"><ul data-role="listview" class="ui-listview">' + '<li><a href="./index.html#home" class="ui-btn" data-ajax="false"><div class="menu-icon icon0"></div> 首頁 </a></li>' + '<li><a id="profile-link" href="' + href + '" class="ui-btn" data-ajax="false"><div class="menu-icon icon1"></div> 我的檔案 </a></li>' + '<li><a href="./menu.html#recommend-record" class="ui-btn" data-ajax="false"><div class="menu-icon icon2"></div> 推薦紀錄 </a></li>' + '<li><a href="./menu.html#news" class="ui-btn" data-ajax="false"><div class="menu-icon icon3"></div> 最新消息 </a></li>' + '<li><a href="./menu.html#share" class="ui-btn" data-ajax="false"><div class="menu-icon icon4"></div> 分享好友 </a></li>' + '<li><a href="http://www.kelly-club.com/" class="ui-btn" rel="external" target="_blank"><div class="menu-icon icon5"></div> 連官網 </a></li>' + '<li><a href="./menu.html#setting" class="ui-btn" data-ajax="false"><div class="menu-icon icon6"></div> 設定 </a></li>' + '<li><a id="menu-logout" href="./index.html#login" class="ui-btn" data-ajax="false"><div class="menu-icon icon7"></div> 登出 </a></li>' + admin_li + ' </ul></div></div>';
	$.mobile.pageContainer.prepend(panel);

	// 登出清掉 localStorage
	$('#menu-logout').click(function(event) {
		window.localStorage.clear();
		// window.localStorage.removeItem('user');
		// window.localStorage.removeItem('auth');
		// window.localStorage.removeItem('name');
		facebookConnectPlugin.logout(function() {}, function() {});
	});
	$("#menu-panel").panel();
});

$(document).on('pageshow', "#jobseeker-resume, #club-intro, #lifeservice-detail", function() {
	console.log('hit slide reload');
	// console.log($('.flexslider'));
	$('.flexslider').unbind().removeData();
	$('.flexslider').flexslider({
		animation: 'slide'
	});
});
