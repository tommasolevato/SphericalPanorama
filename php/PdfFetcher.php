<?php

class PdfFetcher implements Fetcher {

    public function fetch($con, $thingToFetch) {
        $result = mysqli_query($con, "SELECT * FROM PDF WHERE ID='" . $thingToFetch . "'");

        while ($row = mysqli_fetch_array($result)) {
            echo $row['Source'];
        }
    }

}
