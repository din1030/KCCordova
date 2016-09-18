<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';

$target_dir = '../www/img/';

$link_arr = array('', $_POST['p1_link'], $_POST['p2_link'], $_POST['p3_link'], $_POST['p4_link'], $_POST['p5_link']);
for ($i = 1; $i <= 5; ++$i) {
    $setting_update_string = "UPDATE `home_setting` SET `link`='".$link_arr[$i]."' WHERE `position`=".$i;
    if (!$mysqli->query($setting_update_string)) {
        $output = array('status' => false, 'message' => '更新失敗！');
        echo json_encode($output);
        exit;
    }
}

if (file_exists($_FILES['pic1']['tmp_name']) && is_uploaded_file($_FILES['pic1']['tmp_name'])) {
    $new_filename1 = basename($_FILES['pic1']['name']);
    $target_file1 = $target_dir.$new_filename1;
    if (move_uploaded_file($_FILES['pic1']['tmp_name'], $target_file1)) {
        $update_string = "UPDATE `home_setting` SET `pic`='$new_filename1' WHERE `position`='1'";
        if (!$mysqli->query($update_string)) {
            $output = array('status' => false, 'message' => '更新失敗！');
            echo json_encode($output);
            exit;
        }
    } else {
        $output = array('status' => false, 'message' => '更新失敗！');
        echo json_encode($output);
        exit;
    }
}

if (file_exists($_FILES['pic2']['tmp_name']) && is_uploaded_file($_FILES['pic2']['tmp_name'])) {
    $new_filename2 = basename($_FILES['pic2']['name']);
    $target_file2 = $target_dir.$new_filename2;
    if (move_uploaded_file($_FILES['pic2']['tmp_name'], $target_file2)) {
        $update_string = "UPDATE `home_setting` SET `pic`='$new_filename2' WHERE `position`='2'";
        if (!$mysqli->query($update_string)) {
            $output = array('status' => false, 'message' => '更新失敗！');
            echo json_encode($output);
            exit;
        }
    } else {
        $output = array('status' => false, 'message' => '圖片更新失敗！');
        echo json_encode($output);
        exit;
    }
}

if (file_exists($_FILES['pic3']['tmp_name']) && is_uploaded_file($_FILES['pic3']['tmp_name'])) {
    $new_filename3 = basename($_FILES['pic3']['name']);
    $target_file3 = $target_dir.$new_filename3;
    if (move_uploaded_file($_FILES['pic3']['tmp_name'], $target_file3)) {
        $update_string = "UPDATE `home_setting` SET `pic`='$new_filename3' WHERE `position`='3'";
        if (!$mysqli->query($update_string)) {
            $output = array('status' => false, 'message' => '更新失敗！');
            echo json_encode($output);
            exit;
        }
    } else {
        $output = array('status' => false, 'message' => '圖片更新失敗！');
        echo json_encode($output);
        exit;
    }
}

if (file_exists($_FILES['pic4']['tmp_name']) && is_uploaded_file($_FILES['pic4']['tmp_name'])) {
    $new_filename4 = basename($_FILES['pic4']['name']);
    $target_file4 = $target_dir.$new_filename4;
    if (move_uploaded_file($_FILES['pic4']['tmp_name'], $target_file4)) {
        $update_string = "UPDATE `home_setting` SET `pic`='$new_filename4' WHERE `position`='4'";
        if (!$mysqli->query($update_string)) {
            $output = array('status' => false, 'message' => '更新失敗！');
            echo json_encode($output);
            exit;
        }
    } else {
        $output = array('status' => false, 'message' => '圖片更新失敗！');
        echo json_encode($output);
        exit;
    }
}

if (file_exists($_FILES['pic5']['tmp_name']) && is_uploaded_file($_FILES['pic5']['tmp_name'])) {
    $new_filename5 = basename($_FILES['pic5']['name']);
    $target_file5 = $target_dir.$new_filename5;
    if (move_uploaded_file($_FILES['pic5']['tmp_name'], $target_file5)) {
        $update_string = "UPDATE `home_setting` SET `pic`='$new_filename5' WHERE `position`='5'";
        if (!$mysqli->query($update_string)) {
            $output = array('status' => false, 'message' => '更新失敗！');
            echo json_encode($output);
            exit;
        }
    } else {
        $output = array('status' => false, 'message' => '圖片更新失敗！');
        echo json_encode($output);
        exit;
    }
}

$output = array('status' => true, 'message' => '已更新！');
echo json_encode($output);

return;
