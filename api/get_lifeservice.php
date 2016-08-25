<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';
$sql_string = "SELECT * FROM `category` WHERE `type`='life'";
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $store_string = "SELECT * FROM `lifeservice_info` WHERE `life_category='$r[id]'";
        $store_sql = $mysqli->query($store_string);
        while ($s = mysqli_fetch_assoc($store_sql)) {
            $store[] = $s;
        }
        $r['store'] = $store;
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));
} else {
    $output = array('status' => false, 'message' => '請重新操作');
    echo json_encode($output);
}
