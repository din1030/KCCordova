<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$type = $_POST['type'];
$title = $_POST['title'];

$pic_string = '';
$target_dir = '../www/img/';

$sql_string = "INSERT INTO `category`(`type`, `title`,`created`) VALUES('$type','$title',NOW())";
$result = $mysqli->query($sql_string);
if ($mysqli->affected_rows > 0) {
    if ($type == 'life') {
        if (file_exists($_FILES['life_pic']['tmp_name']) && is_uploaded_file($_FILES['life_pic']['tmp_name'])) {
            $last_id = $mysqli->insert_id;
            $new_filename = 'lifecat_'.$last_id.'_'.basename($_FILES['life_pic']['name']);
            $target_file = $target_dir.$new_filename;
            if (move_uploaded_file($_FILES['life_pic']['tmp_name'], $target_file)) {
                $pic_string = "UPDATE `category` SET `pic`='$new_filename' WHERE `id`=$last_id";
                $mysqli->query($pic_string);
            } else {
                $output = array('status' => false, 'message' => '上傳圖片失敗，請重新操作！');
                echo json_encode($output);
                exit;
            }
        }
    }
    $output = array('status' => true, 'message' => '已新增分類！', 'insert_id' => $mysqli->insert_id);
    echo json_encode($output);

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！', 'sql' => $sql_string);
    echo json_encode($output);
    exit;
}
