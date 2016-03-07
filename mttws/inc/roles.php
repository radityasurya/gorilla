<?php

include('httpful.phar');

$uri = rtrim( dirname($_SERVER["SCRIPT_NAME"]), '/' );
$uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
$uri = urldecode( $uri );

$newURI = explode("/", $uri);

$count = count($newURI);
$url = "http://172.21.27.17:7003/mttws/security/Roles";

\Httpful\Httpful::register(\Httpful\Mime::JSON, new \Httpful\Handlers\JsonHandler(array('decode_as_array' => true)));

if($count > 4) {
	$username = $newURI[3];
	$password = $newURI[4];
	$response = \Httpful\Request::get($url)
		->authenticateWith($username, $password)
		->send();
}
else {
$response = \Httpful\Request::get($url)
	->send();
}

//$encoded_response = array_map('utf8_encode', $response);


if(strpos($response, 'Error 401--Unauthorized') !== false) {
	echo "{ " . '"' . 'status"' . ':' .'"' . '401' . '" }';
	header("HTTP/1.1 401 Unauthorized");
	exit;
} else {
	echo ($response);
}

?>