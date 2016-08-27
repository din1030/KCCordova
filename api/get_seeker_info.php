<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_GET['user_id'];

$sql_string = 'SELECT `seeker_info`.*,`user`.`birth`,`user`.`mobile`,`country`.`country`,`area`.`area` FROM `seeker_info`,`user`,`country`,`area` WHERE `seeker_info`.`u_id`=`user`.`id` AND `seeker_info`.`country_id`=`country`.`id` AND `seeker_info`.`area_id`=`area`.`id`';
if (!empty($user_id)) {
    $sql_string .= " AND `u_id`=$user_id LIMIT 1";
}
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['pic'] = array($r['pic1'], $r['pic2'], $r['pic3'], $r['pic4'], $r['pic5']);
        unset($r['pic1']);
        unset($r['pic2']);
        unset($r['pic3']);
        unset($r['pic4']);
        unset($r['pic5']);
        $output[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output));

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！');
    echo json_encode($output);
    exit;
}
