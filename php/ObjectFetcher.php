<?php

class ObjectFetcher implements Fetcher {

    public function fetch($con, $thingToFetch) {
        $result = mysqli_query($con, "SELECT OggettoNelPanorama.*, Oggetto.Object, Oggetto.MTL FROM Panorama 
                              JOIN OggettoNelPanorama ON Panorama.ID = OggettoNelPanorama.IdObject
                              JOIN Oggetto ON Oggetto.ID = OggettoNelPanorama.IdObject
                              WHERE OggettoNelPanorama.IdPanorama='" . $thingToFetch . "'");

        $all = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($all, $row);
        }
        return json_encode($all);
    }

}
