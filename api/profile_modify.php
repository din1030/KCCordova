<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_POST['user_id'];
// $formData = $_POST['formData'];

// $params = array();
// parse_str($formData, $params);
// print_r($params);

$u_id = $_POST['u_id'];
$tel = $_POST['tel-input'];
$mobile = $_POST['mobile-input'];

// 判斷是否已有資料
$sql_string = "SELECT * FROM `user` WHERE `id` = '$u_id' LIMIT 1";
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    $update_string = "UPDATE `user` SET `tel`='$tel',`mobile`='$mobile' WHERE `id` = '$u_id'";
    $sql = $mysqli->query($update_string);
    if ($mysqli->affected_rows > 0) {
        $output = array('status' => true, 'message' => '資料已修改！');
        echo json_encode($output);
        exit;
    } else {
        $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！');
        echo json_encode($output);
        exit;
    }
} else {
    $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！');
    echo json_encode($output);
    exit;
}
