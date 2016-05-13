<?php

// base/mttws/task/Store?auth=[auth]

include('httpful.phar');

$uri = rtrim( dirname($_SERVER["SCRIPT_NAME"]), '/' );
$uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
$uri = urldecode( $uri );

$newURI = explode("/", $uri);

if (isset($_GET['auth'])) {
	$auth = $_GET['auth'];
}else{
	$auth = '';
}

if ($_SERVER["REQUEST_METHOD"] === "POST")
{
	$result = "POST request received!";
	$putData = file_get_contents('php://input');

	if (isset($putData))
	{
		$result .= "\nPOST DATA: " . $putData;
		// Device
		// Lpn
		// isScanned
		// StationName
		// Locations[0]
	}

	//echo $result;
}

$url = "http://172.21.27.17:7003/mttws/task/ScreenBag";

$response = \Httpful\Request::Post($url)                  // Build a post request...
	->sendsJson()                               // tell it we're sending (Content-Type) JSON...
	->addHeader('Authorization', 'Basic ' . $auth)
	->addHeader('Content-Type', 'application/json')
	->addHeader('Accept', 'application/json')
	->addHeader('Accept-Language', 'en-GB')
	->body($putData)             // attach a body/payload...
	->send(); 

if(strpos($response, 'Error 401--Unauthorized') !== false) {
	echo "{ " . '"' . 'status"' . ':' .'"' . '401' . '" }';
	header("HTTP/1.1 401 Unauthorized");
	exit;
} else {
	echo ($response);
}

?>