import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const OrderForm = ({ order, onSubmit, onCancel, isSubmitting = false }) => {
  const { customers } = useApp()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    payment: 'Paid',
    status: 'pending',
    customerId: customers[0]?.id || '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (order) {
      setFormData({
        name: order.name || '',
        price: order.price || '',
        payment: order.payment || 'Paid',
        status: order.status || 'pending',
        customerId: order.customerId || customers[0]?.id || '',
      })
    }
  }, [order, customers])

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required'
    }

    if (!formData.customerId) {
      newErrors.customerId = 'Customer is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value,
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333',
            fontSize: '14px',
          }}
        >
          Product Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px 15px',
            border: `1px solid ${errors.name ? '#f00' : '#ddd'}`,
            borderRadius: '6px',
            fontSize: '16px',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#2a2185')}
          onBlur={(e) => (e.target.style.borderColor = errors.name ? '#f00' : '#ddd')}
        />
        {errors.name && (
          <span style={{ color: '#f00', fontSize: '12px', marginTop: '4px', display: 'block' }}>
            {errors.name}
          </span>
        )}
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333',
            fontSize: '14px',
          }}
        >
          Customer *
        </label>
        <select
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px 15px',
            border: `1px solid ${errors.customerId ? '#f00' : '#ddd'}`,
            borderRadius: '6px',
            fontSize: '16px',
            outline: 'none',
            backgroundColor: 'white',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#2a2185')}
          onBlur={(e) => (e.target.style.borderColor = errors.customerId ? '#f00' : '#ddd')}
        >
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.name} ({customer.country})
            </option>
          ))}
        </select>
        {errors.customerId && (
          <span style={{ color: '#f00', fontSize: '12px', marginTop: '4px', display: 'block' }}>
            {errors.customerId}
          </span>
        )}
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333',
            fontSize: '14px',
          }}
        >
          Price ($) *
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          style={{
            width: '100%',
            padding: '10px 15px',
            border: `1px solid ${errors.price ? '#f00' : '#ddd'}`,
            borderRadius: '6px',
            fontSize: '16px',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#2a2185')}
          onBlur={(e) => (e.target.style.borderColor = errors.price ? '#f00' : '#ddd')}
        />
        {errors.price && (
          <span style={{ color: '#f00', fontSize: '12px', marginTop: '4px', display: 'block' }}>
            {errors.price}
          </span>
        )}
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333',
            fontSize: '14px',
          }}
        >
          Payment Status
        </label>
        <select
          name="payment"
          value={formData.payment}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '16px',
            outline: 'none',
            backgroundColor: 'white',
          }}
        >
          <option value="Paid">Paid</option>
          <option value="Due">Due</option>
        </select>
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333',
            fontSize: '14px',
          }}
        >
          Order Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '16px',
            outline: 'none',
            backgroundColor: 'white',
          }}
        >
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="delivered">Delivered</option>
          <option value="return">Return</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          style={{
            padding: '10px 20px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            backgroundColor: 'white',
            color: '#333',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: isSubmitting ? '#999' : '#2a2185',
            color: 'white',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'Processing...' : order ? 'Update' : 'Add'} Order
        </button>
      </div>
    </form>
  )
}

export default OrderForm

