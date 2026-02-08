# WooDev Extension Starter

A scaffold for building modern WordPress/WooCommerce plugins with React admin interfaces, REST APIs, and Gutenberg blocks.

## Quick Start

This template is designed for AI-assisted development. To create a new plugin:

1. Copy this directory and rename it to your plugin name
2. Ask your AI agent to rename the plugin by performing find and replace on these patterns:
   - `woodev-extension-starter` → `your-plugin-name`
   - `WoodevExtensionStarter` → `YourPluginName`
   - `woodev_extension_starter` → `your_plugin_name`
   - `WOODEV_EXTENSION_STARTER` → `YOUR_PLUGIN_NAME`
   - `woodev-starter-tool` → `your-tool-name`
   - `woodevStarterTool` → `yourToolName`
   - `woodev-starter/v1` → `your-plugin/v1`
3. Install dependencies and build:

```bash
composer install
npm install
npm run build
```

## Key Features

### WooCommerce Admin Page

Registers a page under the WooCommerce menu using the WooCommerce Admin SPA pattern.

- Location: `inc/admin-page.php`
- Menu: **WooCommerce → Starter Tool**
- Uses `addFilter('woocommerce_admin_pages_list', ...)` for proper SPA integration
- Scripts/styles auto-enqueued via asset file pattern

### REST API

Template for custom endpoints with proper permission callbacks and parameter validation.

- Namespace: `woodev-starter/v1`
- Example endpoints: `/settings` (GET/POST)
- Location: `inc/rest-api.php`

**Note**: The DataViews demo uses `@wordpress/core-data` which leverages the built-in WordPress REST API. Custom endpoints are only needed for operations not covered by core.

### DataViews Admin UI

Pre-built table/grid interface using `@wordpress/dataviews` with WordPress Data Layer.

- **App.js**: Main component with view state management
- **useItems.js**: Custom hook using `useEntityRecords` from `@wordpress/core-data`
- **itemConfig.js**: Field definitions and action handlers (view/edit/trash)

The demo displays WordPress pages. Replace `'page'` with your custom post type slug to work with your own data.

### WordPress Block with Interactivity API

A Gutenberg block demonstrating show/hide functionality using the Interactivity API.

- Block name: `woodev-starter/toggle-content`
- Features: `data-wp-interactive`, `data-wp-context`, `data-wp-on--click`, `data-wp-bind--hidden`
- Server-side rendered with `render.php`

## Customization Guide

### Adding a New Admin Feature

1. Create `src/js/admin/components/NewFeature.js`
2. Import and use in `App.js`
3. Add any new REST endpoints in `inc/rest-api.php`

### Changing the Post Type

The demo uses WordPress pages. To use a custom post type:

1. Edit `src/js/admin/hooks/useItems.js`:
```javascript
// Change 'page' to your post type slug
useEntityRecords( 'postType', 'your_post_type', { ... } );
```

2. Update field definitions in `src/js/admin/config/itemConfig.js` to match your post type's fields.

### Adding Fields to DataViews

Edit `src/js/admin/config/itemConfig.js`:

```javascript
export const fields = [
    {
        id: 'your_field',
        label: 'Your Field',
        type: 'text',
        enableSorting: true,
        getValue: ({ item }) => item.your_field,
    },
    // ...
];
```

### Adding a New Block

1. Create `src/blocks/your-block/` with:
   - `block.json` - Block metadata
   - `index.js` - Registration
   - `edit.js` - Editor component
   - `view.js` - Interactivity store (optional)
   - `render.php` - Server render template

2. The block will be auto-discovered by wp-scripts

### Adding a New PHP Feature

1. Create `inc/your-feature.php` with namespace
2. Add `require_once` in main plugin file

## Dependencies

### Runtime
- `@wordpress/dataviews` - Table/grid UI components
- `@wordpress/icons` - Icon library

### Development (npm)
- `@wordpress/scripts` - Build tooling
- `@woocommerce/dependency-extraction-webpack-plugin` - WooCommerce dependency handling

### Development (Composer)
- `wp-coding-standards/wpcs` - WordPress Coding Standards for PHP_CodeSniffer

## Patterns Used

| Pattern | Purpose |
|---------|---------|
| Namespaced PHP modules | Isolated features, no conflicts |
| Config-driven UI | Modify fields/actions without touching components |
| Custom hooks | Encapsulated data logic |
| REST API with validation | Clear frontend/backend contract |
| Asset file pattern | Auto-managed dependencies |
| wp-scripts + WC extraction | Zero-config builds |
| WooCommerce Admin SPA | Proper admin page integration |
| Interactivity API | Lightweight frontend interactions |

## Requirements

- PHP 8.1+
- WordPress 6.9+
- WooCommerce 10.0+
- Node.js 18+
