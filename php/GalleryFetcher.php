<?php

class GalleryFetcher implements Fetcher {

    public function fetch($con, $thingToFetch) {
        $result = mysqli_query($con, "SELECT Media.* FROM Media
                              JOIN Gallery ON Gallery.IdMedia = Media.ID
                              WHERE Gallery.IdGallery='" . $thingToFetch . "'ORDER BY Media.Id DESC");

        $all = array();
        while ($row = mysqli_fetch_assoc($result)) {
            array_push($all, $row);
        }
        return json_encode($all);
    }

}
