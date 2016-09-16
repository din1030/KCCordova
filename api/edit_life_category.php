<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$cat_id = $_POST['cat_id'];
$title = $_POST['title'];

$pic_string = '';
$target_dir = '../www/img/';
$new_filename = 'lifecat_'.$cat_id.'_'.basename($_FILES['life_pic']['name']);
$target_file = $target_dir.$new_filename;

if (file_exists($_FILES['life_pic']['tmp_name']) && is_uploaded_file($_FILES['life_pic']['tmp_name'])) {
    if (move_uploaded_file($_FILES['life_pic']['tmp_name'], $target_file)) {
        $pic_string = ",`pic`='".$new_filename."'";
    }
}

$sql_string = "UPDATE `category` SET `title`='$title'".$pic_string." WHERE `id`= '$cat_id'";
if ($mysqli->query($sql_string)) {
    echo json_encode(array('status' => true, 'message' => '已更新！'));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
