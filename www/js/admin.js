var adminLifeJson = '';
var currentCatId;
var currentStoreId;
var adminNewsJson = '';
var currentNewsId;
var currentUserId;
var adminPlanJson = '';
var currentPlanId;

$(document).one("pagebeforeshow", "[data-role='page']", function() {
	if (window.localStorage.getItem('auth') != '0' && window.localStorage.getItem('auth') != '100') {
		alert('您不是系統管理員！');
		document.location.href = './index.html';
	} else if (window.localStorage.getItem('auth') == null || window.localStorage.getItem('user_id') == null) {
		alert('您尚未登入！');
		document.location.href = './index.html';
	}
});

$(document).on('pagebeforeshow', "[data-role='page'].admin-page", function() {
	var page_id = $.mobile.activePage.attr('id');
	var page_title = $.mobile.activePage.jqmData('title');

	$('#' + page_id + ' select.navigateToPage').val('./admin.html#' + page_title).selectmenu('refresh');
});

$(document).on('pagecreate', ".admin-page", function() {
	$(this).find('select.navigateToPage').off();
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
	$(this).find("input[type='image']").off();
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
	var adminHomeStatus;
	$.ajax({
		url: api_base + 'get_home_setting.php',
		dataType: 'json'
	}).done(function(data) {
		var setting = data.result;
		if (data.status) {
			$('#home-upper-left-link').val(setting[0].link).selectmenu('refresh');
			$('#home-upper-right-link').val(setting[1].link).selectmenu('refresh');
			$('#home-middle-link').val(setting[2].link).selectmenu('refresh');
			$('#home-lower-left-link').val(setting[3].link).selectmenu('refresh');
			$('#home-lower-right-link').val(setting[4].link).selectmenu('refresh');
			$('#pic1').attr('src', img_base + setting[0].pic);
			$('#pic2').attr('src', img_base + setting[1].pic);
			$('#pic3').attr('src', img_base + setting[2].pic);
			$('#pic4').attr('src', img_base + setting[3].pic);
			$('#pic5').attr('src', img_base + setting[4].pic);
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
			$('.life_category_block a.store-btn').off();
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
		$('.life_store_block a.store-info-btn').off();
		$('.life_store_block a.store-info-btn').click(function(event) {
			var store_id = $(this).jqmData("store-id");
			console.log(store_id);
			currentStoreId = store_id;
			$.mobile.changePage($('#admin-lifeservice-store-info'), {
				reloadPage: true,
				changeHash: true
			});
		});
		$('.life_store_block .store-del-btn').off();
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
		$('#edit-lifeservice-form').off();
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
	$('#add-lifeservice-form').off();
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
	$('form.cat-form').off();
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
	$('form.policy-form').off();
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
	$.ajax({
		url: api_base + 'get_admin.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			$('#main_admin').empty();
			$('#sub_admin').empty();
			$.each(data.result, function(idx, obj) {
				var admin_info_block = '<div class="admin_info_block"><div class="admin_info">姓名：' + obj.name + '<br>帳號：' + obj.email + '</div>';
				if (window.localStorage.getItem('auth') == '100') {
					$('#admin_add_btn').remove();
				}
				// else {
				// admin_info_block += '<a href="#edit_admin" class="ui-btn ui-corner-all ui-btn-inline purple-btn admin-edit-btn" data-rel="popup" data-admin-id="' + obj.id + '">編輯管理者</a>';
				// }
				if (obj.type == '0') {
					admin_info_block += '<div class="clearfix"></div><br></div>';
					$('#main_admin').append(admin_info_block);
				} else if (obj.type == '100') {
					if (window.localStorage.getItem('auth') == '0') {
						admin_info_block += '<button class="ui-btn ui-corner-all ui-btn-inline float-right orange-btn admin-del-btn" type="button" data-admin-id="' + obj.id + '">刪除</button>';
					}
					admin_info_block += '<div class="clearfix"></div><br></div>';
					$('#sub_admin').append(admin_info_block);
				}
			});
			$('.admin-del-btn').off();
			$('.admin-del-btn').click(function(event) {
				var btn = $(this);
				var admin_id = $(this).jqmData("admin-id");
				if (confirm('確定刪除此管理者？') === true) {
					$.ajax({
						url: api_base + 'remove_subadmin.php',
						type: 'POST',
						dataType: 'json',
						data: {
							admin_id: admin_id
						}
					}).done(function(data) {
						if (data.status) {
							$(btn).parents('.admin_info_block').remove();
						} else {
							alert('請重新操作！');
						}
					}).fail(function() {
						alert('請確認您的網路連線狀態！');
					});
				}
			});
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
	$('#add-admin-form').off();
	$('#add-admin-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + 'user_action.php',
			data: {
				action: 'reg',
				formData: $('#add-admin-form').serialize()
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
					alert('已新增次管理者！');
					$.mobile.changePage($('#admin-authority'), {
						allowSamePageTransition: true,
						reloadPage: true,
						changeHash: true,
						transition: "none"
					});
				} else {
					alert('請重新操作！');
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
				var news_info_block = $('<div class="news_info_block"></div>').append('<p class="news_title">' + obj.title + '</p>').append('<div class="news_during"><div><span class="item_title">上架時間：</span><span>' + obj.start_date + '</span></div><div><span class="item_title">下架時間：</span><span>' + obj.end_date + '</span></div></div>').append('<div class="news_operation"> <div><span class="item_title">排序：</span><span>' + obj.order_no + '</span><button type="button" class="ui-btn ui-corner-all ui-btn-inline news-del-btn" data-news-id="' + obj.id + '">刪除</button><a class="ui-btn ui-corner-all ui-btn-inline news-edit-btn" data-news-id="' + obj.id + '">編輯</a><div class="clearfix"></div></div> </div>');
				$(news_info_block).appendTo('#admin-news-main');
			});
			$('.news_info_block a.news-edit-btn').click(function(event) {
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

$(document).on('pagebeforeshow', "#admin-messages", function() {
	$('#admin-msg-form').off();
	$('#admin-msg-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + 'add_official_msg.php',
			type: 'POST',
			dataType: 'json',
			resetForm: true,
			beforeSend: function() {
				$.mobile.loading('show');
			},
			complete: function() {
				$.mobile.loading('hide');
			},
			success: function(data) {
				alert(data.message);
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		});
	});
});

$(document).on('pagebeforeshow', "#admin-plan", function() {
	$.ajax({
		url: api_base + 'get_policy.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			$('#pay_method').html(data.result.pay_method);
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
	$.ajax({
		url: api_base + 'get_plan.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			adminPlanJson = data.result;
			$('.plan_block').remove();
			$.each(data.result, function(idx, obj) {
				var plan_block = $('<div class="plan_block"></div>').append('<p><strong class="item_title">方案名稱：</strong><span class="plan_title">' + obj.title + '</span></p>').append('<label class="item_title"><strong>方案內容：</strong></label><div class="">' + obj.description.replace(/\n/g, "<br>") + '</div><hr>').append('<button class="ui-btn ui-btn-inline ui-corner-all orange-btn float-right plan-del-btn" type="button" data-plan-id="' + obj.id + '">刪除</button><a href="#edit_plan" class="ui-btn ui-btn-inline purple-btn ui-corner-all float-right plan-edit-btn" data-rel="popup" data-plan-id="' + obj.id + '">編輯</a><div class="clearfix"></div>');
				$(plan_block).insertBefore('#pay-method-form');
			});
			$('.plan_block a.plan-edit-btn').click(function(event) {
				currentPlanId = $(this).jqmData("plan-id");
				$.each(adminPlanJson, function(idx, obj) {
					if (parseInt(obj.id) == currentPlanId) {
						$('#edit-plan-form #plan_title').val(obj.title);
						$('#edit-plan-form #plan_content').val(obj.description);
					}
				});
			});

			$('.plan_block .plan-del-btn').off();
			$('.plan_block .plan-del-btn').click(function(event) {
				var btn = $(this);
				var plan_id = $(this).jqmData("plan-id");
				// console.log(plan_id);
				if (confirm('確定刪除此方案？') === true) {
					$.ajax({
						url: api_base + 'remove_plan.php',
						type: 'POST',
						dataType: 'json',
						data: {
							plan_id: plan_id
						}
					}).done(function(data) {
						if (data.status) {
							$(btn).parents('.plan_block').remove();
						} else {
							alert('請重新操作！');
						}
					}).fail(function() {
						alert('請確認您的網路連線狀態！');
					});
				}
			});
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
	$('#add-plan-form').off();
	$('#add-plan-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		$(this).ajaxSubmit({
			url: api_base + 'add_plan.php',
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
				$("#add_plan").popup("close");
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		});
	});
	$('#edit-plan-form').off();
	$('#edit-plan-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		// var plan_id = $(this).jqmData("plan-id");
		$(this).ajaxSubmit({
			url: api_base + 'edit_plan.php',
			data: {
				plan_id: currentPlanId
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
				$("#edit_plan").popup("close");
				alert(data.message);
				if (data.status) {
					$.mobile.changePage($('#admin-plan'), {
						allowSamePageTransition: true,
						reloadPage: true,
						changeHash: true,
						transition: "none"
					});
				}
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		});
	});
	$('form.policy-form').off();
	$('form.policy-form').on('submit', function(e) {
		e.preventDefault(); // prevent native submit
		var policy = $(this).jqmData("policy");
		$(this).ajaxSubmit({
			url: api_base + 'update_policy.php',
			type: 'POST',
			dataType: 'json',
			data: {
				policy: policy
			},
			beforeSend: function() {
				$.mobile.loading('show');
			},
			complete: function() {
				$.mobile.loading('hide');
			},
			success: function(data) {
				alert(data.message);
			},
			error: function(request, error) {
				alert('請確認您的網路連線狀態！');
			}
		});
	});
});

$(document).on('pagebeforeshow', "#admin-member", function() {
	$.ajax({
		url: api_base + 'get_userlist.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var user = data.result;
			$('.member-list .list_table tbody').empty();
			$.each(user, function(idx, obj) {
				var user_tr = '<tr><td>' + obj.created + '</td><td>' + obj.name + '</td><td><a class="ui-btn ui-corner-all ui-btn-inline ui-mini purple-btn user-detail-btn" data-user-id="' + obj.id + '">查看</a></td></tr>';
				switch (obj.type) {
					case '1':
						$('#normal-table tbody').append(user_tr);
						break;
					case '2':
						$('#club-table tbody').append(user_tr);
						break;
					case '3':
						$('#seeker-table tbody').append(user_tr);
						break;
					default:
						break;
				}
			});
			$('.user-detail-btn').off();
			$('.user-detail-btn').click(function(event) {
				var user_id = $(this).jqmData("user-id");
				window.localStorage.setItem('detail_user_id', user_id);
				currentUserId = user_id;
				$.mobile.changePage($('#admin-member-detail'), {
					reloadPage: true,
					changeHash: true
				});
			});
			$.each(data.amount, function(idx, obj) {
				switch (obj.type) {
					case '1':
						$('#normal_num').append(obj.amt);
						break;
					case '2':
						$('#club_num').append(obj.amt);
						break;
					case '3':
						$('#seeker_num').append(obj.amt);
						break;
					default:
						break;
				}
			});

			$('.download-list-btn').off();
			$('.download-list-btn').click(function(event) {
				var type = $(this).jqmData("type");
				var list = $(this).parent().next('.list_table').clone(false);
				$(list).find('tr :nth-child(3)').remove();
				var table_caption = $(this).parent().next('.list_table').children('caption').text();
				$.ajax({
					url: api_base + 'send_userlist.php',
					dataType: 'json',
					type: 'POST',
					data: {
						receiver: window.localStorage.getItem('user'),
						subject: table_caption,
						list_table: list.prop('outerHTML')
					}
				}).done(function(data) {
					alert(data.message);
				}).fail(function() {
					alert('請確認您的網路連線狀態！');
				});
			});
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
	$.ajax({
		url: api_base + 'get_not_approved_user.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var user = data.result;
			$('#not-approved-table tbody').empty();
			$.each(user, function(idx, obj) {
				var user_tr = '<tr><td>' + obj.created + '</td><td>' + obj.name + '</td><td><a class="ui-btn ui-corner-all ui-btn-inline ui-mini purple-btn user-detail-btn" data-user-id="' + obj.id + '">查看</a><button type="button" class="ui-btn ui-corner-all ui-btn-inline ui-mini green-btn user-detail-btn" data-user-id="' + obj.id + '">核准</button></td></tr>';
				$('#not-approved-table tbody').append(user_tr);
			});
			$('.user-detail-btn').off();
			$('.user-detail-btn').click(function(event) {
				var user_id = $(this).jqmData("user-id");
				window.localStorage.setItem('detail_user_id', user_id);
				currentUserId = user_id;
				$.mobile.changePage($('#admin-member-detail'), {
					reloadPage: true,
					changeHash: true
				});
			});
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});

$(document).on('pagebeforeshow', "#admin-member-detail", function() {
	// var page_id = '#' + $.mobile.activePage.attr('id');
	$.ajax({
		url: api_base + 'get_user_info.php?user_id=' + window.localStorage.getItem('detail_user_id'),
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			$('#m_no').val(data.result.member_id);
			$('#m_name').html(data.result.name);
			$('#m_gender').val(data.result.gender);
			$('#m_birth').val(data.result.birth);
			$('#m_email').val(data.result.email);
			$('#m_tel').val(data.result.tel);
			$('#m_mobile').val(data.result.mobile);
			$('input[name="member_auth"]').removeProp('checked').checkboxradio("refresh");
			switch (data.result.type) {
				case '1':
				default:
					$('#normal').prop("checked", true).checkboxradio("refresh");
					break;
				case '2':
					if (data.result.publish_due != null) {
						$('#club_adv').prop("checked", true).checkboxradio("refresh");
						$('#publish_due').val(data.result.publish_due);
					} else {
						$('#club_basic').prop("checked", true).checkboxradio("refresh");
						$('#publish_due').val('');
					}
					break;
				case '3':
					$('#seeker').prop("checked", true).checkboxradio("refresh");
					break;
			}
			// if (data.result.type == 2) {
			// 	if (data.result.plan_title != null) {
			// 		$(page_id + ' .plan-input').val(data.result.plan_title);
			// 		$(page_id + ' .plan-during-input').val(data.result.publish_start + '-' + data.result.publish_due);
			// 		$(page_id + ' .plan-during-input').parent().parent().show();
			// 	} else {
			// 		$(page_id + ' .plan-during-input').parent().parent().hide();
			// 	}
			// }
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});

$(document).on('pagebeforeshow', "#admin-recommend", function() {
	$.ajax({
		url: api_base + 'get_referrer_list.php',
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var ref = data.result;
			$('#record_list tbody').empty();
			$.each(ref, function(idx, obj) {
				var ref_tr = '<tr><td>' + obj.created + '</td><td>' + obj.name + '</td><td><a class="ui-btn ui-corner-all ui-btn-inline ui-mini purple-btn ref-detail-btn" data-user-id="' + obj.id + '">查看</a></td></tr>';
				$('#rec_list_table tbody').append(ref_tr);

			});
			$('.user-detail-btn').off();
			$('.user-detail-btn').click(function(event) {
				var user_id = $(this).jqmData("user-id");
				window.localStorage.setItem('ref_user_id', user_id);
				$.mobile.changePage($('#admin-recommend-detail'), {
					reloadPage: true,
					changeHash: true
				});
			});
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});

$(document).on('pagebeforeshow', "#admin-recommend-detail", function() {
	$.ajax({
		url: api_base + 'get_redeem_record.php?user_id=' + window.localStorage.getItem('ref_user_id'),
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var redeem_list = '';
			$.each(data.result, function(idx, obj) {
				redeem_list += '<tr><td>(' + obj.point + ')' + obj.title + obj.description + '</td><td>兌換時間：' + obj.created + '</td> </tr>';
			});
			$('#redeem_list').append(redeem_list);
		} else {
			$('#redeem_list').html(data.message);
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});

	$.ajax({
		url: api_base + 'get_recommend_list.php?user_id=' + window.localStorage.getItem('ref_user_id'),
		dataType: 'json'
	}).done(function(data) {
		if (data.status) {
			var rec_list = '';
			total_point = parseInt(data.total);
			$('#recommend_total').html(data.total);
			$.each(data.result, function(idx, obj) {
				rec_list += '<tr><td>' + obj.name + '</td><td>註冊時間：' + obj.created + '</td></tr>';
			});
			$('#member_rec_list tbody').css('padding-left', '1.5em').append(rec_list);
		} else {
			$('#member_rec_list tbody').css('padding-left', '0').html(data.message);
		}
	}).fail(function() {
		alert('請確認您的網路連線狀態！');
	});
});
