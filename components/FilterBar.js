// components/FilterBar.js
import React from 'react'
import styles from '../styles/FilterBar.module.css'

const FilterBar = ({ season, level, pass, setSeason, setLevel, setPass }) => {
  return (
    <div className={styles.filterBar}>
      <select value={season} onChange={(e) => setSeason(e.target.value)}>
        <option value="">Veuillez choisir une saison</option>
        <option value="printemps">Printemps</option>
        <option value="été">Été</option>
        <option value="automne">Automne</option>
        <option value="hiver">Hiver</option>
      </select>
      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="">Veuillez choisir un niveau</option>
        <option value="novice">Novice</option>
        <option value="moyen">Moyen</option>
        <option value="pro">Pro</option>
      </select>
      <select value={pass} onChange={(e) => setPass(e.target.value)}>
        <option value="">Veuillez choisir une passe</option>
        <option value="simple">Simple</option>
        <option value="double">Double</option>
        <option value="illimité">Illimité</option>
      </select>
    </div>
  );
};

export default FilterBar
