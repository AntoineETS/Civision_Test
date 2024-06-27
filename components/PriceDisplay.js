// components/PriceDisplay.js
import React from 'react'
import styles from '../styles/PriceDisplay.module.css'

const PriceDisplay = ({ price }) => {
  return (
    <div className={styles.priceDisplay}>
      <h2>Prix moyen: {price.toFixed(2)}$</h2>
    </div>
  )
}

export default PriceDisplay
