import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from '../styles/BarChart.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Composant qui crée un bar chart
const BarChart = ({ donnees, titre, onBarClick }) => {
  const chartRef = useRef(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: titre,
      },
    },
    // Gère le fonctionnement lors d'un clique sur une colonne en pparticulier
    onClick: (event, elements) => {
      const chartInstance = chartRef.current;
      if (elements.length > 0) {
        const elementClique = elements[0];
        const indexClique = elementClique.index;
        const colonneCliquee = donnees.labels[indexClique];
        onBarClick(colonneCliquee);
      } else {
        const chartArea = chartInstance.chartArea;
        if (
          event.x >= chartArea.left &&
          event.x <= chartArea.right &&
          event.y >= chartArea.top &&
          event.y <= chartArea.bottom
        ) {
          const xScale = chartInstance.scales.x;
          const indexClique = xScale.getValueForPixel(event.x);
          const colonneCliquee = donnees.labels[Math.round(indexClique)];
          onBarClick(colonneCliquee);
        }
      }
    },
  };

  return (
    <div className={styles.barChart}>
      <Bar ref={chartRef} data={donnees} options={options} />
    </div>
  );
};

export default BarChart;
