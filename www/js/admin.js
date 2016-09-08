var adminLifeJson = '';
var currentCatId;
var currentStoreId;
var adminNewsJson = '';
var currentNewsId;

$(document).one("pagebeforeshow", "[data-role='page']", function() {
	if (window.localStorage.getItem('auth') == null || window.localStorage.getItem('user_id') == null) {
		alert('您尚未登入！');
		$.mobile.changePage('./index.html', {
			reloadPage: true,
			changeHash: true
		});
	}
});

$(document).on('pagebeforeshow', "[data-role='page'].admin-page", function() {
	var page_id = $.mobile.activePage.attr('id');
	var page_title = $.mobile.activePage.jqmData('title');

	$('#' + page_id + ' select.navigateToPage').val('./admin.html#' + page_title).selectmenu('refresh');

	// var index = $('#' + page_id + ' select.navigateToPage option[value$=' + page_title + ']').index();
	// $('#' + page_id + ' select.navigateToPage').prop('selectedIndex', index);
	// var title = $('#' + page_id + ' select.navigateToPage option[value$=' + page_title + ']').text();
	// $('#' + page_id + ' span.navigateToPage').text(title);
});

// $(".admin-page").ready(function() {
$(document).on('pagecreate', ".admin-page", function() {
	$(this).find('select.navigateToPage').change(function() {
		var page = $(this).val();
		$.mobile.changePage(page);
	});

	$('.home-pic-input, .redeem-pic-input, .life-pic-input, .store-pic-input').change(function(event) {
		if (this.files && this.files[0]) {
			var input = this;
			var reader = new FileReader();
			reader.onload = function(e) {
				$(input).parent().prev("input[type='image']").attr('src', e.target.result);
			};
			reader.readAsDataURL(this.files[0]);
		}
	});
	$(this).find("input[type='image']").click(function() {
		$(this).next('.ui-input-text').find("input[type='file']").click();
	});
});

$(document).on('pageshow', "#admin-member-detail", function() {
	$('#member_type').change(function(event) {
		if ($(this).val() == 'club') {
			$('#seeker_type_block').hide();
			$('#club_type_block').show();
		} else if ($(this).val() == 'seeker') {
			$('#club_type_block').hide();
			$('#seeker_type_block').show();

		} else if ($(this).val() == 'normal') {
			$('#club_type_block').hide();
			$('#seeker_type_block').hide();

		}
	});
});


