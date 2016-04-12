<?php

// base/mttws/monitor/MonitoredStations?auth=[auth]

include('httpful.phar');

$uri = rtrim( dirname($_SERVER["SCRIPT_NAME"]), '/' );
$uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
$uri = urldecode( $uri );

$newURI = explode("/", $uri);
$count = count($newURI);

$url = "http://172.21.27.17:7003/mttws/query/Bag";

$auth = isset($_GET['auth']) ? $_GET['auth'] : '';

$lpn = isset($_GET['lpn']) ? $_GET['lpn'] : '';
$station = isset($_GET['station']) ? $_GET['station'] : '';
$isLpnScanned = isset($_GET['isLpnScanned']) ? $_GET['isLpnScanned'] : '';
$forceCreate = isset($_GET['forceCreate']) ? $_GET['forceCreate'] : '';
$device = isset($_GET['device']) ? $_GET['device'] : '';

$url .= "?lpn=" . $lpn . "&station=" . $station . "&isLpnScanned=" . $isLpnScanned . "&forceCreate=" . $forceCreate .  "&device=" . $device;

\Httpful\Httpful::register(\Httpful\Mime::JSON, new \Httpful\Handlers\JsonHandler(array('decode_as_array' => true)));

if($count >= 3) {
	$response = \Httpful\Request::get($url)
		->addHeader('Authorization', 'Basic ' . $auth)
		->withAccept('application/json')
		->withAcceptLanguage('eng-GB')
		->withContentType('application/json; charset=utf-8')
		//->authenticateWith($username, $password)
		->send();
}
else {
	$response = \Httpful\Request::get($url)
		->send();
}
if(strpos($response, 'Error 401--Unauthorized') !== false) {
	echo "{ " . '"' . 'status"' . ':' .'"' . '401' . '" }';
	header("HTTP/1.1 401 Unauthorized");
	exit;
} else {
	echo ($response);
}

?>