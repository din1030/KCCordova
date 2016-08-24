$(document).on('pagebeforecreate', '#news', function() {
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_news.php',
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			// $.each(data.result, function(idx, obj) {
			// });
			var news = data.result[0];
			$('#news_updated').text(news.updated);
			$('#news_title').text(news.title);
			$('#news_pic').attr('src', './img/' + news.pic);
			if (typeof(news.content) !== 'undefined') {
				news.content = news.content.replace(/\n/g, "<br>");
			}
			$('#new_content').html(news.content);
			$('#seeker-grid .seeker_div').click(function(event) {
				var seeker_id = $(this).jqmData("seeker-id");
				window.localStorage.setItem('get_seeker_id', seeker_id);
				$.mobile.changePage($('#jobseeker-resume'), {
					reloadPage: true,
					changeHash: true
				});
			});
		} else {
			$('#news_updated').text(news.today);
		}
	});
});

$(document).on('pagebeforeshow', '#jobseeker-resume', function() {

});
