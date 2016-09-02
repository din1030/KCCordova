<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$life_category = $_POST['life_category'];
$name = $_POST['name-input'];
$tel = $_POST['tel-input'];
$country_id = $_POST['country-select'];
$area_id = $_POST['area-select'];
$address = $_POST['address-input'];
$contact_name = $_POST['contact-input'];
$slogan = $_POST['slogan-input'];
$website = $_POST['website-input'];
$contact_line = $_POST['contact-line-input'];
$opentime1 = $_POST['opentime1'];
$opentime2 = $_POST['opentime2'];
$consume_content = $_POST['consume_content'];
$promo_content = $_POST['promo_content'];

$pic_string = '';
$target_dir = '../www/img/';
$new_filename = basename($_FILES['contact_pic']['name']);
$target_file = $target_dir.$new_filename;

$sql_string = 'INSERT INTO `lifeservice_info`(`life_category`, `name`, `country_id`, `area_id`, `address`, `tel`, `slogan`, `website`, `opentime1`, `opentime2`, `contact_name`, `contact_line`, `consume_content`, `promo_content`, `created`, ) '."VALUES ('$life_category','$name','$country_id','$area_id','$address','$tel','$slogan','$website','$opentime1','$opentime2','$contact_name','$contact_line','$consume_content','$promo_content',NULL)";
$result = $mysqli->query($sql_string);
if ($mysqli->affected_rows > 0) {
    $last_id = $mysqli->insert_id;
    if (move_uploaded_file($_FILES['contact_pic']['tmp_name'], $target_file)) {
        $pic_string = "UPDATE `lifeservice_info` SET `contact_pic` =  '$new_filename' WHERE `id` = $last_id";
        $mysqli->query($pic_string);
    }
    $output = array('status' => true, 'message' => '已新增生活服務店家！');
    echo json_encode($output);

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！', 'sql' => $sql_string);
    echo json_encode($output);
    exit;
}
