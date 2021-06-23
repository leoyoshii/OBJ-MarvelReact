import React from 'react';
import Loader from '../../Assets/loader.svg';
import styles from './styles.module.scss';

export const Loading: React.FC = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <img src={Loader} alt="Loading" className={styles.imgSpinLoader} />
    </div>
  );
};
