<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$sql_string = 'SELECT DISTINCT ref.`id`,ref.`name`,ref.`country`,ref.`area`,ref.`created` FROM `user` ref JOIN `user` rec ON ref.`member_id`= rec.`ref_id`';

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['created'] = date('Y/m/d H:i', strtotime($r['created']));
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));

    return;
} else {
    $output = array('status' => false, 'message' => '目前沒有推薦記錄！');
    echo json_encode($output);
    exit;
}
