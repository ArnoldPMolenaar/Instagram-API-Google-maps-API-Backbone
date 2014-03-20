<?php
//load default settings
require_once("../settings.php");
require_once("../classes/cInstagram.php");

//create query string with default access token
$queryString = ["access_token" => ACCESS_TOKEN, "count" => COUNT];

//define the instagram class
$cInstagram = new cInstagram(INSTAGRAM_CLIENT_ID, $queryString);