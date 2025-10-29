import React from 'react'

const CardBox = () => {
  const cards = [
    { number: '1,504', name: 'Daily Views', icon: 'eye-outline' },
    { number: '80', name: 'Sales', icon: 'cart-outline' },
    { number: '284', name: 'Comments', icon: 'chatbubbles-outline' },
    { number: '$7,842', name: 'Earning', icon: 'cash-outline' },
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

