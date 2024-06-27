// components/BarChart.js
import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import styles from '../styles/BarChart.module.css'

// Enregistrez explicitement les composants nécessaires
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = ({ data, title, onBarClick }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: title,
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0 && onBarClick) {
        const clickedLabel = data.labels[elements[0].index]
        onBarClick(clickedLabel)
      }
    },
  }

  return (
    <div className={styles.barChart}>
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart
