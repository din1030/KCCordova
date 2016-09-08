<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$news_id = $_GET['news_id'];

$sql_string = 'SELECT * FROM `news` WHERE NOW() BETWEEN `start_date` AND `end_date`';
if (!empty($news_id)) {
    $sql_string .= " AND `id`=$news_id LIMIT 1";
} else {
    $sql_string .= ' ORDER BY `order_no` ASC, `updated` DESC';
}

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['updated'] = date('Y/m/d', strtotime($r['updated']));
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));
} else {
    $output = array('status' => false, 'message' => '請重新操作！');
    echo json_encode($output);
}
