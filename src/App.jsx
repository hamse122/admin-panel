import React, { useState } from 'react'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import './style.css'

function App() {
  const [isNavActive, setIsNavActive] = useState(false)

  const toggleNavigation = () => {
    setIsNavActive(!isNavActive)
  }

  return (
    <div className="container">
      <Navigation isActive={isNavActive} />
      <Dashboard isNavActive={isNavActive} onToggleNav={toggleNavigation} />
    </div>
  )
}

export default App

