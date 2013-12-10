function getContent(contentType, thingToGet) {
    if (window.XMLHttpRequest)
    {//IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else
    {//IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "php/getContent.php?type=" + contentType + "&q=" + thingToGet, false);
    xmlhttp.send();
    try {
        return eval(JSON.parse(xmlhttp.response));
    }catch(err) {
        return xmlhttp.response;
    }
}