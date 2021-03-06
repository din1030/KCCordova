<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$type = $_GET['type'];
$area_id = $_GET['area_id'];

$sql_string = 'SELECT `lifeservice_info`.`id`,`lifeservice_info`.`name`,`lifeservice_info`.`pic1`,`lifeservice_info`.`slogan`,`country`.`country`,`area`.`area` FROM `lifeservice_info`,`country`,`area` WHERE `lifeservice_info`.`country_id` = `country`.`id` AND `lifeservice_info`.`area_id` = `area`.`id` AND `lifeservice_info`.`life_category` ='.$type.' AND `lifeservice_info`.`area_id`='.$area_id;

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
