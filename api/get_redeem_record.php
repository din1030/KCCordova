<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_GET['user_id'];

$sql_string = "SELECT ri.`point`,ri.`title`,ri.`description`,rr.`created` FROM `redeem_record` rr,`redeem_item` ri WHERE rr.`item_id`=ri.`id` AND rr.`u_id`=$user_id ORDER BY rr.`created` DESC ";

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    $used_point = 0;
    while ($r = mysqli_fetch_assoc($sql)) {
        $used_point += $r['point'];
        $r['created'] = date('Y/m/d', strtotime($r['created']));
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'used_point' => $used_point, 'result' => $output));

    return;
} else {
    $output = array('status' => false, 'message' => '您目前沒有兌換記錄，推薦朋友使用 Kelly Club 來獲得點數吧！');
    echo json_encode($output);
    exit;
}
