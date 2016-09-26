<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$club_id = $_POST['club_id'];
$publish_plan = $_POST['plan_select'];
$publish_start = $_POST['publish_start'];
$publish_due = $_POST['publish_due'];

$sql_string = "UPDATE `club_info` SET `publish_plan`='$publish_plan',`publish_start`='$publish_start',`publish_due`='$publish_due' WHERE `admin_id`= '$club_id'";
if ($mysqli->query($sql_string)) {
    echo json_encode(array('status' => true, 'message' => '已更新店家方案！'));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
