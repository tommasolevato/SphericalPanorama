<?php

$con=  mysqli_connect("localhost", "Panorama","", "Panorama");

if(mysqli_connect_errno($con)){
    echo "Fail ";
}
    
$result= mysqli_query($con, "SELECT * FROM Panorama");

$row=  mysqli_fetch_array($result);
echo $row['Panorama'];

//echo mysqli_fetch_array($result);

mysqli_close($con);
?>
