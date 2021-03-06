<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$user_id = $_POST['user_id'];
$type = $_POST['type'];
$table = '';
$id_column = '';

if ($type == 'seeker') {
    $table = '`seeker_info`';
    $id_column = '`u_id`';
} elseif ($type == 'club') {
    $table = '`club_info`';
    $id_column = '`admin_id`';
}

$sql_string = "SELECT * FROM $table WHERE $id_column='$user_id' LIMIT 1";
$sql = $mysqli->query($sql_string);
if ($sql->num_rows < 1) {
    $insert_string = "INSERT INTO $table ($id_column) VALUES($user_id))";
    $sql = $mysqli->query($insert_string);
    if ($mysqli->affected_rows < 1) {
        echo json_encode(array('新增使用者資料失敗'));
        exit;
    }
}

$target_dir = '../www/img/';

if (file_exists($_FILES['thumb']['tmp_name']) && is_uploaded_file($_FILES['thumb']['tmp_name'])) {
    $new_filename_thumb = $user_id.'_thumb_'.basename($_FILES['thumb']['name']);
    $target_file_thumb = $target_dir.$new_filename_thumb;
    if (move_uploaded_file($_FILES['thumb']['tmp_name'], $target_file_thumb)) {
        $update_string = "UPDATE $table SET `thumb`='$new_filename_thumb' WHERE $id_column = '$user_id'";
        if ($mysqli->query($update_string)) {
            $output['thumb'] = array('pic' => true, 'data' => true);
            // $output['thumb'] = '上傳成功、資料更新';
        } else {
            $output['thumb'] = array('pic' => true, 'data' => false);
            // $output['thumb'] = '上傳成功、資料未更新';
            $output['sql_thumb'] = $update_string;
        }
    } else {
        $output['thumb'] = array('pic' => false, 'data' => false);
        // $output['thumb'] = '上傳失敗、資料未更新';
    }
}

if (file_exists($_FILES['pic_1']['tmp_name']) && is_uploaded_file($_FILES['pic_1']['tmp_name'])) {
    $new_filename1 = $user_id.'_1_'.basename($_FILES['pic_1']['name']);
    $target_file1 = $target_dir.$new_filename1;
    if (move_uploaded_file($_FILES['pic_1']['tmp_name'], $target_file1)) {
        $update_string = "UPDATE $table SET `pic1`='$new_filename1' WHERE $id_column = '$user_id'";
        if ($mysqli->query($update_string)) {
            $output['pic1'] = array('pic' => true, 'data' => true);
        // $output['pic1'] = '上傳成功、資料更新';
        } else {
            $output['pic1'] = array('pic' => true, 'data' => false);
        // $output['pic1'] = '上傳成功、資料未更新';
        $output['sql1'] = $update_string;
        }
    } else {
        $output['pic1'] = array('pic' => false, 'data' => false);
    // $output['pic1'] = '上傳失敗、資料未更新';
    }
}

if (file_exists($_FILES['pic_2']['tmp_name']) && is_uploaded_file($_FILES['pic_2']['tmp_name'])) {
    $new_filename2 = $user_id.'_2_'.basename($_FILES['pic_2']['name']);
    $target_file2 = $target_dir.$new_filename2;
    if (move_uploaded_file($_FILES['pic_2']['tmp_name'], $target_file2)) {
        $update_string = "UPDATE $table SET `pic2`='$new_filename2' WHERE $id_column = '$user_id'";
        if ($mysqli->query($update_string)) {
            $output['pic2'] = array('pic' => true, 'data' => true);
        // $output['pic2'] = '上傳成功、資料更新';
        } else {
            $output['pic2'] = array('pic' => true, 'data' => false);
        // $output['pic2'] = '上傳成功、資料未更新';
        $output['sql2'] = $update_string;
        }
    } else {
        $output['pic2'] = array('pic' => false, 'data' => false);
    // $output['pic2'] = '上傳失敗、資料未更新';
    }
}

if (file_exists($_FILES['pic_3']['tmp_name']) && is_uploaded_file($_FILES['pic_3']['tmp_name'])) {
    $new_filename3 = $user_id.'_3_'.basename($_FILES['pic_3']['name']);
    $target_file3 = $target_dir.$new_filename3;
    if (move_uploaded_file($_FILES['pic_3']['tmp_name'], $target_file3)) {
        $update_string = "UPDATE $table SET `pic3`='$new_filename3' WHERE $id_column = '$user_id'";
        if ($mysqli->query($update_string)) {
            $output['pic3'] = array('pic' => true, 'data' => true);
        // $output['pic3'] = '上傳成功、資料更新';
        } else {
            $output['pic3'] = array('pic' => true, 'data' => false);
        // $output['pic3'] = '上傳成功、資料未更新';
        $output['sql3'] = $update_string;
        }
    } else {
        $output['pic3'] = array('pic' => false, 'data' => false);
    // $output['pic3'] = '上傳失敗、資料未更新';
    }
}

if (file_exists($_FILES['pic_4']['tmp_name']) && is_uploaded_file($_FILES['pic_4']['tmp_name'])) {
    $new_filename4 = $user_id.'_4_'.basename($_FILES['pic_4']['name']);
    $target_file4 = $target_dir.$new_filename4;
    if (move_uploaded_file($_FILES['pic_4']['tmp_name'], $target_file4)) {
        $update_string = "UPDATE $table SET `pic4`='$new_filename4' WHERE $id_column = '$user_id'";
        if ($mysqli->query($update_string)) {
            $output['pic4'] = array('pic' => true, 'data' => true);
        // $output['pic4'] = '上傳成功、資料更新';
        } else {
            $output['pic4'] = array('pic' => true, 'data' => false);
        // $output['pic4'] = '上傳成功、資料未更新';
        $output['sql4'] = $update_string;
        }
    } else {
        $output['pic4'] = array('pic' => false, 'data' => false);
    // $output['pic4'] = '上傳失敗、資料未更新';
    }
}

if (file_exists($_FILES['pic_5']['tmp_name']) && is_uploaded_file($_FILES['pic_5']['tmp_name'])) {
    $new_filename5 = $user_id.'_5_'.basename($_FILES['pic_5']['name']);
    $target_file5 = $target_dir.$new_filename5;
    if (move_uploaded_file($_FILES['pic_5']['tmp_name'], $target_file5)) {
        $update_string = "UPDATE $table SET `pic5`='$new_filename5' WHERE $id_column = '$user_id'";
        if ($mysqli->query($update_string)) {
            $output['pic5'] = array('pic' => true, 'data' => true);
        // $output['pic5'] = '上傳成功、資料更新';
        } else {
            $output['pic5'] = array('pic' => true, 'data' => false);
        // $output['pic5'] = '上傳成功、資料未更新';
        $output['sql1'] = $update_string;
        }
    } else {
        $output['pic5'] = array('pic' => false, 'data' => false);
    // $output['pic5'] = '上傳失敗、資料未更新';
    }
}

echo json_encode($output);
