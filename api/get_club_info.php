<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$club_id = $_GET['club_id'];
$only_approved = $_GET['only_approved'];
$lang = $_GET['lang'];
$sql_string = 'SELECT `club_info`.*,`category`.`title` cat_title,`country`.`country`,`area`.`area`, IF((NOW() BETWEEN `club_info`.`publish_start` AND `club_info`.`publish_due`), "1", "0") state FROM `user`,`club_info`,`country`,`area`,`category` WHERE `user`.`id`=`club_info`.`admin_id` AND `club_info`.`country_id` = `country`.`id` AND `club_info`.`area_id` = `area`.`id` AND `category`.`id`=`club_info`.`category`';
if (!empty($only_approved)) {
    $sql_string .= " AND `user`.`approved`='1'";
}
if (!empty($lang)) { // 語言
    $sql_string .= " AND `club_info`.`lang`='$lang'";
}
if (!empty($club_id)) { // 有指定 ID
    $sql_string .=  " AND `club_info`.`admin_id`='$club_id'";
} else {
    $sql_string .= ' ORDER BY `admin_id` DESC';
}

$result = $mysqli->query($sql_string);
if (mysqli_num_rows($result) > 0) {
    while ($r = mysqli_fetch_assoc($result)) {
        $r['pic'] = array($r['pic1'], $r['pic2'], $r['pic3'], $r['pic4'], $r['pic5']);
        $r['updated'] = date('Y/m/d H:i', strtotime($r['updated']));
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
    $output[] = array('status' => false, 'club_name' => '暫無資料！');
    echo json_encode($output);
    exit;
}
