<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$action = $_GET['action'];
$type = $_GET['type'];

$output = array();
if ($action == 'get_category') {
    if (!empty($type)) {
        $sql_string = "SELECT id,title FROM `category` WHERE `type`='$type'";
        $result = $mysqli->query($sql_string);
        if ($result->num_rows > 0) {
            while ($r = mysqli_fetch_assoc($result)) {
                $output[] = $r;
            }
            echo json_encode($output);
        } else {
            $output[] = array('id' => 0, 'title' => '無可選資料');
            echo json_encode($output);
        }
    }
    // else {
    //     $output[] = array('status' => false, 'message' => '請重新操作！');
    //     echo json_encode($output);
    // }
}
