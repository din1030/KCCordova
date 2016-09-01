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
	$.ajax('http://52.69.53.255/KCCordova/api/get_home_setting.json')
		.done(function(data) {
			if (data.status) {
				var setting = data.result;
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
			$('#pic1').attr('src', setting[0].pic);
			$('#pic2').attr('src', setting[1].pic);
			$('#pic3').attr('src', setting[2].pic);
			$('#pic4').attr('src', setting[3].pic);
			$('#pic5').attr('src', setting[4].pic);
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
