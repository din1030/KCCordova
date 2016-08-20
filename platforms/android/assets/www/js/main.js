$(document).ready(function() {
	$("[data-role='navbar']:not(.internal)").navbar();
	$("[data-role='footer']:not(.internal)").toolbar();

	// 沒有權限觀看求職者的提示
	var mask = '<div style="display:block;" class="page_mask text-center" data-position-to="window" data-dismissible="true"><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>您不是店家管理者<br>求職者資訊僅供店家管理者瀏覽</p></div>';
	$("a[href='./jobseeker.html']").click(function(event) {
		if (window.localStorage.getItem('auth') != '0' && window.localStorage.getItem('auth') != '2') {
			event.preventDefault();
			$("[data-role='page']").prepend(mask);
			$(".page_mask .ui-icon-delete").click(function(event) {
				$(".page_mask").remove();
			});
		}
	});
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
	var member = '（未知使用者）';
	switch (window.localStorage.getItem('auth')) {
		case '0':
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
});

var panel = '<div data-role="panel" id="menu-panel" data-display="push" data-theme="a" data-position-fixed="true">' + '<div class="ui-panel-inner"><ul data-role="listview" class="ui-listview">' + '<li><a href="./index.html#home" class="ui-btn" data-ajax="false"><div class="menu-icon icon0"></div> 首頁 </a></li>' + '<li><a href="./profile.html" class="ui-btn" data-ajax="false"><div class="menu-icon icon1"></div> 我的檔案 </a></li>' + '<li><a href="./menu.html#recommend-record" class="ui-btn" data-ajax="false"><div class="menu-icon icon2"></div> 推薦紀錄 </a></li>' + '<li><a href="./menu.html#news" class="ui-btn" data-ajax="false"><div class="menu-icon icon3"></div> 最新消息 </a></li>' + '<li><a href="./menu.html#share" class="ui-btn" data-ajax="false"><div class="menu-icon icon4"></div> 分享好友 </a></li>' + '<li><a href="http://www.kelly-club.com/" class="ui-btn" rel="external" target="_blank"><div class="menu-icon icon5"></div> 連官網 </a></li>' + '<li><a href="./menu.html#setting" class="ui-btn" data-ajax="false"><div class="menu-icon icon6"></div> 設定 </a></li>' + '<li><a id="menu-logout" href="./index.html#login" class="ui-btn" data-ajax="false"><div class="menu-icon icon7"></div> 登出 </a></li>' + ' </ul></div></div>';
$(document).one('pagebeforecreate', function() {
	$.mobile.pageContainer.prepend(panel);
	// Admin 才會有後台選項
	if (window.localStorage.getItem('auth') == '0') {
		$('#menu-panel ul').append('<li><a href="./admin.html" class="ui-btn" data-ajax="false"><div class="menu-icon icon8"></div> 管理者後台 </a></li>')
	}
	// 登出清掉 localStorage
	$('#menu-logout').click(function(event) {
		// console.log(window.localStorage);
		window.localStorage.clear();
		// console.log(window.localStorage);
		// window.localStorage.removeItem('user');
		// window.localStorage.removeItem('auth');
		// window.localStorage.removeItem('name');
	});
	$("#menu-panel").panel();
});


$(document).on('pageshow', "#jobseeker-resume, #club-intro, #lifeservice-detail", function() {
	$('.flexslider').flexslider({
		animation: 'slide'
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

$(document).on('pagebeforeshow', "#redeem", function() {
	// 兌換提示
	var redeem_item = 'XXXX';
	var success_mask = '<div style="display:block;" class="page_mask text-center" data-position-to="window" data-dismissible="true"><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>恭喜您成功兌換【' + redeem_item + '】！<br>感謝您推薦朋友使用 Kelly Club!</p></div>';
	var fail_mask = '<div style="display:block;" class="page_mask text-center" data-position-to="window" data-dismissible="true"><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>很抱歉！<br>您的點數不足，快推薦朋友使用 Kelly Club 獲取點數吧！</p></div>';
	$(".redeem-btn").click(function(event) {
		event.preventDefault();
		$("[data-role='page']").prepend(fail_mask);
		$(".page_mask .ui-icon-delete").click(function(event) {
			$(".page_mask").remove();
		});
	});
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

$(document).on('pagebeforeshow', "[data-role='page'].admin-page", function() {
	var page_id = $.mobile.activePage.attr('id');
	var page_title = $.mobile.activePage.jqmData('title');
	var index = $('#' + page_id + ' select.navigateToPage option[value$=' + page_title + ']').index();
	$('#' + page_id + ' select.navigateToPage').prop('selectedIndex', index);
	var title = $('#' + page_id + ' select.navigateToPage option[value$=' + page_title + ']').text();
	$('#' + page_id + ' span.navigateToPage').text(title);
});

// $(".admin-page").ready(function() {
$(document).on('pagecreate', ".admin-page", function() {
	$(this).find('select.navigateToPage').change(function() {
		var page = $(this).val();
		$.mobile.changePage(page);
	});

	$('.home-pic-input, .redeem-pic-input, .life-pic-input, .store-pic-input').change(function(event) {
		if (this.files && this.files[0]) {
			var input = this;
			var reader = new FileReader();
			reader.onload = function(e) {
				$(input).parent().prev("input[type='image']").attr('src', e.target.result);
			};
			reader.readAsDataURL(this.files[0]);
		}
	});
	$("input[type='image']").click(function() {
		$(this).next('.ui-input-text').find("input[type='file']").click();
	});
});

$(document).on('pagebeforeshow', ".profile-pic-page", function() {
	$('.profile-pic-input').change(function(event) {
		if (this.files && this.files[0]) {
			var input = this;
			var reader = new FileReader();
			reader.onload = function(e) {
				$(input).parent().prev("input[type='image']").attr('src', e.target.result);
			};
			reader.readAsDataURL(this.files[0]);
		}
	});
	$("input[type='image']").click(function() {
		$(this).next('.ui-input-text').find("input[type='file']").click();
	});
});

$(document).on('pageshow', "#admin-member-detail", function() {
	$('#member_type').change(function(event) {
		if ($(this).val() == 'club') {
			$('#seeker_type_block').hide();
			$('#club_type_block').show();
		} else if ($(this).val() == 'seeker') {
			$('#club_type_block').hide();
			$('#seeker_type_block').show();

		} else if ($(this).val() == 'normal') {
			$('#club_type_block').hide();
			$('#seeker_type_block').hide();

		}
	});
});
