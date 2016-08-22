<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_GET['user_id'];
$type = $_GET['type'];
$item_id = $_GET['item_id'];

// 判斷是否帳號已經存在
$sql_string = "SELECT * FROM `favorite` WHERE `u_id` = $user_id AND `type` = $type AND `item_id` = $item_id LIMIT 1";
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    $output = array('status' => false, 'message' => '已收藏過本項目！');
    echo json_encode($output);
    exit;
} else {
    $sql_string = "INSERT INTO `favorite`(`u_id`, `type`, `item_id`) VALUES($user_id,$type,$item_id)";
    $result = $mysqli->query($sql_string);
    if ($mysqli->affected_rows > 0) {
        $output = array('status' => true, 'message' => '已加入收藏夾！');
        echo json_encode($output);
        exit;
    } else {
        $output = array('status' => false, 'message' => '請重新操作！');
        echo json_encode($output);
        exit;
    }
}
