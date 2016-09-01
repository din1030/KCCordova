var remain_point = 0;
var used_point = 0;
var total_point = 0;
var policy = {};

$(document).on("pagebeforeshow", "[data-role='page']", function() {
	if (window.localStorage.getItem('auth') == null || window.localStorage.getItem('user_id') == null) {
		alert('您尚未登入！');
		$.mobile.changePage('index.html', {
			reloadPage: true,
			changeHash: true
		});
	}
});

$(document).on('pagebeforeshow', "#recommend-record", function() {
	$.ajax({
		url: api_base + 'get_recommend_list.php?user_id=' + window.localStorage.getItem('user_id'),
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var rec_list = '';
			total_point = parseInt(data.total);
			$('#recommend_total').html(data.total);
			$.each(data.result, function(idx, obj) {
				rec_list += '<li>' + obj.name + '<span class="float-right">' + obj.created + '</span></li>';
			});
			$('#recommend_list').css('padding-left', '1.5em').html(rec_list);
		} else {
			$('#recommend_list').css('padding-left', '0').html(data.message);
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
	$.ajax({
		url: api_base + 'get_redeem_record.php?user_id=' + window.localStorage.getItem('user_id'),
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var redeem_list = '';
			used_point = parseInt(data.used_point);
			remain_point = total_point - used_point;
			$('.recommend_count').html(remain_point);
			// $('.recommend_count').html((remain_point > 0) ? remain_point : 0);
			$.each(data.result, function(idx, obj) {
				redeem_list += '<li>(' + obj.point + ')' + obj.title + obj.description + '<span class="float-right">' + obj.created + '</span></li>';
			});
			$('#redeem_list').html(redeem_list);
		} else {
			$('#redeem_list').html(data.message);
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});

$(document).on('pagebeforeshow', "#redeem", function() {
	$.ajax({
		url: api_base + 'get_redeem_item.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var redeem_block = '';
			$('.redeem_item_block').remove();
			$('.recommend_count').html(remain_point);
			// $('.recommend_count').html((remain_point > 0) ? remain_point : 0);
			$.each(data.result, function(idx, obj) {
				redeem_block = '<div class="detail_block redeem_item_block"><div class="ui-bar ui-bar-a"><h3>' + obj.title + '</h3></div><div class="ui-body ui-body-a"><div class="float-left text-center"><button type="button" class="ui-btn ui-corner-all no-bg-bd purple-btn redeem-btn" data-item-id="' + obj.id + '" data-point="' + obj.point + '">確定兌換</button>' + obj.description + '<br> (' + obj.point + ')</div><div class="redeem_pic float-right" style="background-image:url(' + img_base + obj.photo + ')"></div></div></div>';
				$('#redeem-main').append(redeem_block);
			});
			// 兌換提示
			var redeem_item = 'XXXX';
			var success_mask = '<div style="display:block;" class="page_mask text-center" data-position-to="window" data-dismissible="true"><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>兌換成功！<br>感謝您推薦朋友使用 Kelly Club!</p></div>';
			var fail_mask = '<div style="display:block;" class="page_mask text-center" data-position-to="window" data-dismissible="true"><a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><p>很抱歉！<br>您的點數不足，快推薦朋友使用 Kelly Club 獲取點數吧！</p></div>';
			// remain_point = 15;
			$(".redeem-btn").click(function(event) {
				var item_id = $(this).jqmData('item-id');
				if ($(this).jqmData('point') > remain_point) {
					$("[data-role='page']").prepend(fail_mask);
					$(".page_mask .ui-icon-delete").click(function(event) {
						$(".page_mask").remove();
					});
				} else {
					$.ajax({
						url: api_base + 'add_redeem_record.php',
						type: 'POST',
						dataType: 'json',
						data: {
							user_id: window.localStorage.getItem('user_id'),
							item_id: item_id,
						}
					}).done(function(data) {
						if (data.status) {
							$("[data-role='page']").prepend(success_mask);
							$(".page_mask .ui-icon-delete").click(function(event) {
								$(".page_mask").remove();
								$.mobile.changePage($('#recommend-record'), {
									reloadPage: true,
									changeHash: true
								});
							});
						}
					}).fail(function() {
						alert('請確認您的網路連線狀態！');
					});
				}
			});
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});

});

$(document).on('pagebeforecreate', '#news', function() {
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_news.php',
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			// $.each(data.result, function(idx, obj) {
			// });
			var index = 0;
			var news = data.result[index];
			$('#news_updated').text(news.updated);
			$('#news_title').text(news.title);
			$('#news_pic').attr('src', './img/' + news.pic);
			if (typeof(news.content) !== 'undefined') {
				news.content = news.content.replace(/\n/g, "<br>");
			}
			$('#new_content').html(news.content);
			$('#prev_news').hide();
			$('#next_news, #prev_news').click(function(event) {
				if ($(event.target).attr('id') == 'next_news' && index < (data.result.length - 1)) {
					index++;
					console.log(index);
					$('#prev_news').show();
					if (index == (data.result.length - 1)) {
						$('#next_news').hide();
					}
				} else if ($(event.target).attr('id') == 'prev_news' && index > 0) {
					index--;
					console.log(index);
					$('#next_news').show();
					if (index == 0) {
						$('#prev_news').hide();
					}
				}
				news = data.result[index];
				$('#news_updated').text(news.updated);
				$('#news_title').text(news.title);
				$('#news_pic').attr('src', './img/' + news.pic);
				if (typeof(news.content) !== 'undefined') {
					news.content = news.content.replace(/\n/g, "<br>");
				}
				$('#new_content').html(news.content);
			});
		} else {
			$('#news_updated').text(news.today);
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});

$(document).on('pagebeforecreate', '#share', function() {
	$('#fb_share_btn').click(function(event) {
		// me.logged_in = true;
		// alert('logged in successfully');
		// alert(JSON.stringify(response.authResponse));
		facebookConnectPlugin.getLoginStatus(
			function(response) {
				alert("current status: " + JSON.stringify(response));
				if (response.status === 'connected') {
					share_kelly();
					// } else if (response.status === 'not_authorized') {
					// the user is logged in to Facebook,
					// but has not authenticated your app
				} else {
					// the user isn't logged in to Facebook.
					facebookConnectPlugin.login(['email', 'public_profile'], function(response) {
						share_kelly();
					}, function(err) {
						alert('error:' + JSON.stringify(err));
					});
				}
			}
		);

		function share_kelly() {
			var options = {
				method: "share",
				href: "http://www.kelly-club.com",
				caption: "Kelly Club 全省八大行業資訊專用APP平台"
			};
			facebookConnectPlugin.showDialog(options, function(result) {
					alert("Posted. " + JSON.stringify(result));
				},
				function(err) {
					alert("Failed: " + JSON.stringify(err));
				});
		}
	});
});

$(document).on('pagebeforeshow', "#setting", function() {
	$.ajax({
		url: api_base + 'get_policy.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.result) {
			policy = data.result;
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});

});

$(document).on('pagebeforeshow', ".policy-page", function() {
	var page_id = $(this).attr('id');
	console.log(page_id);
	$('#' + page_id + ' .policy-text').html(policy[page_id]);
});
