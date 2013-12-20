<?php

class PanoramaFetcher implements Fetcher {

    public function fetch($con, $thingToFetch) {
        $result = mysqli_query($con, "SELECT * FROM Panorama WHERE ID='" . $thingToFetch . "'");

        while ($row = mysqli_fetch_array($result)) {
            echo $row['Panorama'];
        }
    }

}
