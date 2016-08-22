$(document).on('pagebeforecreate', '#jobseeker', function() {
	$.ajax({
		url: 'http://52.69.53.255/KellyClub/api/get_seeker_info.php',
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			$.each(data.result, function(idx, obj) {
				var block_class;
				if ((idx % 3) == 0)
					block_class = 'ui-block-a';
				else if ((idx % 3) == 1)
					block_class = 'ui-block-b';
				else if ((idx % 3) == 2)
					block_class = 'ui-block-c';
				var seeker_div = $('<div></div>').attr('data-seeker-id', obj.u_id).addClass(block_class + ' seeker_div')
					.append('<div class="seeker_list_item"><a data-ajax="false"><img src="./img/seeker-a.jpg" alt="" /></a></div>');
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
		url: 'http://52.69.53.255/KellyClub/api/get_seeker_info.php?user_id=' + get_seeker_id,
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
			$('#add-fav-btn').click(function(event) {
				$.ajax({
					url: 'http://52.69.53.255/KellyClub/api/add_fav.php?user_id=' + window.localStorage.getItem('user_id') + '&type=3&item_id=' + get_seeker_id,
					dataType: 'json',
					success: function(result) {
						alert(result.message);
					}
				});
			});
		}
	});
});
