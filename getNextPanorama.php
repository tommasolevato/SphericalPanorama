<?php

$q = $_GET["q"];
$con = mysqli_connect("localhost", "Panorama", "", "Panorama");

if (mysqli_connect_errno($con)) {
    echo "Fail ";
}

$result = mysqli_query($con, "SELECT * FROM Panorama JOIN Collegamento ON Panorama.ID = Collegamento.IdCalled WHERE IdCalling='" . $q . "'");

//while($row=  mysqli_fetch_array($result)){
//    $arr = array( 'IdCalling'=>$row['IdCalling'], 'IdCalled' => $row['IdCalled'],
//        'Panorama'=> $row['Panorama'],'Latitude' => $row['Latitude'], 'Longitude' => $row['Longitude']);
//    echo json_encode($arr);
//    
//}
//$i=0;
//while($row=  mysqli_fetch_array($result)){
//    $arr = array( 'IdCalling'=>$row['IdCalling'], 'IdCalled' => $row['IdCalled'],
//        'Panorama'=> $row['Panorama'],'Latitude' => $row['Latitude'], 'Longitude' => $row['Longitude']);
//    json_encode($arr);
//    $all= array('NumberRow'=>$i,'Row'=>$arr);
//}
//echo json_encode($all);

$i = 0;
$all = array();
while ($row = mysqli_fetch_array($result)) {
    $arr = array('IdCalling' => $row['IdCalling'], 'IdCalled' => $row['IdCalled'],
        'Panorama' => $row['Panorama'], 'Latitude' => $row['Latitude'], 'Longitude' => $row['Longitude']);
    json_encode($arr);
    $all[strval($i)] = $arr;
    $i++;
}
echo json_encode($all);

mysqli_close($con);
?>