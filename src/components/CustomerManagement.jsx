import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import BasePage from './BasePage'
import Modal from './Modal'
import CustomerForm from './CustomerForm'

/**
 * CustomerManagement Component
 * 
 * Extends BasePage for consistent layout structure.
 */
const CustomerManagement = ({ isNavActive, onToggleNav, onNavigate }) => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useApp()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const handleAdd = () => {
    if (onNavigate) {
      onNavigate('add-customer')
    } else {
      setEditingCustomer(null)
      setIsModalOpen(true)
    }
  }

  const handleEdit = (customer) => {
    if (onNavigate) {
      onNavigate('edit-customer', null, { customerId: customer.id })
    } else {
      setEditingCustomer(customer)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(id)
    }
  }

  const handleSubmit = (customerData) => {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, customerData)
    } else {
      addCustomer(customerData)
    }
    setIsModalOpen(false)
    setEditingCustomer(null)
  }

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addButton = (
    <button
      onClick={handleAdd}
      style={{
        padding: '10px 20px',
        backgroundColor: '#2a2185',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
      }}
    >
      + Add Customer
    </button>
  )

  return (
    <BasePage
      isNavActive={isNavActive}
      onToggleNav={onToggleNav}
      title="Customer Management"
      subtitle="Manage your customers"
      headerActions={addButton}
    >

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search customers by name, country, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '16px',
          }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        {filteredCustomers.map(customer => (
          <div
            key={customer.id}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <img
                src={customer.avatar}
                alt={customer.name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{customer.name}</h3>
                <p style={{ margin: '5px 0 0 0', color: '#999', fontSize: '14px' }}>{customer.country}</p>
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                <strong>Email:</strong> {customer.email}
              </p>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                <strong>Phone:</strong> {customer.phone}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleEdit(customer)}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: '#2a2185',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(customer.id)}
                style={{
                  flex: 1,
                  padding: '8px',
                  backgroundColor: '#f00',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
          No customers found
        </p>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCustomer(null)
        }}
        title={editingCustomer ? 'Edit Customer' : 'Add New Customer'}
      >
        <CustomerForm
          customer={editingCustomer}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingCustomer(null)
          }}
        />
      </Modal>
    </BasePage>
  )
}

export default CustomerManagement

