<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$type = $_POST['msg_type'];
$title = $_POST['msg_title'];
$content = $_POST['msg_content'];

$sql_string = "INSERT INTO `official_message`(`type`,`title`,`content`,`created`) VALUES('$type','$title','$content',NOW())";
$result = $mysqli->query($sql_string);
if ($mysqli->affected_rows > 0) {
    $output = array('status' => true, 'message' => '已新增分類！');
    echo json_encode($output);

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！', 'sql' => $sql_string);
    echo json_encode($output);
    exit;
}
