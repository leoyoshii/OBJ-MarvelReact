import React from 'react';
import styles from './styles.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerLogo}>
        <a href="/">
          <img src="/logo.svg" alt="Marvel List" />
        </a>
      </div>
      <div className={styles.headerInfo}>
        <div>
          <h4>Leonardo Yoshii</h4>
          <p>Teste front-end</p>
        </div>
        <a href="https://github.com/leoyoshii/OBJ-MarvelReact">
          <img
            src="https://avatars.githubusercontent.com/u/45272849?s=400&u=49f4f6b9caafdcc7c1c859a1511ae02859311afc&v=4"
            alt="Leonardo Yoshii"
          />
        </a>
      </div>
    </header>
  );
};
