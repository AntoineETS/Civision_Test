import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import PrixMoyen from './PrixMoyen';
import BarChart from './BarChart';
import data from '../data/database.json';
import styles from '../styles/Dashboard.module.css';

// Composant qui contient tous les composant de la page index.js
const Dashboard = () => {
  const [saison, setSaison] = useState('');
  const [niveau, setNiveau] = useState('');
  const [passe, setPasse] = useState('');
  const [prix, setPrix] = useState(0);
  const [donnees, setDonnees] = useState([]);

  useEffect(() => {
    const prixFiltre = data.filter(
      (item) => item.saison === saison && item.niveau === niveau && item.passe === passe
    );
    const prixMoyen = prixFiltre.reduce((acc, item) => acc + item.prix, 0) / (prixFiltre.length || 1);
    setPrix(prixMoyen);
    setDonnees(prixFiltre);
  }, [saison, niveau, passe]);

  // Calcule la quantité de chacun des niveaux
  const calculQuantiteNiveau = () => {
    const nbNovice = donnees.filter((item) => item.niveau === 'novice').length;
    const nbMoyen = donnees.filter((item) => item.niveau === 'moyen').length;
    const nbPro = donnees.filter((item) => item.niveau === 'pro').length;

    return {
      labels: ['Novice', 'Moyen', 'Pro'],
      datasets: [
        {
          label: 'Quantité',
          data: [nbNovice, nbMoyen, nbPro],
          backgroundColor: 'rgba(0, 0, 200, 0.2)',
          borderColor: 'rgba(0, 0, 200, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Calcule la quantité de chacune des saisons
  const calculQuantiteSaison = () => {
    const nbPrintemps = donnees.filter((item) => item.saison === 'printemps').length;
    const nbEte = donnees.filter((item) => item.saison === 'été').length;
    const nbAutomne = donnees.filter((item) => item.saison === 'automne').length;
    const nbHiver = donnees.filter((item) => item.saison === 'hiver').length;

    return {
      labels: ['Printemps', 'Été', 'Automne', 'Hiver'],
      datasets: [
        {
          label: 'Quantité',
          data: [nbPrintemps, nbEte, nbAutomne, nbHiver],
          backgroundColor: 'rgba(0, 200, 0, 0.2)',
          borderColor: 'rgba(0, 200, 0, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Calcule la quantité de chacun des groupes d'âge
  const calculQuantiteAge = () => {
    const moinsDe24 = donnees.filter((item) => item.age < 24).length;
    const entre24Et28 = donnees.filter((item) => item.age >= 24 && item.age <= 28).length;
    const plusDe28 = donnees.filter((item) => item.age > 28).length;

    return {
      labels: ['<24', '24-28', '29+'],
      datasets: [
        {
          label: 'Quantité',
          data: [moinsDe24, entre24Et28, plusDe28],
          backgroundColor: 'rgba(200, 0, 0, 0.2)',
          borderColor: 'rgba(200, 0, 0, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Met à jour la saison lorsqu'une colonne du bar chart est appuyé
  const handleSeasonClick = (colonneCliquee) => {
    setSaison(colonneCliquee.toLowerCase());
  };

  // Met à jour le niveau lorsqu'une colonne du bar chart est appuyé
  const handleLevelClick = (colonneCliquee) => {
    setNiveau(colonneCliquee.toLowerCase());
  };

  return (
    <div>
      <Dropdown
        saison={saison}
        niveau={niveau}
        passe={passe}
        setSaison={setSaison}
        setNiveau={setNiveau}
        setPasse={setPasse}
      />
      <PrixMoyen prix={prix} />
      <div className={styles.barchartDiv}>
        <BarChart
          donnees={calculQuantiteNiveau()}
          titre="Quantité par Niveau"
          onBarClick={handleLevelClick}
        />
        <BarChart
          donnees={calculQuantiteSaison()}
          titre="Quantité par Saison"
          onBarClick={handleSeasonClick}
        />
        <BarChart
          donnees={calculQuantiteAge()}
          titre="Quantité par Groupe d'Âge"
          onBarClick={(groupeAgeClique) => console.log('Groupe d\'âge cliqué:', groupeAgeClique)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
