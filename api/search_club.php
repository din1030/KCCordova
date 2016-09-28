<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$type = $_GET['type'];
$area_id = $_GET['area_id'];

$sql_string = 'SELECT `club_info`.`admin_id`,`club_info`.`name`,`club_info`.`pic1`,`club_info`.`slogan`,`club_info`.`updated`,`country`.`country`,`area`.`area` FROM `club_info`,`country`,`area` WHERE `club_info`.`country_id` = `country`.`id` AND `club_info`.`area_id` = `area`.`id` AND `club_info`.`category` ='.$type.' AND `club_info`.`area_id`='.$area_id." AND `club_info`.`lang`='$lang'";

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['updated'] = date('Y/m/d H:i', strtotime($r['updated']));
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));

    return;
} else {
    $output = array('status' => false, 'message' => '沒有符合的結果，請重新查詢。');
    echo json_encode($output);
    exit;
}
