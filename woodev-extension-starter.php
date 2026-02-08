<?php
/**
 * Plugin Name: WooDev Extension Starter
 * Version: 1.0.0
 * Requires PHP: 8.1
 * Requires at least: 6.9
 * WC requires at least: 10.0
 *
 * @package WoodevExtensionStarter
 */

declare( strict_types=1 );

namespace WoodevExtensionStarter;

defined( 'ABSPATH' ) || exit;

define( 'WOODEV_EXTENSION_STARTER_VERSION', '1.0.0' );
define( 'WOODEV_EXTENSION_STARTER_FILE', __FILE__ );
define( 'WOODEV_EXTENSION_STARTER_DIR', plugin_dir_path( __FILE__ ) );
define( 'WOODEV_EXTENSION_STARTER_URL', plugin_dir_url( __FILE__ ) );

// Composer autoloader (if using classes).
if ( file_exists( WOODEV_EXTENSION_STARTER_DIR . 'vendor/autoload.php' ) ) {
	require_once WOODEV_EXTENSION_STARTER_DIR . 'vendor/autoload.php';
}

// Feature modules.
require_once WOODEV_EXTENSION_STARTER_DIR . 'inc/post-types.php';
require_once WOODEV_EXTENSION_STARTER_DIR . 'inc/rest-api.php';
require_once WOODEV_EXTENSION_STARTER_DIR . 'inc/admin-page.php';
require_once WOODEV_EXTENSION_STARTER_DIR . 'inc/blocks.php';
require_once WOODEV_EXTENSION_STARTER_DIR . 'inc/hooks.php';
