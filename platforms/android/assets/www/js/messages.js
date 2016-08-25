var officialMsg;
var officialState;

var currentMsg;


$(document).on("pagebeforeshow", '#messages', function () {
	console.log(memberType);

	$('#messages-main').off('click');
	$('#msg-holder').off('click');

	// post memberType and userId from main.js global variable - OFFICIAL MSG
	$.ajax({
		url: "../api/officialmessage.json",
		method: "GET", //should be post?
		data: {
			type: memberType,
			id: memberId
		}
	}).done(function (e) {
		//cache as global
		officialMsg = e;

		//show only if have msg
		if (e.status) {
			var lastLength = e.msg.length - 1; //last array as latest msg
			var lastOfficialMsg = e.msg[lastLength];

			$('#official_msg_date').text(lastOfficialMsg._msgDate);

			var msgBox = '<strong>' + lastOfficialMsg._msgTitle + '</strong><br>' + lastOfficialMsg._msgBody;

			$('.offcial_msg_block .ui-body-a').html(msgBox);
			$('.offcial_msg_block').attr('data-msg-id', lastOfficialMsg._msgId);
			$('.offcial_msg_block').attr('id', 'msg-' + lastOfficialMsg._msgId);
			$('.offcial_msg_block').show();
		}


	})

	$.ajax({
		url: "../api/personalmessage.json",
		method: "GET", //should be post?
		data: memberId
	}).done(function (e) {
		var markup = '';

		$.each(e.msg, function (i, v) {
			switch (v._msgType) {
				case 0:
					markup += seekerMarkup(v);
					break;
				case 1:
					markup += shopMarkup(v);
					break;
				default:
					console.error('Error!')
			}

		});


		$('#personal_msg').html(markup);


		function seekerMarkup(data) {
			var markup = '<div class="detail_block msg_block seeker_msg" id="msg-' + data._msgId + '" data-msg-id="' + data._msgId + '" data-official="false"><div class="ui-bar ui-bar-a"><span class="float-left">【求職者】留言</span><span class="float-right" style="margin-right: 20px;">' + data._msgDate + '</span><button class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-right ui-icon-delete ui-btn-icon-notext del-fav-btn" type="button" name="button" data-shadow="false">x</button></div><a class="msg-open" href=""><div class="ui-body ui-body-a"><div class="avatar msg-avatar float-left"><img src="' + data._userImg + '" style="width: 70px; height: 70px; border-radius: 50%;" alt=""></div><strong>' + data._userName + '</strong><br> ' + data._nickName + '	<br> 應徵地區：' + data._place + '<div class="float-right msg-badge"><span class="">' + data._lengthUnread + '</span></div></div></a></div>';

			return markup;
		}


		function shopMarkup(data) {
			var markup = '<div class="detail_block msg_block shop_msg" id="msg-' + data._msgId + '" data-msg-id="' + data._msgId + '" data-official="false"><div class="ui-bar ui-bar-a"><span class="float-left">【店家】留言</span><span class="float-right" style="margin-right: 20px;">' + data._msgDate + '</span><button class="ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-right ui-icon-delete ui-btn-icon-notext del-fav-btn" type="button" name="button" data-shadow="false">x</button></div><a class="msg-open" href=""><div class="ui-body ui-body-a"><div class="avatar msg-avatar float-left">	<img src="' + data._userImg + '" style="width: 70px; height: 70px; border-radius: 50%;" alt=""></div><strong>' + data._userName + '</strong><br> ' + data._place + '<br> ' + data._job + '	<div class="float-right msg-badge"><span class="">' + data._lengthUnread + '</span></div></div></a></div>';

			return markup;
		}
	});


	//event handler

	$('#messages-main').on('click', '.msg-open', function (e) {
		e.preventDefault();
		var findParent = $(this).parent();
		var official = findParent.jqmData('official');
		var msgId = findParent.jqmData('msg-id');

		if (official) {
			officialState = true;
		} else {
			officialState = false;
			currentMsg = msgId;
		}

		$.mobile.changePage($('#messages-detail'), {
			reloadPage: true,
			changeHash: true
		});
	});

	$('#messages-main').on('click', '.ui-icon-delete', function() {
		var id = $(this).parent().parent().jqmData('msg-id');
		if(confirm('Delete?') === true) {
			// $.ajax({
			// 	method: "DELETE",
			// 	url: "delete.php",
			// 	data: { msgId: id, userId: userId"
			// }).done(function() {
			// 	//rmv view
			// 	$('#msg-' + id ).remove();
			// })
			$('#msg-' + id ).remove();
		}

		console.log(id);

	});


});


