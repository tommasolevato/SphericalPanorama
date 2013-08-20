
function getPanorama(Id)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
//xmlhttp.onreadystatechange=function()
//  {
//  if (xmlhttp.readyState===4 && xmlhttp.status===200)
//    {
//    
//    }
//  }
    xmlhttp.open("GET", "getPanorama.php?q=" + Id, false);
    xmlhttp.send();
}





function getNextPanorama(Id)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
//xmlhttp.onreadystatechange=function()
//  {
//  if (xmlhttp.readyState===4 && xmlhttp.status===200)
//    {
//    
//    }
//  }
    xmlhttp.open("GET", "getNextPanorama.php?q=" + Id, false);
    xmlhttp.send();
}