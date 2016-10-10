var seekerSearchJson = '';
var seekerSearchState = false;

// $(document).one("pagebeforeshow", "[data-role='page']", function() {
// 	if (window.localStorage.getItem('auth') == null || window.localStorage.getItem('user_id') == null) {
// 		alert('您尚未登入！');
// 		document.location.href = './index.html';
// 	}
// });

$(document).on('pagebeforecreate', '#jobseeker', function() {
	$.ajax({
		url: api_base + 'get_seeker_info.php',
		dataType: 'json',
		data: {
			only_active: true,
			only_approved: true
		}
	}).success(function(data) {
		if (data.status) {
			$('#seeker-grid').empty();
			$.each(data.result, function(idx, obj) {
				var block_class, img;
				if ((idx % 3) == 0) {
					block_class = 'ui-block-a';
				} else if ((idx % 3) == 1) {
					block_class = 'ui-block-b';
				} else if ((idx % 3) == 2) {
					block_class = 'ui-block-c';
				}
				var seeker_div = $('<div></div>').attr('data-seeker-id', obj.u_id).addClass(block_class + ' seeker_div').append('<div class="seeker_list_item"><a data-ajax="false"><div style="background-image:url(\'' + img_base + obj.avatar + '\');"></div></a></div>');

				// var seeker_div = $('<div></div>').attr('data-seeker-id', obj.u_id).addClass(block_class + ' seeker_div').append('<div class="seeker_list_item"><a data-ajax="false"><img src="' + img_base + obj.avatar + '" alt="" /></a></div>');

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
		url: api_base + 'get_seeker_info.php?user_id=' + get_seeker_id,
		dataType: 'json',
		data: {
			only_active: true,
			only_approved: true
		}
	}).success(function(data) {
		if (data.status) {
			var seeker = data.result[0];
			$('#club_title').html(seeker.name);
			$('#nickname-span').html(seeker.nickname);
			$('#country-span').html(seeker.country + ' ' + seeker.area);
			$('#birth-span').html(seeker.birth);
			$('#mobile-span').html(seeker.mobile);
			$('#height-span').html(seeker.height);
			$('#weight-span').html(seeker.weight);
			$('#measurements-span').html(seeker.measurements);
			$('#education-span').html(seeker.education);

			var slideContainer = '<ul class="slides">';
			$.each(seeker.pic, function(idx, pic) {
				if (pic != null && pic != '') {
					slideContainer += '<li><img src="' + img_base + pic + '"></li>'
				}
			});
			slideContainer += '</ul>';
			$('.flexslider').html(slideContainer);

			switch (seeker.singing) {
				case 'great':
					$('#singing-span').html('很好');
					break;
				case 'soso':
					$('#singing-span').html('普通');
					break;
				case 'bad':
					$('#singing-span').html('不佳');
					break;
				default:
					$('#singing-span').html('（未填）');
					break;
			}
			switch (seeker.dancing) {
				case 'great':
					$('#dancing-span').html('很好');
					break;
				case 'soso':
					$('#dancing-span').html('普通');
					break;
				case 'bad':
					$('#dancing-span').html('不佳');
					break;
				default:
					$('#dancing-span').html('（未填）');
					break;
			}
			switch (seeker.drinking) {
				case 'great':
					$('#drinking-span').html('很好');
					break;
				case 'soso':
					$('#drinking-span').html('普通');
					break;
				case 'bad':
					$('#drinking-span').html('不佳');
					break;
				default:
					$('#drinking-span').html('（未填）');
					break;
			}
			switch (seeker.cooperation) {
				case 'great':
					$('#cooperation-span').html('很好');
					break;
				case 'soso':
					$('#cooperation-span').html('普通');
					break;
				case 'bad':
					$('#cooperation-span').html('不佳');
					break;
				default:
					$('#cooperation-span').html('（未填）');
					break;
			}
			switch (seeker.marital) {
				case 'married':
					$('#marital-span').html('已婚');
					break;
				case 'single':
					$('#marital-span').html('未婚');
					break;
				case 'divorced':
					$('#marital-span').html('離異');
					break;
				default:
					$('#marital-span').html('（未填）');
					break;
			}
			switch (seeker.workingtime) {
				case 'afternoon':
					$('#workingtime-span').html('午班');
					break;
				case 'night':
					$('#workingtime-span').html('晚班');
					break;
				case 'PT':
					$('#workingtime-span').html('PT');
					break;
				default:
					$('#workingtime-span').html('（未填）');
					break;
			}
			$('#languages-span').html(seeker.languages);
			$('#pay-span').html(seeker.pay);
			$('#content-span').html(seeker.job_content.replace(/\n/g, "<br>"));
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
					url: api_base + 'add_fav.php?user_id=' + window.localStorage.getItem('user_id') + '&type=3&item_id=' + get_seeker_id,
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
		url: api_base + 'get_form_content.php?action=get_category&type=job',
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
			var area = $('#area-select').val();
			var gender = $('[name="gender"]:checked').val();
			var type = $('#jobseeker_type').val();
			console.log('jobseeker_type changed');
			$.ajax({
				url: api_base + 'search_seeker.php',
				dataType: 'json',
				data: {
					area: area,
					gender: gender,
					type: type
				}
			}).done(function(data) {
				if (data.status) {
					seekerSearchJson = data;
					seekerSearchState = true;
					console.log('get result', seekerSearchJson);
					$.mobile.changePage($('#jobseeker-result'), {
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

$(document).on('pagebeforeshow', '#jobseeker-result', function() {
	console.log(seekerSearchState, seekerSearchJson);
	if (seekerSearchState && seekerSearchJson != '') {
		console.log(seekerSearchState, seekerSearchJson);
		$('#seeker-result-grid').empty();
		$.each(seekerSearchJson.result, function(idx, obj) {
			var block_class, img;
			if ((idx % 3) == 0) {
				block_class = 'ui-block-a';
			} else if ((idx % 3) == 1) {
				block_class = 'ui-block-b';
			} else if ((idx % 3) == 2) {
				block_class = 'ui-block-c';
			}
			var seeker_div = $('<div></div>').attr('data-seeker-id', obj.u_id).addClass(block_class + ' seeker_div')
				.append('<div class="seeker_list_item"><a data-ajax="false"><img src="' + img_base + obj.pic1 + '" alt="" /></a></div>');
			$(seeker_div).appendTo($('#seeker-result-grid'));
		});
		$('#seeker-result-grid .seeker_div').click(function(event) {
			var seeker_id = $(this).jqmData("seeker-id");
			window.localStorage.setItem('get_seeker_id', seeker_id);
			$.mobile.changePage($('#jobseeker-resume'), {
				reloadPage: true,
				changeHash: true
			});
		});
	} else {
		$.mobile.changePage($('#jobseeker'), {
			reloadPage: true,
			changeHash: true
		});
	}
});
