<?php

include('httpful.phar');

$url = "http://172.21.27.17:7003/mttws/public/meta/SupportedFunctions";
$response = \Httpful\Request::get($url)
	->send();

echo $response;

?>