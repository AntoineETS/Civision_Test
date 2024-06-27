// components/Dashboard.js

import React, { useState, useEffect } from 'react';
import FilterBar from './FilterBar';
import PriceDisplay from './PriceDisplay';
import BarChart from './BarChart';
import data from '../data/database.json';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const [season, setSeason] = useState('');
  const [level, setLevel] = useState('');
  const [pass, setPass] = useState('');
  const [price, setPrice] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filteredPrices = data.filter(
      (item) => item.saison === season && item.niveau === level && item.passe === pass
    );
    const averagePrice = filteredPrices.reduce((acc, item) => acc + item.prix, 0) / (filteredPrices.length || 1);
    setPrice(averagePrice);
    setFilteredData(filteredPrices);
  }, [season, level, pass]);

  const calculateQuantityByLevel = () => {
    const noviceCount = filteredData.filter((item) => item.niveau === 'novice').length;
    const moyenCount = filteredData.filter((item) => item.niveau === 'moyen').length;
    const proCount = filteredData.filter((item) => item.niveau === 'pro').length;

    return {
      labels: ['Novice', 'Moyen', 'Pro'],
      datasets: [
        {
          label: 'Quantité',
          data: [noviceCount, moyenCount, proCount],
          backgroundColor: 'rgba(0, 0, 200, 0.2)',
          borderColor: 'rgba(0, 0, 200, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const calculateQuantityBySeason = () => {
    const printempsCount = filteredData.filter((item) => item.saison === 'printemps').length;
    const eteCount = filteredData.filter((item) => item.saison === 'été').length;
    const automneCount = filteredData.filter((item) => item.saison === 'automne').length;
    const hiverCount = filteredData.filter((item) => item.saison === 'hiver').length;

    return {
      labels: ['Printemps', 'Été', 'Automne', 'Hiver'],
      datasets: [
        {
          label: 'Quantité',
          data: [printempsCount, eteCount, automneCount, hiverCount],
          backgroundColor: 'rgba(0, 200, 0, 0.2)',
          borderColor: 'rgba(0, 200, 0, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const calculateQuantityByAgeGroup = () => {
    const lessThan24Count = filteredData.filter((item) => item.age < 24).length;
    const age24to28Count = filteredData.filter((item) => item.age >= 24 && item.age <= 28).length;
    const above28Count = filteredData.filter((item) => item.age > 28).length;

    return {
      labels: ['<24', '24-28', '29+'],
      datasets: [
        {
          label: 'Quantité',
          data: [lessThan24Count, age24to28Count, above28Count],
          backgroundColor: 'rgba(200, 0, 0, 0.2)',
          borderColor: 'rgba(200, 0, 0, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const handleSeasonClick = (seasonLabel) => {
    console.log('Saison cliquée:', seasonLabel);
    setSeason(seasonLabel.toLowerCase());
  };

  const handleLevelClick = (levelLabel) => {
    console.log('Niveau cliqué:', levelLabel);
    setLevel(levelLabel.toLowerCase());
  };

  return (
    <div>
      <FilterBar
        season={season}
        level={level}
        pass={pass}
        setSeason={setSeason}
        setLevel={setLevel}
        setPass={setPass}
      />
      <PriceDisplay price={price} />
      <div className={styles.barchartDiv}>
        <BarChart
          data={calculateQuantityByLevel()}
          title="Quantité par Niveau"
          onBarClick={handleLevelClick}
        />
        <BarChart
          data={calculateQuantityBySeason()}
          title="Quantité par Saison"
          onBarClick={handleSeasonClick}
        />
        <BarChart
          data={calculateQuantityByAgeGroup()}
          title="Quantité par Groupe d'Âge"
          onBarClick={(ageGroupLabel) => console.log('Groupe d\'âge cliqué:', ageGroupLabel)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
