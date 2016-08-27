<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$type = $_GET['type'];
$gender = $_GET['gender'];
$area_id = $_GET['area'];

$sql_string = "SELECT `seeker_info`.`u_id`,`seeker_info`.`nickname`,`seeker_info`.`pic1` FROM `seeker_info`,`user` WHERE `seeker_info`.`u_id` = `user`.`id` AND `seeker_info`.`seek_category` ='.$type.' AND `seeker_info`.`area_id`='.$area_id.' AND `gender`='".$gender."'";

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));

    return;
} else {
    $output = array('status' => false, 'message' => '沒有符合的結果，請重新查詢。');
    echo json_encode($output);
    exit;
}
