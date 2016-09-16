<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$item_id = $_POST['item_id'];
$redeem_title = $_POST['redeem_title'];
$redeem_point = $_POST['redeem_point'];
$redeem_description = $_POST['redeem_description'];

$pic_string = '';
$target_dir = '../www/img/';
$new_filename = 'redeem_'.$item_id.'_'.basename($_FILES['redeem_pic']['name']);
$target_file = $target_dir.$new_filename;

if (file_exists($_FILES['redeem_pic']['tmp_name']) && is_uploaded_file($_FILES['redeem_pic']['tmp_name'])) {
    if (move_uploaded_file($_FILES['redeem_pic']['tmp_name'], $target_file)) {
        $pic_string = ",`photo`='".$new_filename."'";
    }
}

$sql_string = "UPDATE `redeem_item` SET `title`='$redeem_title',`description`='$redeem_description',`point`=$redeem_point".$pic_string." WHERE `id`= '$item_id'";
if ($mysqli->query($sql_string)) {
    echo json_encode(array('status' => true, 'message' => '已更新！'));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
