import React, { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import BasePage from './BasePage'

/**
 * Settings Component
 * 
 * Extends BasePage for consistent layout structure.
 */
const Settings = ({ isNavActive, onToggleNav }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
  })
  const [language, setLanguage] = useState('en')
  const [currency, setCurrency] = useState('USD')

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  return (
    <BasePage
      isNavActive={isNavActive}
      onToggleNav={onToggleNav}
      title="Settings"
      subtitle="Manage your application preferences"
      contentClassName="settings-content"
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#2a2185' }}>
            Appearance
          </h3>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#666' }}>
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 15px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '16px',
                backgroundColor: 'white',
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#2a2185' }}>
            Notifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {Object.entries(notifications).map(([type, enabled]) => (
              <div
                key={type}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '6px',
                }}
              >
                <label style={{ fontSize: '14px', color: '#333', textTransform: 'capitalize' }}>
                  {type} Notifications
                </label>
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => handleNotificationChange(type)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#2a2185' }}>
            General
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                }}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                }}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="CNY">CNY (¥)</option>
              </select>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#2a2185' }}>
            Account
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button
              style={{
                padding: '12px 20px',
                backgroundColor: '#2a2185',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Change Password
            </button>
            <button
              style={{
                padding: '12px 20px',
                backgroundColor: '#f5f5f5',
                color: '#333',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Export Data
            </button>
            <button
              style={{
                padding: '12px 20px',
                backgroundColor: '#f00',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      </div>
    </BasePage>
  )
}

export default Settings

