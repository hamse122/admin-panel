import React from 'react'
import { useApp } from '../context/AppContext'

const RecentCustomers = () => {
  const { customers } = useApp()
  
  const recentCustomers = customers.slice(0, 8)

  return (
    <div className="recentCustomers">
      <div className="cardHeader">
        <h2>Recent Customers</h2>
      </div>

      <table>
        <tbody>
          {recentCustomers.map((customer) => (
            <tr key={customer.id}>
              <td width="60px">
                <div className="imgBx">
                  <img src={customer.avatar} alt={customer.name} />
                </div>
              </td>
              <td>
                <h4>
                  {customer.name} <br />
                  <span>{customer.country}</span>
                </h4>
              </td>
            </tr>
          ))}
          {recentCustomers.length === 0 && (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecentCustomers

