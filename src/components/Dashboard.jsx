import React from 'react'
import { useApp } from '../context/AppContext'
import BasePage from './BasePage'
import CardBox from './CardBox'
import RecentOrders from './RecentOrders'
import RecentCustomers from './RecentCustomers'

/**
 * Dashboard Component
 * 
 * Extends BasePage for consistent layout structure.
 */
const Dashboard = ({ isNavActive, onToggleNav }) => {
  const { stats } = useApp()

  return (
    <BasePage 
      isNavActive={isNavActive} 
      onToggleNav={onToggleNav}
      title="Dashboard"
      subtitle="Overview of your business"
    >
      <CardBox stats={stats} />

      <div className="details">
        <RecentOrders />
        <RecentCustomers />
      </div>
    </BasePage>
  )
}

export default Dashboard

