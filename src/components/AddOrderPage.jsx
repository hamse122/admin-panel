import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import BasePage from './BasePage'
import OrderForm from './OrderForm'

/**
 * AddOrderPage Component
 * 
 * Dedicated page for adding new orders.
 * Extends BasePage for consistent layout structure.
 */
const AddOrderPage = ({ isNavActive, onToggleNav }) => {
  const { addOrder } = useApp()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (orderData) => {
    setIsSubmitting(true)
    try {
      addOrder(orderData)
      // Navigate back to order management
      window.history.back()
    } catch (error) {
      console.error('Error adding order:', error)
      alert('Failed to add order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    window.history.back()
  }

  return (
    <BasePage
      isNavActive={isNavActive}
      onToggleNav={onToggleNav}
      title="Add New Order"
      subtitle="Create a new order"
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
          order={null}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </BasePage>
  )
}

export default AddOrderPage

