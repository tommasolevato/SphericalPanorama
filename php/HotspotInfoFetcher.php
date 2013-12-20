<?php

class HotspotInfoFetcher implements Fetcher {

    public function fetch($con, $thingToFetch) {
        $result = mysqli_query($con, "SELECT HotspotInfo.*, Hotspot.*, HotspotNelPanorama.* FROM HotspotInfo JOIN Hotspot ON Hotspot.ID = HotspotInfo.HotspotId JOIN HotspotNelPanorama on Hotspot.ID = HotspotNelPanorama.IdHotspot WHERE Hotspot.ID='" . $thingToFetch . "' ORDER BY HotspotInfo.Name DESC");
        $all = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($all, $row);
        }
        return json_encode($all);
    }

}
