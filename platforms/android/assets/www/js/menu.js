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

$(document).on('pagebeforeshow', '#jobseeker-resume', function() {

});
