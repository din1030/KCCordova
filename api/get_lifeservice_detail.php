<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';
$store_id = $_GET['store_id'];
$sql_string = 'SELECT * FROM `lifeservice_info` WHERE `id`='.$store_id.' LIMIT 1';
$result = $mysqli->query($sql_string);
if (mysqli_num_rows($result) > 0) {
    while ($r = mysqli_fetch_assoc($result)) {
        $r['opentime'] = array($r['opentime1'], $r['opentime2']);
        $r['pic'] = array($r['pic1'], $r['pic2'], $r['pic3'], $r['pic4'], $r['pic5']);
        unset($r['opentime1']);
        unset($r['opentime2']);
        unset($r['pic1']);
        unset($r['pic2']);
        unset($r['pic3']);
        unset($r['pic4']);
        unset($r['pic5']);
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));

    return;
} else {
    $output[] = array('status' => false, 'message' => '暫無資料！');
    echo json_encode($output);
    exit;
}
