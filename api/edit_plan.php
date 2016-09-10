<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$plan_id = $_POST['plan_id'];
$plan_title = $_POST['plan_title'];
$plan_content = $_POST['plan_content'];

$sql_string = "UPDATE `plan` SET `title`='$plan_title',`description`='$plan_content' WHERE `id`= '$plan_id'";
if ($mysqli->query($sql_string)) {
    echo json_encode(array('status' => true, 'message' => '已更新！'));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
