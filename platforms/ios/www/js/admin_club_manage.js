$(document).one("pagebeforeshow", "[data-role='page']", function() {
	if (window.localStorage.getItem('auth') != '0' && window.localStorage.getItem('auth') != '100') {
		alert('您不是系統管理員！');
		document.location.href = './index.html';
	} else if (window.localStorage.getItem('auth') == null || window.localStorage.getItem('user_id') == null) {
		alert('您尚未登入！');
		document.location.href = './index.html';
	}
});

$(document).on("pagebeforeshow", function() {
	var page_id = $.mobile.activePage.attr('id');
	$('#' + page_id + ' select.lang_setting').val(window.localStorage.getItem('lang_id')).selectmenu('refresh');
	$('#' + page_id + ' select.lang_setting').off();
	$('#' + page_id + ' select.lang_setting').change(function(event) {
		window.localStorage.setItem('lang_id', $(this).val());
		$.mobile.changePage($.mobile.activePage, {
			allowSamePageTransition: true,
			reloadPage: true,
			changeHash: true,
			transition: "none"
		});
	});
});

$(document).on("pagebeforehide", function() {
	$('form').trigger('reset');
	$('textarea').text('');
	$('.reset_content').empty();
	$.mobile.activePage.find('select[id^="select"]').val('0').selectmenu('refresh');
});

$(document).on('pagebeforeshow', '#club-info, #club-info-modify', function() {
	var page_id = '#' + $(this).attr('id');
	$.ajax({
		url: api_base + 'get_club_info.php?club_id=' + window.localStorage.getItem('detail_user_id'),
		dataType: 'json',
		data: {
			lang: window.localStorage.getItem('lang_id')
		}
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
				url: api_base + 'get_country_menu.php',
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
						$.each(data.result, function(idx, obj) {
							if (obj.id == c_id) {
								$.each(obj.area, function(idx, area) {
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
				var classificationList = '';
				$.each(data, function(idx, obj) {
					classificationList += '<option value="' + obj.id + '">' + obj.title + '</option>';
				});
				$('#club_type').html(classificationList);
				$('#club_type').val(club.category).selectmenu('refresh');
			});
		} else {
			$.ajax({
				url: api_base + 'get_form_content.php?action=get_category&type=club',
				dataType: 'json'
			}).done(function(data) {
				var classificationList = '';
				$.each(data, function(idx, obj) {
					classificationList += '<option value="' + obj.id + '">' + obj.title + '</option>';
				});
				$('#club_type').html(classificationList);
				$('#club_type').selectmenu('refresh');
			});
		}
	});
});

$(document).on('pagebeforeshow', '#club-info-modify', function() {
	$('#club-info-form').off();
	$('#club-info-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + 'club_info_modify.php',
			data: {
				admin_id: window.localStorage.getItem('detail_user_id'),
				lang: window.localStorage.getItem('lang_id')
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
	$.ajax({
		url: api_base + 'get_club_offer.php?club_id=' + window.localStorage.getItem('detail_user_id'),
		dataType: 'json',
		data: {
			lang: window.localStorage.getItem('lang_id')
		}
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
	$('#club-hire-form').off();
	$('#club-hire-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + 'club_offer_modify.php',
			data: {
				admin_id: window.localStorage.getItem('detail_user_id'),
				lang: window.localStorage.getItem('lang_id')
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
	$.ajax({
		url: api_base + 'get_club_consume.php?club_id=' + window.localStorage.getItem('detail_user_id'),
		dataType: 'json',
		data: {
			lang: window.localStorage.getItem('lang_id')
		}
	}).success(function(data) {
		if (data.status) {
			var consume = data.result[0];
			$('.contact-input').val(consume.contact_name);
			$('.contact-pic-input').val(consume.contact_pic);
			$('.contact-tel-input').val(consume.contact_tel);
			$('.contact-line-input').val(consume.contact_line);
			var week = [0, '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
			if (page_id == 'club-consume') {
				if (consume.title1 != null && consume.title1 != '') {
					$('label.title1').text('1. ' + consume.title1);
					for (var no = 1; no < 6; no++) {
						var day = 'day1' + no;
						var content = 'content1' + no;
						if (consume[day] != null && consume[day] != 0) {
							$('label.' + day).text(week[consume[day]]);
							$('.' + content).html(consume[content]);
						}
					}
				}
				if (consume.title2 != null && consume.title2 != '') {
					$('label.title2').text('2. ' + consume.title2);
					for (var no = 1; no < 6; no++) {
						var day = 'day2' + no;
						var content = 'content2' + no;
						if (consume[day] != null && consume[day] != 0) {
							$('label.' + day).text(week[consume[day]]);
							$('.' + content).html(consume[content]);
						}
					}
				}
				consume.promo_content = consume.promo_content.replace(/\n/g, "<br>");
				$('.promo_content').html(consume.promo_content);
			} else if (page_id == 'club-consume-modify') {
				if (consume.title1 != null && consume.title1 != '') {
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
				}
				if (consume.title2 != null && consume.title2 != '') {
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
				}
				$('.promo_content').html(consume.promo_content);
			}
		}
	});
});

$(document).on('pagebeforeshow', '#club-consume-modify', function() {
	$('#club-consume-form').off();
	$('#club-consume-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + 'club_consume_modify.php',
			data: {
				admin_id: window.localStorage.getItem('detail_user_id'),
				lang: window.localStorage.getItem('lang_id')
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

$(document).on('pagecreate', "#club-pic", function() {
	$('#club-pic-form').off();
	$('#club-pic-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + '/upload_pic.php',
			data: {
				user_id: window.localStorage.getItem('detail_user_id'),
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
