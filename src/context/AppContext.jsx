import React, { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'David', country: 'Italy', email: 'david@example.com', phone: '+39 123 456 789', avatar: 'assets/imgs/customer02.jpg' },
    { id: 2, name: 'Amit', country: 'India', email: 'amit@example.com', phone: '+91 987 654 321', avatar: 'assets/imgs/customer01.jpg' },
    { id: 3, name: 'Sarah', country: 'USA', email: 'sarah@example.com', phone: '+1 555 123 456', avatar: 'assets/imgs/customer02.jpg' },
    { id: 4, name: 'John', country: 'UK', email: 'john@example.com', phone: '+44 20 1234 5678', avatar: 'assets/imgs/customer01.jpg' },
    { id: 5, name: 'Maria', country: 'Spain', email: 'maria@example.com', phone: '+34 912 345 678', avatar: 'assets/imgs/customer02.jpg' },
    { id: 6, name: 'Chen', country: 'China', email: 'chen@example.com', phone: '+86 138 0013 8000', avatar: 'assets/imgs/customer01.jpg' },
    { id: 7, name: 'Hans', country: 'Germany', email: 'hans@example.com', phone: '+49 30 12345678', avatar: 'assets/imgs/customer02.jpg' },
    { id: 8, name: 'Emma', country: 'France', email: 'emma@example.com', phone: '+33 1 23 45 67 89', avatar: 'assets/imgs/customer01.jpg' },
  ])

  const [orders, setOrders] = useState([
    { id: 1, name: 'Star Refrigerator', price: 1200, payment: 'Paid', status: 'delivered', customerId: 1, date: '2024-01-15' },
    { id: 2, name: 'Dell Laptop', price: 110, payment: 'Due', status: 'pending', customerId: 2, date: '2024-01-16' },
    { id: 3, name: 'Apple Watch', price: 1200, payment: 'Paid', status: 'return', customerId: 3, date: '2024-01-17' },
    { id: 4, name: 'Addidas Shoes', price: 620, payment: 'Due', status: 'inProgress', customerId: 4, date: '2024-01-18' },
    { id: 5, name: 'Samsung TV', price: 850, payment: 'Paid', status: 'delivered', customerId: 5, date: '2024-01-19' },
    { id: 6, name: 'iPhone 15', price: 999, payment: 'Paid', status: 'delivered', customerId: 6, date: '2024-01-20' },
    { id: 7, name: 'Nike Shoes', price: 150, payment: 'Due', status: 'pending', customerId: 7, date: '2024-01-21' },
    { id: 8, name: 'MacBook Pro', price: 2499, payment: 'Paid', status: 'inProgress', customerId: 8, date: '2024-01-22' },
  ])

  const [stats, setStats] = useState({
    dailyViews: 1504,
    sales: 80,
    comments: 284,
    earning: 7842,
  })

  const addCustomer = useCallback((customerData) => {
    const newCustomer = {
      id: Date.now(),
      ...customerData,
      avatar: customerData.avatar || 'assets/imgs/customer01.jpg',
    }
    setCustomers(prev => [...prev, newCustomer])
    return newCustomer
  }, [])

  const updateCustomer = useCallback((id, customerData) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === id ? { ...customer, ...customerData } : customer
      )
    )
  }, [])

  const deleteCustomer = useCallback((id) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id))
    setOrders(prev => prev.filter(order => order.customerId !== id))
  }, [])

  const addOrder = useCallback((orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      date: new Date().toISOString().split('T')[0],
    }
    setOrders(prev => [...prev, newOrder])
    
    // Update stats
    if (orderData.payment === 'Paid') {
      setStats(prev => ({
        ...prev,
        sales: prev.sales + 1,
        earning: prev.earning + orderData.price,
      }))
    }
    
    return newOrder
  }, [])

  const updateOrder = useCallback((id, orderData) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === id) {
          const oldPrice = order.price
          const newPrice = orderData.price || oldPrice
          const oldPayment = order.payment
          const newPayment = orderData.payment || oldPayment
          
          // Update stats if payment status changed
          if (oldPayment !== newPayment) {
            setStats(prevStats => ({
              ...prevStats,
              sales: prevStats.sales + (newPayment === 'Paid' ? 1 : -1),
              earning: prevStats.earning + (newPayment === 'Paid' ? newPrice : -oldPrice),
            }))
          } else if (newPayment === 'Paid' && oldPrice !== newPrice) {
            setStats(prevStats => ({
              ...prevStats,
              earning: prevStats.earning + (newPrice - oldPrice),
            }))
          }
          
          return { ...order, ...orderData }
        }
        return order
      })
    )
  }, [])

  const deleteOrder = useCallback((id) => {
    setOrders(prev => {
      const order = prev.find(o => o.id === id)
      if (order && order.payment === 'Paid') {
        setStats(prevStats => ({
          ...prevStats,
          sales: prevStats.sales - 1,
          earning: prevStats.earning - order.price,
        }))
      }
      return prev.filter(order => order.id !== id)
    })
  }, [])

  const updateStats = useCallback((newStats) => {
    setStats(prev => ({ ...prev, ...newStats }))
  }, [])

  const getCustomerById = useCallback((id) => {
    return customers.find(customer => customer.id === id)
  }, [customers])

  const getOrdersByCustomerId = useCallback((customerId) => {
    return orders.filter(order => order.customerId === customerId)
  }, [orders])

  const getOrdersByStatus = useCallback((status) => {
    return orders.filter(order => order.status === status)
  }, [orders])

  const getTotalRevenue = useCallback(() => {
    return orders
      .filter(order => order.payment === 'Paid')
      .reduce((sum, order) => sum + order.price, 0)
  }, [orders])

  const getPendingAmount = useCallback(() => {
    return orders
      .filter(order => order.payment === 'Due')
      .reduce((sum, order) => sum + order.price, 0)
  }, [orders])

  const value = {
    customers,
    orders,
    stats,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addOrder,
    updateOrder,
    deleteOrder,
    updateStats,
    getCustomerById,
    getOrdersByCustomerId,
    getOrdersByStatus,
    getTotalRevenue,
    getPendingAmount,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

