/**
 * Starter Tool - WooCommerce Admin Page
 *
 * Entry point for the Starter Tool admin interface.
 */

import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import App from './components/App';
import './style.scss';

/**
 * Register the Starter Tool page with WooCommerce Admin.
 */
addFilter(
	'woocommerce_admin_pages_list',
	'woodev-extension-starter',
	( pages ) => {
		pages.push( {
			container: App,
			path: '/woodev-starter-tool',
			breadcrumbs: [ __( 'My Extension', 'woodev-extension-starter' ) ],
			navArgs: {
				id: 'woodev-starter-tool',
			},
		} );

		return pages;
	}
);
