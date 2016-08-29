<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$u_id = $_POST['u_id'];
$state = $_POST['state'];

$update_string = "UPDATE `seeker_info` SET `active`='$state' WHERE `u_id`=$u_id";
if ($mysqli->query($update_string)) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $output = $state;
    }
    echo json_encode(array('status' => true, 'result' => $output));
} else {
    $output = array('status' => false, 'message' => '請重新操作！');
    echo json_encode($output);
}
