<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$id = $_GET['id'];
$sql_string = '(SELECT `messages`.*, MAX(`time`) last_time, `club_info`.`name` name, `club_info`.`pic1`, `country`.`country`,`area`.`area` FROM `messages`,`club_info`,`country`,`area` WHERE `to_id`='.$id.' AND `from_type`=2 AND `club_info`.`country_id` = `country`.`id` AND `club_info`.`area_id` = `area`.`id` AND `messages`.`from_id`=`club_info`.`admin_id` GROUP BY `from_id`)
UNION
(SELECT `messages`.*, MAX(`time`) last_time, `seeker_info`.`nickname` name, `seeker_info`.`pic1`, `country`.`country`,`area`.`area` FROM `messages`,`seeker_info`,`country`,`area` WHERE `to_id`='.$id.' AND `from_type`=3 AND `seeker_info`.`country_id` = `country`.`id` AND `seeker_info`.`area_id` = `area`.`id` AND `messages`.`from_id`=`seeker_info`.`u_id` GROUP BY `from_id`) ORDER BY `last_time` DESC';

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['last_time'] = date('Y/m/d H:i', strtotime($r['last_time']));
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'msg' => $output));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '您目前沒有訊息記錄！'));
    exit;
}
