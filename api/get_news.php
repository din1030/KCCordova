<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$news_id = $_GET['news_id'];

$sql_string = 'SELECT * FROM `news` WHERE NOW() BETWEEN `start_date` AND `end_date` ORDER BY `id`';
if (!empty($news_id)) {
    $sql_string .= " AND `id`=$news_id LIMIT 1";
}

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['updated'] = date('Y/m/d', strtotime($r['updated']));
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));
} else {
    $output = array('status' => false, 'today' => date('Y/m/d'));
    echo json_encode($output);
}
