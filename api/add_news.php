<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

// $news_id = $_POST['news_id'];
$news_title = $_POST['news_title'];
$news_start = $_POST['news_start'];
$news_end = $_POST['news_end'];
$news_order = $_POST['news_order'];
$news_content = $_POST['news_content'];

$pic_string = '';
$target_dir = '../www/img/';
$new_filename = 'news_'.$news_id.'_'.basename($_FILES['news_pic']['name']);
$target_file = $target_dir.$new_filename;

if (move_uploaded_file($_FILES['news_pic']['tmp_name'], $target_file)) {
    $pic_string = ",`pic`='".$new_filename."'";
}

$insert_string = "INSERT INTO `news`(`title`, `content`, `start_date`, `end_date`, `order_no`, `created`) VALUES ('$news_title','$news_content','$news_start','$news_end','$news_order',NOW())";
if ($mysqli->query($insert_string)) {
    $output = array('status' => true, 'message' => '最新消息資料已修改！');
    echo json_encode($output);

    return;
} else {
    $output = array('status' => false, 'message' => '更新失敗，請稍後再試！');
    echo json_encode($output);
    exit;
}
