<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$policy = $_POST['policy'];
$policy_content = $_POST['policy_content'];

$sql_string = "UPDATE `policy` SET `content`='$policy_content' WHERE `item`= '$policy'";
if ($mysqli->query($sql_string)) {
    echo json_encode(array('status' => true, 'message' => '已更新！'));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
