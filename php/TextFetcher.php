<?php

class TextFetcher implements Fetcher {

    public function fetch($con, $thingToFetch) {
        $result = mysqli_query($con, "SELECT TestoPerOggetto.*, Testo.Text FROM Testo
                              JOIN TestoPerOggetto ON Testo.ID = TestoPerOggetto.IdText
                              JOIN Oggetto ON Oggetto.ID=TestoPerOggetto.IdObject
                              WHERE Oggetto.Object='" . $thingToFetch . "'");

        $all = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($all, $row);
        }
        return json_encode($all);
    }

}
