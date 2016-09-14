<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_GET['user_id'];

$sql_string = "SELECT rec.`name`,rec.`created` FROM `user` ref JOIN `user` rec ON ref.`member_id`= rec.`ref_id` WHERE ref.`id`=$user_id ORDER BY rec.`created` DESC";

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['created'] = date('Y/m/d H:i', strtotime($r['created']));
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'total' => $sql->num_rows, 'result' => $output));

    return;
} else {
    $output = array('status' => false, 'message' => '您目前沒有推薦記錄，快邀請朋友使用 Kelly Club 吧！');
    echo json_encode($output);
    exit;
}
