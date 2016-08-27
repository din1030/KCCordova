<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$id = $_GET['id'];
$sql_string = '(SELECT `messages`.*, `club_info`.`name` name, `club_info`.`pic1`, `country`.`country`,`area`.`area` FROM `messages`,`club_info`,`country`,`area` WHERE `to_id`='.$id.' AND `from_type`=2 AND `club_info`.`country_id` = `country`.`id` AND `club_info`.`area_id` = `area`.`id` AND `messages`.`from_id`=`club_info`.`admin_id`)
UNION
(SELECT `messages`.*, `seeker_info`.`nickname` name, `seeker_info`.`pic1`, `country`.`country`,`area`.`area` FROM `messages`,`seeker_info`,`country`,`area` WHERE `to_id`='.$id.' AND `from_type`=3 AND `seeker_info`.`country_id` = `country`.`id` AND `seeker_info`.`area_id` = `area`.`id` AND `messages`.`from_id`=`seeker_info`.`u_id`)';

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'msg' => $output));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '您目前沒有訊息記錄！'));
    exit;
}
?>
{
	"userId": 12321,
	"msg": [
		{
			"_msgId": 1,
			"_msgType": 0,
			"_userName": "userName1",
			"_userImg": "img/seeker-a.jpg",
			"_nickName": "藝名：水噹噹",
			"_place": "台中市｜南屯區",
			"_msgDate": "2016/05/21",
			"_lengthUnread": 5
		}, {
			"_msgId": 2,
			"_msgType": 1,
			"_userName": "userName2",
			"_userImg": "img/seeker-b.jpg",
			"_place": "台中市｜南屯區",
			"_job": "公關 Larmar 客服專員",
			"_msgDate": "2016/05/22",
			"_lengthUnread": 3
		}, {
			"_msgId": 3,
			"_msgType": 0,
			"_userName": "userName3",
			"_userImg": "img/seeker-c.jpg",
			"_nickName": "藝名：水噹噹",
			"_place": "台中市｜南屯區",
			"_msgDate": "2016/05/23",
			"_lengthUnread": 1
		}, {
			"_msgId": 4,
			"_msgType": 1,
			"_userName": "userName4",
			"_userImg": "img/seeker-b.jpg",
			"_place": "台中市｜南屯區",
			"_job": "公關 Larmar 客服專員",
			"_msgDate": "2016/05/24",
			"_lengthUnread": 5
		}
	]
}
