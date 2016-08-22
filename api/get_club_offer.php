<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$club_id = $_GET['club_id'];
$sql_string = "SELECT * FROM `club_offer` WHERE `club_offer`.`admin_id`='$club_id'";

$result = $mysqli->query($sql_string);
if (mysqli_num_rows($result) > 0) {
    while ($r = mysqli_fetch_assoc($result)) {
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));
} else {
    $output = array('status' => false, 'message' => '暫無資料');
    echo json_encode($output);
}
