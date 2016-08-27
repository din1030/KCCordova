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
} else {
    $output = array('status' => false, 'message' => '尚無推薦名單！');
    echo json_encode($output);
}
