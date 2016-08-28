<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$admin_id = $_POST['admin_id'];

$interviewer = $_POST['interviewer-input'];
$tel = $_POST['interview-tel-input'];
$line = $_POST['interview-line-input'];
$offer_content = $_POST['offer_content'];
$welfare = $_POST['welfare'];

// 判斷是否已有資料
$sql_string = "SELECT * FROM `club_offer` WHERE `admin_id` = '$admin_id' LIMIT 1";
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    $update_string = "UPDATE `club_offer` SET `interviewer`='$interviewer',`tel`='$tel',`line`='$line',`offer_content`='$offer_content',`welfare`='$welfare' WHERE `admin_id` = '$admin_id'";
    $sql = $mysqli->query($update_string);
    if ($mysqli->affected_rows > 0) {
        $output = array('status' => true, 'message' => '資料已修改！');
        echo json_encode($output);

        return;
    } else {
        $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！');
        echo json_encode($output);
        exit;
    }
} else {
    // 儲存資料
    $insert_string = "INSERT INTO `club_offer`(`admin_id`, `interviewer`, `tel`, `line`, `offer_content`, `welfare`, `created`) VALUES ('$admin_id','$interviewer','$tel','$line','$offer_content','$welfare', NULL)";

    if ($mysqli->affected_rows > 0) {
        $output = array('status' => true, 'message' => '資料已修改！');
        echo json_encode($output);

        return;
    } else {
        $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！');
        echo json_encode($output);
        exit;
    }
}
