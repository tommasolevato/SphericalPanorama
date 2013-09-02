<?php
//TODO: validare la query
$q = $_GET["q"];
//TODO: fare un file di configurazione e prenderli da lì
$con=  mysqli_connect("localhost", "sphericalpanorama","", "my_sphericalpanorama");

if (mysqli_connect_errno($con)) {
    echo "Fail";
}

$result = mysqli_query($con, "SELECT OggettoNelPanorama.*, Oggetto.Object, Oggetto.MTL FROM Panorama 
                              JOIN OggettoNelPanorama ON Panorama.ID = OggettoNelPanorama.IdObject
                              JOIN Oggetto ON Oggetto.ID = OggettoNelPanorama.IdObject
                              WHERE OggettoNelPanorama.IdPanorama='" . $q . "'");

$all = array();
while ($row = mysqli_fetch_assoc($result)) {
    array_push($all, $row);
}
echo json_encode($all);

mysqli_close($con);
?>