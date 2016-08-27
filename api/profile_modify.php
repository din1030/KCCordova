<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_POST['user_id'];
$u_id = $_POST['u_id'];
$tel = $_POST['tel-input'];
$mobile = $_POST['mobile-input'];
foreach ($_FILES as $file) {
    $n = $file['name'];
    $s = $file['size'];
    if (!$n) {
        continue;
    }
    echo "File: $n ($s bytes)";
}
if ($_FILES['profile_photo']['error'] > 0) {
    echo 'Error: '.$_FILES['profile_photo']['error'];
} else {
    echo '檔案名稱: '.$_FILES['profile_photo']['name'].'<br/>';
    echo '檔案類型: '.$_FILES['profile_photo']['type'].'<br/>';
    echo '檔案大小: '.($_FILES['profile_photo']['size'] / 1024).' Kb<br />';
    echo '暫存名稱: '.$_FILES['profile_photo']['tmp_name'];
}
$target_dir = '../www/img/';
$target_file = $target_dir.basename($_FILES['profile_photo']['name']);
if (move_uploaded_file($_FILES['profile_photo']['tmp_name'], $target_file)) {
    echo 'The file '.basename($_FILES['profile_photo']['name']).' has been uploaded.';
} else {
    echo 'Sorry, there was an error uploading your file.';
}
// 判斷是否已有資料
$sql_string = "SELECT * FROM `user` WHERE `id` = '$u_id' LIMIT 1";
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    $update_string = "UPDATE `user` SET `tel`='$tel',`mobile`='$mobile' WHERE `id` = '$u_id'";
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
    $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！');
    echo json_encode($output);
    exit;
}
