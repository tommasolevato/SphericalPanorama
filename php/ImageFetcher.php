<?php

class ImageFetcher implements Fetcher {

    public function fetch($con, $thingToFetch) {
        $result = mysqli_query($con, "SELECT ImmaginePerOggetto.*, Immagine.Image FROM Immagine
                              JOIN ImmaginePerOggetto ON Immagine.ID = ImmaginePerOggetto.IdImage
                              JOIN Oggetto ON Oggetto.ID=ImmaginePerOggetto.IdObject
                              WHERE Oggetto.Object='" . $thingToFetch . "'");

        $all = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($all, $row);
        }
        return json_encode($all);
    }

}
