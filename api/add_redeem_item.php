<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$redeem_title = $_POST['redeem_title'];
$redeem_description = $_POST['redeem_description'];
$redeem_point = $_POST['redeem_point'];

$pic_string = '';
$target_dir = '../www/img/';

$insert_string = "INSERT INTO `redeem_item`(`title`,`description`,`point`,`created`) VALUES ('$redeem_title','$redeem_description',$redeem_point,NOW())";
if ($mysqli->query($insert_string)) {
    $last_id = $mysqli->insert_id;
    $new_filename = 'redeem_'.$last_id.'_'.basename($_FILES['redeem_pic']['name']);
    $target_file = $target_dir.$new_filename;
    if (move_uploaded_file($_FILES['redeem_pic']['tmp_name'], $target_file)) {
        $pic_string = "UPDATE `redeem` SET `pic`='$new_filename' WHERE `id`=$last_id";
        $mysqli->query($pic_string);
    }

    $output = array('status' => true, 'message' => '已新增最新消息！');
    echo json_encode($output);

    return;
} else {
    $output = array('status' => false, 'message' => '更新失敗，請稍後再試！');
    echo json_encode($output);
    exit;
}
