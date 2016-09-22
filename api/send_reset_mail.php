<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$email = trim($_POST['reset_email']);

$sql = $mysqli->query("SELECT * FROM `user` WHERE `email`='$email'");
if ($sql->num_rows == 1) {
    $reset_code = rand(10000000, 99999999);
    if ($mysqli->query("UPDATE `user` SET `reset_code`='$reset_code' WHERE `email`='$email'")) {
        // $reset_link = 'http://52.69.53.255/KCCordova/reset_password.php?email='.$email.'&reset_code='.$reset_code;
        // $message = '請店選或複製以下連結以設定新的密碼，若您未曾申請重設密碼，忽略本信件即可。<br><a href="'.$reset_link.'">'.$reset_link.'</a>';
        $message = "您的密碼重設驗證碼為 $reset_code，若您未設申請重設密碼，忽略本信件即可。";
        $title = '密碼重設驗證碼通知';
        $headers = 'From: Kelly Club <support@kellyclub.com>'."\n"; //寄件者
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        mail($email, '=?utf-8?B?'.base64_encode($title).'?=', $message, $headers);

        echo json_encode(array('status' => true, 'message' => '兌換成功！'));

        return;
    }
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
