<?php
/**
 * WooCommerce admin page registration.
 *
 * @package WoodevExtensionStarter
 */

declare( strict_types=1 );

namespace WoodevExtensionStarter\AdminPage;

defined( 'ABSPATH' ) || exit;

/**
 * Register the My Extension admin page with WooCommerce.
 */
add_action(
	'admin_menu',
	function () {
		if ( ! function_exists( 'wc_admin_register_page' ) ) {
			return;
		}

		wc_admin_register_page(
			[
				'id'     => 'woodev-starter-tool',
				'title'  => __( 'My Extension', 'woodev-extension-starter' ),
				'parent' => 'woocommerce',
				'path'   => '/woodev-starter-tool',
			]
		);
	}
);

/**
 * Enqueue admin scripts and styles.
 */
add_action(
	'admin_enqueue_scripts',
	function () {
		// Only load on WooCommerce admin pages.
		if ( ! class_exists( 'Automattic\WooCommerce\Admin\PageController' ) ) {
			return;
		}

		$screen = get_current_screen();
		if ( ! $screen || strpos( $screen->id, 'woocommerce' ) === false ) {
			return;
		}

		$asset_file = WOODEV_EXTENSION_STARTER_DIR . 'build/scripts/admin.asset.php';
		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = require $asset_file;

		// Enqueue the main script.
		wp_enqueue_script(
			'woodev-starter-tool',
			WOODEV_EXTENSION_STARTER_URL . 'build/scripts/admin.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		// Enqueue styles.
		wp_enqueue_style(
			'woodev-starter-tool',
			WOODEV_EXTENSION_STARTER_URL . 'build/scripts/style-admin.css',
			[ 'wp-components' ],
			$asset['version']
		);

		/*
		 * Optional: Localize script with custom data.
		 * The demo uses @wordpress/core-data which handles auth automatically.
		 * Uncomment if you need to pass custom PHP data to JavaScript.
		 *
		 * wp_localize_script(
		 *     'woodev-starter-tool',
		 *     'woodevStarterTool',
		 *     array(
		 *         'customSetting' => get_option( 'woodev_custom_setting', '' ),
		 *     )
		 * );
		 */
	}
);
