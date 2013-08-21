<?php
//TODO: validare la query
$q = $_GET["q"];
//TODO: fare un file di configurazione e prenderli da lì
$con = mysqli_connect("localhost", "root", "eddie?54", "Panorama");

if (mysqli_connect_errno($con)) {
    echo "Fail";
}

$result = mysqli_query($con, "SELECT * FROM Panorama WHERE ID='" . $q . "'");

while ($row = mysqli_fetch_array($result)) {
    echo $row['Panorama'];
}
mysqli_close($con);
?>
