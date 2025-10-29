# Navigation Component - Base Sidebar

The `Navigation` component is the **base sidebar** of this project. It serves as the foundation for all navigation throughout the application.

## Overview

This component provides a consistent, accessible, and feature-rich sidebar navigation that can be used across all pages in the application.

## Features

- ✅ **Collapsible Sidebar** - Expandable/collapsible navigation
- ✅ **Active Page Highlighting** - Visual indication of current page
- ✅ **Hover Effects** - Interactive hover states
- ✅ **Keyboard Navigation** - Full keyboard accessibility support
- ✅ **Tooltips** - Tooltips when sidebar is collapsed
- ✅ **Badge Support** - Optional badges on navigation items
- ✅ **Customizable** - Fully configurable through props
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Accessible** - ARIA labels and semantic HTML

## Usage

### Basic Usage

```jsx
import Navigation from './components/Navigation'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <Navigation
      isActive={isCollapsed}
      activePage={activePage}
      onPageChange={setActivePage}
    />
  )
}
```

### With Custom Navigation Items

```jsx
const customNavItems = [
  { 
    id: 'dashboard',
    icon: 'home-outline', 
    title: 'Dashboard', 
    page: 'dashboard',
    type: 'page',
  },
  { 
    id: 'notifications',
    icon: 'notifications-outline', 
    title: 'Notifications', 
    page: 'notifications',
    type: 'page',
    badge: 5,
    badgeColor: '#f00',
  },
]

<Navigation
  isActive={isCollapsed}
  activePage={activePage}
  onPageChange={setActivePage}
  navItems={customNavItems}
/>
```

### With Configuration

```jsx
<Navigation
  isActive={isCollapsed}
  activePage={activePage}
  onPageChange={setActivePage}
  config={{
    brandName: 'My App',
    showBrand: true,
    showTooltips: true,
    closeOnPageChange: false,
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isActive` | boolean | `false` | Controls sidebar collapse state (true = collapsed) |
| `activePage` | string | `'dashboard'` | Currently active page identifier |
| `onPageChange` | function | required | Callback when navigation item is clicked `(page, item) => void` |
| `navItems` | array | default items | Custom navigation items array |
| `config` | object | `{}` | Configuration options |

### Navigation Item Structure

```javascript
{
  id: 'unique-id',              // Unique identifier
  icon: 'icon-name',            // Ionicon name
  title: 'Display Title',      // Display text
  page: 'page-id',             // Page identifier for navigation
  type: 'page' | 'action' | 'brand',  // Item type
  disabled: false,              // Disable the item
  action: () => {},             // Custom action function (for type: 'action')
  onClick: () => {},            // Additional click handler
  badge: 5,                     // Optional badge number
  badgeColor: '#f00',          // Badge background color
}
```

### Configuration Options

```javascript
{
  brandName: 'Brand Name',      // Brand/logo text
  showBrand: true,              // Show/hide brand section
  showTooltips: true,           // Show tooltips when collapsed
  closeOnPageChange: false,     // Auto-close on mobile after navigation
}
```

## Integration with App

The Navigation component is integrated in `App.jsx` and serves as the base sidebar for all pages:

- **Dashboard** - Main dashboard page
- **Customers** - Customer management
- **Orders** - Order management  
- **Analytics** - Analytics and reports
- **Settings** - Application settings

## Accessibility

- Uses semantic `<nav>` element
- ARIA labels and roles
- Keyboard navigation support (Enter, Space)
- Focus management
- Screen reader friendly

## Styling

The component uses the existing CSS classes from `style.css`:
- `.navigation` - Base navigation container
- `.navigation.active` - Collapsed state
- `.hovered` - Hover state
- `.active` - Active page state

## Customization

You can customize the navigation by:

1. **Providing custom nav items** - Pass your own navigation items array
2. **Modifying config** - Adjust behavior through config object
3. **CSS overrides** - Override styles using the existing CSS classes
4. **Extending the component** - Create a wrapper component if needed

## Examples

See `src/App.jsx` for the main integration example.

## Notes

- The component maintains its state through parent component (App.jsx)
- Collapse state can be persisted using localStorage
- Icons use Ionicons (loaded via CDN in index.html)
- Component is fully controlled - all state managed by parent

