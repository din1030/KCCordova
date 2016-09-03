<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$cat_id = $_POST['cat_id'];

$sql_string = "DELETE FROM `category` WHERE `id`=$cat_id";
$sql = $mysqli->query($sql_string);
if ($mysqli->affected_rows > 0) {
    $output = array('status' => true, 'message' => '已刪除分類！');
    echo json_encode($output);

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！', 'sql' => $sql_string);
    echo json_encode($output);
    exit;
}
