var rightPosition = true;

function getHotspot() {
    cleanUpMarkers();
    var hotspotArray = getContent("hotspot", panoId);
    for (var i = 0; i < hotspotArray.length; i++) {
        var hotspot = hotspotArray[i];
        var position = new THREE.Vector3(parseInt(hotspot['xPosition']), parseInt(hotspot['yPosition']), parseInt(hotspot['zPosition']));
        makeHotspot(position, hotspot['IdHotspot']);
    }
}

function cleanUpHotSpotContent() {
    while (objects.length > 0) {
        var objectToRemove = objects.pop();
        scene.remove(objectToRemove);
    }
    while (cssObjects.length > 0) {
        var cssObjectToRemove = cssObjects.pop();
        cssScene.remove(cssObjectToRemove);
    }
    element.width = 0;
    element.height = 0;
}

function cleanUpMarkers() {
    while (markers.length > 0) {
        var obj = markers.pop();
        scene.remove(obj);
    }
}

function portal(html, hotspotPosition, width, heigth, leftOrRight, color) {
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0x00000, opacity: 0.1});
    var planeGeometry = new THREE.PlaneGeometry(width, heigth);
    var inside=30;
    var frame = makeFrame(parseInt(width)+inside*2, parseInt(heigth)+inside*2, 50, inside, 45, color);
    objects.push(frame);//NEW

    planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.x = hotspotPosition.x; //+ (planeMesh.geometry.width / 2) + 50;
    planeMesh.position.y = hotspotPosition.y;
    planeMesh.position.z = hotspotPosition.z;

    if (leftOrRight === "left") {
        planeMesh.position.x += (planeMesh.geometry.width / 2) + 30;
    }
    else {
        planeMesh.position.x -= (planeMesh.geometry.width / 2) + 30;
    }
    planeMesh.lookAt(new THREE.Vector3(0, 0, 0));
    objects.push(planeMesh);
    scene.add(planeMesh);
    element.src = html;
    var elementWidth = 1024;
    var aspectRatio = heigth / width;
    var elementHeight = elementWidth * aspectRatio;
    element.width = elementWidth + "px";
    element.height = elementHeight + "px";
    element.position = "absolute";
    cssObject = new THREE.CSS3DObject(element);
    cssObject.scale.x /= (elementWidth / width);
    cssObject.scale.y /= (elementWidth / width);
    cssObject.position = new THREE.Vector3(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z + 100);
    if (leftOrRight === "left") {
        cssObject.position.x += 135;
    }
    else {
        cssObject.position.x -= 135;
    }
    cssObject.rotation = planeMesh.rotation;
    cssScene.add(cssObject);
    cssObjects.push(cssObject);
    var response = XYZtoLonLat(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z);
    smoothLonLatTransition(response[0], response[1], 3);
    frame.position = new THREE.Vector3(planeMesh.position.x-1, planeMesh.position.y,planeMesh.position.z-planeMesh.position.z/planeMesh.position.x) ;
    frame.rotation = new THREE.Vector3(planeMesh.rotation.x, planeMesh.rotation.y, planeMesh.rotation.z);
    if (leftOrRight === "left") {
        frame.rotation.y += Math.PI;
    }
    scene.add(frame);
}

