<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$news_id = $_GET['news_id'];

$sql_string = 'SELECT * FROM `policy`';
// if (!empty($news_id)) {
//     $sql_string .= " AND `id`=$news_id LIMIT 1";
// }
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));
} else {
    $output = array('status' => false, 'message' => '請重新操作！');
    echo json_encode($output);
}
