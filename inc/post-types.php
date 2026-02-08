<?php
/**
 * Custom post type registration.
 *
 * @package WoodevExtensionStarter
 */

declare( strict_types=1 );

namespace WoodevExtensionStarter\PostTypes;

defined( 'ABSPATH' ) || exit;

/**
 * Register custom post types.
 *
 * @see https://developer.wordpress.org/reference/functions/register_post_type/
 */
function register_post_types(): void {
	// Register your custom post types here.
}
add_action( 'init', __NAMESPACE__ . '\register_post_types' );
