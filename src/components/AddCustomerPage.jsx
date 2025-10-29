import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import BasePage from './BasePage'
import CustomerForm from './CustomerForm'

/**
 * AddCustomerPage Component
 * 
 * Dedicated page for adding new customers.
 * Extends BasePage for consistent layout structure.
 */
const AddCustomerPage = ({ isNavActive, onToggleNav }) => {
  const { addCustomer } = useApp()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (customerData) => {
    setIsSubmitting(true)
    try {
      addCustomer(customerData)
      // Navigate back to customer management
      window.history.back()
    } catch (error) {
      console.error('Error adding customer:', error)
      alert('Failed to add customer. Please try again.')
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
      title="Add New Customer"
      subtitle="Create a new customer profile"
    >
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <CustomerForm
          customer={null}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </BasePage>
  )
}

export default AddCustomerPage