function makeHotspot(position, id) {
    var pts = [];
    var detail = 0.1;
    var radius = 25;
    var radius2 = 12.5;

    for (var i = 0; i <= radius2; i += detail)
        pts.push(new THREE.Vector3(radius - (radius2 / 2) + i, 0, -(radius2 / 2)));

    for (var i = 0; i <= radius2; i += detail)
        pts.push(new THREE.Vector3(radius + (radius2 / 2), 0, -(radius2 / 2) + i));

    for (var i = 0; i <= radius2; i += detail)
        pts.push(new THREE.Vector3(radius + (radius2 / 2) - i, 0, (radius2 / 2)));

    for (var i = 0; i <= radius2; i += detail)
        pts.push(new THREE.Vector3(radius - (radius2 / 2), 0, (radius2 / 2) - i));

    var torusGeometry = new THREE.LatheGeometry(pts, 12, 0, Math.PI * 170 / 360);

    var materials1 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('images/pano_icon_vertical.png')
        })
    ];
    var torusMaterial = new THREE.MeshFaceMaterial(materials1);
    var torus1 = new THREE.Mesh(torusGeometry, torusMaterial);
    torus1.position = new THREE.Vector3(position.x, position.y, position.z);
    torus1.lookAt(new THREE.Vector3(0, 0, 0));
    torus1.rotation.z = torus1.rotation.z - Math.PI / 4 + Math.PI * 5 / 360;
    torus1.name = "Panorama";
    torus1.hotspotId = id;
    markers.push(torus1);
    scene.add(torus1);


    var materials2 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('images/gallery_icon_horizontal.png')
        })
    ];
    var torusMaterial = new THREE.MeshFaceMaterial(materials2);
    var torus2 = new THREE.Mesh(torusGeometry, torusMaterial);
    torus2.position = new THREE.Vector3(position.x, position.y, position.z);
    torus2.lookAt(new THREE.Vector3(0, 0, 0));
    torus2.rotation.z = torus2.rotation.z + Math.PI / 4 + Math.PI * 5 / 360;
    torus2.name = "Gallery";
    torus2.hotspotId = id;
    markers.push(torus2);
    scene.add(torus2);


    var materials3 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('images/pdf_icon_horizontal_reflected.png')
        })
    ];
    var torusMaterial = new THREE.MeshFaceMaterial(materials3);
    var torus3 = new THREE.Mesh(torusGeometry, torusMaterial);
    torus3.position = new THREE.Vector3(position.x, position.y, position.z);
    torus3.lookAt(new THREE.Vector3(0, 0, 0));
    torus3.rotation.z = torus3.rotation.z + Math.PI * 3 / 4 + Math.PI * 5 / 360;
    torus3.name = "PDF";
    torus3.hotspotId = id;
    markers.push(torus3);
    scene.add(torus3);


    var materials4 = [
        new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('images/3d_icon_horizontal.png')
        })
    ];
    var torusMaterial = new THREE.MeshFaceMaterial(materials4);
    var torus4 = new THREE.Mesh(torusGeometry, torusMaterial);
    torus4.position = new THREE.Vector3(position.x, position.y, position.z);
    torus4.lookAt(new THREE.Vector3(0, 0, 0));
    torus4.rotation.z = torus4.rotation.z + Math.PI * 5 / 4 + Math.PI * 5 / 360;
    torus4.name = "Object";
    torus4.hotspotId = id;
    markers.push(torus4);
    scene.add(torus4);

    //var markerTexture = THREE.ImageUtils.loadTexture('images/move_arrws_sphere.png');
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 80, 120), new THREE.MeshLambertMaterial({color: 0x999999}));//map: markerTexture
    scene.add(sphere);
    markers.push(sphere);
    sphere.name="Sphere";
    sphere.hotspotId = id;
    sphere.lookAt(new THREE.Vector3(0, 0, 0));
    sphere.position = new THREE.Vector3(position.x, position.y, position.z);
    sphere.rotation.y = sphere.rotation.y + Math.PI / 2 + Math.atan(parseFloat(sphere.position.z) / parseFloat(sphere.position.x)); //FIXME
}