$(document).on('pagebeforeshow', "#admin-home", function() {
	// console.log('test');
	var adminHomeStatus;
	$.ajax({
			url: api_base + 'get_home_setting.php',
			dataType: 'json'
		})
		.done(function(data) {
			var setting = data.result;
			if (data.status) {
				$('#home-upper-left-link').val(setting[0].link);
				$('#home-upper-left-link').prev().text(textSwitch(setting[0].link));

				$('#home-upper-right-link').val(setting[1].link);
				$('#home-upper-right-link').prev().text(textSwitch(setting[1].link));

				$('#home-middle-link').val(setting[2].link);
				$('#home-middle-link').prev().text(textSwitch(setting[2].link));


				$('#home-lower-left-link').val(setting[3].link);
				$('#home-lower-left-link').prev().text(textSwitch(setting[3].link));


				$('#home-lower-right-link').val(setting[4].link);
				$('#home-lower-right-link').prev().text(textSwitch(setting[4].link));
			}
			$('#pic1').attr('src', img_base + setting[0].pic);
			$('#pic2').attr('src', img_base + setting[1].pic);
			$('#pic3').attr('src', img_base + setting[2].pic);
			$('#pic4').attr('src', img_base + setting[3].pic);
			$('#pic5').attr('src', img_base + setting[4].pic);

			function textSwitch(text) {
				switch (text) {
					case 'club':
						return '酒店系統'
						break;
					case 'seeker':
						return "求職者";
						break;
					case 'life':
						return '生活服務'
						break;
					case 'news':
						return "最新消息";
						break;
					case 'homepages':
						return '連結官網'
						break;
					default:
						return "酒店系統";
						break;
				}
			}
		});


	$('#adminHomeForm').on('submit', (function(e) {
		e.preventDefault();
		var formData = new FormData(this);
		console.log(formData);

		$.ajax({
			type: 'POST',
			url: $(this).attr('action'),
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data) {
				console.log("success");
				console.log(data);
			},
			error: function(data) {
				console.log("error");
				console.log(data);
			}
		});
	}));

	// $('#image-home').on('click', function (e) {
	// 	e.preventDefault();
	// 	console.log('test2');
	// 	//check val
	// 	var uLeftL = $('#home-upper-left-link').val();
	// 	var uRightL = $('#home-upper-right-link').val();
	// 	var middleL = $('#home-middle-link').val();
	// 	var lLeftL = $('#home-lower-left-link').val();
	// 	var lRightL = $('#home-lower-right-link').val();
	//
	// 	var pic1 = document.querySelector('#pic1').files[0];
	// 	var pic2 = document.querySelector('#pic2').files[0];
	// 	var pic3 = document.querySelector('#pic3').files[0];
	// 	var pic4 = document.querySelector('#pic4').files[0];
	// 	var pic5 = document.querySelector('#pic5').files[0];
	//
	// 	var fileToCheck = [uLeftL, uRightL, middleL, lLeftL, lRightL, pic1, pic2, pic3, pic4, pic5];
	//
	// 	for (var i = 0; i < fileToCheck.length; i++) {
	// 		if (fileToCheck[i] === null || typeof fileToCheck[i] === 'undefined') {
	// 			alert('check required value');
	// 			return false;
	// 		}
	// 	}
	//
	// 	var dataObj = {
	// 		picture1: {
	// 			file: pic1,
	// 			filename: pic1.name,
	// 			link: uLeftL,
	// 		},
	// 		picture2: {
	// 			file: pic2,
	// 			filename: pic2.name,
	// 			link: uRightL,
	// 		},
	// 		picture3: {
	// 			file: pic3,
	// 			filename: pic3.name,
	// 			link: middleL,
	// 		},
	// 		picture4: {
	// 			file: pic4,
	// 			filename: pic4.name,
	// 			link: lLeftL,
	// 		},
	// 		picture5: {
	// 			file: pic5,
	// 			filename: pic5.name,
	// 			link: lRightL,
	// 		}
	// 	};
	//
	//
	// 	console.log(dataObj);
	//
	// 	$.ajax({
	// 		url: 'request.php',
	// 		type: 'POST',
	// 		dataType: 'json',
	// 		data: dataObj,
	// 		error : function (){ document.title='error'; },
	// 		success: function (data) {
	// 			alert(data);
	// 		}
	// 	});
	//
	//
	// });

});

