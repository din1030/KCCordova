<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_POST['user_id'];
// $state = $_POST['state'];

$update_string = "UPDATE `user` SET `approved`='1' WHERE `id`=$user_id";
if ($mysqli->query($update_string)) {
    // $output = $state;
    echo json_encode(array('status' => true, 'message' => '已核准此使用者！'));

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！');
    echo json_encode($output);
    exit;
}
