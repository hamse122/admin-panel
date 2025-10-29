import React from 'react'
import Topbar from './Topbar'
import CardBox from './CardBox'
import RecentOrders from './RecentOrders'
import RecentCustomers from './RecentCustomers'

const Dashboard = ({ isNavActive, onToggleNav }) => {
  return (
    <div className={`main ${isNavActive ? 'active' : ''}`}>
      <Topbar onToggleNav={onToggleNav} />
      
      <CardBox />

      <div className="details">
        <RecentOrders />
        <RecentCustomers />
      </div>
    </div>
  )
}

export default Dashboard

