import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import BasePage from './BasePage'
import CustomerForm from './CustomerForm'

/**
 * EditCustomerPage Component
 * 
 * Dedicated page for editing existing customers.
 * Extends BasePage for consistent layout structure.
 */
const EditCustomerPage = ({ isNavActive, onToggleNav, customerId }) => {
  const { customers, updateCustomer, getCustomerById } = useApp()
  const [customer, setCustomer] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (customerId) {
      const foundCustomer = getCustomerById(parseInt(customerId))
      if (foundCustomer) {
        setCustomer(foundCustomer)
      } else {
        alert('Customer not found')
        window.history.back()
      }
    } else {
      // Try to get from URL or state
      const id = window.location.pathname.split('/').pop()
      if (id && id !== 'edit') {
        const foundCustomer = getCustomerById(parseInt(id))
        if (foundCustomer) {
          setCustomer(foundCustomer)
        }
      }
    }
    setLoading(false)
  }, [customerId, customers, getCustomerById])

  const handleSubmit = async (customerData) => {
    setIsSubmitting(true)
    try {
      if (customer) {
        updateCustomer(customer.id, customerData)
        // Navigate back to customer management
        window.history.back()
      }
    } catch (error) {
      console.error('Error updating customer:', error)
      alert('Failed to update customer. Please try again.')
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
        title="Edit Customer"
      >
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading...</p>
        </div>
      </BasePage>
    )
  }

  if (!customer) {
    return (
      <BasePage
        isNavActive={isNavActive}
        onToggleNav={onToggleNav}
        title="Edit Customer"
      >
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Customer not found</p>
          <button onClick={handleCancel}>Go Back</button>
        </div>
      </BasePage>
    )
  }

  return (
    <BasePage
      isNavActive={isNavActive}
      onToggleNav={onToggleNav}
      title={`Edit Customer: ${customer.name}`}
      subtitle="Update customer information"
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
          customer={customer}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </BasePage>
  )
}

export default EditCustomerPage

