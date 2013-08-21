<?php
//TODO: validare la query
$q = $_GET["q"];
//TODO: fare un file di configurazione e prenderli da lì
$con = mysqli_connect("localhost", "root", "eddie?54", "Panorama");

if (mysqli_connect_errno($con)) {
    echo "Fail";
}

$result = mysqli_query($con, "SELECT * FROM Panorama JOIN Collegamento ON Panorama.ID = Collegamento.IdCalled WHERE IdCalling='" . $q . "'");

$all = array();
while ($row = mysqli_fetch_assoc($result)) {
    array_push($all, $row);
}
echo json_encode($all);

mysqli_close($con);
?>