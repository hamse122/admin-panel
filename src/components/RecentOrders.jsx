import React from 'react'
import { useApp } from '../context/AppContext'

const RecentOrders = () => {
  const { orders, getCustomerById } = useApp()
  
  const recentOrders = orders.slice(0, 8)

  return (
    <div className="recentOrders">
      <div className="cardHeader">
        <h2>Recent Orders</h2>
        <a href="#" className="btn">View All</a>
      </div>

      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Payment</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => {
            const customer = getCustomerById(order.customerId)
            return (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>${order.price}</td>
                <td>{order.payment}</td>
                <td>
                  <span className={`status ${order.status}`}>
                    {order.status === 'delivered' ? 'Delivered' :
                     order.status === 'pending' ? 'Pending' :
                     order.status === 'return' ? 'Return' : 'In Progress'}
                  </span>
                </td>
              </tr>
            )
          })}
          {recentOrders.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecentOrders

