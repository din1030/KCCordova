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

	$.ajax('/KCCordova/api/homeAdminStatus.json')
		.done(function(e) {
			console.log(e);

			$('#home-upper-left-link').val(e[0].value);
			$('#home-upper-left-link').prev().text(textSwitch(e[0].value));

			$('#home-upper-right-link').val(e[1].value);
			$('#home-upper-right-link').prev().text(textSwitch(e[1].value));

			$('#home-middle-link').val(e[2].value);
			$('#home-middle-link').prev().text(textSwitch(e[2].value));


			$('#home-lower-left-link').val(e[3].value);
			$('#home-lower-left-link').prev().text(textSwitch(e[3].value));


			$('#home-lower-right-link').val(e[4].value);
			$('#home-lower-right-link').prev().text(textSwitch(e[4].value));

			function textSwitch(text) {
				switch (text) {
					case 'hotel':
						return '酒店系統'
						break;
					case 'recruit':
						return "求職者";
						break;
					case 'live':
						return '生活服務'
						break;
					case 'news':
						return "最新消息";
						break;
					case 'homepages':
						return 'Kelly Club 官網'
						break;
					default:
						return "求職者";
						break;
				}
			}



			$('#pic1').attr('src', e[0].url);
			$('#pic2').attr('src', e[1].url);
			$('#pic3').attr('src', e[2].url);
			$('#pic4').attr('src', e[3].url);
			$('#pic5').attr('src', e[4].url);
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
