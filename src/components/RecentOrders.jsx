import React from 'react'

const RecentOrders = () => {
  const orders = [
    { name: 'Star Refrigerator', price: '$1200', payment: 'Paid', status: 'delivered' },
    { name: 'Dell Laptop', price: '$110', payment: 'Due', status: 'pending' },
    { name: 'Apple Watch', price: '$1200', payment: 'Paid', status: 'return' },
    { name: 'Addidas Shoes', price: '$620', payment: 'Due', status: 'inProgress' },
    { name: 'Star Refrigerator', price: '$1200', payment: 'Paid', status: 'delivered' },
    { name: 'Dell Laptop', price: '$110', payment: 'Due', status: 'pending' },
    { name: 'Apple Watch', price: '$1200', payment: 'Paid', status: 'return' },
    { name: 'Addidas Shoes', price: '$620', payment: 'Due', status: 'inProgress' },
  ]

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
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.name}</td>
              <td>{order.price}</td>
              <td>{order.payment}</td>
              <td>
                <span className={`status ${order.status}`}>
                  {order.status === 'delivered' ? 'Delivered' :
                   order.status === 'pending' ? 'Pending' :
                   order.status === 'return' ? 'Return' : 'In Progress'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentOrders

