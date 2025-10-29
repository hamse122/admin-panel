import React, { useState, useEffect } from 'react'

/**
 * Base Sidebar Navigation Component
 * 
 * This is the core navigation component that serves as the base sidebar
 * for the entire application. It provides consistent navigation across all pages.
 * 
 * @param {boolean} isActive - Controls whether the sidebar is collapsed (active = collapsed)
 * @param {string} activePage - The currently active page identifier
 * @param {function} onPageChange - Callback function when a navigation item is clicked
 * @param {array} navItems - Optional custom navigation items (uses default if not provided)
 * @param {object} config - Optional configuration object for customization
 */
const Navigation = ({
  isActive = false,
  activePage = 'dashboard',
  onPageChange,
  navItems: customNavItems,
  config = {},
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Default navigation items configuration
  const defaultNavItems = [
    { 
      id: 'brand',
      icon: 'logo-apple', 
      title: 'Brand Name', 
      isBrand: true,
      type: 'brand',
      disabled: false,
    },
    { 
      id: 'dashboard',
      icon: 'home-outline', 
      title: 'Dashboard', 
      page: 'dashboard',
      type: 'page',
      disabled: false,
    },
    { 
      id: 'customers',
      icon: 'people-outline', 
      title: 'Customers', 
      page: 'customers',
      type: 'page',
      disabled: false,
    },
    { 
      id: 'orders',
      icon: 'cart-outline', 
      title: 'Orders', 
      page: 'orders',
      type: 'page',
      disabled: false,
    },
    { 
      id: 'analytics',
      icon: 'bar-chart-outline', 
      title: 'Analytics', 
      page: 'analytics',
      type: 'page',
      disabled: false,
    },
    { 
      id: 'settings',
      icon: 'settings-outline', 
      title: 'Settings', 
      page: 'settings',
      type: 'page',
      disabled: false,
    },
    { 
      id: 'help',
      icon: 'help-outline', 
      title: 'Help', 
      page: 'help',
      type: 'action',
      action: () => {
        alert('Help documentation would be displayed here')
      },
      disabled: false,
    },
    { 
      id: 'logout',
      icon: 'log-out-outline', 
      title: 'Sign Out', 
      page: 'logout',
      type: 'action',
      action: () => {
        if (window.confirm('Are you sure you want to sign out?')) {
          alert('Sign out functionality would be implemented here')
        }
      },
      disabled: false,
    },
  ]

  // Use custom items if provided, otherwise use defaults
  const navItems = customNavItems || defaultNavItems

  // Merge config with defaults
  const {
    brandName = 'Brand Name',
    showBrand = true,
    showTooltips = true,
    closeOnPageChange = false,
  } = config

  /**
   * Handles navigation item click events
   * @param {object} item - The navigation item that was clicked
   * @param {number} index - The index of the item in the array
   */
  const handleItemClick = (item, index) => {
    // Don't process clicks on disabled items
    if (item.disabled) {
      return
    }

    // Handle brand/logo clicks (no action by default)
    if (item.isBrand || item.type === 'brand') {
      return
    }

    // Handle action-type items (like logout, help)
    if (item.type === 'action' && item.action) {
      item.action()
      return
    }

    // Handle page navigation
    if (item.page && onPageChange) {
      onPageChange(item.page, item)
      
      // Optionally close sidebar on mobile after navigation
      if (closeOnPageChange && isActive) {
        // This would be handled by parent component
        // Pass callback to parent if needed
      }
    }

    // Call custom onClick handler if provided
    if (item.onClick) {
      item.onClick(item, index)
    }
  }

  /**
   * Handles mouse enter events for hover effects
   * @param {number} index - The index of the hovered item
   * @param {object} item - The navigation item
   */
  const handleMouseEnter = (index, item) => {
    if (!item.isBrand && !item.disabled) {
      setHoveredIndex(index)
    }
  }

  /**
   * Handles mouse leave events
   */
  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  /**
   * Gets the class names for a navigation item
   * @param {object} item - The navigation item
   * @param {number} index - The index of the item
   * @returns {string} - Combined class names
   */
  const getItemClasses = (item, index) => {
    const classes = []
    
    if (hoveredIndex === index) {
      classes.push('hovered')
    }
    
    if (item.page === activePage || item.id === activePage) {
      classes.push('active')
    }
    
    if (item.disabled) {
      classes.push('disabled')
    }
    
    return classes.join(' ')
  }

  /**
   * Gets inline styles for a navigation item
   * @param {object} item - The navigation item
   * @returns {object} - Inline style object
   */
  const getItemStyles = (item) => {
    const styles = {}
    
    if ((item.page === activePage || item.id === activePage) && !item.disabled) {
      styles.backgroundColor = 'rgba(255, 255, 255, 0.1)'
    }
    
    if (item.disabled) {
      styles.opacity = 0.5
      styles.cursor = 'not-allowed'
    }
    
    return styles
  }

  /**
   * Gets the tooltip text for a navigation item
   * @param {object} item - The navigation item
   * @returns {string} - Tooltip text
   */
  const getTooltip = (item) => {
    if (!showTooltips || !isActive) {
      return ''
    }
    return item.title || ''
  }

  return (
    <nav 
      className={`navigation ${isActive ? 'active' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <ul>
        {navItems.map((item, index) => {
          // Skip brand item if showBrand is false
          if (item.isBrand || item.type === 'brand') {
            if (!showBrand) return null
          }

          const isActiveItem = (item.page === activePage || item.id === activePage) && !item.disabled
          const itemClasses = getItemClasses(item, index)
          const itemStyles = getItemStyles(item)
          const tooltipText = getTooltip(item)

          return (
            <li
              key={item.id || index}
              className={itemClasses}
              onMouseEnter={() => handleMouseEnter(index, item)}
              onMouseLeave={handleMouseLeave}
              style={itemStyles}
              title={tooltipText}
            >
              <a
                href="#"
                role="button"
                aria-label={item.title}
                aria-current={isActiveItem ? 'page' : undefined}
                tabIndex={item.disabled ? -1 : 0}
                onClick={(e) => {
                  e.preventDefault()
                  if (!item.disabled) {
                    handleItemClick(item, index)
                  }
                }}
                onKeyDown={(e) => {
                  // Support keyboard navigation (Enter and Space)
                  if ((e.key === 'Enter' || e.key === ' ') && !item.disabled) {
                    e.preventDefault()
                    handleItemClick(item, index)
                  }
                }}
                style={isActiveItem ? { color: '#fff' } : {}}
                className={item.disabled ? 'disabled-link' : ''}
              >
                <span className="icon" aria-hidden="true">
                  <ion-icon name={item.icon}></ion-icon>
                </span>
                <span className="title">{item.title}</span>
                {item.badge && (
                  <span className="badge" style={{
                    backgroundColor: item.badgeColor || '#f00',
                    color: '#fff',
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    marginLeft: 'auto',
                  }}>
                    {item.badge}
                  </span>
                )}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