function manageHotspot() {

    function rotate(angle) {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].hotspotId === interactiveObject.hotspotId) {
                smoothZRotationTransition(markers[i], angle, Math.PI / 12);
            }
        }
    }

    function search(name) {
        for (var i = 0; i < hotspotArray.length; i++) {
            if (hotspotArray[i]['Name'] === name) {
                return hotspotArray[i];
            }
        }
    }

    function restoreHotspotPosition(hotspotId) {
    
//    var hotspotArray = getContent("hotspotInfo", hotspotId);
//    var hotspotInfo = hotspotArray.pop();
//    //console.log(hotspotInfo);
//    for (var i = 0; i < markers.length; i++) {
//        if (markers[i].hotspotId === hotspotId) {
//            markers[i].position = new THREE.Vector3(parseInt(hotspotInfo['xPosition']), parseInt(hotspotInfo['yPosition']), parseInt(hotspotInfo['zPosition']));
//        }
//    }
    var found = false;
    var i =0;
    while(i<markers.length & !found){
        if(markers[i].name==="Sphere" & markers[i].hotspotId===hotspotId)
            found=true;
        else
            i++;
    }
    if(selectedFrame!==undefined)
        selectedFrame.position= new THREE.Vector3(markers[i].position.x, markers[i].position.y, markers[i].position.z);
}
    function rotateToHotspotPosition() {
        function searchHotspot() {
            for (var i = 0; i < hotspotArray.length; i++) {
                if (hotspotArray[i]["IdPanorama"] === panoId.toString()) {
                    return hotspotArray[i];
                }
            }
        }
        var hotspotArray = getContent("hotspotInfo", interactiveObject.hotspotId);
        var hotspotInfo = searchHotspot(panoId);
        if (hotspotInfo === undefined) {
            return;
        }
        var response = XYZtoLonLat(hotspotInfo["xPosition"], hotspotInfo["yPosition"], hotspotInfo["zPosition"]);
        smoothLonLatTransition(response[0], response[1], 3);
    }

    cleanUpHotSpotContent();
    restoreHotspotPosition(interactiveObject.hotspotId); //FIXME se c'è due volte un hotspot in diverse panoramiche
    var hotspotArray = getContent("hotspotInfo", interactiveObject.hotspotId);

    switch (interactiveObject.name) {
        case "Gallery":
            if (rightPosition) {
                rightPosition = false;
                rotate(Math.PI / 2);
                var hotspotInfo = search("Gallery");
//                restoreHotspotPosition(interactiveObject.hotspotId);
                portal(hotspotInfo['Source']+"?id="+hotspotInfo['IdName'],interactiveObject.position,
                    hotspotInfo["Width"], hotspotInfo["Height"], "left", 0xfcd402);
                interactiveObject.position.x += 5;
                selectedFrame = interactiveObject;
            }
            else {
                if (selectedFrame !== interactiveObject) {
                    rightPosition = false;
                    var hotspotInfo = search("Gallery");
//                    restoreHotspotPosition(interactiveObject.hotspotId);
                    portal(hotspotInfo['Source']+"?id="+hotspotInfo['IdName'],interactiveObject.position,
                        hotspotInfo["Width"], hotspotInfo["Height"], "left", 0xfcd402);
                    interactiveObject.position.x += 5;
                    selectedFrame = interactiveObject;
                }
                else {
                    rightPosition = true;
                    rotate(-Math.PI / 2);
                    selectedFrame = undefined;
                    cleanUpHotSpotContent(interactiveObject.hotspotId);
                    rotateToHotspotPosition();
//                    restoreHotspotPosition(interactiveObject.hotspotId);
                }
            }
            break;
        case "Object":
            if (rightPosition) {
                rightPosition = false;
                rotate(Math.PI / 2);
                var hotspotInfo = search("Object");
//                restoreHotspotPosition(interactiveObject.hotspotId);
                portal(hotspotInfo['Source']+"?id="+hotspotInfo['IdName'], interactiveObject.position,
                    hotspotInfo["Width"], hotspotInfo["Height"], "right", 0xa1cc3a);
                selectedFrame = interactiveObject;
                interactiveObject.position.x -= 5;
            }
            else {
                if (selectedFrame !== interactiveObject) {
                    rightPosition = false;
                    var hotspotInfo = search("Object");
//                    restoreHotspotPosition(interactiveObject.hotspotId);
                    portal(hotspotInfo['Source']+"?id="+hotspotInfo['IdName'], interactiveObject.position,
                        hotspotInfo["Width"], hotspotInfo["Height"], "right",0xa1cc3a);
                    selectedFrame = interactiveObject;
                    interactiveObject.position.x -= 5;
                } else {
                    rightPosition = true;
                    rotate(-Math.PI / 2);
                    selectedFrame = undefined;
                    cleanUpHotSpotContent(interactiveObject.hotspotId);
                    rotateToHotspotPosition();
//                    restoreHotspotPosition(interactiveObject.hotspotId);
                }
            }
            break;
        case "Panorama":
            if (!rightPosition) {
                rightPosition = true;
                rotate(-Math.PI / 2);
                var hotspotInfo = search("Panorama");
                portal(hotspotInfo['Source']+"?id="+hotspotInfo['IdName'], interactiveObject.position,
                    hotspotInfo["Width"], hotspotInfo["Height"], "right",0x00acec);
                selectedFrame = interactiveObject;
                interactiveObject.position.x -= 5;
            }
            else {
                if (selectedFrame === interactiveObject) {
                    cleanUpHotSpotContent(interactiveObject.hotspotId);
                    rotateToHotspotPosition();
                    selectedFrame = undefined;
//                    restoreHotspotPosition(interactiveObject.hotspotId);
                }
                else {
                    var hotspotInfo = search("Panorama");
                    portal(hotspotInfo['Source']+"?id="+hotspotInfo['IdName'], interactiveObject.position,
                        hotspotInfo["Width"], hotspotInfo["Height"], "right",0x00acec);
                    interactiveObject.position.x -= 5;
                    selectedFrame = interactiveObject;
                }
            }
            break;
        case "PDF":
            if (!rightPosition) {
                rightPosition = true;
                rotate(-Math.PI / 2);
                var hotspotInfo = search("PDF");
                var pdfSource=getContent("pdf", hotspotInfo['IdName']); //FIXME Meglio passare id
                portal(hotspotInfo['Source']+"?id="+pdfSource, interactiveObject.position,
                    hotspotInfo["Width"], hotspotInfo["Height"], "left",0xe1235e);
                interactiveObject.position.x += 5;
                selectedFrame = interactiveObject;
            }
            else {
                if (selectedFrame === interactiveObject) {
                    cleanUpHotSpotContent(interactiveObject.hotspotId);
                    rotateToHotspotPosition();
                    selectedFrame = undefined;
//                    restoreHotspotPosition(interactiveObject.hotspotId);
                }
                else {
                    var hotspotInfo = search("PDF");
                    var pdfSource=getContent("pdf", hotspotInfo['IdName']); //FIXME Meglio passare id
                    portal(hotspotInfo['Source']+"?id="+pdfSource, interactiveObject.position,
                        hotspotInfo["Width"], hotspotInfo["Height"], "left",0xe1235e);
//                    restoreHotspotPosition(interactiveObject.hotspotId);
                    interactiveObject.position.x += 5;
                    selectedFrame = interactiveObject;
                }
            }
            break;
    }
}

function searchMarker(hotspotId, name) {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].hotspotId === hotspotId && markers[i].name === name) {
            return markers[i];
        }
    }
}



function makeFrame(width, height, radius, inside, cornice, color) {

    var californiaPts = [];
    var detail = .1;

    californiaPts.push(new THREE.Vector2(-width / 2, -height / 2));
    //californiaPts.push(new THREE.Vector2(-width/2, - Math.sqrt(radius^2-(radius-inside)^2)));

    var alpha = Math.acos((radius - inside) / radius);
    for (var angle = -alpha; angle < alpha; angle += detail)
        californiaPts.push(new THREE.Vector2(-width / 2 - (radius - inside) + Math.cos(angle) * radius, Math.sin(angle) * radius));

    //californiaPts.push(new THREE.Vector2(-width/2, Math.sqrt(radius^2-(radius-inside)^2)));
    californiaPts.push(new THREE.Vector2(-width / 2, height / 2));
    californiaPts.push(new THREE.Vector2(width / 2, height / 2));
    californiaPts.push(new THREE.Vector2(width / 2, -height / 2));

    californiaPts.push(new THREE.Vector2(+0.00001 - width / 2, -height / 2));


    var center = inside / 2;
    californiaPts.push(new THREE.Vector2(center + 0.00001 + cornice - width / 2, +cornice - height / 2));
    californiaPts.push(new THREE.Vector2(center - cornice + width / 2, +cornice - height / 2));
    californiaPts.push(new THREE.Vector2(center - cornice + width / 2, -cornice + height / 2));
    californiaPts.push(new THREE.Vector2(center + cornice - width / 2, -cornice + height / 2));
    californiaPts.push(new THREE.Vector2(center + cornice - width / 2, +cornice - height / 2));

    californiaPts.push(new THREE.Vector2(-width / 2, -height / 2));


    var californiaShape = new THREE.Shape(californiaPts);
    var extrudeSettings = {amount: 2};


    extrudeSettings.bevelEnabled = false;
    extrudeSettings.bevelSegments = 2;
    extrudeSettings.steps = 2;


    var geometry = new THREE.ExtrudeGeometry(californiaShape, extrudeSettings);
    return new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: color}));
}