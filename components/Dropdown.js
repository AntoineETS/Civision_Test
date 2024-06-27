import React from 'react'
import styles from '../styles/FilterBar.module.css'

// Composant qui crée les 3 dropdowns
const Dropdown = ({ saison, niveau, passe, setSaison, setNiveau, setPasse }) => {
  return (
    <div className={styles.filterBar}>
      <select value={saison} onChange={(e) => setSaison(e.target.value)}>
        <option value="">Veuillez choisir une saison</option>
        <option value="printemps">Printemps</option>
        <option value="été">Été</option>
        <option value="automne">Automne</option>
        <option value="hiver">Hiver</option>
      </select>
      <select value={niveau} onChange={(e) => setNiveau(e.target.value)}>
        <option value="">Veuillez choisir un niveau</option>
        <option value="novice">Novice</option>
        <option value="moyen">Moyen</option>
        <option value="pro">Pro</option>
      </select>
      <select value={passe} onChange={(e) => setPasse(e.target.value)}>
        <option value="">Veuillez choisir une passe</option>
        <option value="simple">Simple</option>
        <option value="double">Double</option>
        <option value="illimité">Illimité</option>
      </select>
    </div>
  );
};

export default Dropdown
