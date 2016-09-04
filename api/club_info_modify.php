<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$admin_id = $_POST['admin_id'];

$name = $_POST['name-input'];
$category = $_POST['club_type'];
$tel = $_POST['tel-input'];
$address = $_POST['address-input'];

$opentime1 = $_POST['opentime1'];
$opentime2 = $_POST['opentime2'];
$opentime3 = $_POST['opentime3'];
$opentime4 = $_POST['opentime4'];
$opentime5 = $_POST['opentime5'];

$website = $_POST['website-input'];
$slogan = $_POST['slogan-input'];
$video = $_POST['video-input'];
$description = $_POST['description'];

// 判斷是否已有資料
$sql_string = "SELECT * FROM `club_info` WHERE `admin_id` = '$admin_id' LIMIT 1";
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    $update_string = "UPDATE `club_info` SET `name`='$name',`category`='$category',`club_tel`='$tel',`address`='$address',`opentime1`='$opentime1',`opentime2`='$opentime2',`opentime3`='$opentime3',`opentime4`='$opentime4',`opentime5`='$opentime5',`website`='$website',`slogan`='$slogan',`video_url`='$video',`description`='$description' WHERE `admin_id` = '$admin_id'";
    if ($mysqli->query($update_string)) {
        $output = array('status' => true, 'message' => '資料已修改！');
        echo json_encode($output);

        return;
    } else {
        $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！', 'sql' => $update_string);
        echo json_encode($output);
        exit;
    }
} else {
    // 儲存資料
    $insert_string = 'INSERT INTO `club_info`(`admin_id`, `category`, `name`, `address`,`club_tel`, `slogan`, `video_url`, `website`, `opentime1`, `opentime2`, `opentime3`, `opentime4`, `opentime5`, `description` `created`) VALUES'." ('$admin_id',$category,'$name','$address','$tel','$slogan','$video','$websiten','$opentime1','$opentime2','$opentime3','$opentime4','$opentime5','$description', NOW())";

    if ($mysqli->query($insert_string)) {
        $output = array('status' => true, 'message' => '資料已新增！');
        echo json_encode($output);

        return;
    } else {
        $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！', 'sql' => $insert_string);
        echo json_encode($output);
        exit;
    }
}
