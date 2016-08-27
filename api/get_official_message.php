<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$type = $_GET['type'];
$sql_string = 'SELECT * FROM `official_message` WHERE `type`=0 OR `type`='.$type;
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['created'] = date('Y/m/d', strtotime($r['created']));
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'msg' => $output));

    return;
} else {
    $output[] = array('id' => 0, 'title' => '官方訊息', 'content' => '目前沒有官方訊息，我們會在第一時間通知您最新訊息！', 'created' => date('Y/m/d'));
    echo json_encode(array('status' => false, 'msg' => $output));
    exit;
}
