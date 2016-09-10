<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$plan_title = $_POST['plan_title'];
$plan_content = $_POST['plan_content'];

$sql_string = "INSERT INTO `plan`(`title`,`description`,`created`) VALUES('$plan_title','$plan_content',NOW())";

$result = $mysqli->query($sql_string);
if ($mysqli->affected_rows > 0) {
    $output = array('status' => true, 'message' => "已新增「$plan_title」！");
    echo json_encode($output);

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！', 'sql' => $sql_string);
    echo json_encode($output);
    exit;
}
