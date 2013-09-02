<?php
//TODO: validare la query
$q = $_GET["q"];
$db_properties = parse_ini_file('config/php.ini');
$con= mysqli_connect($db_properties['host'], $db_properties['user'], $db_properties['password'], $db_properties['db_name']);

if (mysqli_connect_errno($con)) {
    echo "Fail";
}

$result = mysqli_query($con, "SELECT * FROM Panorama WHERE ID='" . $q . "'");

while ($row = mysqli_fetch_array($result)) {
    echo $row['Panorama'];
}
mysqli_close($con);
?>
