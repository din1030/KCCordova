$(document).on('pagebeforecreate', '#jobseeker', function() {
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_seeker_info.php',
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			$.each(data.result, function(idx, obj) {
				var block_class, img;
				if ((idx % 3) == 0) {
					block_class = 'ui-block-a';
				} else if ((idx % 3) == 1) {
					block_class = 'ui-block-b';
				} else if ((idx % 3) == 2) {
					block_class = 'ui-block-c';
				}
				var seeker_div = $('<div></div>').attr('data-seeker-id', obj.u_id).addClass(block_class + ' seeker_div')
					.append('<div class="seeker_list_item"><a data-ajax="false"><img src="http://52.69.53.255/KCCordova/www/img/' + obj.pic[0] + '" alt="" /></a></div>');
				$(seeker_div).appendTo($('#seeker-grid'));
			});
			// $('#club_list').listview('refresh');
			$('#seeker-grid .seeker_div').click(function(event) {
				var seeker_id = $(this).jqmData("seeker-id");
				window.localStorage.setItem('get_seeker_id', seeker_id);
				$.mobile.changePage($('#jobseeker-resume'), {
					reloadPage: true,
					changeHash: true
				});
			});
		}
	});
});

$(document).on('pagebeforeshow', '#jobseeker-resume', function() {
	var get_seeker_id = window.localStorage.getItem('get_seeker_id');
	console.log(get_seeker_id);
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_seeker_info.php?user_id=' + get_seeker_id,
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			$('#nickname-span').html(data.result[0].nickname);
			$('#country-span').html(data.result[0].country + ' ' + data.result[0].area);
			$('#birth-span').html(data.result[0].birth);
			$('#mobile-span').html(data.result[0].mobile);
			$('#height-span').html(data.result[0].height);
			$('#weight-span').html(data.result[0].weight);
			$('#measurements-span').html(data.result[0].measurements);
			$('#education-span').html(data.result[0].education);

			var slideContainer = '<ul class="slides">';
			$.each(data.result[0].pic, function(idx, pic) {
				if (pic != null && pic != '') {
					slideContainer += '<li><img src="http://52.69.53.255/KCCordova/www/img/' + pic + '"></li>'
				}
			});

			slideContainer += '</ul>';

			$('.flexslider').html(slideContainer);
			switch (data.result[0].singing) {
				case 'great':
				default:
					$('#singing-span').html('很好');
					break;
				case 'soso':
					$('#singing-span').html('普通');
					break;
				case 'bad':
					$('#singing-span').html('不佳');
					break;
			}
			switch (data.result[0].dancing) {
				case 'great':
				default:
					$('#dancing-span').html('很好');
					break;
				case 'soso':
					$('#dancing-span').html('普通');
					break;
				case 'bad':
					$('#dancing-span').html('不佳');
					break;
			}
			switch (data.result[0].drinking) {
				case 'great':
				default:
					$('#drinking-span').html('很好');
					break;
				case 'soso':
					$('#drinking-span').html('普通');
					break;
				case 'bad':
					$('#drinking-span').html('不佳');
					break;
			}
			switch (data.result[0].cooperation) {
				case 'great':
				default:
					$('#cooperation-span').html('很好');
					break;
				case 'soso':
					$('#cooperation-span').html('普通');
					break;
				case 'bad':
					$('#cooperation-span').html('不佳');
					break;
			}
			switch (data.result[0].marital) {
				case 'married':
				default:
					$('#marital-span').html('已婚');
					break;
				case 'single':
					$('#marital-span').html('未婚');
					break;
				case 'divorced':
					$('#marital-span').html('離異');
					break;
			}
			switch (data.result[0].workingtime) {
				case 'afternoon':
				default:
					$('#workingtime-span').html('午班');
					break;
				case 'night':
					$('#workingtime-span').html('晚班');
					break;
				case 'PT':
					$('#workingtime-span').html('PT');
					break;
			}
			$('#languages-span').html(data.result[0].languages);
			$('#pay-span').html(data.result[0].pay);
			$('#content-span').html(data.result[0].job_content.replace(/\n/g, "<br>"));
			$('#msg-seeker-btn').click(function(event) {
				// var to_id = $(this).jqmData('to-id');
				var msg_content = $('#msg_content').val();
				$.ajax({
					url: "http://52.69.53.255/KCCordova/api/send_message.php",
					dataType: "json",
					method: "POST",
					data: {
						self_id: parseInt(window.localStorage.getItem('user_id')),
						self_type: parseInt(window.localStorage.getItem('auth')),
						talk_id: parseInt(window.localStorage.getItem('get_seeker_id')),
						content: msg_content
					}
				}).done(function(data) {
					$('#msg_content').val('');
					$("#msg_to_jobseeker").popup("close");

				}).fail(function() {
					alert('請確認您的網路連線狀態！');
				});
			});
			$('#add-fav-btn').click(function(event) {
				$.ajax({
					url: 'http://52.69.53.255/KCCordova/api/add_fav.php?user_id=' + window.localStorage.getItem('user_id') + '&type=3&item_id=' + get_seeker_id,
					dataType: 'json',
					success: function(result) {
						alert(result.message);
					}
				});
			});
		}
	});
});

$(document).on('pagebeforeshow', '#jobseeker-search', function() {
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_form_content.php?action=get_category&type=job',
		dataType: 'json'
	}).done(function(data) {
		console.log(data);
		var classificationList = '';
		$.each(data, function(idx, obj) {
			classificationList += '<option value="' + obj.id + '">' + obj.title + '</option>';
		});
		$('#jobseeker_type').html(classificationList);
		$('#jobseeker_type').selectmenu('refresh');

		$('#jobseeker-search-btn').on('click', function() {
			var area = $('#county').val();
			var type = $('#jobseeker_type').val();
			console.log('jobseeker_type changed');

			$.ajax({
				url: 'http://52.69.53.255/KCCordova/api/search_lifeservice.php?area_id=' + area + '&type=' + type,
				dataType: 'json'
			}).done(function(data) {
				if (data.status) {
					searchJson = data.result;
					searchState = true;
					$.mobile.changePage($('#lifeservice-list'), {
						reloadPage: true,
						changeHash: true
					});
				} else {
					alert(data.message);
				}
			});
		});
	});
});
