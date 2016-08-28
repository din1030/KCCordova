$(document).on('pagebeforeshow', "#recommend-record", function() {
	$.ajax({
		url: api_base + 'get_recommend_list.php?user_id=' + window.localStorage.getItem('user_id'),
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var list = '';
			$('#recommend_total').html(data.total);
			$.each(data.result, function(idx, obj) {
				list += '<li>' + obj.name + '<span class="float-right">' + obj.created + '</span></li>';
			});
			$('#recommend_list').html(list);
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
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
