$(document).on('pagebeforecreate', function() {
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_user_info.php?user_id=' + window.localStorage.getItem('user_id'),
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			$('.name_div').html(data.result.name);
			$('.gender-input').val(data.result.gender);
			$('.birth-input').val(data.result.birth);
			$('.tel-input').val(data.result.tel);
			$('.mobile-input').val(data.result.mobile);
		}
	});
});
$(document).on('pagebeforecreate', '#member-profile, #club-profile, #jobseeker-profile', function() {});

if (window.localStorage.getItem('auth') == '3') {
	$(document).on('pagebeforecreate', '#jobseeker-resume, #jobseeker-resume-modify', function() {
		$.ajax({
			url: 'http://52.69.53.255/KCCordova/api/get_seeker_info.php?user_id=' + window.localStorage.getItem('user_id'),
			dataType: 'json'
		}).success(function(data) {
			if (data.status) {
				$('#nickname-span').html(data.result.nickname);
				$('#country-span').html(data.result.country + ' ' + data.result.area);
				$('#birth-span').html(data.result.birth);
				$('#mobile-span').html(data.result.mobile);
				$('#height-span').html(data.result.height);
				$('#weight-span').html(data.result.weight);
				$('#measurements-span').html(data.result.measurements);
				switch (data.result.singing) {
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
				switch (data.result.dancing) {
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
				switch (data.result.drinking) {
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
				switch (data.result.cooperation) {
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
				switch (data.result.marital) {
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
				switch (data.result.workingtime) {
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
				$('#languages-span').html(data.result.languages);
				$('#pay-span').html(data.result.pay);
				$('#content-span').html(data.result.job_content);
				// modify
				$('.nickname-input').val(data.result.nickname);
				$('#seeker_country').val(data.result.country_id).selectmenu('refresh');
				$('#seeker_area').val(data.result.area_id).selectmenu('refresh');
				$('#mobile-input').val(data.result.mobile);
				$('#height-input').val(data.result.height);
				$('#weight-input').val(data.result.weight);
				$('#measurements-input').val(data.result.measurements);
				$('#pay-input').val(data.result.pay);
				$("[name='singing'][value='" + data.result.singing + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='dancing'][value='" + data.result.dancing + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='drinking'][value='" + data.result.drinking + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='cooperation'][value='" + data.result.cooperation + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='marital'][value='" + data.result.marital + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='worktime'][value='" + data.result.workingtime + "']").prop("checked", true).checkboxradio("refresh");
				$('#job_content').val(data.result.job_content);
			}
		});
	});
}
