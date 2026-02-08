# CLAUDE.md - AI Assistant Context

This is a WordPress/WooCommerce plugin starter template. When working with this codebase, follow these patterns and conventions.

## Project Overview

A scaffold for modern WordPress/WooCommerce plugins featuring:
- React-based admin UI using DataViews
- REST API with namespaced endpoints
- Gutenberg blocks with Interactivity API
- wp-scripts build system with WooCommerce dependency extraction

## Creating a New Plugin from This Template

When the user asks to create a new plugin based on this template, perform these find-and-replace operations across all files:

| Find | Replace With |
|------|--------------|
| `woodev-extension-starter` | `new-plugin-name` |
| `WoodevExtensionStarter` | `NewPluginName` |
| `woodev_extension_starter` | `new_plugin_name` |
| `WOODEV_EXTENSION_STARTER` | `NEW_PLUGIN_NAME` |
| `woodev-starter-tool` | `new-tool-name` |
| `woodevStarterTool` | `newToolName` |
| `woodev-starter/v1` | `new-plugin/v1` |

Also rename the main plugin file from `woodev-extension-starter.php` to match the new plugin name.

After renaming, run `composer install && npm install && npm run build` to verify everything works.

## Architecture Patterns

### PHP Structure

- **Main file** (`woodev-extension-starter.php`): Only defines constants and requires modules
- **Feature modules** (`inc/*.php`): Each feature isolated in its own namespaced file
- **Strict types**: All PHP files use `declare( strict_types=1 )`
- **Namespace convention**: `WoodevExtensionStarter\FeatureName`
- **Coding standards**: WordPress Coding Standards (WPCS) - use tabs, spaces inside parentheses
- **Linting config**: `phpcs.xml.dist` - run `npm run lint:php` to check

### JavaScript Structure

- **Entry point**: `src/js/admin/index.js` - uses WooCommerce Admin SPA pattern
- **Components**: `src/js/admin/components/` - React components
- **Hooks**: `src/js/admin/hooks/` - Custom hooks (data fetching, state)
- **Config**: `src/js/admin/config/` - Field definitions, actions, settings

### REST API Pattern

Located in `inc/rest-api.php`:
- Namespace: `woodev-starter/v1`
- Always include `permission_callback`
- Use `sanitize_callback` and `validate_callback` for args
- Return `WP_REST_Response` with appropriate status codes

**Note**: The DataViews demo uses `@wordpress/core-data` which handles REST calls for post types internally. Custom endpoints are only needed for operations not covered by WordPress core (custom business logic, aggregations, etc.).

### DataViews Pattern

The admin UI uses `@wordpress/dataviews` with the WordPress Data Layer:
- **fields**: Define columns in `config/itemConfig.js`
- **actions**: Define row actions (view, edit, trash) in same file
- **useItems hook**: Uses `useEntityRecords` from `@wordpress/core-data`

To switch post types, change `'page'` to your CPT slug in `useItems.js`.

## Key Files to Modify

When adding features:

| Task | Files to Edit |
|------|---------------|
| Add REST endpoint | `inc/rest-api.php` |
| Add admin component | `src/js/admin/components/`, import in `App.js` |
| Add PHP hook/filter | `inc/hooks.php` |
| Add new block | Create `src/blocks/block-name/` directory |

## Data Flow

The demo uses the WordPress Data Layer (`@wordpress/core-data`):

```
WordPress REST API (built-in /wp/v2/pages)
    ↓
useEntityRecords (src/js/admin/hooks/useItems.js)
    ↓
DataViews component (src/js/admin/components/App.js)
```

The Data Layer handles authentication, caching, and optimistic updates automatically. To use a custom post type, change `'page'` to your CPT slug in `useItems.js`.

For custom endpoints (settings, business logic), use `inc/rest-api.php` with `wp_localize_script` in `inc/admin-page.php`. These endpoints can then be called from your React components using `apiFetch`.

## Common Tasks

### Changing the post type

```javascript
// src/js/admin/hooks/useItems.js
// Change 'page' to your custom post type slug
useEntityRecords( 'postType', 'your_cpt_slug', { ... } );
```

### Adding a new DataViews field

```javascript
// src/js/admin/config/itemConfig.js
{
    id: 'new_field',
    label: 'New Field',
    type: 'text',
    enableSorting: true,
    getValue: ({ item }) => item.new_field,
}
```

### Adding a REST endpoint

```php
// inc/rest-api.php
register_rest_route(
	'woodev-starter/v1',
	'/new-endpoint',
	array(
		'methods'             => 'GET',
		'callback'            => __NAMESPACE__ . '\handle_new_endpoint',
		'permission_callback' => function () {
			return current_user_can( 'manage_options' );
		},
	)
);
```


## Dependencies

Scripts rely on WordPress/WooCommerce packages extracted at build time:
- `@wordpress/element` - React wrapper
- `@wordpress/components` - UI components
- `@wordpress/core-data` - Data layer (REST API abstraction)
- `@wordpress/dataviews` - Table/grid views
- `@wordpress/icons` - Icon library
- `@wordpress/interactivity` - Frontend interactivity
- `@wordpress/hooks` - WooCommerce Admin page registration

## Important Notes

- Asset files (`build/scripts/*.asset.php`) are auto-generated - never edit manually
- The `build/`, `node_modules/`, and `vendor/` directories are gitignored
- Always run `composer install && npm install && npm run build` after cloning
- PHP must follow WordPress Coding Standards - run `npm run lint:php` before committing
- PHP namespaces must match directory structure for autoloading compatibility
- The Data Layer (`@wordpress/core-data`) handles REST auth automatically
- WooCommerce is required for the admin page to function
- Admin page uses `addFilter('woocommerce_admin_pages_list', ...)` for SPA integration
- Avoiding adding manual inline style overrides to components unless specifically requested.
