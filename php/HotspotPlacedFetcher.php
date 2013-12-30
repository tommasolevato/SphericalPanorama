<?php

class HotspotPlacedFetcher implements Fetcher {

    public function fetch($con, $thingToFetch) {
        $result = mysqli_query($con, "SELECT * FROM HotspotNelPanorama
                                        JOIN Panorama ON
                                        Panorama.ID=HotspotNelPanorama.IdPanorama");
        $all = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($all, $row);
        }
        return json_encode($all);
    }

}
