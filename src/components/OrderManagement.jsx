import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import BasePage from './BasePage'
import Modal from './Modal'
import OrderForm from './OrderForm'

/**
 * OrderManagement Component
 * 
 * Extends BasePage for consistent layout structure.
 */
const OrderManagement = ({ isNavActive, onToggleNav, onNavigate }) => {
  const { orders, customers, addOrder, updateOrder, deleteOrder, getCustomerById } = useApp()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleAdd = () => {
    if (onNavigate) {
      onNavigate('add-order')
    } else {
      setEditingOrder(null)
      setIsModalOpen(true)
    }
  }

  const handleEdit = (order) => {
    if (onNavigate) {
      onNavigate('edit-order', null, { orderId: order.id })
    } else {
      setEditingOrder(order)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(id)
    }
  }

  const handleSubmit = (orderData) => {
    if (editingOrder) {
      updateOrder(editingOrder.id, orderData)
    } else {
      addOrder(orderData)
    }
    setIsModalOpen(false)
    setEditingOrder(null)
  }

  const getStatusClass = (status) => {
    const statusMap = {
      delivered: '#8de02c',
      pending: '#e9b10a',
      return: '#f00',
      inProgress: '#1795ce',
    }
    return statusMap[status] || '#999'
  }

  const getStatusLabel = (status) => {
    const labelMap = {
      delivered: 'Delivered',
      pending: 'Pending',
      return: 'Return',
      inProgress: 'In Progress',
    }
    return labelMap[status] || status
  }

  const filteredOrders = orders
    .filter(order => {
      const matchesSearch =
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getCustomerById(order.customerId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === 'all' || order.status === filterStatus
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

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
      + Add Order
    </button>
  )

  return (
    <BasePage
      isNavActive={isNavActive}
      onToggleNav={onToggleNav}
      title="Order Management"
      subtitle="Manage and track orders"
      headerActions={addButton}
    >

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '16px',
          }}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '16px',
            backgroundColor: 'white',
          }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="delivered">Delivered</option>
          <option value="return">Return</option>
        </select>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Order ID</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Product</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Customer</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Price</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Payment</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Date</th>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => {
              const customer = getCustomerById(order.customerId)
              return (
                <tr
                  key={order.id}
                  style={{
                    borderBottom: '1px solid #eee',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9f9f9'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                  }}
                >
                  <td style={{ padding: '15px' }}>#{order.id}</td>
                  <td style={{ padding: '15px', fontWeight: '500' }}>{order.name}</td>
                  <td style={{ padding: '15px' }}>{customer?.name || 'Unknown'}</td>
                  <td style={{ padding: '15px' }}>${order.price}</td>
                  <td style={{ padding: '15px' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: order.payment === 'Paid' ? '#8de02c' : '#e9b10a',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}
                    >
                      {order.payment}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: getStatusClass(order.status),
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td style={{ padding: '15px', color: '#666' }}>{order.date}</td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(order)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#2a2185',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#f00',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
          No orders found
        </p>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingOrder(null)
        }}
        title={editingOrder ? 'Edit Order' : 'Add New Order'}
        size="large"
      >
        <OrderForm
          order={editingOrder}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setEditingOrder(null)
          }}
        />
      </Modal>
    </BasePage>
  )
}

export default OrderManagement

