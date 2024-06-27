// components/Dashboard.js
import React, { useState, useEffect } from 'react'
import FilterBar from './FilterBar'
import PriceDisplay from './PriceDisplay'
import BarChart from './BarChart'
import data from '../data/database.json'
import styles from '../styles/Dashboard.module.css'

const Dashboard = () => {
  const [season, setSeason] = useState('')
  const [level, setLevel] = useState('')
  const [pass, setPass] = useState('')
  const [price, setPrice] = useState(0)

  useEffect(() => {
    const filteredPrices = data.filter(
      (item) => item.saison === season && item.niveau === level && item.passe === pass
    )
    const averagePrice = filteredPrices.reduce((acc, item) => acc + item.prix, 0) / filteredPrices.length || 0
    setPrice(averagePrice)
  }, [season, level, pass])

  const quantityByLevel = {
    labels: ['Novice', 'Moyen', 'Pro'],
    datasets: [
      {
        label: 'Quantité',
        data: [
          data.filter((item) => item.niveau === 'novice').length,
          data.filter((item) => item.niveau === 'moyen').length,
          data.filter((item) => item.niveau === 'pro').length,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const quantityBySeason = {
    labels: ['Printemps', 'Été', 'Automne', 'Hiver'],
    datasets: [
      {
        label: 'Quantité',
        data: [
          data.filter((item) => item.saison === 'printemps').length,
          data.filter((item) => item.saison === 'été').length,
          data.filter((item) => item.saison === 'automne').length,
          data.filter((item) => item.saison === 'hiver').length,
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  }

  const quantityByAgeGroup = {
    labels: ['<24', '24-28', '29+'],
    datasets: [
      {
        label: 'Quantité',
        data: [
          data.filter((item) => item.age < 24).length,
          data.filter((item) => item.age >= 24 && item.age <= 28).length,
          data.filter((item) => item.age > 28).length,
        ],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  }

  return (
    <div>
      <FilterBar season={season} level={level} pass={pass} setSeason={setSeason} setLevel={setLevel} setPass={setPass} />
      <PriceDisplay price={price} />
      <div className={styles.barchartDiv}>
        <BarChart data={quantityByLevel} title="Quantité par Niveau" />
        <BarChart data={quantityBySeason} title="Quantité par Saison" />
        <BarChart data={quantityByAgeGroup} title="Quantité par Groupe d'Âge" />
      </div>
    </div>
  )
}

export default Dashboard
