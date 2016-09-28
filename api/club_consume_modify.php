<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$admin_id = $_POST['admin_id'];
$lang = $_POST['lang'];

$contact_name = $_POST['contact-input'];
$contact_tel = $_POST['contact-tel-input'];
$contact_line = $_POST['contact-line-input'];
$promo_content = $_POST['promo_content'];

$title1 = $_POST['title1'];
$day11 = $_POST['select11'];
$content11 = $_POST['content11'];
$day12 = $_POST['select12'];
$content12 = $_POST['content12'];
$day13 = $_POST['select13'];
$content13 = $_POST['content13'];
$day14 = $_POST['select14'];
$content14 = $_POST['content14'];
$day15 = $_POST['select15'];
$content15 = $_POST['content15'];

$title2 = $_POST['title2'];
$day21 = $_POST['select21'];
$content21 = $_POST['content21'];
$day22 = $_POST['select22'];
$content22 = $_POST['content22'];
$day23 = $_POST['select23'];
$content23 = $_POST['content23'];
$day24 = $_POST['select24'];
$content24 = $_POST['content24'];
$day25 = $_POST['select25'];
$content25 = $_POST['content25'];

$pic_string = '';
$target_dir = '../www/img/';
$new_filename = $admin_id.'_'.basename($_FILES['contact-pic-input']['name']);
$target_file = $target_dir.$new_filename;

// 判斷是否已有資料
$sql_string = "SELECT * FROM `club_consume` WHERE `admin_id` = '$admin_id' AND `lang`='$lang' LIMIT 1";
$sql = $mysqli->query($sql_string);
if ($sql->num_rows > 0) {
    $update_string = "UPDATE `club_consume` SET `contact_name`='$contact_name',`contact_tel`='$contact_tel',`contact_line`='$contact_line',`promo_content`='$promo_content' WHERE `admin_id` = '$admin_id' AND `lang`='$lang'";
    if ($mysqli->query($update_string)) {
        if (move_uploaded_file($_FILES['contact-pic-input']['tmp_name'], $target_file)) {
            $pic_string = "UPDATE `club_consume` SET `contact_pic` =  '$new_filename' WHERE `admin_id` = '$admin_id' AND `lang`='$lang'";
            $mysqli->query($pic_string);
        }

        $detail_string = "UPDATE `club_consume_detail` SET `title1`='$title1',`day11`='$day11',`content11`='$content11',`day12`='$day12',`content12`='$content12',`day13`='$day13',`content13`='$content13',`day14`='$day14',`content14`='$content14',`day15`='$day15',`content15`='$content15',";
        $detail_string .= "`title2`='$title2',`day21`='$day21',`content21`='$content21',`day22`='$day22',`content22`='$content22',`day23`='$day23',`content23`='$content23',`day24`='$day24',`content24`='$content24',`day25`='$day25',`content25`='$content25' WHERE `admin_id` = '$admin_id' AND `lang`='$lang'";

        if ($mysqli->query($detail_string)) {
            $output = array('status' => true, 'message' => '資料已修改！');
            echo json_encode($output);

            return;
        } else {
            $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！', 'sql' => $update_string);
            echo json_encode($output);
            exit;
        }
    } else {
        $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！', 'sql' => $update_string);
        echo json_encode($output);
        exit;
    }
} else {
    // 儲存資料
    $insert_string = "INSERT INTO `club_consume`(`admin_id`,`lang`, `contact_name`, `contact_tel`, `contact_line`, `promo_content`, `created`) VALUES ('$admin_id','$lang','$contact_name','$contact_tel','$contact_line','$promo_content', NOW())";
    $mysqli->query($insert_string);
    if ($mysqli->affected_rows > 0) {
        if (move_uploaded_file($_FILES['contact-pic-input']['tmp_name'], $target_file)) {
            $pic_string = "UPDATE `club_consume` SET `contact_pic` =  '$new_filename' WHERE `admin_id` = '$admin_id' AND `lang`='$lang'";
            $mysqli->query($pic_string);
        }

        $insert_string = 'INSERT INTO `club_consume_detail`(`admin_id`,`lang`,`title1`, `day11`, `content11`, `day12`, `content12`, `day13`, `content13`, `day14`, `content14`, `day15`, `content15`, `title2`, `day21`, `content21`, `day22`, `content22`, `day23`, `content23`, `day24`, `content24`, `day25`, `content25`) '."VALUES ('$admin_id','$lang','$title1','$day11','$content11','$day12','$content12','$day13','$content13','$day14','$content14','$day15','$content15','$title2','$day21','$content21','$day22','$content22','$day23','$content23','$day24','$content24','$day25','$content25')";

        if ($mysqli->query($insert_string)) {
            $output = array('status' => true, 'message' => '資料已修改！');
            echo json_encode($output);

            return;
        } else {
            $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！', 'sql' => $insert_string);
            echo json_encode($output);
            exit;
        }
    } else {
        $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！', 'sql' => $insert_string);
        echo json_encode($output);
        exit;
    }
}
