<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$club_id = $_GET['club_id'];

$sql_string = 'SELECT * FROM `club_consume` INNER JOIN `club_consume_detail` USING(`admin_id`) WHERE `admin_id`='.$club_id;
$result = $mysqli->query($sql_string);
if (mysqli_num_rows($result) > 0) {
    while ($r = mysqli_fetch_assoc($result)) {
        $output[] = $r;
    }
    echo json_encode($output);
} else {
    $output[] = array('id' => 0, 'club_name' => '暫無資料！');
    echo json_encode($output);
}
