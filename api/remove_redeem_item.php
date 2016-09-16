<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$item_id = $_POST['item_id'];

$sql_string = "UPDATE `redeem_item` SET `active`=0 WHERE `id`=$item_id";
if ($mysqli->query($sql_string)) {
    echo json_encode(array('status' => true, 'message' => '已刪除禮品！'));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
