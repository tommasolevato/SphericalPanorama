<?php

class MySQLFetcher {

    private $contentFetcher;
    private $con;

    public function getContent($typeOfContent, $identifier) {
        $this->connect();
        $this->instantiateContentFetcher($typeOfContent);
        $result = $this->contentFetcher->fetch($this->con, $identifier);
        $this->close();
        return $result;
    }

    private function connect() {
        $db_properties = Config::getConfiguration();
        $this->con = mysqli_connect($db_properties['host'], $db_properties['user'], $db_properties['password'], $db_properties['db_name']);
    }

    private function close() {
        mysqli_close($this->con);
    }

    private function instantiateContentFetcher($typeOfContent) {
        switch ($typeOfContent) {
            case "image":
                $this->contentFetcher = new ImageFetcher();
                break;
            case "nextPanoramas":
                $this->contentFetcher = new NextPanoramasFetcher();
                break;
            case "object":
                $this->contentFetcher = new ObjectFetcher();
                break;
            case "panorama":
                $this->contentFetcher = new PanoramaFetcher();
                break;
            case "text":
                $this->contentFetcher = new TextFetcher();
                break;
            default :
                throw new Exception("Unknown type of content");
        }
    }

}
