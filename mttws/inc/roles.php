<?php

include('httpful.phar');

$uri = rtrim( dirname($_SERVER["SCRIPT_NAME"]), '/' );
$uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
$uri = urldecode( $uri );

$newURI = explode("/", $uri);

$count = count($newURI);
$url = "http://172.21.27.17:7003/mttws/security/Roles";

\Httpful\Httpful::register(\Httpful\Mime::JSON, new \Httpful\Handlers\JsonHandler(array('decode_as_array' => true)));

if($count >= 3) {
	$auth = end($newURI);
	
	$response = \Httpful\Request::get($url)
		->addHeader('Authorization', 'Basic ' . $auth)
		->withAccept('application/json')
		->withAcceptLanguage('eng-GB')
		->withContentType('application/json; charset=utf-8')
		//->authenticateWith($username, $password)
		->send();
}

if(strpos($response, 'Error 401--Unauthorized') !== false) {
	echo "{ " . '"' . 'status"' . ':' .'"' . '401' . '" }';
	header('HTTP/1.1 401 Unauthorized', true, 401);
	exit;
} else {
	echo ($response);
}

?>