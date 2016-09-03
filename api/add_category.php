<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$type = $_POST['type'];
$title = $_POST['title'];

$sql_string = "INSERT INTO `category`(`type`, `title`,`created`) VALUES('$type','$title',NOW())";
$result = $mysqli->query($sql_string);
if ($mysqli->affected_rows > 0) {
    $output = array('status' => true, 'message' => '已新增分類！', 'insert_id' => $mysqli->insert_id);
    echo json_encode($output);

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！', 'sql' => $sql_string);
    echo json_encode($output);
    exit;
}
