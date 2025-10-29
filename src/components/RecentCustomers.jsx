import React from 'react'

const RecentCustomers = () => {
  const customers = [
    { name: 'David', country: 'Italy', image: 'assets/imgs/customer02.jpg' },
    { name: 'Amit', country: 'India', image: 'assets/imgs/customer01.jpg' },
    { name: 'David', country: 'Italy', image: 'assets/imgs/customer02.jpg' },
    { name: 'Amit', country: 'India', image: 'assets/imgs/customer01.jpg' },
    { name: 'David', country: 'Italy', image: 'assets/imgs/customer02.jpg' },
    { name: 'Amit', country: 'India', image: 'assets/imgs/customer01.jpg' },
    { name: 'David', country: 'Italy', image: 'assets/imgs/customer01.jpg' },
    { name: 'Amit', country: 'India', image: 'assets/imgs/customer02.jpg' },
  ]

  return (
    <div className="recentCustomers">
      <div className="cardHeader">
        <h2>Recent Customers</h2>
      </div>

      <table>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td width="60px">
                <div className="imgBx">
                  <img src={customer.image} alt={customer.name} />
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
        </tbody>
      </table>
    </div>
  )
}

export default RecentCustomers

