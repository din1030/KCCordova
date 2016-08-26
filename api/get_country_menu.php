<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';
$sql_string = 'SELECT c.`id` c_id, c.`country` country, a.`id` a_id, `area` FROM `country` c LEFT JOIN `area` a ON c.`id` = a.`country`';
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    // while ($r = mysqli_fetch_assoc($sql)) {
    //     $output[] = $r;
    // }
    $c_id = 0;
    $country = array();
    foreach ($sql as $row) {
        if ($row['c_id'] == $c_id) {
            array_push($temp['area'], array('a_id' => $row['a_id'], 'name' => $row['area']));
        } else {
            if ($c_id != 0) {
                $country[] = $temp;
            }
            $c_id = $row['c_id'];
            $temp = array();
            $temp['id'] = $c_id;
            $temp['country'] = $row['country'];
            $temp['area'] = array();
            array_push($temp['area'], array('a_id' => $row['a_id'], 'name' => $row['area']));
        }
    }
    $country[] = $temp;
    echo json_encode(array('status' => true, 'result' => $country));
} else {
    $output = array('status' => false, 'message' => '請重新操作');
    echo json_encode($output);
}
