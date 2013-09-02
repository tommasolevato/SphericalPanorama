function getContent(param, phpFile) {
    if (window.XMLHttpRequest)
    {//IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {//IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", phpFile + ".php?q=" + param, false);
    xmlhttp.send();
}