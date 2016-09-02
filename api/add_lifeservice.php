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

$sql_string = 'INSERT INTO `lifeservice_info`(`life_category`, `name`, `country_id`, `area_id`, `address`, `tel`, `slogan`, `website`, `opentime1`, `opentime2`, `contact_name`, `contact_line`, `consume_content`, `promo_content`, `created`) '."VALUES ('$life_category','$name','$country_id','$area_id','$address','$tel','$slogan','$website','$opentime1','$opentime2','$contact_name','$contact_line','$consume_content','$promo_content',NOW())";
$result = $mysqli->query($sql_string);
if ($mysqli->affected_rows > 0) {
    $last_id = $mysqli->insert_id;
    if (move_uploaded_file($_FILES['contact_pic']['tmp_name'], $target_file)) {
        $pic_string = "UPDATE `lifeservice_info` SET `contact_pic` =  '$new_filename' WHERE `id` = $last_id";
        $mysqli->query($pic_string);

        if (file_exists($_FILES['pic1']['tmp_name']) && is_uploaded_file($_FILES['pic1']['tmp_name'])) {
            $new_filename1 = $user_id.'_'.basename($_FILES['pic1']['name']);
            $target_file1 = $target_dir.$new_filename1;
            if (move_uploaded_file($_FILES['pic1']['tmp_name'], $target_file1)) {
                $update_string = "UPDATE `lifeservice_info` SET `pic1`='$new_filename1' WHERE `id` = '$last_id'";
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

        if (file_exists($_FILES['pic2']['tmp_name']) && is_uploaded_file($_FILES['pic2']['tmp_name'])) {
            $new_filename2 = $user_id.'_'.basename($_FILES['pic2']['name']);
            $target_file2 = $target_dir.$new_filename2;
            if (move_uploaded_file($_FILES['pic2']['tmp_name'], $target_file2)) {
                $update_string = "UPDATE `lifeservice_info` SET `pic2`='$new_filename2' WHERE `id` = '$last_id'";
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

        if (file_exists($_FILES['pic3']['tmp_name']) && is_uploaded_file($_FILES['pic3']['tmp_name'])) {
            $new_filename3 = $user_id.'_'.basename($_FILES['pic3']['name']);
            $target_file3 = $target_dir.$new_filename3;
            if (move_uploaded_file($_FILES['pic3']['tmp_name'], $target_file3)) {
                $update_string = "UPDATE `lifeservice_info` SET `pic3`='$new_filename3' WHERE `id` = '$last_id'";
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

        if (file_exists($_FILES['pic4']['tmp_name']) && is_uploaded_file($_FILES['pic4']['tmp_name'])) {
            $new_filename4 = $user_id.'_'.basename($_FILES['pic4']['name']);
            $target_file4 = $target_dir.$new_filename4;
            if (move_uploaded_file($_FILES['pic4']['tmp_name'], $target_file4)) {
                $update_string = "UPDATE `lifeservice_info` SET `pic4`='$new_filename4' WHERE `id` = '$last_id'";
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

        if (file_exists($_FILES['pic5']['tmp_name']) && is_uploaded_file($_FILES['pic5']['tmp_name'])) {
            $new_filename5 = $user_id.'_'.basename($_FILES['pic5']['name']);
            $target_file5 = $target_dir.$new_filename5;
            if (move_uploaded_file($_FILES['pic5']['tmp_name'], $target_file5)) {
                $update_string = "UPDATE `lifeservice_info` SET `pic5`='$new_filename5' WHERE `id` = '$last_id'";
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
    }
    $output = array('status' => true, 'message' => '已新增生活服務店家！');
    echo json_encode($output);

    return;
} else {
    $output = array('status' => false, 'message' => '請重新操作！', 'sql' => $sql_string);
    echo json_encode($output);
    exit;
}
