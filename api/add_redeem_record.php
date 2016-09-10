<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_POST['user_id'];
$item_id = $_POST['item_id'];

$sql_string = "INSERT INTO `redeem_record`(`u_id`, `item_id`,`created`) VALUES ($user_id, $item_id, NOW())";

$sql = $mysqli->query($sql_string);
if ($mysqli->affected_rows > 0) {
    $user_string = "SELECT * FROM `user` WHERE `id`=$user_id LIMIT 1";
    $sql = $mysqli->query($user_string);
    if ($sql->num_rows > 0) {
        while ($r = mysqli_fetch_assoc($sql)) {
            if ($r['gender'] == 0) {
                $r['gender'] = '女';
            } elseif ($r['gender'] == 1) {
                $r['gender'] = '男';
            } elseif ($r['gender'] == 2) {
                $r['gender'] = '第三性';
            }
            if ($r['type'] == 1) {
                $r['type'] = '一般會員';
            } elseif ($r['type'] == 2) {
                $r['type'] = '店家會員';
            } elseif ($r['type'] == 3) {
                $r['type'] = '求職者會員';
            }
            $member = $r;
        }
    }
    $item_string = "SELECT * FROM `redeem_item` WHERE `id`=$item_id LIMIT 1";
    $sql = $mysqli->query($item_string);
    if ($sql->num_rows > 0) {
        $item = mysqli_fetch_assoc($sql);
    }
    $email = 'din1030@gmail.com';
    $message = $member['type'].$member['name'].'<br>Email:'.$member['email'].'<br>電話:'.$member['tel'].'<br>手機:'.$member['mobile'].'<br>兌換項目：'.$item['title'].$item['description'];
    $title = '禮品兌換通知';
    $headers = 'From: Kelly Club <support@kellyclub.com>'."\n"; //寄件者
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    mail($email, '=?utf-8?B?'.base64_encode($title).'?=', $message, $headers);

    echo json_encode(array('status' => true, 'message' => '兌換成功！'));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
