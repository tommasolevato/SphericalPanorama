<?php

class NextZoomFetcher implements Fetcher {

    public function fetch($con, $thingToFetch) {
        $result = mysqli_query($con, "SELECT * FROM Collegamento
                              WHERE IdCalling='" . $thingToFetch . "'");

        $all = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($all, $row);
        }
        return json_encode($all);
    }

}
