<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_GET['user_id'];

$sql_string = "SELECT * FROM `favorite` WHERE `u_id`=$user_id";
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        if ($r['type'] == 2) {
            $sql_string2 = "SELECT `club_info`.`admin_id`,`club_info`.`name`,`country`.`country`,`area`.`area` FROM `club_info`,`country`,`area` WHERE `club_info`.`country_id` = `country`.`id` AND `club_info`.`area_id` = `area`.`id` AND `club_info`.`admin_id`=$r[item_id]";
            $sql2 = $mysqli->query($sql_string2);
            $detail = mysqli_fetch_assoc($sql2);
            $detail['type'] = 2;
            // $r = array_merge($r, $detail);
            $output[] = $detail;
        } elseif ($r['type'] == 3) {
            $sql_string3 = "SELECT `seeker_info`.`u_id`,`seeker_info`.`nickname`,`country`.`country`,`area`.`area` FROM `seeker_info`,`country`,`area` WHERE `seeker_info`.`country_id`=`country`.`id` AND `seeker_info`.`area_id`=`area`.`id` AND `seeker_info`.`u_id`=$r[item_id]";
            $sql3 = $mysqli->query($sql_string3);
            $detail = mysqli_fetch_assoc($sql3);
            $detail['type'] = 3;
            // $r = array_merge($r, $detail);
            $output[] = $detail;
        }
    }
    echo json_encode(array('status' => true, 'result' => $output));
} else {
    $output = array('status' => false, 'message' => '您的收藏夾是空的！');
    echo json_encode($output);
}
