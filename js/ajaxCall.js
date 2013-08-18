
function initPhpCall(Id)
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
//xmlhttp.onreadystatechange=function()
//  {
//  if (xmlhttp.readyState===4 && xmlhttp.status===200)
//    {
//    
//    }
//  }
xmlhttp.open("GET","mysqlconnect.php?q="+Id,false);
xmlhttp.send();
}





function linkPhpCall(Id)
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
//xmlhttp.onreadystatechange=function()
//  {
//  if (xmlhttp.readyState===4 && xmlhttp.status===200)
//    {
//    
//    }
//  }
xmlhttp.open("GET","mysqlconnectLink.php?q="+Id,false);
xmlhttp.send();
}