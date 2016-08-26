var currentViewId;
var dataJson;
var searchJson;
var shopId;
var baseApi = 'http://52.69.53.255/KVCordova/api/lifeservice.json';
var searchState = false;


$(document).on('pagebeforecreate', '#lifeservice', function() {
	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_lifeservice.php',
		dataType: 'json'
	}).success(function(data) {
		if (data.status) {
			dataJson = data;
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

	//if referrer come from search before all json been fetch
	if (dataJson === null || typeof dataJson === 'undefined') {
		$.ajax({
			url: 'http://52.69.53.255/KCCordova/api/get_lifeservice.php',
			dataType: 'json'
		}).success(function(data) {
			if (data.status) {
				console.log('list ajax call');
				dataJson = data;
				$.each(data.result, function(idx, obj) {
					list += '<option value="' + obj.id + '">' + obj.title + '</option>';
				});
				$('#lifeservice-category-select').html(list);
				$('#lifeservice-category-select')[0].selectedIndex = 0;
				$('#lifeservice-category-select').selectmenu('refresh');
			}
		});
	} else {
		// print all type
		$.each(dataJson.result, function(idx, obj) {
			list += '<option value="' + obj.id + '">' + obj.title + '</option>';
		});
		$('#lifeservice-category-select').html(list);
		$('#lifeservice-category-select').val(currentViewId).selectmenu('refresh');
	}

	// check if it come from search state
	if (searchState) {
		classListRefresh(searchJson.store);
		searchState = false;
	} else {
		_init();
	}

	function _init() {
		// console.log(dataJson.result);
		$.each(dataJson.result, function(idx, obj) {
			if (obj.id == currentViewId) {
				console.log(obj.id + '/' + currentViewId);
				console.log(obj.store);
				classListRefresh(obj.store);
			}
		});
	}

	function classListRefresh(store) {
		var store_list = '';
		$.each(store, function(idx, obj) {
			store_list += '<li obj-icon="false"><a  obj-shop-id="' + obj.id + '" obj-ajax="false"><img src="' + obj.pic1 + '"><h2>' + obj.name + '</h2><p>' + obj.country + ' ' + obj.area + '</p><div class="slogan">' + obj.slogan + '</div></a></li>';
		})

		$('#lifeservice-list-main ul').html(store_list);
		$('#lifeservice-list-main ul').listview('refresh');
	}




	//event handler
	$('#lifeservice-category-select').on('change', function(e) {
		console.log($(this).val());
		currentViewId = parseInt($(this).val());
		_init();
	});

	$('#lifeservice-list-main').on('click', '.store_list a', function() { // to be review for delegation
		shopId = $(this).jqmData("shop-id");

		$.mobile.changePage($('#lifeservice-detail'), {
			reloadPage: true,
			changeHash: true
		});
	})

});

$(document).on('pagebeforeshow', '#lifeservice-detail', function() {
	$('#lifeservice-list-main').off(); // remove event delegation from other pages
	$('#lifeservice-detail-main').off(); // remove event delegation from other pages

	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/lifeservicedetails.json', //&id=' + shopId,
		dataType: 'json'
	}).success(function(data) {
		var details = '<div id="club_title">' + data._name + '</div>位置: ' + data._address + '<br>電話: ' + data._tel + '<br>營業時間: <br>';
		var contactInfo = '<div class="avatar float-left"><img src="' + data["_contact-thumb"] + '" alt="" style="width: 70px; height: 70px; border-radius: 50%;"></div><strong>' + data["_contact-person"] + '</strong><small>預約窗口</small><br>電話: ' + data["_contact-tel"] + '<br> Line:' + data["_contact-line"];
		var detailsProduct = '';
		var slideContainer = '<ul class="slides">';


		$.each(data._time, function(i, v) {
			details += v + '<br>';
		});

		details += '<div id="action_block" class="text-right"><a href="' + data._website + '" class="ui-btn ui-btn-inline no-bg-bd" rel="external" data-ajax="false"><img src="./img/icons/official_site.png" alt=""></a>	<button type="button" id="addFv" data-id="' + data._id + '" class="no-bg-bd ui-btn ui-btn-inline"><img src="./img/icons/fav_gray.png" alt=""></button></div>'

		$.each(data["_product-info"], function(i, v) {
			detailsProduct += '<p>' + v + '</p>'
		});

		$.each(data['_imgSrc'], function(i, v) {
			slideContainer += '<li><img src="' + v + '"></li>'
		});

		slideContainer += '</ul>';

		$('.flexslider').html(slideContainer);
		$('#info_block .ui-body-a').html(details);
		$('#contact_block .ui-body-a').html(contactInfo);
		$('#details_block .ui-body-a').html(detailsProduct);
		$('#compaign_block .ui-body-a').html(data._promotion);
	});

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
	$('#club_type').off();

	$.ajax({
		url: 'http://52.69.53.255/KCCordova/api/get_lifeservice_list.json',
		dataType: 'json'
	}).done(function(data) {
		console.log(data);
		var list = '';
		var classificationList = '';

		$.each(data._state, function(i, v) {
			list += '<option value="' + v.value + '">' + v.name + '</option>';
		});

		$.each(data._classification, function(i, v) {
			classificationList += '<option value="' + v.id + '">' + v.name + '</option>';
		});

		$('#county').html(list);
		$('#county').selectmenu('refresh');
		$('#club_type').html(classificationList);
		$('#club_type').selectmenu('refresh');

		$('#club_type').on('change', function() {
			var state = $('#county').val();
			var type = $('#club_type').val();
			console.log('club_type changed');

			// $.ajax({
			// 	method: "POST",
			// 	url: '../searchLifeService.php',
			// 	data: {
			// 		state: state,
			// 		type: type
			// 	}
			// })
			// 		.done(function (data) {
			// 			//return data as single object
			// 			searchJson = data;
			// 			searchState = true;
			//
			// 			$.mobile.changePage($('#lifeservice-list'), {
			// 				reloadPage: true,
			// 				changeHash: true
			// 			});
			// 		})


			// dummy DATA and will remove later
			searchJson = {
				"_shop": [
					{
						"img": "./img/square_img.jpg",
						"name": "Search",
						"shop_id": 1,
						"shop_location": "台中市 西屯區",
						"shop_slogan": "slogan1"
							},
					{
						"img": "./img/square_img.jpg",
						"name": "Search",
						"shop_id": 2,
						"shop_location": "台中市 西屯區",
						"shop_slogan": "slogan2"
							},
					{
						"img": "./img/square_img.jpg",
						"name": "Divas 美甲美睫概念館13",
						"shop_id": 3,
						"shop_location": "台中市 西屯區",
						"shop_slogan": "slogan3"
							},
					{
						"img": "./img/square_img.jpg",
						"name": "Divas 美甲美睫概念館14",
						"shop_id": 4,
						"shop_location": "台中市 西屯區",
						"shop_slogan": "slogan4"
							},
					{
						"img": "./img/square_img.jpg",
						"name": "Divas 美甲美睫概念館15",
						"shop_id": 5,
						"shop_location": "台中市 西屯區",
						"shop_slogan": "slogan5"
							}
						]
			}
			searchState = true;
			$.mobile.changePage($('#lifeservice-list'), {
				reloadPage: true,
				changeHash: true
			});
		});
	});
});
