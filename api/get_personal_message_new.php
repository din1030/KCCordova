<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$id = $_GET['id'];
$user_type = '';
$from_type = 0;

$user_string = 'SELECT * FROM `user` WHERE `id`='.$id;
$user_result = $mysqli->query($user_string);

if ($user_result->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($user_result)) {
        $user_type = $r['type'];
    }
    if ($user_type == '2') {
        $sql_string = 'SELECT list.*,`seeker_info`.`nickname` name, `seeker_info`.`pic1`,`country`.`country`,`area`.`area`  FROM (SELECT `id`, MAX(`last_time`) time FROM (SELECT `messages`.`from_id` id, MAX(`time`) last_time FROM `messages` WHERE `to_id`='.$id.' GROUP BY `from_id` UNION SELECT `messages`.`to_id` id, MAX(`time`) last_time FROM `messages` WHERE `from_id`='.$id.' GROUP BY `to_id`) r GROUP BY `id` ORDER BY `time` DESC) list,`seeker_info`,`country`,`area` WHERE list.`id`=`seeker_info`.`u_id` AND `seeker_info`.`country_id` = `country`.`id` AND `seeker_info`.`area_id` = `area`.`id`';
        $from_type = 3;
    } elseif ($user_type == '3') {
        $sql_string = 'SELECT list.*,`club_info`.`name`, `club_info`.`pic1`,`country`.`country`,`area`.`area`  FROM (SELECT `id`, MAX(`last_time`) time FROM (SELECT `messages`.`from_id` id, MAX(`time`) last_time FROM `messages` WHERE `to_id`='.$id.' GROUP BY `from_id` UNION SELECT `messages`.`to_id` id, MAX(`time`) last_time FROM `messages` WHERE `from_id`='.$id.' GROUP BY `to_id`) r GROUP BY `id` ORDER BY `time` DESC) list,`club_info`,`country`,`area` WHERE list.`id`=`club_info`.`admin_id` AND `club_info`.`country_id` = `country`.`id` AND `club_info`.`area_id` = `area`.`id`';
        $from_type = 2;
    }
    $sql = $mysqli->query($sql_string);
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['from_type'] = $from_type;
        $r['last_time'] = date('Y/m/d H:i', strtotime($r['last_time']));
        $output[] = $r;
    }

    echo json_encode(array('status' => true, 'msg' => $output));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '您目前沒有訊息記錄！'));
    exit;
}
