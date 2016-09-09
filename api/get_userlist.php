<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$type = $_GET['type'];
$type_string = '';
if (!empty($type)) { // 有指定 type
    $type_string = " WHERE `type`='$type'";
}
$sql_string = 'SELECT u.`id`, u.`type`, u.`name`, u.`created` FROM `user` u'.$type_string.' ORDER BY u.`created` DESC';

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['created'] = date('Y/m/d H:i', strtotime($r['updated']));
        $output[] = $r;
    }
    $amt_string = "SELECT `type`, count(*) amt FROM `user` WHERE `type`!='0' GROUP BY `type`";
    $amt_result = $mysqli->query($amt_string);
    while ($r = mysqli_fetch_assoc($amt_result)) {
        $amount[$r['type']] = $r['amt'];
    }

    echo json_encode(array('status' => true, 'result' => $output, 'amount' => $amount));

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！');
    echo json_encode($output);
    exit;
}
