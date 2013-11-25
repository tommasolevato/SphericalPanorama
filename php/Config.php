<?php

class Config {

    private static $configuration;
    private static $amIInitialized = false;

    public static function getConfiguration() {
        self::$configuration = \parse_ini_file("../config/php.ini");
        return self::$configuration;
    }

}
