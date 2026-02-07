# CLAUDE.md - AI Assistant Context

This is a WordPress/WooCommerce plugin starter template. When working with this codebase, follow these patterns and conventions.

## Project Overview

A scaffold for modern WordPress/WooCommerce plugins featuring:
- React-based admin UI using DataViews
- REST API with namespaced endpoints
- Gutenberg blocks with Interactivity API
- wp-scripts build system with WooCommerce dependency extraction

## Build Commands

```bash
composer install       # Install PHP dependencies (for linting)
npm install            # Install JS dependencies
npm run build          # Production build (scripts + blocks)
npm run build:scripts  # Build admin scripts only
npm run build:blocks   # Build blocks only (Interactivity API)
npm run start          # Development with watch (both)
npm run start:scripts  # Watch admin scripts only
npm run start:blocks   # Watch blocks only
npm run lint           # Run all linters (JS, CSS, PHP)
npm run lint:js        # Lint JavaScript
npm run lint:css       # Lint styles
npm run lint:php       # Lint PHP (WordPress Coding Standards)
npm run lint:php:fix   # Auto-fix PHP issues
```

**Build output:**
- Scripts → `build/scripts/` (admin.js, admin.asset.php)
- Blocks → `build/blocks/` (auto-discovered from src/blocks/)

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
- Return `WP_REST_Response` with pagination headers

### DataViews Pattern

The admin UI uses `@wordpress/dataviews` for table/grid layouts:
- **fields**: Define columns in `config/itemConfig.js`
- **actions**: Define row actions (edit, delete) in same file
- **useItems hook**: Handles data fetching, pagination, refetch

### Block Pattern

Blocks in `src/blocks/*/` follow this structure:
- `block.json`: Metadata, supports, scripts
- `index.js`: Registration only
- `edit.js`: Editor component using `useBlockProps`
- `view.js`: Interactivity API store for frontend
- `render.php`: Server-side template

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| PHP namespace | PascalCase | `WoodevExtensionStarter\RestAPI` |
| PHP functions | snake_case | `get_items()` |
| JS components | PascalCase | `App.js` |
| JS hooks | camelCase with use prefix | `useItems.js` |
| JS config files | camelCase | `itemConfig.js` |
| REST namespace | lowercase with version | `woodev-starter/v1` |
| Block name | lowercase with slash | `woodev-starter/toggle-content` |

## Key Files to Modify

When adding features:

| Task | Files to Edit |
|------|---------------|
| Add admin page field | `src/js/admin/config/itemConfig.js` |
| Add REST endpoint | `inc/rest-api.php` |
| Add admin component | `src/js/admin/components/`, import in `App.js` |
| Add PHP hook/filter | `inc/hooks.php` |
| Add new block | Create `src/blocks/block-name/` directory |

## Data Flow

```
PHP REST API (inc/rest-api.php)
    ↓
wp_localize_script (inc/admin-page.php)
    ↓
window.woodevStarterTool.restUrl, window.woodevStarterTool.nonce
    ↓
useItems hook (src/js/admin/hooks/useItems.js)
    ↓
DataViews component (src/js/admin/components/App.js)
```

## Common Tasks

### Adding a new DataViews field

```javascript
// src/js/admin/config/itemConfig.js
{
    id: 'new_field',
    label: 'New Field',
    type: 'text',
    enableSorting: true,
    getValue: (item) => item.new_field,
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

### Adding a new PHP feature module

1. Create `inc/new-feature.php` with namespace
2. Add to main plugin file:
```php
require_once WOODEV_EXTENSION_STARTER_DIR . 'inc/new-feature.php';
```

## Dependencies

Scripts rely on WordPress/WooCommerce packages extracted at build time:
- `@wordpress/element` - React wrapper
- `@wordpress/components` - UI components
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
- REST endpoints require nonce validation via `X-WP-Nonce` header
- WooCommerce is required for the admin page to function
- Admin page uses `addFilter('woocommerce_admin_pages_list', ...)` for SPA integration
