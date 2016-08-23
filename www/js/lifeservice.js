var currentViewId;
var dataJson;
var shopId;

$(document).on('pagebeforecreate', '#lifeservice', function() {
	$.ajax({
		url: '../api/lifeservice.json',
		dataType: 'json'
	}).success(function(data) {
		dataJson = data;
		$.each(data, function(idx, obj) {
			var classification_li = $('<div></div>').append('<a href="" data-id="' + obj._id + '" data-ajax="false"><img src="'+ obj._imgSrc +'"></a>');
			$(classification_li).appendTo($('#service-category-block'));
		});
		// $('#service-category-block').listview('refresh');
		$('#service-category-block a').click(function(event) {
			var id = $(this).jqmData("id");
			currentViewId = id;
			// window.localStorage.setItem('get_club_id', admin_id);
			$.mobile.changePage($('#lifeservice-list'), {
				reloadPage: true,
				changeHash: true
			});

		})
	});
});


$(document).on('pagebeforeshow', '#lifeservice-list', function() {
	var list = '';
	$.each(dataJson, function(idx, obj) {
		list += '<option value="' + obj._id + '">' + obj._name + '</option>';
		if (obj._id === currentViewId) {
			classListRefresh(obj._shop);
		}
	});

	$('#select-choice-1').html(list);
	$('#select-choice-1')[0].selectedIndex = currentViewId - 1;
	$('#select-choice-1').selectmenu('refresh');

	_init();

	function classListRefresh(val) {
		var shopList = '';
		$.each(val, function(i, data) {
			shopList += '<li data-icon="false"><a href="" data-shop-id="'+ data.shop_id +'" data-ajax="false"><img src="'+ data.img + '"><h2>'+data.name +'</h2><p>'+ data.shop_location +'</p><div class="slogan">'+ data.shop_slogan +'</div></a></li>';
		})

		$('#lifeservice-list-main ul').html(shopList);
		$('#lifeservice-list-main ul').listview('refresh');
	}

	function _init() {
		$.each(dataJson, function(idx, obj) {
			if (obj._id === currentViewId) {
				classListRefresh(obj._shop);
			}
		});
	}


	//event handler
	$('#select-choice-1').on('change', function(e) {
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
	console.log(shopId);
	$('#lifeservice-list-main').off('click', '.store_list a'); // remove event delegation from other pages
	$.ajax({
		url: '../api/lifeservicedetails.json',//&id=' + shopId,
		dataType: 'json'
	}).success(function(data) {
		var details = '<div id="club_title">'+ data._name+ '</div>位置: ' + data._address + '<br>電話: ' + data._tel +'<br>營業時間: <br>';

		$.each(data._time, function(i, v) {
			details += v + '<br>';
		});

		details += '<div id="action_block" class="text-right"><a href="' + data._website +'" class="ui-btn ui-btn-inline no-bg-bd" rel="external" data-ajax="false"><img src="./img/icons/official_site.png" alt=""></a>	<button type="button" class="no-bg-bd ui-btn ui-btn-inline"><img src="./img/icons/fav_gray.png" alt=""></button></div>'

		var contactInfo = '<div class="avatar float-left"><img src="' + data["_contact-thumb"] + '" alt="" style="width: 70px; height: 70px; border-radius: 50%;"></div><strong>'+ data["_contact-person"] +'</strong><small>預約窗口</small><br>電話: ' + data["_contact-tel"] + '<br> Line:' + data["_contact-line"];

		var detailsProduct = '';

		$.each(data["_product-info"], function(i, v) {
			detailsProduct += '<p>'+ v +'</p>'
		});
		// console.log(details);
		$('#info_block .ui-body-a').html(details);
		$('#contact_block .ui-body-a').html(contactInfo);
		$('#details_block .ui-body-a').html(detailsProduct);
		$('#compaign_block .ui-body-a').html(data._promotion);
	});
});



$(document).on('pagebeforeshow', '#lifeservice-search', function() {

});