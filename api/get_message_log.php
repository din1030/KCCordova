<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$self_id = $_GET['self_id'];
$talk_id = $_GET['talk_id'];

$sql_string = "(SELECT `messages`.*, `club_info`.`name` name FROM `messages`,`club_info` WHERE ((`from_id`=$self_id AND `to_id`=$talk_id) OR (`from_id`=$talk_id AND `to_id`=$self_id)) AND `from_type`=2 AND `messages`.`from_id`=`club_info`.`admin_id`) UNION (SELECT `messages`.*, `seeker_info`.`nickname` name FROM `messages`,`seeker_info` WHERE ((`from_id`=$self_id AND `to_id`=$talk_id) OR (`from_id`=$talk_id AND `to_id`=$self_id)) AND `from_type`=3 AND `messages`.`from_id`=`seeker_info`.`u_id`) ORDER BY `time`";

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['time'] = date('Y/m/d H:i', strtotime($r['time']));
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'talk_id' => $talk_id, 'msg' => $output));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '您目前沒有訊息記錄！'));
    exit;
}
