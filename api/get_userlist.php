<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$type = $_GET['type'];
$type_string = '';
$sql_string = 'SELECT u.`id`,u.`type`,u.`name`,u.`country`,u.`area`,u.`created` FROM `user` u WHERE 1';

if (!empty($type)) { // 有指定 type
    $sql_string .= " AND u.`type`='$type'";
} else {  // 不需審核或已審核通過之使用者（不含管理者）
    $sql_string .= " AND u.`type`!='3' AND u.`type`!='0' AND u.`type`!='100' OR (u.`type`='3' AND u.`approved`=1)";
}
$sql_string .= ' ORDER BY u.`created` DESC';

$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    while ($r = mysqli_fetch_assoc($sql)) {
        $r['created'] = date('Y/m/d H:i', strtotime($r['created']));
        $output[] = $r;
    }
    $amt_string = "SELECT u.`type`, count(*) amt FROM `user` u WHERE `u.`type`!='3' AND u.`type`!='0' AND u.`type`!='100' OR (u.`type`='3' AND u.`approved`=1) GROUP BY u.`type`";
    $amt_result = $mysqli->query($amt_string);
    while ($r = mysqli_fetch_assoc($amt_result)) {
        $amount[] = $r;
    }
    echo json_encode(array('status' => true, 'result' => $output, 'amount' => $amount));

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！');
    echo json_encode($output);
    exit;
}
