<?php
/**
 * REST API endpoints for WooDev Extension Starter.
 *
 * @package WoodevExtensionStarter
 */

declare( strict_types=1 );

namespace WoodevExtensionStarter\RestAPI;

defined( 'ABSPATH' ) || exit;

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'woodev-starter/v1',
			'/items',
			array(
				'methods'             => 'GET',
				'callback'            => __NAMESPACE__ . '\get_items',
				'permission_callback' => function () {
					return current_user_can( 'manage_options' );
				},
				'args'                => array(
					'page'     => array(
						'default'           => 1,
						'sanitize_callback' => 'absint',
					),
					'per_page' => array(
						'default'           => 20,
						'sanitize_callback' => 'absint',
					),
				),
			)
		);

		register_rest_route(
			'woodev-starter/v1',
			'/items/(?P<id>\d+)',
			array(
				'methods'             => 'POST',
				'callback'            => __NAMESPACE__ . '\update_item',
				'permission_callback' => function () {
					return current_user_can( 'manage_options' );
				},
				'args'                => array(
					'id' => array(
						'required'          => true,
						'validate_callback' => function ( $param ) {
							return is_numeric( $param );
						},
					),
				),
			)
		);
	}
);

/**
 * Get items with pagination.
 *
 * @param \WP_REST_Request $request The request object.
 * @return \WP_REST_Response
 */
function get_items( \WP_REST_Request $request ): \WP_REST_Response {
	$page     = $request->get_param( 'page' );
	$per_page = $request->get_param( 'per_page' );

	// Your query logic here.
	$items = array();
	$total = 0;

	$response = new \WP_REST_Response( $items, 200 );
	$response->header( 'X-WP-Total', (string) $total );
	$response->header( 'X-WP-TotalPages', (string) ceil( $total / $per_page ) );

	return $response;
}

/**
 * Update a single item.
 *
 * @param \WP_REST_Request $request The request object.
 * @return \WP_REST_Response
 */
function update_item( \WP_REST_Request $request ): \WP_REST_Response {
	$id = (int) $request->get_param( 'id' );

	// Your update logic here.

	return new \WP_REST_Response(
		array(
			'success' => true,
			'id'      => $id,
		),
		200
	);
}
