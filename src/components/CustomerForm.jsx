import React, { useState, useEffect } from 'react'

const CustomerForm = ({ customer, onSubmit, onCancel, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    email: '',
    phone: '',
    avatar: 'assets/imgs/customer01.jpg',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        country: customer.country || '',
        email: customer.email || '',
        phone: customer.phone || '',
        avatar: customer.avatar || 'assets/imgs/customer01.jpg',
      })
    }
  }, [customer])

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
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
      onSubmit(formData)
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
          Name *
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
            transition: 'border-color 0.3s',
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
          Country *
        </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px 15px',
            border: `1px solid ${errors.country ? '#f00' : '#ddd'}`,
            borderRadius: '6px',
            fontSize: '16px',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#2a2185')}
          onBlur={(e) => (e.target.style.borderColor = errors.country ? '#f00' : '#ddd')}
        />
        {errors.country && (
          <span style={{ color: '#f00', fontSize: '12px', marginTop: '4px', display: 'block' }}>
            {errors.country}
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
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px 15px',
            border: `1px solid ${errors.email ? '#f00' : '#ddd'}`,
            borderRadius: '6px',
            fontSize: '16px',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#2a2185')}
          onBlur={(e) => (e.target.style.borderColor = errors.email ? '#f00' : '#ddd')}
        />
        {errors.email && (
          <span style={{ color: '#f00', fontSize: '12px', marginTop: '4px', display: 'block' }}>
            {errors.email}
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
          Phone *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px 15px',
            border: `1px solid ${errors.phone ? '#f00' : '#ddd'}`,
            borderRadius: '6px',
            fontSize: '16px',
            outline: 'none',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#2a2185')}
          onBlur={(e) => (e.target.style.borderColor = errors.phone ? '#f00' : '#ddd')}
        />
        {errors.phone && (
          <span style={{ color: '#f00', fontSize: '12px', marginTop: '4px', display: 'block' }}>
            {errors.phone}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 20px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            backgroundColor: 'white',
            color: '#333',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f5f5f5'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'white'
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
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = '#1a1570'
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = '#2a2185'
            }
          }}
        >
          {isSubmitting ? 'Processing...' : customer ? 'Update' : 'Add'} Customer
        </button>
      </div>
    </form>
  )
}

export default CustomerForm

