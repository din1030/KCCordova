<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$fav_id = $_POST['fav_id'];

// 判斷是否帳號已經存在
$sql_string = "DELETE FROM `favorite` WHERE `fav_id` = $fav_id";
$sql = $mysqli->query($sql_string);
if ($mysqli->affected_rows > 0) {
    $output = array('status' => true, 'message' => '已刪除收藏項目！');
    echo json_encode($output);

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！');
    echo json_encode($output);
    exit;
}
