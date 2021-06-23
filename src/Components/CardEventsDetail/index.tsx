import React from 'react';
import styles from './styles.module.scss';

interface IProps {
  imgUrl: string;
  title: string;
  description: string | null;
}

export const CardEventsDetail: React.FC<IProps> = ({
  imgUrl,
  title,
  description,
}) => {
  function formatDescription(text: string | null): string {
    if (text && text.length > 100) {
      const newDescription = `${text.substring(0, 100)}...`;
      return newDescription;
    }
    if (!text || text.length === 0) {
      return 'Não possui descrição cadastrada';
    }
    return text;
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardImage}>
        <img src={imgUrl} alt={title} />
      </div>
      <div className={styles.cardTitle}>
        <h4>{title}</h4>
        <span>{formatDescription(description)}</span>
      </div>
    </div>
  );
};
