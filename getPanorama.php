<?php

$q = $_GET["q"];
$con = mysqli_connect("localhost", "root", "eddie?54", "Panorama");

if (mysqli_connect_errno($con)) {
    echo "Fail";
}

$result = mysqli_query($con, "SELECT * FROM Panorama WHERE ID='" . $q . "'");



//$row=  mysqli_fetch_array($result,MYSQLI_ASSOC);
//echo $row["Panorama"];

while ($row = mysqli_fetch_array($result)) {
    echo $row['Panorama'];
}
mysqli_close($con);
?>
