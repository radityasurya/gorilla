<?php

define( 'INCLUDE_DIR', dirname(__FILE__) . '/inc/');

$rules = array( 
	'SupportedFunctions'   	=> "/public/meta/SupportedFunctions",	// '/public/meta/SupportedFunctions'
	'Roles'     		   	=> "/security/Roles",              		// '/security/Roles/'
	'Stations'     		   	=> "/configuration/Stations",           // '/security/Roles/'
	'RegisterMonitor'		=> "/monitor/RegisterMonitor",			// '/monitor/RegisterMonitor'
	'MonitoredStations'    	=> "/monitor/MonitoredStations",		// 'monitor/MonitoredStations'
	'BagsToProcess'			=> "/query/BagsToProcess",              // 'monitor/bagsToProcess'
	'Bag'					=> "/query/Bag",              			// 'monitor/bags'
	'ReleaseBag'			=> "/task/ReleaseBag",        			// 'task/releaseBags'
	'StoreBag'				=> "/task/StoreBag",        			// 'task/StoreBags'
);

$uri = rtrim( dirname($_SERVER["SCRIPT_NAME"]), '/' );
$uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
$uri = strtok($uri, '?');
$uri = urldecode( $uri );

foreach ( $rules as $action => $rule ) {
	//echo $uri . ': ' . $action . ' - ' . $rule . '<br>';
	if($uri == $rule) {
		include( INCLUDE_DIR . $action . '.php' );
		exit();
	}
//	if( strpos($uri, $action) !== false ) {
//		echo $rule . '.php';
//		include( INCLUDE_DIR . $action . '.php' );
//		//exit();
//	} 
}

?>