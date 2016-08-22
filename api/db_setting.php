<?php

$db_host = '52.69.53.255';
$db_user = 'din1030';
$db_pass = 'awsdb@ad771030din';
$db_name = 'kellyclub';

$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
if (!$mysqli) {
    echo '無法連結資料庫！請通知系統管理員。'.PHP_EOL;
    echo 'Error: Unable to connect to MySQL.'.PHP_EOL;
    echo 'Debugging errno: '.mysqli_connect_errno().PHP_EOL;
    echo 'Debugging error: '.mysqli_connect_error().PHP_EOL;
    exit();
}
$mysqli->query('SET NAMES UTF8');
