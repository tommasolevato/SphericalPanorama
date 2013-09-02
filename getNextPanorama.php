<?php
//TODO: validare la query
$q = $_GET["q"];
$db_properties = parse_ini_file('config/php.ini');
$con= mysqli_connect($db_properties['host'], $db_properties['user'], $db_properties['password'], $db_properties['db_name']);

if (mysqli_connect_errno($con)) {
    echo "Fail";
}

$result = mysqli_query($con, "SELECT * FROM Panorama
                              JOIN Collegamento ON Panorama.ID = Collegamento.IdCalled
                              WHERE IdCalling='" . $q . "'");

$all = array();
while ($row = mysqli_fetch_assoc($result)) {
    array_push($all, $row);
}
echo json_encode($all);

mysqli_close($con);
?>
