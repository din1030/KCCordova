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
			$('#next_news').click(function(event) {
				index++;
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
