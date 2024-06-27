// components/BarChart.js
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

// Enregistrez explicitement les composants nécessaires
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, title, onBarClick }) => {
  const chartRef = useRef(null);

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
      const chartInstance = chartRef.current;
      if (elements.length > 0) {
        const clickedElement = elements[0];
        const clickedIndex = clickedElement.index;
        const label = data.labels[clickedIndex];
        onBarClick(label);
      } else {
        const chartArea = chartInstance.chartArea;
        if (
          event.x >= chartArea.left &&
          event.x <= chartArea.right &&
          event.y >= chartArea.top &&
          event.y <= chartArea.bottom
        ) {
          const xScale = chartInstance.scales.x;
          const clickedIndex = xScale.getValueForPixel(event.x);
          const label = data.labels[Math.round(clickedIndex)];
          onBarClick(label);
        }
      }
    },
  };

  return (
    <div className={styles.barChart}>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default BarChart;
