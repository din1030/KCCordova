<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$u_id = $_POST['u_id'];
$tel = $_POST['tel-input'];
$mobile = $_POST['mobile-input'];

// 判斷是否已有資料
$sql_string = "SELECT * FROM `user` WHERE `id` = '$u_id' LIMIT 1";
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    $pic_string = '';
    $target_dir = '../www/img/';
    $new_filename = $u_id.'_'.basename($_FILES['profile_photo']['name']);
    $target_file = $target_dir.$new_filename;
    if (move_uploaded_file($_FILES['profile_photo']['tmp_name'], $target_file)) {
        $pic_string = ",`pic`='".$new_filename."'";
    }
    $update_string = "UPDATE `user` SET `tel`='$tel',`mobile`='$mobile'".$pic_string." WHERE `id` = '$u_id'";
    $sql = $mysqli->query($update_string);
    if ($mysqli->affected_rows > 0) {
        $output = array('status' => true, 'message' => '資料已修改！');
        echo json_encode($output);

        return;
    } else {
        $output = array('status' => false, 'message' => '更新失敗，請稍後再試！');
        echo json_encode($output);
        exit;
    }
} else {
    $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！');
    echo json_encode($output);
    exit;
}
