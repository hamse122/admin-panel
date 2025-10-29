import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import BasePage from './BasePage'
import OrderForm from './OrderForm'

/**
 * EditOrderPage Component
 * 
 * Dedicated page for editing existing orders.
 * Extends BasePage for consistent layout structure.
 */
const EditOrderPage = ({ isNavActive, onToggleNav, orderId }) => {
  const { orders, updateOrder, getCustomerById } = useApp()
  const [order, setOrder] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      const foundOrder = orders.find(o => o.id === parseInt(orderId))
      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        alert('Order not found')
        window.history.back()
      }
    } else {
      // Try to get from URL
      const id = window.location.pathname.split('/').pop()
      if (id && id !== 'edit') {
        const foundOrder = orders.find(o => o.id === parseInt(id))
        if (foundOrder) {
          setOrder(foundOrder)
        }
      }
    }
    setLoading(false)
  }, [orderId, orders])

  const handleSubmit = async (orderData) => {
    setIsSubmitting(true)
    try {
      if (order) {
        updateOrder(order.id, orderData)
        // Navigate back to order management
        window.history.back()
      }
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Failed to update order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    window.history.back()
  }

  if (loading) {
    return (
      <BasePage
        isNavActive={isNavActive}
        onToggleNav={onToggleNav}
        title="Edit Order"
      >
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading...</p>
        </div>
      </BasePage>
    )
  }

  if (!order) {
    return (
      <BasePage
        isNavActive={isNavActive}
        onToggleNav={onToggleNav}
        title="Edit Order"
      >
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Order not found</p>
          <button onClick={handleCancel}>Go Back</button>
        </div>
      </BasePage>
    )
  }

  const customer = getCustomerById(order.customerId)

  return (
    <BasePage
      isNavActive={isNavActive}
      onToggleNav={onToggleNav}
      title={`Edit Order: ${order.name}`}
      subtitle={`Order #${order.id} - ${customer?.name || 'Unknown Customer'}`}
    >
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <OrderForm
          order={order}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </BasePage>
  )
}

export default EditOrderPage

