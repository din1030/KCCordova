<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$email = $_POST['rst_email'];
$pswd1 = $_POST['reset_pswd'];
$pswd2 = $_POST['reset_pswd_chk'];
if ($pswd1 != $pswd2) {
    echo json_encode(array('status' => false, 'message' => '密碼不一致，請重新輸入！'));
    exit;
}
$password = password_hash($_POST['reset_pswd'], PASSWORD_DEFAULT);
$reset_code = $_POST['reset_code'];

$update_string = "UPDATE `user` SET `password`='$password' WHERE `email`='$email' AND `reset_code`='$reset_code'";
$result = $mysqli->query($update_string);
if ($result->affected_rows == 1) {
    echo json_encode(array('status' => true, 'message' => '密碼已更新！'));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
