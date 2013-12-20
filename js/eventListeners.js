var isUserInteracting = false;
var isRightClick = false;
var noZoomLevel = 70;

function onDocumentMouseDown(event) {
    event.preventDefault();
    if (event.which === 3) {
        isRightClick = true;
    }
    isUserInteracting = true;
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
    var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    var vector = new THREE.Vector3(mouseX, mouseY, 0.5);
    projector.unprojectVector(vector, camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(markers, true);
    if (intersects[0] !== undefined) {

        interactiveObject = intersects[0].object;
        onMouseDownObjectXRotation = interactiveObject.rotation.x;
        onMouseDownObjectYRotation = interactiveObject.rotation.y;
        onMouseDownObjectZRotation = interactiveObject.rotation.z;
        manageHotspot();
        //portal(..);
        //if (interactiveObject.geometry.name) {
        //  onHotspotClicked();
        //}
    }
//    var intersects2 = raycaster.intersectObjects(interactiveTexts, true);
//    if (intersects2.length === 0)
//        intersects2 = raycaster.intersectObjects(menuPoints, true);
//    if (intersects2[0] !== undefined) {
//        var information = intersects2[0].object.name.split(" ");
//        var hotspotArray = getContent("hotspotInfo", information[0]);
//        var hotspotPosition = intersects2[0].object.position;
//        while (hotspotArray.length > 0) {
//            var hotspot = hotspotArray.pop();
//            if (hotspot['Name'] === information[1]) {
//                portal(hotspot['Source'], hotspotPosition, hotspot['Width'], hotspot['Height']);
//            }
//        }
//    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererCSS.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    if (isUserInteracting && interactiveObject === undefined) {
        lon = mod(((onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon), 360);
        var rawLat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
        lat = Math.max(rawLat, latLimit);
    }
    if (interactiveObject !== undefined && !isRightClick) {
//        interactiveObject.rotation.y = (event.clientX - onPointerDownPointerX) * 0.01 + onMouseDownObjectYRotation;
//        interactiveObject.rotation.z = (onPointerDownPointerY - event.clientY) * 0.01 + onMouseDownObjectZRotation;
    }
    if (interactiveObject !== undefined && isRightClick) {
//        interactiveObject.rotation.x = (onPointerDownPointerY - event.clientY) * 0.01 + onMouseDownObjectXRotation;
    }
    sprite.position.set(event.clientX, event.clientY - 20, 0);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //printLonLatInfo();
}

function onDocumentMouseUp(event) {
    event.preventDefault();
    isRightClick = false;
    isUserInteracting = false;
    interactiveObject = undefined;
}

function onDocumentMouseWheel(event) {
    if (!amILoading) {
        //var previousFov = fov;
        var delta;
        if (event.wheelDeltaY) {
            delta=event.wheelDeltaY;
        } else if (event.wheelDelta) {
            delta=event.wheelDelta;
        } else if (event.detail) {
            delta=event.detail;
        }
        var sub = fov - Math.min((delta * 0.05), 2);
        var zoom = maxZoom;
        var indice = whichTransitionDirection();
        if (indice !== undefined & delta>0) {
            zoom = ZoomArray[indice]['ZoomNext'];
        }
        if (zoom <= sub && sub <= minZoom) {
            if (event.wheelDeltaY) {
                fov -= Math.min((delta * 0.05), 2);
            } else if (event.wheelDelta) {
                fov -= Math.min((delta * 0.05), 2);
            } else if (event.detail) {
                fov += Math.min((delta * 1.0), 2);
            }

            if (planeMesh !== undefined) {
                planeMesh.scale.x = fov / noZoomLevel;
                planeMesh.scale.y = fov / noZoomLevel;
            }
            camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
            render();
        }
        if (sub < zoom & delta>0) {
            getNewPanorama(panoId);
        }
        //Zoom Previous
        if(delta<0 & fov>69.){ // 69. FIXME
            var previousPanoArray=getContent("previousPano", panoId);
            while(previousPanoArray.length>0){
                var candidatePreviousPano=previousPanoArray.pop();
                if(Math.abs(lat-candidatePreviousPano['LatitudeOnLoad'])<20 &
                        Math.abs(lon-candidatePreviousPano['LongitudeOnLoad'])<20){
                    load(candidatePreviousPano['IdCalling'],candidatePreviousPano['Latitude'],candidatePreviousPano['Longitude'] );
                    //qui non passo i valori attuali perché non voglio fare la transizione smooth
                }
            }
        }
        
    }
}

function onDocumentDoubleclick(event) {
    var predefinedZoom = Math.floor(((minZoom - maxZoom) / 3) * 1000) / 1000;
    var zoom = maxZoom;
    var indice = whichTransitionDirection();
    if (indice !== undefined) {
        zoom = ZoomArray[indice]['ZoomNext'];
    }
    var newFov = fov - predefinedZoom;
    if (zoom < newFov && newFov < minZoom) {
        fov -= predefinedZoom;
        camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
        render();
    }
    else {
        var found = getNewPanorama(panoId);
        if (!found) {
            fov = 70;
            camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
            render();
        }
    }
    if (planeMesh !== undefined) {
        planeMesh.scale.x = fov / noZoomLevel;
        planeMesh.scale.y = fov / noZoomLevel;
    }
}

function onDocumentRightClick(event) {
    isRightClick = true;
    onHotspotClick();
    event.preventDefault();
}

function printLonLatInfo() {
    console.log("Longitude: " + lon);
    console.log("Latitude: " + lat);
}

function isZoomIn(previousFov, fov) {
    return previousFov > fov ? true : false;
}


//FIXME: non è proprio precisissima a quanto pare
function XYZtoLonLat(x, y, z) {
    var lonLat = [];
    lonLat[1] = Math.acos(y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))) - Math.PI / 2;
    lonLat[1] *= 180 / Math.PI;
    lonLat[1] = Math.max(lonLat[1], latLimit); //BOH
    if (x >= 0)
        lonLat[0] = Math.atan(z / x);
    else
        lonLat[0] = Math.atan(z / x) + Math.PI;
    lonLat[0] *= 180 / Math.PI;
    lonLat[0] = mod(lonLat[0], 360); //BOH
    return lonLat;
}

function onHotspotClick() {

    function search(name) {
        for (var i = 0; i < hotspotArray.length; i++) {
            if (hotspotArray[i].name === name) {
                return hotspotArray[i];
            }
        }
        return undefined;
    }

    cleanUpHotSpotContent();
    var hotspotInfo = getContent("hotspotInfo", 1);
    console.log(hotspotInfo);
    if (interactiveObject !== selectedFrame) {
        var hotspotArray = getContent("hotspotInfo", interactiveObject.hotspotId);
        console.log(hotspotInfo);
        var hotspotInfo = search(interactiveObject.name);
        portal(hotspotInfo[Source], interactiveObject.position, hotspotInfo["Width"], hotspotInfo["Height"]);
//        switch (interactiveObject.name) {
//            case "Gallery":
//                var hotspotInfo = search("Gallery");
//                break;
//            case "Object":
//                var hotspotInfo = search("Object");
//                break;
//            case "Panorama":
//                var hotspotInfo = search("Panorama");
//                break;
//            case "PDF":
//                var hotspotInfo = search("PDF");
//                break;
//        }
    }
}