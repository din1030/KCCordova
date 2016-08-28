<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_POST['user_id'];
$item_id = $_POST['item_id'];

$sql_string = "INSERT INTO `redeem_record`(`u_id`, `item_id`,`created`) VALUES ($user_id, $item_id, NULL)";

$sql = $mysqli->query($sql_string);
if ($mysqli->affected_rows > 0) {
    $email = 'din1030@gmail.com';
    $message = "User $user_id 兌換 Item $item_id";
    $title = '禮品兌換通知';
    $headers = 'From: Kelly Cub <support@kellyclub.com>'."\n"; //寄件者
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    mail($email, '=?utf-8?B?'.base64_encode($title).'?=', $message, $headers);

    echo json_encode(array('status' => true, 'message' => '兌換成功！'));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
