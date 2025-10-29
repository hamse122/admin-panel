import React, { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import BasePage from './BasePage'

/**
 * Analytics Component
 * 
 * Extends BasePage for consistent layout structure.
 */
const Analytics = ({ isNavActive, onToggleNav }) => {
  const { orders, customers, stats, getOrdersByStatus, getTotalRevenue, getPendingAmount } = useApp()

  const analyticsData = useMemo(() => {
    const statusCounts = {
      pending: getOrdersByStatus('pending').length,
      inProgress: getOrdersByStatus('inProgress').length,
      delivered: getOrdersByStatus('delivered').length,
      return: getOrdersByStatus('return').length,
    }

    const totalRevenue = getTotalRevenue()
    const pendingAmount = getPendingAmount()
    const averageOrderValue = orders.length > 0
      ? totalRevenue / orders.filter(o => o.payment === 'Paid').length
      : 0

    const monthlyRevenue = orders
      .filter(order => order.payment === 'Paid')
      .reduce((acc, order) => {
        const month = order.date?.substring(0, 7) || 'unknown'
        acc[month] = (acc[month] || 0) + order.price
        return acc
      }, {})

    return {
      statusCounts,
      totalRevenue,
      pendingAmount,
      averageOrderValue,
      monthlyRevenue,
      totalCustomers: customers.length,
      totalOrders: orders.length,
    }
  }, [orders, customers, getOrdersByStatus, getTotalRevenue, getPendingAmount])

  const StatCard = ({ title, value, icon, color = '#2a2185', trend }) => (
    <div
      style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <p style={{ margin: 0, color: '#999', fontSize: '14px', marginBottom: '8px' }}>{title}</p>
        <h3 style={{ margin: 0, fontSize: '28px', fontWeight: '600', color: color }}>
          {typeof value === 'number' && value >= 1000
            ? `$${(value / 1000).toFixed(1)}K`
            : typeof value === 'number'
            ? `$${value.toFixed(2)}`
            : value}
        </h3>
        {trend && (
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: trend > 0 ? '#8de02c' : '#f00' }}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
      <div style={{ fontSize: '48px', color: color, opacity: 0.3 }}>{icon}</div>
    </div>
  )

  return (
    <BasePage
      isNavActive={isNavActive}
      onToggleNav={onToggleNav}
      title="Analytics Dashboard"
      subtitle="View detailed analytics and insights"
    >

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard
          title="Total Revenue"
          value={analyticsData.totalRevenue}
          icon="💰"
          color="#8de02c"
          trend={12}
        />
        <StatCard
          title="Pending Amount"
          value={analyticsData.pendingAmount}
          icon="⏳"
          color="#e9b10a"
          trend={-5}
        />
        <StatCard
          title="Average Order Value"
          value={analyticsData.averageOrderValue}
          icon="📊"
          color="#1795ce"
        />
        <StatCard
          title="Total Customers"
          value={analyticsData.totalCustomers}
          icon="👥"
          color="#2a2185"
          trend={8}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#2a2185' }}>
            Order Status Distribution
          </h3>
          {Object.entries(analyticsData.statusCounts).map(([status, count]) => (
            <div key={status} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ textTransform: 'capitalize', fontSize: '14px', color: '#666' }}>
                  {status === 'inProgress' ? 'In Progress' : status}
                </span>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>{count}</span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${(count / analyticsData.totalOrders) * 100}%`,
                    height: '100%',
                    backgroundColor:
                      status === 'delivered'
                        ? '#8de02c'
                        : status === 'pending'
                        ? '#e9b10a'
                        : status === 'return'
                        ? '#f00'
                        : '#1795ce',
                    transition: 'width 0.3s',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#2a2185' }}>
            Quick Stats
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>Total Orders</span>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#2a2185' }}>
                {analyticsData.totalOrders}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>Paid Orders</span>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#8de02c' }}>
                {orders.filter(o => o.payment === 'Paid').length}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>Due Orders</span>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#e9b10a' }}>
                {orders.filter(o => o.payment === 'Due').length}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>Active Customers</span>
              <span style={{ fontSize: '18px', fontWeight: '600', color: '#1795ce' }}>
                {customers.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#2a2185' }}>
          Monthly Revenue Trend
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {Object.entries(analyticsData.monthlyRevenue)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .slice(-6)
            .map(([month, revenue]) => (
              <div
                key={month}
                style={{
                  flex: '1 1 calc(16.66% - 15px)',
                  minWidth: '120px',
                  padding: '15px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#999' }}>{month}</p>
                <p style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#2a2185' }}>
                  ${revenue.toFixed(0)}
                </p>
              </div>
            ))}
        </div>
      </div>
    </BasePage>
  )
}

export default Analytics

