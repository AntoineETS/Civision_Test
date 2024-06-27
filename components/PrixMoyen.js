import React from 'react'
import styles from '../styles/PriceDisplay.module.css'

// Composant qui crée le prix moyen
const PrixMoyen = ({ prix }) => {
  return (
    <div className={styles.prixMoyen}>
      <h2>Prix moyen: {prix.toFixed(2)}$</h2>
    </div>
  )
}

export default PrixMoyen
