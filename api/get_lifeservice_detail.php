<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'db_setting.php';
$sql_string = "SELECT * FROM `lifeservice_info` WHERE `type`='life'";
