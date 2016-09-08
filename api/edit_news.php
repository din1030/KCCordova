<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$news_id = $_POST['news_id'];
$news_title = $_POST['news_edit_title'];
$news_start = $_POST['news_edit_start'];
$news_end = $_POST['news_edit_end'];
$news_order = $_POST['news_edit_order'];
$news_content = $_POST['news_edit_content'];

$pic_string = '';
$target_dir = '../www/img/';
$new_filename = 'news_'.$news_id.'_'.basename($_FILES['news_edit_pic']['name']);
$target_file = $target_dir.$new_filename;

if (move_uploaded_file($_FILES['news_edit_pic']['tmp_name'], $target_file)) {
    $pic_string = ",`pic`='".$new_filename."'";
}

$update_string = "UPDATE `news` SET `title`='$news_title'".$pic_string."',`content`='$news_content',`start_date`='$news_start',`end_date`='$news_end',`order_no`='$news_order' WHERE `id`='$news_id'";
if ($mysqli->query($update_string)) {
    $output = array('status' => true, 'message' => '最新消息資料已修改！');
    echo json_encode($output);

    return;
} else {
    $output = array('status' => false, 'message' => '更新失敗，請稍後再試！');
    echo json_encode($output);
    exit;
}
