$(document).one("pagebeforeshow", "[data-role='page']", function() {
	if (window.localStorage.getItem('auth') == null || window.localStorage.getItem('user_id') == null) {
		alert('您尚未登入！');
		$.mobile.changePage('./index.html', {
			reloadPage: true,
			changeHash: true
		});
	}
});

$(document).on('pagebeforeshow', '#member-profile, #club-profile, #jobseeker-profile ,#member-modify, #club-profile-modify, #jobseeker-profile-modify', function() {
	var page_id = '#' + $.mobile.activePage.attr('id');
	$.ajax({
		url: api_base + 'get_user_info.php?user_id=' + window.localStorage.getItem('user_id'),
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			$(page_id + ' .upper_block > img, .upper_block >  input[type="image"]').attr('src', img_base + data.result.avatar);
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
			success: function(data) {
				if (data.status) {
					alert(data.message);
					$.mobile.changePage($(page_id), {
						reloadPage: true,
						changeHash: true
					});
				} else {
					alert(data.message);
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
			url: 'http://52.69.53.255/KCCordova/api/get_form_content.php?action=get_category&type=job',
			dataType: 'json'
		}).done(function(data) {
			console.log(data);
			var classificationList = '';
			$.each(data, function(idx, obj) {
				classificationList += '<option value="' + obj.id + '">' + obj.title + '</option>';
			});
			$('#seeker_category').html(classificationList);
			$('#seeker_category').selectmenu('refresh');
		});

		$.ajax({
			url: api_base + 'get_seeker_info.php?user_id=' + window.localStorage.getItem('user_id'),
			dataType: 'json'
		}).success(function(data) {
			if (data.status) {
				var seeker = data.result[0];
				if (seeker.active == 1) {
					$('#open-resume').prop('checked', 'checked').flipswitch("refresh");
				} else {
					$('#open-resume').removeProp('checked').flipswitch("refresh");
				}
				$('#nickname-span').html(seeker.nickname);
				$('#caregory-span').html(seeker.job_title);
				$('#country-span').html(seeker.country + ' ' + seeker.area);
				$('#birth-span').html(seeker.birth);
				$('#mobile-span').html(seeker.mobile);
				$('#height-span').html(seeker.height);
				$('#weight-span').html(seeker.weight);
				$('#measurements-span').html(seeker.measurements);
				$('#education-span').html(seeker.education);
				switch (seeker.singing) {
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
				switch (seeker.dancing) {
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
				switch (seeker.drinking) {
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
				switch (seeker.cooperation) {
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
				switch (seeker.marital) {
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
				switch (seeker.workingtime) {
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
				$('#pic_div').empty();
				$.each(seeker.pic, function(idx, obj) {
					$('#pic_div').append('<div>' + obj + '</div>')
				});
				$('#languages-span').html(seeker.languages);
				$('#pay-span').html(seeker.pay);
				$('#content-span').html(seeker.job_content.replace(/\n/g, "<br>"));
				// modify
				$('.nickname-input').val(seeker.nickname);
				$('#seeker_category').val(seeker.category);
				// $('select#seeker_country').val(seeker.country_id).selectmenu('refresh');
				// $('select#seeker_area').val(seeker.area_id).selectmenu('refresh');
				$('.mobile-input').val(seeker.mobile);
				$('#height-input').val(seeker.height);
				$('#weight-input').val(seeker.weight);
				$('#education-input').val(seeker.education);
				$('#lang-input').val(seeker.languages);
				$('#measurements-input').val(seeker.measurements);
				$('#pay-input').val(seeker.pay);
				$("[name='singing'][value='" + seeker.singing + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='dancing'][value='" + seeker.dancing + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='drinking'][value='" + seeker.drinking + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='cooperation'][value='" + seeker.cooperation + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='marital'][value='" + seeker.marital + "']").prop("checked", true).checkboxradio("refresh");
				$("[name='worktime'][value='" + seeker.workingtime + "']").prop("checked", true).checkboxradio("refresh");
				$('#job_content').val(seeker.job_content);
				$.ajax({
					url: 'http://52.69.53.255/KCCordova/api/get_country_menu.php',
					dataType: 'json'
				}).done(function(data) {
					if (data.status) {
						var c_list = '';
						$.each(data.result, function(idx, obj) {
							c_list += '<option value="' + obj.id + '">' + obj.country + '</option>';
						});
						var page_id = $.mobile.activePage.attr('id');
						$('#' + page_id + ' select.country-select').html(c_list);
						$('#' + page_id + ' select.country-select').val(seeker.country_id).selectmenu('refresh');

						var a_list = '';
						$.each(data.result, function(idx, obj) {
							if (obj.id == seeker.country_id) {
								$.each(obj.area, function(idx, area) {
									a_list += '<option value="' + area.a_id + '">' + area.name + '</option>';
								});
							}
						});
						$('#' + page_id + ' select.area-select').html(a_list);
						$('#' + page_id + ' select.area-select').val(seeker.area_id).selectmenu('refresh');

						$('#' + page_id + ' select.country-select').change(function(event) {
							a_list = '';
							var c_id = $(this).val();
							console.log(c_id);
							$.each(data.result, function(idx, obj) {
								// console.log(obj.id);
								if (obj.id == c_id) {
									// console.log(obj.id);
									$.each(obj.area, function(idx, area) {
										// console.log(obj.id);
										a_list += '<option value="' + area.a_id + '">' + area.name + '</option>';
										$('#' + page_id + ' select.area-select').html(a_list);
										$('#' + page_id + ' select.area-select').selectmenu('refresh');
									});
								}
							});
						});
					}
				});
				$.ajax({
					url: api_base + 'get_form_content.php?action=get_category&type=job',
					dataType: 'json'
				}).done(function(data) {
					console.log(data);
					var classificationList = '';
					$.each(data, function(idx, obj) {
						classificationList += '<option value="' + obj.id + '">' + obj.title + '</option>';
					});
					$('#seeker_category').html(classificationList);
					$('#seeker_category').val(seeker.seek_category).selectmenu('refresh');
				});
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
				success: function(data) {
					if (data.status) {
						alert(data.message);
						$.mobile.changePage($("#jobseeker-resume"), {
							reloadPage: true,
							changeHash: true
						});
					} else {
						alert(data.message);
					}
				},
				error: function(request, error) {
					alert('請確認您的網路連線狀態！');
				}
			});
		});
	});
	$(document).on('pagecreate', "#jobseeker-resume", function() {
		$('#open-resume').change(function() {
			var state = (($('#open-resume').prop('checked')) ? 1 : 0);
			$.ajax({
				url: api_base + 'update_seeker_state.php',
				type: 'POST',
				dataType: 'json',
				data: {
					u_id: window.localStorage.getItem('user_id'),
					state: state
				}
			}).done(function(data) {
				if (data.status) {
					if (data.result == 1) {
						alert('已公開您的求職資料');
					} else if (data.result == 0) {
						alert('已關閉您的求職資料');
					} else {
						alert('請重新操作！');
					}
				} else {
					alert('請重新操作！');
				}
			}).fail(function() {
				alert('請確認您的網路連線狀態！');
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
	$(page_id + " input[type='image']").click(function(e) {
		e.preventDefault();
		console.log(page_id);
		$(this).next('.ui-input-text').find("input[type='file']").click();
	});
});

$(document).on('pagecreate', "#jobseeker-resume-pic", function() {
	// $('#jobseeker-resume-pic-form').off();
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
				$.mobile.loading('hide');
			},
			success: function(result) {
				var has_error = false;
				$.each(result, function(idx, obj) {
					if (!obj.pic) {
						has_error = true;
						return false;
					}
				});
				if (has_error) {
					alert('圖片上傳有誤，請重新操作！');
				} else {
					alert('上傳成功！');
				}
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		})
	});
});

$(document).on('pagecreate', "#club-pic", function() {
	// $('#club-pic-form').off();
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
				var has_error = false;
				$.each(result, function(idx, obj) {
					if (!obj.pic) {
						has_error = true;
						return false;
					}
				});
				if (has_error) {
					alert('圖片上傳有誤，請重新操作！');
				} else {
					alert('上傳成功！');
				}
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		})
	});
});

if (window.localStorage.getItem('auth') == '2') {
	$(document).on('pagebeforeshow', '#club-info, #club-info-modify', function() {
		var page_id = '#' + $(this).attr('id');
		console.log(page_id);
		$.ajax({
			url: api_base + 'get_club_info.php?club_id=' + window.localStorage.getItem('user_id'),
			dataType: 'json'
		}).success(function(data) {
			if (data.status) {
				var club = data.result[0];
				$('.name-input').val(club.name);
				$('.category-input').val(club.cat_title);
				// $('.category-id-input').val(club.category);
				$('.tel-input').val(club.club_tel);
				$('.address-input').val(club.address);
				$('.opentime1').val(club.opentime1);
				$('.opentime2').val(club.opentime2);
				$('.opentime3').val(club.opentime3);
				$('.opentime4').val(club.opentime4);
				$('.opentime5').val(club.opentime5);
				$('.website-input').val(club.website);
				$('.slogan-input').val(club.slogan);
				$.ajax({
					url: 'http://52.69.53.255/KCCordova/api/get_country_menu.php',
					dataType: 'json'
				}).done(function(data) {
					if (data.status) {
						var c_list = '';
						$.each(data.result, function(idx, obj) {
							c_list += '<option value="' + obj.id + '">' + obj.country + '</option>';
						});
						var page_id = $.mobile.activePage.attr('id');
						$('#' + page_id + ' select.country-select').html(c_list);
						$('#' + page_id + ' select.country-select').val(club.country_id).selectmenu('refresh');

						var a_list = '';
						$.each(data.result, function(idx, obj) {
							if (obj.id == club.country_id) {
								$.each(obj.area, function(idx, area) {
									a_list += '<option value="' + area.a_id + '">' + area.name + '</option>';
								});
							}
						});
						$('#' + page_id + ' select.area-select').html(a_list);
						$('#' + page_id + ' select.area-select').val(club.area_id).selectmenu('refresh');

						$('#' + page_id + ' select.country-select').change(function(event) {
							a_list = '';
							var c_id = $(this).val();
							console.log(c_id);
							$.each(data.result, function(idx, obj) {
								// console.log(obj.id);
								if (obj.id == c_id) {
									// console.log(obj.id);
									$.each(obj.area, function(idx, area) {
										// console.log(obj.id);
										a_list += '<option value="' + area.a_id + '">' + area.name + '</option>';
										$('#' + page_id + ' select.area-select').html(a_list);
										$('#' + page_id + ' select.area-select').selectmenu('refresh');
									});
								}
							});
						});
					}
				});
				$('#pic_block').empty();
				$.each(club.pic, function(idx, obj) {
					if (obj != null && obj != '') {
						$('#pic_block').append('<div>' + obj + '</div>');
					}
				});
				$('.video-input').val(club.video_url);
				if (page_id == '#club-info') {
					club.description = club.description.replace(/\n/g, "<br>");
				}
				$('.description').html(club.description);

				$.ajax({
					url: api_base + 'get_form_content.php?action=get_category&type=club',
					dataType: 'json'
				}).done(function(data) {
					console.log(data);
					var classificationList = '';
					$.each(data, function(idx, obj) {
						classificationList += '<option value="' + obj.id + '">' + obj.title + '</option>';
					});
					$('#club_type').html(classificationList);
					$('#club_type').val(club.category).selectmenu('refresh');
				});
			}
		});
	});
	$(document).on('pagebeforeshow', '#club-info-modify', function() {
		$('#club-info-form').on('submit', function(e) {
			e.preventDefault(); // prevent native submit
			$(this).ajaxSubmit({
				url: api_base + 'club_info_modify.php',
				data: {
					admin_id: window.localStorage.getItem('user_id'),
				},
				type: 'POST',
				dataType: 'json',
				beforeSend: function() {
					$.mobile.loading('show');
				},
				complete: function() {
					$.mobile.loading('hide');
				},
				success: function(data) {
					if (data.status) {
						$.mobile.changePage($("#club-info"), {
							reloadPage: true,
							changeHash: true
						});
					} else {
						alert(data.message);
					}
				},
				error: function(request, error) {
					alert('請確認您的網路連線狀態！');
				}
			})
		});
	});

	$(document).on('pagebeforeshow', '#club-hire, #club-hire-modify', function() {
		var page_id = '#' + $(this).attr('id');
		console.log(page_id);
		$.ajax({
			url: api_base + 'get_club_offer.php?admin_id=' + window.localStorage.getItem('user_id'),
			dataType: 'json'
		}).success(function(data) {
			if (data.status) {
				var offer = data.result[0];
				$('.interviewer-input').val(offer.interviewer);
				$('.interviewer-pic-input').val(offer.interviewer_pic);
				$('.interview-tel-input').val(offer.tel);
				$('.interview-line-input').val(offer.line);
				if (page_id == '#club-hire') {
					offer.offer_content = offer.offer_content.replace(/\n/g, "<br>");
					offer.welfare = offer.welfare.replace(/\n/g, "<br>")
				}
				$('.offer_content').html(offer.offer_content);
				$('.welfare').html(offer.welfare);
			}
		});
	});
	$(document).on('pagebeforeshow', '#club-hire-modify', function() {
		$('#club-hire-form').on('submit', function(e) {
			e.preventDefault(); // prevent native submit
			$(this).ajaxSubmit({
				url: api_base + 'club_offer_modify.php',
				data: {
					admin_id: window.localStorage.getItem('user_id'),
				},
				type: 'POST',
				dataType: 'json',
				beforeSend: function() {
					$.mobile.loading('show');
				},
				complete: function() {
					$.mobile.loading('hide');
				},
				success: function(data) {
					if (data.status) {
						$.mobile.changePage($("#club-hire"), {
							reloadPage: true,
							changeHash: true
						});
					} else {
						alert(data.message);
					}
				},
				error: function(request, error) {
					alert('請確認您的網路連線狀態！');
				}
			})
		});
	});

	$(document).on('pagebeforeshow', '#club-consume, #club-consume-modify', function() {
		var page_id = $(this).attr('id');
		console.log(page_id);
		$.ajax({
			url: api_base + 'get_club_consume.php?club_id=' + window.localStorage.getItem('user_id'),
			dataType: 'json'
		}).success(function(data) {
			if (data.status) {
				var consume = data.result[0];
				$('.contact-input').val(consume.contact_name);
				$('.contact-pic-input').val(consume.contact_pic);
				$('.contact-tel-input').val(consume.contact_tel);
				$('.contact-line-input').val(consume.contact_line);
				var week = [0, '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
				if (page_id == 'club-consume') {
					$('label.title1').text('1. ' + consume.title1);
					$('label.day11').text(week[consume.day11]);
					$('.content11').html(consume.content11);
					$('label.day12').text(week[consume.day12]);
					$('.content12').html(consume.content12);
					$('label.day13').text(week[consume.day13]);
					$('.content13').html(consume.content13);
					$('label.day14').text(week[consume.day14]);
					$('.content14').html(consume.content14);
					$('label.day15').text(week[consume.day15]);
					$('.content15').html(consume.content15);

					$('label.title2').text('2. ' + consume.title2);
					$('label.day21').text(week[consume.day21]);
					$('.content21').html(consume.content21);
					$('label.day22').text(week[consume.day22]);
					$('.content22').html(consume.content22);
					$('label.day23').text(week[consume.day23]);
					$('.content23').html(consume.content23);
					$('label.day24').text(week[consume.day24]);
					$('.content24').html(consume.content24);
					$('label.day25').text(week[consume.day25]);
					$('.content25').html(consume.content25);
					$('.promo_content').html(consume.promo_content);
					consume.promo_content = consume.promo_content.replace(/\n/g, "<br>");
				} else if (page_id == 'club-consume-modify') {
					$('#title1').val(consume.title1);
					$('#select11').val(consume.day11).selectmenu('refresh');
					$('#content11').text(consume.content11);
					$('#select12').val(consume.day12).selectmenu('refresh');
					$('#content12').text(consume.content12);
					$('#select13').val(consume.day13).selectmenu('refresh');
					$('#content13').text(consume.content13);
					$('#select14').val(consume.day14).selectmenu('refresh');
					$('#content14').text(consume.content14);
					$('#select15').val(consume.day15).selectmenu('refresh');
					$('#content15').text(consume.content15);

					$('#title2').val(consume.title2);
					$('#select21').val(consume.day21).selectmenu('refresh');
					$('#content21').text(consume.content21);
					$('#select22').val(consume.day22).selectmenu('refresh');
					$('#content22').text(consume.content22);
					$('#select23').val(consume.day23).selectmenu('refresh');
					$('#content23').text(consume.content23);
					$('#select24').val(consume.day24).selectmenu('refresh');
					$('#content24').text(consume.content24);
					$('#select25').val(consume.day25).selectmenu('refresh');
					$('#content25').text(consume.content25);
					$('.promo_content').html(consume.promo_content);
				}
			}
		});
	});
	$(document).on('pagebeforeshow', '#club-consume-modify', function() {
		$('#club-consume-form').on('submit', function(e) {
			e.preventDefault(); // prevent native submit
			$(this).ajaxSubmit({
				url: api_base + 'club_consume_modify.php',
				data: {
					admin_id: window.localStorage.getItem('user_id'),
				},
				type: 'POST',
				dataType: 'json',
				beforeSend: function() {
					$.mobile.loading('show');
				},
				complete: function() {
					$.mobile.loading('hide');
				},
				success: function(data) {
					if (data.status) {
						$.mobile.changePage($("#club-consume"), {
							reloadPage: true,
							changeHash: true
						});
					} else {
						alert(data.message);
					}
				},
				error: function(request, error) {
					alert('請確認您的網路連線狀態！');
				}
			})
		});
	});
}
