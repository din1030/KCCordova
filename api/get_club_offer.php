<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$admin_id = $_GET['club_id'];
$published = $_GET['published'];
$lang = $_GET['lang'];

$sql_string = "SELECT `club_offer`.*, `club_info`.`publish_plan` FROM `club_offer` JOIN `club_info` USING(`admin_id`) WHERE `club_offer`.`admin_id`= '$admin_id'";

if (!empty($published)) {
    $sql_string .= ' AND (CURDATE() BETWEEN `club_info`.`publish_start` AND `club_info`.`publish_due`)';
}
if (!empty($lang)) {
    $sql_string .= " AND `club_offer`.`lang`='$lang'";
}

$result = $mysqli->query($sql_string);
if (mysqli_num_rows($result) > 0) {
    while ($r = mysqli_fetch_assoc($result)) {
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));

    return;
} else {
    $output = array('status' => false, 'message' => '暫無資料');
    echo json_encode($output);
    exit;
}