$(document).on('pagebeforeshow', "#admin-lifeservice", function() {
	$.ajax({
		url: api_base + 'get_lifeservice.php',
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			adminLifeJson = data;
			// console.log(dataJson);
			$.each(data.result, function(idx, obj) {
				var life_category_block = $('<div class="life_category_block"></div>').append('<div> <strong class="item_title">分類名稱：</strong><span class="cat_title">' + obj.title + '</span></div>');
				var life_pic_block = $('<div class="life-pic-block"></div>').append('<div class="left-block text-center"> <a href="#edit_life_category" class="ui-btn ui-btn-inline ui-corner-all green-btn" data-rel="popup" data-life-cat="' + obj.id + '"> 編輯分類 </a> <br> <a class="ui-btn ui-btn-inline ui-corner-all green-btn store-btn" data-life-cat="' + obj.id + '"> 分類店家清單 </a> </div> <div class="img-block"> <input type="image" class="life-pic" src="' +
					img_base + obj.pic + '" /> <input type="file" class="life-pic-input" /> </div> <div class="clearfix"></div>');
				$(life_category_block).append(life_pic_block);
				$(life_category_block).append('<button id="life-cate-del-btn" class="ui-btn ui-corner-all ui-btn-inline orange-btn float-right" type="button" data-life-cat="' + obj.id + '">刪除</button><div class="clearfix"></div>');
				$(life_category_block).appendTo($('#admin-lifeservice-main'));
				$('[type="file"]').textinput();
			});
			$('.life_category_block a.store-btn').click(function(event) {
				var cat_id = $(this).jqmData("life-cat");
				console.log(cat_id);
				currentCatId = cat_id;
				$.mobile.changePage($('#admin-lifeservice-store'), {
					reloadPage: true,
					changeHash: true
				});
			});
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});
$(document).on('pagebeforeshow', "#admin-lifeservice-store", function() {
	if (adminLifeJson != '') {
		console.log(adminLifeJson);
		console.log(currentCatId);
		$('.life_store_block').remove();
		$.each(adminLifeJson.result, function(idx, obj) {
			if (obj.id == currentCatId) {
				$.each(obj.store, function(idx, store) {
					var life_store_block = $('<div class="life_store_block"></div>').append('<div> <strong class="item_title">店家名稱：</strong><span class="store_title">' + store.name + '</span></div>');
					var store_pic_block = $('<div class="store-pic-block"></div>').append('<div class="left-block"><a class="ui-btn ui-corner-all green-btn store-info-btn" data-store-id="' + store.id + '"> 編輯店家資訊 </a> <button class="ui-btn ui-corner-all orange-btn store-del-btn" type="button" data-store-id="' + store.id + '">刪除</button> </div> <div class="img-block"> <input type="image" class="store-pic" src="' + img_base + store.pic1 + '" /></div> <div class="clearfix"></div>');
					$(life_store_block).append(store_pic_block);
					$(life_store_block).appendTo($('#admin-lifeservice-store-main'));
				});
			}
		});
		$('.life_store_block a.store-info-btn').click(function(event) {
			var store_id = $(this).jqmData("store-id");
			console.log(store_id);
			currentStoreId = store_id;
			$.mobile.changePage($('#admin-lifeservice-store-info'), {
				reloadPage: true,
				changeHash: true
			});
		});
		$('.life_store_block .store-del-btn').click(function(event) {
			var btn = $(this);
			var store_id = $(this).jqmData("store-id");
			console.log(store_id);
			currentStoreId = store_id;
			if (confirm('確定刪除此店家？') === true) {
				$.ajax({
					url: api_base + 'remove_lifeservice.php',
					type: 'POST',
					dataType: 'json',
					data: {
						store_id: currentStoreId
					}
				}).done(function(data) {
					if (data.status) {
						$(btn).parents('.life_store_block').remove();
					} else {
						alert('請重新操作！');
					}
				}).fail(function() {
					alert('請確認您的網路連線狀態！');
				});
			}
		});
	} else {
		$.mobile.changePage($('#admin-lifeservice'), {
			reloadPage: true,
			changeHash: true
		});
	}
});
$(document).on('pagebeforeshow', "#admin-lifeservice-store-info", function() {
	if (currentStoreId != null && currentStoreId != 0) {
		$.ajax({
			url: api_base + 'get_lifeservice_detail.php?store_id=' + currentStoreId,
			dataType: 'json'
		}).success(function(data) {
			if (data.status) {
				var service = data.result[0];
				$('#name-input').val(service.name);
				$('#tel-input').val(service.tel);
				$('#life_country').val(service.country_id).selectmenu('refresh');
				$('#life_area').val(service.area_id).selectmenu('refresh');
				$('#address-input').val(service.address);
				$('#contact-input').val(service.contact_name);
				$('#contact-line-input').val(service.contact_line);
				$('#opentime1').val(service.opentime[0]);
				$('#opentime2').val(service.opentime[1]);
				$('#consume_content').html(service.consume_content);
				$('#promo_content').html(service.promo_content);
			}
		}).fail(function() {
			alert('請確認您的網路連線狀態！');
		});
		$('#edit-lifeservice-form').on('submit', function(e) {
			e.preventDefault(); // prevent native submit
			$(this).ajaxSubmit({
				url: api_base + 'edit_lifeservice.php',
				data: {
					store_id: currentStoreId,
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
						$.mobile.changePage($("#admin-lifeservice-store"), {
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
	} else {
		$.mobile.changePage($('#admin-lifeservice'), {
			reloadPage: true,
			changeHash: true
		});
	}
});

$(document).on('pagebeforeshow', "#admin-add-lifeservice-store", function() {
	$('#add-lifeservice-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + 'add_lifeservice.php',
			data: {
				life_category: currentCatId,
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
					$.mobile.changePage($("#admin-lifeservice-store"), {
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
$(document).on('pagebeforeshow', "#admin-category", function() {
	$.ajax({
		url: api_base + 'get_form_content.php?action=get_category&type=club',
		dataType: 'json'
	}).success(function(data) {
		$.each(data, function(idx, obj) {
			var cat_list_item = $('<div class="cat_list_item"></div>').append('<span class="cat_title">' + obj.title + '</span><button class="ui-btn ui-btn-inline ui-corner-all orange-btn float-right cat-del-btn" type="button" data-cat-id="' + obj.id + '">刪除</button><div class="clearfix"></div>');
			$(cat_list_item).appendTo($('#club_cat_list'));
			$('.cat_list_item .cat-del-btn').off();
			$('.cat_list_item .cat-del-btn').click(function(event) {
				var btn = $(this);
				var cat_id = $(this).jqmData("cat-id");
				console.log(cat_id);
				if (confirm('確定刪除此分類？') === true) {
					$.ajax({
						url: api_base + 'remove_category.php',
						type: 'POST',
						dataType: 'json',
						data: {
							cat_id: cat_id
						}
					}).done(function(data) {
						if (data.status) {
							$(btn).parents('.cat_list_item').remove();
						} else {
							alert('請重新操作！');
						}
					}).fail(function() {
						alert('請確認您的網路連線狀態！');
					});
				}
			});
		});
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
	$.ajax({
		url: api_base + 'get_form_content.php?action=get_category&type=job',
		dataType: 'json'
	}).success(function(data) {
		$.each(data, function(idx, obj) {
			var cat_list_item = $('<div class="cat_list_item"></div>').append('<span class="cat_title">' + obj.title + '</span><button class="ui-btn ui-btn-inline ui-corner-all orange-btn float-right cat-del-btn" type="button" data-cat-id="' + obj.id + '">刪除</button><div class="clearfix"></div>');
			$(cat_list_item).appendTo($('#job_cat_list'));
			$('.cat_list_item .cat-del-btn').off();
			$('.cat_list_item .cat-del-btn').click(function(event) {
				var btn = $(this);
				var cat_id = $(this).jqmData("cat-id");
				console.log(cat_id);
				if (confirm('確定刪除此分類？') === true) {
					$.ajax({
						url: api_base + 'remove_category.php',
						type: 'POST',
						dataType: 'json',
						data: {
							cat_id: cat_id
						}
					}).done(function(data) {
						if (data.status) {
							$(btn).parents('.cat_list_item').remove();
						} else {
							alert('請重新操作！');
						}
					}).fail(function() {
						alert('請確認您的網路連線狀態！');
					});
				}
			});
		});
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
	$('form.cat-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		var type = $(this).jqmData("type");
		var title = $(this).find('input[name="title"]').val();
		console.log(type);
		$(this).ajaxSubmit({
			url: api_base + 'add_category.php',
			data: {
				type: type,
			},
			type: 'POST',
			dataType: 'json',
			clearForm: true,
			beforeSend: function() {
				$.mobile.loading('show');
			},
			complete: function() {
				$.mobile.loading('hide');
			},
			success: function(data) {
				if (data.status) {
					alert(data.message);
					$(".cat-popup").popup("close");
					var cat_list_item = $('<div class="cat_list_item"></div>').append('<span class="cat_title">' + title + '</span><button class="ui-btn ui-btn-inline ui-corner-all orange-btn float-right cat-del-btn" type="button" data-cat-id="' + data.insert_id + '">刪除</button><div class="clearfix"></div>');
					$(cat_list_item).appendTo($('#' + type + '_cat_list'));
					$('.cat_list_item .cat-del-btn').off();
					$('.cat_list_item .cat-del-btn').click(function(event) {
						var btn = $(this);
						var cat_id = $(this).jqmData("cat-id");
						console.log(cat_id);
						if (confirm('確定刪除此分類？') === true) {
							$.ajax({
								url: api_base + 'remove_category.php',
								type: 'POST',
								dataType: 'json',
								data: {
									cat_id: cat_id
								}
							}).done(function(data) {
								if (data.status) {
									$(btn).parents('.cat_list_item').remove();
								}
							}).fail(function() {
								alert('請確認您的網路連線狀態！');
							});
						}
					});
				} else {
					alert(data.message);
					$(".cat-popup").popup("close");
				}
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		});
	});
});
$(document).on('pagebeforeshow', "#admin-authority", function() {
	$.ajax({
		url: api_base + 'get_policy.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			$('#about_text').html(data.result.about);
			$('#service_text').html(data.result.service);
			$('#use_text').html(data.result.use);
			$('#privacy_text').html(data.result.privacy);
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
	$('form.policy-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		var policy = $(this).jqmData("policy");
		console.log(policy);
		$(this).ajaxSubmit({
			url: api_base + 'update_policy.php',
			data: {
				policy: policy
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
					$(".policy-popup").popup("close");

				} else {
					alert(data.message);
					$(".policy-popup").popup("close");
				}
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		});
	});
});
$(document).on('pagebeforeshow', "#admin-news", function() {
	$.ajax({
		url: api_base + 'get_news.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			$('.news_info_block').remove();
			$.each(data.result, function(idx, obj) {
				var news_info_block = $('<div class="news_info_block"></div>').append('<p class="news_title">' + obj.title + '</p>').append('<div class="news_during"><div><span class="item_title">上架時間：</span><span>' + obj.start_date + '</span></div><div><span class="item_title">下架時間：</span><span>' + obj.end_date + '</span></div></div>').append('<div class="news_operation"> <div><span class="item_title">排序：</span><span>' + obj.order_no + '</span><button type="button" class="ui-btn ui-corner-all ui-btn-inline news-del-btn" data-news-id="' + obj.id + '">刪除</button><a class="ui-btn ui-corner-all ui-btn-inline new-edit-btn" data-news-id="' + obj.id + '">編輯</a><div class="clearfix"></div></div> </div>');
				$(news_info_block).appendTo('#admin-news-main');
			});
			$('.news_info_block a.new-edit-btn').click(function(event) {
				var news_id = $(this).jqmData("news-id");
				console.log(news_id);
				currentNewsId = news_id;
				$.mobile.changePage($('#admin-news-edit'), {
					reloadPage: true,
					changeHash: true
				});
			});
			$('.news_info_block .news-del-btn').click(function(event) {
				var btn = $(this);
				var news_id = $(this).jqmData("news-id");
				console.log(news_id);
				currentNewsId = news_id;
				if (confirm('確定刪除此消息？') === true) {
					$.ajax({
						url: api_base + 'remove_news.php',
						type: 'POST',
						dataType: 'json',
						data: {
							news_id: currentNewsId
						}
					}).done(function(data) {
						if (data.status) {
							$(btn).parents('.news_info_block').remove();
						} else {
							alert('請重新操作！');
						}
					}).fail(function() {
						alert('請確認您的網路連線狀態！');
					});
				}
			});
		} else {
			$('<p>暫無最新消息</p>').appendTo('#admin-news-main');
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});

$(document).on('pagebeforeshow', "#admin-news-edit", function() {
	$.ajax({
		url: api_base + 'get_news.php?news_id=' + currentNewsId,
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var news = data.result[0];
			$('#news_edit_title').val(news.title);
			$('#news_edit_start').val(news.start_date);
			$('#news_edit_end').val(news.end_date);
			$('#current_pic').text(news.pic);
			$('#news_edit_order').val(news.order_no);
			$('#news_edit_content').val(news.content);
		} else {
			alert('請重新操作！');
			$.mobile.changePage($('#admin-news'), {
				reloadPage: true,
				changeHash: true
			});
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
	$('#news-edit-form').off();
	$('#news-edit-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + 'edit_news.php',
			data: {
				news_id: currentNewsId
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
				alert(data.message);
				$.mobile.changePage($('#admin-news'), {
					reloadPage: true,
					changeHash: true
				});
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		});
	});
});
$(document).on('pagebeforeshow', "#admin-news-add", function() {
	$('#news-add-form').off();
	$('#news-add-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + 'add_news.php',
			type: 'POST',
			dataType: 'json',
			beforeSend: function() {
				$.mobile.loading('show');
			},
			complete: function() {
				$.mobile.loading('hide');
			},
			success: function(data) {
				alert(data.message);
				$.mobile.changePage($('#admin-news'), {
					reloadPage: true,
					changeHash: true
				});
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		});
	});
});
