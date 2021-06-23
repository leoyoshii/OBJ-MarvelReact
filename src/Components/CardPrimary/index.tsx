import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICharacter } from '../../Interfaces/ICharacter';
import styles from './styles.module.scss';

interface IProps {
  data: ICharacter;
}

export const CardPrimary: React.FC<IProps> = ({ data }) => {
  const history = useHistory();

  function handlePushDetail(): void {
    history.push({
      pathname: `/details/${data.id}`,
      state: {
        data,
      },
    });
  }

  return (
    <div
      className={styles.cardContainer}
      key={data.id}
      onClick={handlePushDetail}
      aria-hidden="true"
    >
      <div className={styles.cardImageName}>
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt={data.name}
        />
        <h4>{data.name}</h4>
      </div>
      <div className={styles.cardListEvents}>
        <ul>
          {data.events.items.length > 4
            ? data.events.items
                .slice(0, 4)
                .map(item => <li key={item.name}>{item.name}</li>)
            : data.events.items.map(item => (
                <li key={item.name}>{item.name}</li>
              ))}
          {data.events.items.length > 4 && <span>And more...</span>}
        </ul>
      </div>
      <div className={styles.cardListSeries}>
        <ul>
          {data.series.items.length > 4
            ? data.series.items
                .slice(0, 4)
                .map(item => <li key={item.name}>{item.name}</li>)
            : data.series.items.map(item => (
                <li key={item.name}>{item.name}</li>
              ))}
          {data.series.items.length > 4 && <div>And more...</div>}
        </ul>
      </div>
    </div>
  );
};
