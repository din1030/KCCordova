var currentViewId;
var dataJson = '';
var searchJson;
var store_id;
var baseApi = 'http://52.69.53.255/KVCordova/api/lifeservice.json';
var searchState = false;


$(document).on('pagebeforecreate', '#lifeservice', function() {
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_lifeservice.php',
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			dataJson = data;
			console.log(dataJson);
			$.each(data.result, function(idx, obj) {
				var classification_li = $('<div></div>').append('<a href="" data-id="' + obj.id + '" data-ajax="false"><img src="http://52.69.53.255/KCCordova/www/img/' + obj.pic + '"></a>');
				$(classification_li).appendTo($('#service-category-block'));
			});
			// $('#service-category-block').listview('refresh');
			$('#service-category-block a').click(function(event) {
				console.log('called click!');
				var id = $(this).jqmData("id");
				currentViewId = id;
				$.mobile.changePage($('#lifeservice-list'), {
					reloadPage: true,
					changeHash: true
				});
			})
		}
	});
});

$(document).on('pagebeforeshow', '#lifeservice', function(e) {
	// event off!!
});


$(document).on('pagebeforeshow', '#lifeservice-list', function() {
	var list = '';
	$('#lifeservice-category-select').off();

	// check if it come from search state
	if (searchState) {
		console.log(searchJson);
		classListRefresh(searchJson);
		// $('#lifeservice-category-select').listview("option", "disabled", true);
		searchState = false;
	} else {
		// $('#lifeservice-category-select').show();
		//if referrer come from search before all json been fetch
		if (dataJson != '') {
			// print all type
			console.log(dataJson.result);
			$.each(dataJson.result, function(idx, obj) {
				list += '<option value="' + obj.id + '">' + obj.title + '</option>';
				if (obj.id == currentViewId) {
					classListRefresh(obj.store);
				}
			});
			$('#lifeservice-category-select').html(list);
			$('#lifeservice-category-select').val(currentViewId).selectmenu('refresh');
		} else {
			$.ajax({
				url: 'http://52.69.53.255/KCCordova/api/get_lifeservice.php',
				dataType: 'json'
			}).success(function(data) {
				if (data.status) {
					dataJson = data.result;
					console.log(dataJson);
					currentViewId = data.result[0].id;
					$.each(data.result, function(idx, obj) {
						list += '<option value="' + obj.id + '">' + obj.title + '</option>';
						if (obj.id == currentViewId) {
							classListRefresh(obj.store);
						}
					});
					$('#lifeservice-category-select').html(list);
					$('#lifeservice-category-select')[0].selectedIndex = 0;
					$('#lifeservice-category-select').selectmenu('refresh');
				}
			});
		}
	}

	function classListRefresh(store) {
		var store_list = '';
		$.each(store, function(idx, obj) {
			store_list += '<li data-icon="false"><a data-store-id="' + obj.id + '" data-ajax="false"><img class="life-thumbnail" src="http://52.69.53.255/KCCordova/www/img/' + obj.pic1 + '"><h2>' + obj.name + '</h2><p>' + obj.country + ' ' + obj.area + '</p><div class="slogan">' + obj.slogan + '</div></a></li>';
		})

		$('#lifeservice-list-main ul').html(store_list);
		$('#lifeservice-list-main ul').listview('refresh');
	}

	//event handler
	$('#lifeservice-category-select').on('change', function(e) {
		console.log($(this).val());
		currentViewId = parseInt($(this).val());
		console.log(dataJson.result);
		$.each(dataJson.result, function(idx, obj) {
			if (obj.id == currentViewId) {
				classListRefresh(obj.store);
			}
		});
	});

	$('#lifeservice-list-main').on('click', '.store_list a', function() { // to be review for delegation
		store_id = $(this).jqmData("store-id");
		$.mobile.changePage($('#lifeservice-detail'), {
			reloadPage: true,
			changeHash: true
		});
	})

});

