<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_GET['user_id'];

$sql_string = "SELECT * FROM `user` WHERE `id`=$user_id LIMIT 1";
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        if ($r['gender'] == 0) {
            $r['gender'] = '女';
        } elseif ($r['gender'] == 1) {
            $r['gender'] = '男';
        } elseif ($r['gender'] == 2) {
            $r['gender'] = '第三性';
        }
        $output = $r;
        if ($r['type'] == 2) {
            $plan_string = "SELECT `plan`.`title` as plan_title, `club_info`.`publish_start`, `club_info`.`publish_due` FROM `club_info`,`plan` WHERE `club_info`.`publish_plan`=`plan`.`id` AND  `club_info`.`publish_due` >= CURDATE() AND `admin_id`=$user_id LIMIT 1";
            $club_sql = $mysqli->query($plan_string);
            if ($club_sql->num_rows > 0) {
                $club = mysqli_fetch_assoc($club_sql);
                $output = array_merge($output, $club);
            }
        }
    }
    echo json_encode(array('status' => true, 'result' => $output));

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！');
    echo json_encode($output);
    exit;
}
