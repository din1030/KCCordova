<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$receiver = $_POST['receiver'];
$list_table = $_POST['list_table'];
$subject = $_POST['subject'];

$headers = 'From: Kelly Cub <support@kellyclub.com>'."\n"; //寄件者
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
if (mail($receiver, '=?utf-8?B?'.base64_encode($subject).'?=', $list_table, $headers)) {
    echo json_encode(array('status' => true, 'message' => '已將名單寄至您的信箱！'));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
