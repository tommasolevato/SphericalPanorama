<?php

error_reporting(E_ALL); 
ini_set('display_errors', '1');

function __autoload($class_name) {
    include $class_name . '.php';
}

$mysqlFetcher = new MySQLFetcher();
$contentType = $_GET["type"];
$q = $_GET["q"];
echo $mysqlFetcher->getContent($contentType, $q);