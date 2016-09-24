<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_GET['user_id'];
$only_active = $_GET['only_active'];
$only_approved = $_GET['only_approved'];
$sql_string = 'SELECT `seeker_info`.*,`user`.`name`,`user`.`birth`,`user`.`mobile`,`user`.`avatar`,`country`.`country`,`area`.`area`,`category`.`title` job_title FROM `seeker_info`,`user`,`country`,`area`,`category` WHERE `seeker_info`.`u_id`=`user`.`id` AND `seeker_info`.`country_id`=`country`.`id` AND `seeker_info`.`area_id`=`area`.`id` AND `category`.`id`=`seeker_info`.`seek_category`';
if (!empty($only_active)) {
    $sql_string .= " AND `active`='1'";
}
if (!empty($only_approved)) {
    $sql_string .= " AND `approved`='1'";
}
if (!empty($user_id)) {
    $sql_string .= " AND `u_id`=$user_id LIMIT 1";
} else {
    $sql_string .= ' ORDER BY `u_id` DESC';
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
