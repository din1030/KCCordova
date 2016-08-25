<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$action = $_POST['action'];
$formData = $_POST['formData'];

$params = array();
parse_str($formData, $params);
// print_r($params);

if ($action == 'reg') { // For Register
    $type = $params['member_type'];
    $email = trim($params['rg_email']);
    $password = password_hash($params['rg_pswd'], PASSWORD_DEFAULT);
    $ref = trim($params['rg_ref']);
    $name = $params['rg_name'];
    $gender = $params['rg_gender'];
    $country = $params['rg_country'];
    $location = $params['rg_location'];
    $birth = $params['rg_birthday'];
    $tel = $params['rg_tel'];
    $mobile = $params['rg_mobile'];
    // echo "$email/$password/$name/$gender/$birth/$tel/$mobile";

    if (is_null($email) || is_null($password)) {
        $output = array('status' => false, 'message' => '帳號資訊不完整！', 'data' => "$email/$name/$gender/$birth/$tel/$mobile");
        echo json_encode($output);
    } else {
        // 判斷是否帳號已經存在
        $sql_string = "SELECT * FROM `user` WHERE `email` = '$email' LIMIT 1";
        $sql = $mysqli->query($sql_string);
        if ($sql->num_rows > 0) {
            $output = array('status' => false, 'message' => '帳號已存在！');
            echo json_encode($output);
            exit;
        }
        // 判斷推薦人帳號是否存在
        if (!empty($ref)) {
            $sql_string = "SELECT * FROM `user` WHERE `member_id` = '$ref' LIMIT 1";
            $sql = $mysqli->query($sql_string);
            if ($sql->num_rows == 0) {
                $output = array('status' => false, 'message' => '推薦人帳號不存在！');
                echo json_encode($output);
                exit;
            }
        }

        // 儲存資料
        $sql_string = 'INSERT INTO `user`(`type`,`email`,`password`,`name`,`gender`,`country`,`location`,`birth`,`tel`,`mobile`,`ref`,`created`) '.
            "VALUES ('$type','$email','$password','$name','$gender','$country','$location','$birth','$tel','$mobile','$ref', NULL)";
        if (!$mysqli->query($sql_string)) {
            $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！', 'sql' => $sql_string);
            echo json_encode($output);
            exit;
        } else { // 資料送出，更新會員編號
            $last_id = $mysqli->insert_id;
            $m_id = str_pad($last_id, 5, '0', STR_PAD_LEFT);
            switch ($type) {
                case '1':
                    $m_id = 'A'.$m_id;
                    break;
                case '2':
                    $m_id = 'B'.$m_id;
                    break;
                case '3':
                    $m_id = 'C'.$m_id;
                    break;
                default:
                    break;
            }
            $update_string = "UPDATE `user` SET `member_id`=$m_id WHERE `id`=$last_id";
            if (!$mysqli->query($update_string)) {
                $output = array('status' => false, 'message' => '操作錯誤，請稍後再試！', 'sql' => $sql_string);
                echo json_encode($output);
                exit;
            } else {
            }
            $output = array('status' => true, 'message' => '註冊成功，請使用帳號登入!', 'sql' => $sql_string);
            echo json_encode($output);

            return;
        }
    }
} elseif ($action == 'log') {
    $email = trim($params['lg_email']);
    $password = $params['lg_pswd'];
    // 判斷是否帳號已經存在
    $sql_string = "SELECT * FROM `user` WHERE `email` = '$email' LIMIT 1";
    $sql = $mysqli->query($sql_string);
    if ($sql->num_rows == 0) { // 找不到帳號
        $output = array('status' => false, 'message' => '帳號或密碼錯誤！');
        echo json_encode($output);
        exit;
    } else {
        $user = $sql->fetch_assoc();
        if (password_verify($password, $user['password'])) { // 密碼正確
            $output = array('status' => true, 'message' => '登入成功！', 'user_id' => $user['id'], 'user' => $email, 'auth' => $user['type'], 'name' => $user['name']);
            echo json_encode($output);

            return;
        } else {  // 密碼錯誤
            $output = array('status' => false, 'message' => '帳號或密碼錯誤！');
            echo json_encode($output);
            exit;
        }
    }
} else {
    $output = array('status' => false, 'message' => '請重新操作！');
    echo json_encode($output);
    exit;
}
