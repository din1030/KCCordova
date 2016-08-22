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