$(document).on('pagebeforeshow', '#lifeservice-detail', function() {
	$('#lifeservice-list-main').off(); // remove event delegation from other pages
	$('#lifeservice-detail-main').off(); // remove event delegation from other pages
	console.log(store_id);
	if (store_id != null && store_id != 0) {
		$.ajax({
			url: 'http://52.69.53.255/KCCordova/api/get_lifeservice_detail.php?store_id=' + store_id,
			dataType: 'json'
		}).success(function(data) {
			if (data.status) {
				var service = data.result[0];
				var details = '<div id="club_title">' + service.name + '</div>地址：' + service.address + '<br>電話：' + service.tel + '<br>營業時間：<br>';
				var contactInfo = '<div class="avatar float-left"><img src="http://52.69.53.255/KCCordova/www/img/' + service.contact_pic + '" alt="" style="width: 70px; height: 70px; border-radius: 50%;"></div><strong>' + service.contact_name + '</strong><small>預約窗口</small><br> Line:' + service.contact_line;
				var consume_content = service.consume_content;
				var slideContainer = '<ul class="slides">';

				$.each(service.opentime, function(idx, obj) {
					details += obj + '<br>';
				});

				details += '<div id="action_block" class="text-right"><a href="' + service.website + '" class="ui-btn ui-btn-inline no-bg-bd" rel="external" data-ajax="false"><img src="./img/icons/official_site.png" alt=""></a>	<button type="button" id="addFv" data-id="' + service.id + '" class="no-bg-bd ui-btn ui-btn-inline"><img src="./img/icons/fav_gray.png" alt=""></button></div>'

				$.each(service.pic, function(idx, pic) {
					slideContainer += '<li><img src="http://52.69.53.255/KCCordova/www/img/' + pic + '"></li>'
				});

				slideContainer += '</ul>';

				$('.flexslider').html(slideContainer);
				$('#info_block .ui-body-a').html(details);
				$('#contact_block .ui-body-a').html(contactInfo);
				$('#details_block .ui-body-a').html(consume_content);
				$('#compaign_block .ui-body-a').html(service.promo_content);
			}
		});
	} else {
		$.mobile.changePage($('#lifeservice'), {
			reloadPage: true,
			changeHash: true
		});
	}

	$('#lifeservice-detail-main').on('click', '#addFv', function(e) {
		var id = $(this).jqmData('id');

		// $.ajax({
		// 	url: 'addFv.php',
		// 	method: 'POST',
		// 	data: {
		// 		memberId: memberId,
		// 		id: id
		// 	}
		// }).done(function(e) {
		// 	// add style?
		// 	alert(e);
		// })

		console.log(id, memberId);

	});
});


$(document).on('pagebeforeshow', '#lifeservice-search', function() {
	//off any unwanted event  place to garbage collector
	$('#lifeservice-detail-main').off();

	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_form_content.php?action=get_category&type=life',
		dataType: 'json'
	}).done(function(data) {
		console.log(data);
		var classificationList = '';
		$.each(data, function(idx, obj) {
			classificationList += '<option value="' + obj.id + '">' + obj.title + '</option>';
		});
		$('#life_type').html(classificationList);
		$('#life_type').selectmenu('refresh');

		$('#lifeservice-search-btn').on('click', function() {
			var area = $('#county').val();
			var type = $('#life_type').val();
			console.log('life_type changed');

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
			// dummy DATA and will remove later
			// searchJson = {
			// 	"_shop": [
			// 		{
			// 			"img": "./img/square_img.jpg",
			// 			"name": "Search",
			// 			"shop_id": 1,
			// 			"shop_location": "台中市 西屯區",
			// 			"shop_slogan": "slogan1"
			// 				},
			// 		{
			// 			"img": "./img/square_img.jpg",
			// 			"name": "Search",
			// 			"shop_id": 2,
			// 			"shop_location": "台中市 西屯區",
			// 			"shop_slogan": "slogan2"
			// 				},
			// 		{
			// 			"img": "./img/square_img.jpg",
			// 			"name": "Divas 美甲美睫概念館13",
			// 			"shop_id": 3,
			// 			"shop_location": "台中市 西屯區",
			// 			"shop_slogan": "slogan3"
			// 				},
			// 		{
			// 			"img": "./img/square_img.jpg",
			// 			"name": "Divas 美甲美睫概念館14",
			// 			"shop_id": 4,
			// 			"shop_location": "台中市 西屯區",
			// 			"shop_slogan": "slogan4"
			// 				},
			// 		{
			// 			"img": "./img/square_img.jpg",
			// 			"name": "Divas 美甲美睫概念館15",
			// 			"shop_id": 5,
			// 			"shop_location": "台中市 西屯區",
			// 			"shop_slogan": "slogan5"
			// 				}
			// 			]
			// }
			// searchState = true;
			// $.mobile.changePage($('#lifeservice-list'), {
			// 	reloadPage: true,
			// 	changeHash: true
			// });
		});
	});
});
