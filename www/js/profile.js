$(document).on('pagebeforeshow', '#member-profile, #club-profile, #jobseeker-profile ,#member-modify, #club-profile-modify, #jobseeker-profile-modify', function() {
	var page_id = '#' + $.mobile.activePage.attr('id');
	$.ajax({
		url: api_base + 'get_user_info.php?user_id=' + window.localStorage.getItem('user_id'),
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			$(page_id + ' .upper_block > img, .upper_block >  input[type="image"]').attr('src', img_base + data.result.pic);
			$(page_id + ' .name_div').html(data.result.name);
			$(page_id + ' .member-id-input').val(data.result.member_id);
			$(page_id + ' .gender-input').val(data.result.gender);
			$(page_id + ' .birth-input').val(data.result.birth);
			$(page_id + ' .tel-input').val(data.result.tel);
			$(page_id + ' .mobile-input').val(data.result.mobile);
			if (data.result.type == 2) {
				if (data.result.plan_title != null) {
					$(page_id + ' .plan-input').val(data.result.plan_title);
					$(page_id + ' .plan-during-input').val(data.result.publish_start + '-' + data.result.publish_due);
					$(page_id + ' .plan-during-input').parent().parent().show();
				} else {
					$(page_id + ' .plan-during-input').parent().parent().hide();
				}
			}
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});

$(document).on('pagebeforeshow', '#member-modify, #club-profile-modify, #jobseeker-profile-modify', function() {
	$('.profile-submit-btn').off();
	var page_id = '#' + $.mobile.activePage.attr('id');
	$(page_id + ' .profile-submit-btn').click(function(event) {
		console.log(page_id);
		var backpage = $(this).jqmData("backpage");
		$(this).parents('form').ajaxSubmit({
			url: api_base + 'profile_modify.php',
			data: {
				u_id: window.localStorage.getItem('user_id'),
			},
			type: 'POST',
			dataType: 'json',
			beforeSend: function() {
				$.mobile.loading('show');
			},
			complete: function() {
				$.mobile.loading('hide');
			},
			success: function(result) {
				if (result.status) {
					alert(result.message);
					$.mobile.changePage($(page_id), {
						reloadPage: true,
						changeHash: true
					});
				} else {
					alert(result.message);
				}
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		});
	});
});

if (window.localStorage.getItem('auth') == '3') {
	$(document).on('pagebeforeshow', '#jobseeker-resume, #jobseeker-resume-modify', function() {
		$.ajax({
			url: api_base + 'get_seeker_info.php?user_id=' + window.localStorage.getItem('user_id'),
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
				// modify
				$('.nickname-input').val(data.result[0].nickname);
				$('select#seeker_country').val(data.result[0].country_id).selectmenu('refresh');
				$('select#seeker_area').val(data.result[0].area_id).selectmenu('refresh');
				$('.mobile-input').val(data.result[0].mobile);
				$('#height-input').val(data.result[0].height);
				$('#weight-input').val(data.result[0].weight);
				$('#education-input').val(data.result[0].education);
				$('#lang-input').val(data.result[0].languages);
				$('#measurements-input').val(data.result[0].measurements);
				$('#pay-input').val(data.result[0].pay);
				$("[name='singing'][value='" + data.result[0].singing + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='dancing'][value='" + data.result[0].dancing + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='drinking'][value='" + data.result[0].drinking + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='cooperation'][value='" + data.result[0].cooperation + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='marital'][value='" + data.result[0].marital + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='worktime'][value='" + data.result[0].workingtime + "']").prop("checked", true).checkboxradio("refresh");
				$('#job_content').val(data.result[0].job_content);
			}
		}).fail(function() {
			alert('請確認您的網路連線狀態！');
		});
		$('#seeker-resume-send-btn').off();
		$('#seeker-resume-send-btn').click(function(event) {
			$('#jobseeker-resume-modify-form').ajaxSubmit({
				url: api_base + 'seeker_modify.php',
				data: {
					u_id: window.localStorage.getItem('user_id'),
					type: 'resume'
				},
				type: 'POST',
				dataType: 'json',
				beforeSend: function() {
					$.mobile.loading('show');
				},
				complete: function() {
					// This callback function will trigger on data sent/received complete
					$.mobile.loading('hide');
				},
				success: function(result) {
					if (result.status) {
						alert(result.message);
						$.mobile.changePage($("#jobseeker-resume"), {
							reloadPage: true,
							changeHash: true
						});
					} else {
						alert(result.message);
					}
				},
				error: function(request, error) {
					alert('請確認您的網路連線狀態！');
				}
			});
		});
	});
}

$(document).on('pagebeforeshow', ".profile-pic-page", function() {
	$('.profile-pic-input').off();
	var page_id = '#' + $.mobile.activePage.attr('id');
	$(page_id + ' .profile-pic-input').change(function(event) {
		if (this.files && this.files[0]) {
			var input = this;
			var reader = new FileReader();
			reader.onload = function(e) {
				$(input).parent().prev("input[type='image']").attr('src', e.target.result);
			};
			reader.readAsDataURL(this.files[0]);
		}
	});
	$("input[type='image']").off();
	$(page_id + " input[type='image']").click(function() {
		console.log(page_id);
		$(this).next('.ui-input-text').find("input[type='file']").click();
	});
});

$(document).on('pagebeforeshow', "#jobseeker-resume-pic", function() {
	$('#jobseeker-resume-pic-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + '/upload_pic.php',
			data: {
				user_id: window.localStorage.getItem('user_id'),
				type: 'seeker'
			},
			type: 'POST',
			dataType: 'json',
			beforeSend: function() {
				$.mobile.loading('show');
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
				$.mobile.loading('hide');
			},
			success: function(result) {
				if (result.status) {
					alert(result.message);
				} else {
					alert(result.message);
				}
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		})
	});
});

$(document).on('pagebeforeshow', "#club-pic", function() {
	$('#club-pic-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + '/upload_pic.php',
			data: {
				user_id: window.localStorage.getItem('user_id'),
				type: 'club'
			},
			type: 'POST',
			dataType: 'json',
			beforeSend: function() {
				$.mobile.loading('show');
			},
			complete: function() {
				// This callback function will trigger on data sent/received complete
				$.mobile.loading('hide');
			},
			success: function(result) {
				if (result.status) {
					alert(result.message);
				} else {
					alert(result.message);
				}
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		})
	});
});
