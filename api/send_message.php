<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$self_id = $_POST['self_id'];
$self_type = $_POST['self_type'];
$talk_id = $_POST['talk_id'];
$content = $_POST['content'];

$sql_string = "INSERT INTO `messages`(`from_id`, `from_type`, `to_id`, `content`) VALUES ('$self_id','$self_type','$talk_id','$content')";

$sql = $mysqli->query($sql_string);
if ($mysqli->affected_rows > 0) {
    echo json_encode(array('status' => true, 'talk_id' => $talk_id, 'msg' => $_POST));

    return;
} else {
    echo json_encode(array('status' => false, 'message' => '請重新操作！'));
    exit;
}
