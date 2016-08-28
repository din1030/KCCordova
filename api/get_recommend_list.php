<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$member_id = $_GET['member_id'];

$sql_string = "SELECT `name`, `created` FROM `user` WHERE `ref_id`='$member_id' ORDER BY `created` DESC";

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['created'] = date('Y/m/d', strtotime($r['created']));
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));

    return;
} else {
    $output = array('status' => false, 'message' => '您目前沒有推薦記錄，快邀請朋友使用 Kelly Club 吧！');
    echo json_encode($output);
    exit;
}
