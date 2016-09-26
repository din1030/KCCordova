<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$club_id = $_GET['club_id'];
$published = $_GET['published'];
$lang = $_GET['lang'];

$sql_string = 'SELECT `club_consume`.*,`club_consume_detail`.*
FROM `club_consume` LEFT JOIN `club_consume_detail` USING(`admin_id`)
LEFT JOIN `club_info` USING(`admin_id`)
WHERE `admin_id`='.$club_id;

if (!empty($published)) {
    $sql_string .= ' AND (NOW() BETWEEN `club_info`.`publish_start` AND `club_info`.`publish_due`)';
}
if (!empty($lang)) {
    $sql_string .= " AND `club_consume`.`lang`='$lang'";
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
