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

//TODO: validare la query
//$q = \filter_input(\INPUT_GET, "q");
//$db_properties = \parse_ini_file('config/php.ini');
//$con = mysqli_connect($db_properties['host'], $db_properties['user'], $db_properties['password'], $db_properties['db_name']);
//
//if (mysqli_connect_errno($con)) {
//    echo "Fail";
//}
//
//$result = mysqli_query($con, "SELECT OggettoNelPanorama.*, Oggetto.Object, Oggetto.MTL FROM Panorama 
//                              JOIN OggettoNelPanorama ON Panorama.ID = OggettoNelPanorama.IdObject
//                              JOIN Oggetto ON Oggetto.ID = OggettoNelPanorama.IdObject
//                              WHERE OggettoNelPanorama.IdPanorama='" . $q . "'");
//
//$all = array();
//while ($row = mysqli_fetch_assoc($result)) {
//    array_push($all, $row);
//}
//echo json_encode($all);
//
//mysqli_close($con);