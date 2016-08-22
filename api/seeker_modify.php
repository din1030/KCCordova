<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$type = $_POST['type'];
// $formData = $_POST['formData'];

// $params = array();
// parse_str($formData, $params);
// print_r($params);

if ($type == 'profile') {
    //
} elseif ($type == 'resume') {
    $u_id = $_POST['u_id'];
    $nickname = $_POST['nickname-input'];
    $seeker_category = $_POST['seeker_category'];
    $country_id = $_POST['seeker_country'];
    $area_id = $_POST['seeker_area'];
    // $mobile = $_POST['mobile-input'];
    $height = $_POST['height-input'];
    $weight = $_POST['weight-input'];
    $measurements = $_POST['measurements-input'];
    $singing = $_POST['singing'];
    $dancing = $_POST['dancing'];
    $drinking = $_POST['drinking'];
    $cooperation = $_POST['cooperation'];
    $marital = $_POST['marital'];
    $education = $_POST['education'];
    $languages = $_POST['lang-input'];
    $worktime = $_POST['worktime'];
    $pay = $_POST['pay-input'];
    $job_content = $_POST['job_content'];

    // 判斷是否已有資料
    $sql_string = "SELECT * FROM `seeker_info` WHERE `u_id` = '$u_id' LIMIT 1";
    $sql = $mysqli->query($sql_string);
    if ($sql->num_rows > 0) {
        $update_string = "UPDATE `seeker_info` SET `seek_category`='$seeker_category',`country_id`='$country_id',`area_id`='$area_id',`nickname`='$nickname',`height`='$height',`weight`='$weight',`measurements`='$measurements',`singing`='$singing',`dancing`='$dancing',`drinking`='$drinking',`marital`='$marital',`cooperation`='$cooperation',`languages`='$languages',`education`='$education',`workingtime`='$worktime',`pay`='$pay',`job_content`='$job_content' WHERE `u_id` = '$u_id'";
        $sql = $mysqli->query($update_string);
        if ($mysqli->affected_rows > 0) {
            $output = array('status' => true, 'message' => '資料已修改！');
            echo json_encode($output);
            exit;
        } else {
            $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！');
            echo json_encode($output);
            exit;
        }
    } else {
        // 儲存資料
        $insert_string = 'INSERT INTO `seeker_info`(`u_id`, `seek_category`, `country_id`, `area_id`, `nickname`, `height`, `weight`, `measurements`, `singing`, `dancing`, `drinking`, `marital`, `cooperation`, `languages`, `education`, `workingtime`, `pay`, `job_content`, `created`)';
        $insert_string .= " VALUES ('$u_id','$seeker_category','$country_id','$area_id','$nickname','$height','$weight','$measurements','$singing','$dancing','$drinking','$marital','$cooperation','$languages','$education','$worktime','$pay','$job_content', NULL)";

        if (!$mysqli->query($insert_string)) {
            $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！', 'sql' => $sql_string);
            echo json_encode($output);
            exit;
        } else {
            $output = array('status' => true, 'message' => '資料已修改！', 'sql' => $sql_string);
            echo json_encode($output);

            return;
        }
    }
} else {
    $output = array('status' => false, 'message' => '請重新操作！');
    echo json_encode($output);
    exit;
}
