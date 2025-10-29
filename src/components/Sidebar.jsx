/**
 * Sidebar Component - Base Navigation Wrapper
 * 
 * This component is an enhanced wrapper around the Navigation component
 * that provides additional sidebar functionality like collapse/expand,
 * persistence, and responsive behavior.
 */

import React, { useState, useEffect } from 'react'
import Navigation from './Navigation'

const Sidebar = ({
  activePage,
  onPageChange,
  defaultCollapsed = false,
  persistState = true,
  navItems,
  config,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (persistState && typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed')
      return saved ? JSON.parse(saved) : defaultCollapsed
    }
    return defaultCollapsed
  })

  // Persist sidebar state to localStorage
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed))
    }
  }, [isCollapsed, persistState])

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Auto-collapse on mobile
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Check on mount

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev)
  }

  return (
    <Navigation
      isActive={isCollapsed}
      activePage={activePage}
      onPageChange={onPageChange}
      navItems={navItems}
      config={{
        ...config,
        closeOnPageChange: window.innerWidth < 768,
      }}
    />
  )
}

export default Sidebar

