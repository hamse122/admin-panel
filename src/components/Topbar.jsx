import React from 'react'

const Topbar = ({ onToggleNav }) => {
  return (
    <div className="topbar">
      <div className="toggle" onClick={onToggleNav}>
        <ion-icon name="menu-outline"></ion-icon>
      </div>

      <div className="search">
        <label>
          <input type="text" placeholder="Search here" />
          <ion-icon name="search-outline"></ion-icon>
        </label>
      </div>

      <div className="user">
        <img src="assets/imgs/customer01.jpg" alt="User" />
      </div>
    </div>
  )
}

export default Topbar

