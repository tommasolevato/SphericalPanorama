<?php
//TODO: validare la query
$q = $_GET["q"];
//TODO: fare un file di configurazione e prenderli da lì
$con=  mysqli_connect("localhost", "sphericalpanorama","", "my_sphericalpanorama");

if (mysqli_connect_errno($con)) {
    echo "Fail";
}

$result = mysqli_query($con, "SELECT ImmaginePerOggetto.*, Immagine.Image FROM Immagine
                              JOIN ImmaginePerOggetto ON Immagine.ID = ImmaginePerOggetto.IdImage
                              JOIN Oggetto ON Oggetto.ID=ImmaginePerOggetto.IdObject
                              WHERE Oggetto.Object='" . $q . "'");

$all = array();
while ($row = mysqli_fetch_assoc($result)) {
    array_push($all, $row);
}
echo json_encode($all);

mysqli_close($con);
?>