$(document).on("pagebeforeshow", '#messages-detail', function () {
	console.log(memberType);
	$('#msg-holder').empty();
	$('#messages-main').off('click');
	$('#msg-holder').off('click');

	if (!officialState) {
		$.ajax({
			method: "GET", //should be post
			data: currentMsg,
			url: "../api/messagelog.json"
		}).done(function (e) {
			console.log(e);
			$('#msg-holder').html(conversationMarkup(e));
		})
	} else {
		$('#msg-holder').html(officialMarkup(officialMsg.msg));
	}


	function officialMarkup(items) {
		var markup = '';
		$.each(items, function(i, v) {
			markup += '' +
				'<div class="detail_block msg_block" data-official="true" id="msg-'+ v._msgId +'">' +
				'<div class="ui-bar ui-bar-a" style="background-color: #71bb06;">' +
				'<span class="float-left">【官方】留言 '+ (i+1) + '</span>' +
				'<span class="float-right" id="official_msg_date" style="margin-right: 20px;"></span>' +
				'<button data-msg-id="' + v._msgId + '" class="delete-btn ui-btn ui-corner-all ui-btn-inline ui-mini ui-btn-right ui-icon-delete ui-btn-icon-notext del-fav-btn" type="button" name="button" data-shadow="false">x</button>' +
				'</div>' +
				'<a href="" class="msg-open">' +
				'<div class="ui-body ui-body-a">' + '<strong>' + v._msgTitle + '</strong><br>' + v._msgBody +'</div>' +
			'</a>' +
			'</div>';
		})
		return markup;
	}


	function conversationMarkup(data) {
		var markup = '<div class="detail_block conversation_block"><div class="ui-bar ui-bar-a"><h3>【求職者】留言</h3></div><div class="ui-body ui-body-a">';
		var myId = data.userId;

		$.each(data.msg_log, function(i, v) {
			if(v._userId === myId) {
				markup += '<div class="msg_wrapper"><div class="msg_title"><span class="msg_me">我</span><span class="msg_time float-right">'+ v._date +'</span></div><div class="msg_body text-justify">'+ v._msg +'</div>	</div>';
			} else {
				markup += '<div class="msg_wrapper"> <div class="msg_title">	<span class="msg_sender">'+ v._username +'</span>	<span class="msg_time float-right">'+ v._date +'</span></div><div class="msg_body text-justify">	'+ v._msg +'	</div></div>';
			}
		})

		markup += '</div><div id="reply_lock"><h3>留言</h3>	<textarea name="msg_reply" rows="4" cols="40"></textarea><button type="submit" id="sendMsg" class="ui-btn ui-corner-all no-bg-bd purple-btn send-btn" data-msg-id="'+ data.msgId +'">送出</button></div></div>';

		return markup;
	}

	//event handler

	$('#msg-holder').on('click', '.delete-btn', function() {
		var id = $(this).jqmData('msg-id');
		if(confirm('Delete?') === true) {
			// $.ajax({
			// 	method: "DELETE",
			// 	url: "delete.php",
			// 	data: { msgId: id, userId: userId"
			// }).done(function() {
			// 	//rmv view
			// 	$('#msg-' + id ).remove();
			// })
			$('#msg-' + id ).remove();
		}

		console.log(id);

	});

	$('#msg-holder').on('click', '#sendMsg', function(e) {
		var id = $(this).jqmData('msg-id');
		var val = $(this).prev().val();

		// $.ajax({
		// 	method: "POST",
		// 	url: "create.php",
		// 	data: {
		// 		userId: userId,
		// 		msgId: id
		// 	}
		// }).done(function(){
		// 	//append
		//
		// 	$('.conversation_block .ui-body-a').append(chatMarkup(val));
		// })

		$('.conversation_block .ui-body-a').append(chatMarkup(val));


		function chatMarkup(v) {

			function formatDate(date) {
				var hours = date.getHours();
				var minutes = date.getMinutes();
				return date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate() + " " + hours + ':' + minutes;
			}

			var date = formatDate(new Date());
			var markup = '<div class="msg_wrapper"><div class="msg_title"><span class="msg_me">我</span><span class="msg_time float-right">' + date + '</span></div><div class="msg_body text-justify">' + v +'</div>	</div>';

			return markup;
		}
	})



});