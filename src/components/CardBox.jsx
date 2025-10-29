import React from 'react'
import { useApp } from '../context/AppContext'

const CardBox = ({ stats: statsProp }) => {
  const { stats: contextStats } = useApp()
  const stats = statsProp || contextStats

  const cards = [
    { number: stats.dailyViews.toLocaleString(), name: 'Daily Views', icon: 'eye-outline' },
    { number: stats.sales.toString(), name: 'Sales', icon: 'cart-outline' },
    { number: stats.comments.toString(), name: 'Comments', icon: 'chatbubbles-outline' },
    { number: `$${stats.earning.toLocaleString()}`, name: 'Earning', icon: 'cash-outline' },
  ]

  return (
    <div className="cardBox">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <div>
            <div className="numbers">{card.number}</div>
            <div className="cardName">{card.name}</div>
          </div>
          <div className="iconBx">
            <ion-icon name={card.icon}></ion-icon>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardBox

