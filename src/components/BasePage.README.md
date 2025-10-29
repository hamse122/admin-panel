# BasePage Component - Base Layout for All Pages

The `BasePage` component is the **base layout** that all pages in the application extend. It provides consistent structure, layout, and navigation across all pages.

## Overview

All pages in this application now extend `BasePage` to ensure:
- ✅ Consistent layout structure
- ✅ Unified topbar navigation
- ✅ Responsive sidebar integration
- ✅ Standardized page headers
- ✅ Consistent spacing and padding

## Pages That Extend BasePage

1. **Dashboard** - Main dashboard page
2. **CustomerManagement** - Customer management page
3. **OrderManagement** - Order management page
4. **Analytics** - Analytics and reporting page
5. **Settings** - Application settings page

## Usage

### Basic Usage

```jsx
import BasePage from './BasePage'

const MyPage = ({ isNavActive, onToggleNav }) => {
  return (
    <BasePage 
      isNavActive={isNavActive} 
      onToggleNav={onToggleNav}
      title="My Page"
      subtitle="Page description"
    >
      <div>Your page content here</div>
    </BasePage>
  )
}
```

### With Header Actions

```jsx
const MyPage = ({ isNavActive, onToggleNav }) => {
  const addButton = (
    <button onClick={handleAdd}>
      + Add Item
    </button>
  )

  return (
    <BasePage
      isNavActive={isNavActive}
      onToggleNav={onToggleNav}
      title="My Page"
      subtitle="Manage items"
      headerActions={addButton}
    >
      <div>Content</div>
    </BasePage>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | required | Page content |
| `isNavActive` | boolean | `false` | Sidebar collapse state |
| `onToggleNav` | function | required | Toggle sidebar callback |
| `title` | string | - | Page title (shown in header) |
| `subtitle` | string | - | Page subtitle (shown under title) |
| `headerActions` | ReactNode | - | Actions/buttons for header |
| `showTopbar` | boolean | `true` | Show/hide topbar |
| `className` | string | `''` | Additional CSS classes for main wrapper |
| `contentClassName` | string | `''` | Additional CSS classes for content area |

## Features

### Automatic Layout
- Main content wrapper with proper classes
- Responsive layout that adapts to sidebar state
- Consistent padding and spacing

### Topbar Integration
- Includes topbar by default
- Can be hidden with `showTopbar={false}`

### Page Header
- Optional title and subtitle
- Header actions area for buttons/controls
- Consistent styling across all pages

### Responsive
- Adapts to sidebar collapse/expand state
- Mobile-friendly layout

## Examples

### Example 1: Dashboard
```jsx
<BasePage 
  isNavActive={isNavActive} 
  onToggleNav={onToggleNav}
  title="Dashboard"
  subtitle="Overview of your business"
>
  <CardBox />
  <RecentOrders />
</BasePage>
```

### Example 2: Management Page with Actions
```jsx
const addButton = <button onClick={handleAdd}>+ Add</button>

<BasePage
  isNavActive={isNavActive}
  onToggleNav={onToggleNav}
  title="Customer Management"
  subtitle="Manage your customers"
  headerActions={addButton}
>
  <CustomerList />
</BasePage>
```

### Example 3: Settings Page (Centered)
```jsx
<BasePage
  isNavActive={isNavActive}
  onToggleNav={onToggleNav}
  title="Settings"
  subtitle="Manage preferences"
  contentClassName="settings-content"
>
  <div style={{ maxWidth: '800px', margin: '0 auto' }}>
    Settings content
  </div>
</BasePage>
```

## Integration with App.jsx

All pages receive common props from `App.jsx`:

```jsx
const commonProps = {
  isNavActive,
  onToggleNav: toggleNavigation,
}

// All pages extend BasePage with these props
<Dashboard {...commonProps} />
<CustomerManagement {...commonProps} />
<OrderManagement {...commonProps} />
```

## Benefits

1. **Consistency** - All pages have the same structure
2. **Maintainability** - Update layout in one place (BasePage)
3. **DRY Principle** - No code duplication for layout logic
4. **Easy Extension** - Add new pages quickly by extending BasePage
5. **Responsive** - Automatic responsive behavior

## Customization

You can customize pages while still using BasePage:
- Add custom CSS classes via `className` or `contentClassName`
- Use inline styles within children
- Add custom header actions
- Hide topbar if needed

## Notes

- Always pass `isNavActive` and `onToggleNav` from App.jsx
- The component handles all layout concerns automatically
- Content is wrapped in a properly styled container
- Topbar is included by default but can be hidden

