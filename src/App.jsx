import React, { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import CustomerManagement from './components/CustomerManagement'
import OrderManagement from './components/OrderManagement'
import Analytics from './components/Analytics'
import Settings from './components/Settings'
import AddCustomerPage from './components/AddCustomerPage'
import EditCustomerPage from './components/EditCustomerPage'
import AddOrderPage from './components/AddOrderPage'
import EditOrderPage from './components/EditOrderPage'
import './style.css'

/**
 * Main App Component
 * 
 * The Navigation component serves as the base sidebar for the entire application.
 * It provides consistent navigation across all pages and is the foundation
 * of the app's navigation structure.
 */
function App() {
  const [isNavActive, setIsNavActive] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')
  const [pageParams, setPageParams] = useState({})

  const toggleNavigation = () => {
    setIsNavActive(!isNavActive)
  }

  const handlePageChange = (page, item, params = {}) => {
    setActivePage(page)
    setPageParams(params)
    // You can add additional logic here, like analytics tracking
    console.log(`Navigated to: ${page}`, item, params)
  }

  const renderPage = () => {
    const commonProps = {
      isNavActive,
      onToggleNav: toggleNavigation,
      onNavigate: handlePageChange,
    }

    switch (activePage) {
      case 'dashboard':
        return <Dashboard {...commonProps} />
      case 'customers':
        return <CustomerManagement {...commonProps} />
      case 'orders':
        return <OrderManagement {...commonProps} />
      case 'analytics':
        return <Analytics {...commonProps} />
      case 'settings':
        return <Settings {...commonProps} />
      case 'add-customer':
        return <AddCustomerPage {...commonProps} />
      case 'edit-customer':
        return <EditCustomerPage {...commonProps} customerId={pageParams.customerId} />
      case 'add-order':
        return <AddOrderPage {...commonProps} />
      case 'edit-order':
        return <EditOrderPage {...commonProps} orderId={pageParams.orderId} />
      default:
        return <Dashboard {...commonProps} />
    }
  }

  return (
    <AppProvider>
      <div className="container">
        {/* Base Sidebar Navigation - Core navigation component for the entire app */}
        <Navigation
          isActive={isNavActive}
          activePage={activePage}
          onPageChange={handlePageChange}
          config={{
            brandName: 'Admin Panel',
            showBrand: true,
            showTooltips: true,
          }}
        />
        {renderPage()}
      </div>
    </AppProvider>
  )
}

export default App

