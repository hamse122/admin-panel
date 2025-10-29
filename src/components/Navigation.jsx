import React, { useState } from 'react'

const Navigation = ({ isActive }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const navItems = [
    { icon: 'logo-apple', title: 'Brand Name', isBrand: true },
    { icon: 'home-outline', title: 'Dashboard' },
    { icon: 'people-outline', title: 'Customers' },
    { icon: 'chatbubble-outline', title: 'Messages' },
    { icon: 'help-outline', title: 'Help' },
    { icon: 'settings-outline', title: 'Settings' },
    { icon: 'lock-closed-outline', title: 'Password' },
    { icon: 'log-out-outline', title: 'Sign Out' },
  ]

  return (
    <div className={`navigation ${isActive ? 'active' : ''}`}>
      <ul>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={hoveredIndex === index ? 'hovered' : ''}
            onMouseEnter={() => !item.isBrand && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a href="#" onClick={(e) => item.isBrand && e.preventDefault()}>
              <span className="icon">
                <ion-icon name={item.icon}></ion-icon>
              </span>
              <span className="title">{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Navigation

