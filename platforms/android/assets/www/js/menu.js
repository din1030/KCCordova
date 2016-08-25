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
						// RequestsService.sendData(err);
						alert(err);
						alert('an error occured while trying to login. please try again.');
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
				function(e) {
					alert("Failed: " + e);
				});

		}
	});
});
