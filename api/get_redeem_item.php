<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$sql_string = 'SELECT * FROM `redeem_item`';
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));

    return;
} else {
    $output = array('status' => false, 'message' => '尚無可兌換之禮品！');
    echo json_encode($output);
    exit;
}
