<?php

define( 'INCLUDE_DIR', dirname(__FILE__) . '/inc/');

$rules = array( 
	'supportedFunctions'   => "/public/meta/SupportedFunctions",    // '/public/meta/SupportedFunctions'
	'roles'     		   => "/security/Roles",              		// '/security/Roles/'
	'stations'     		   => "configuration/Stations",              		// '/security/Roles/'
);

$uri = rtrim( dirname($_SERVER["SCRIPT_NAME"]), '/' );
$uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
$uri = urldecode( $uri );

foreach ( $rules as $action => $rule ) {
	
	
	if( strpos($uri, $rule) !== false ) {
		include( INCLUDE_DIR . $action . '.php' );
		exit();
	}

}

echo 'connected';
?>