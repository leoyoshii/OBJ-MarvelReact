import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { ICharacter } from '../../Interfaces/ICharacter';
import { Loading } from '../../Components/Loading';
import api from '../../Services/api';
import styles from './styles.module.scss';
import { ICharacterEvent } from '../../Interfaces/ICharacterEvent';
import { CardEventsDetail } from '../../Components/CardEventsDetail';
import { ICharacterSerie } from '../../Interfaces/ICharacterSerie';

interface IParams {
  id: string;
}

interface IState {
  data: ICharacter;
}

interface APIResponseDetail {
  data: {
    total: number;
    results: ICharacter[];
  };
}

interface APIResponseEvents {
  data: {
    total: number;
    results: ICharacterEvent[];
  };
}

interface APIResponseSeries {
  data: {
    total: number;
    results: ICharacterSerie[];
  };
}

export const CharacterDetail: React.FC = () => {
  const history = useHistory();
  const location = useLocation<IState>();
  const { id } = useParams<IParams>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [characterDetail, setCharacterDetail] = useState<ICharacter>();

  // events
  const [charEvents, setCharEvents] = useState<ICharacterEvent[]>([]);
  const [charEventsPage, setCharEventsPage] = useState(1);
  const [charEventsTotal, setCharEventsTotal] = useState<number>(0);
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);

  // series
  const [charSeries, setCharSeries] = useState<ICharacterSerie[]>([]);
  const [charSeriesPage, setCharSeriesPage] = useState(1);
  const [charSeriesTotal, setCharSeriesTotal] = useState<number>(0);
  const [isLoadingSeries, setIsLoadingSeries] = useState<boolean>(true);

  useEffect(() => {
    async function getDetail(): Promise<void> {
      try {
        setIsLoading(true);
        const { data } = await api.get<APIResponseDetail>(`characters/${id}`);

        setCharacterDetail(data.data.results[0]);
      } catch (error) {
        history.push('/');
      } finally {
        setIsLoading(false);
      }
    }

    if (!location.state && id) {
      getDetail();
    } else if (location.state) {
      setCharacterDetail(location.state.data);
      setIsLoading(false);
    } else {
      history.push('/');
    }
  }, [history, id, location]);

  useEffect(() => {
    async function getEvents(): Promise<void> {
      try {
        setIsLoadingEvents(true);
        const { data } = await api.get<APIResponseEvents>(
          `characters/${characterDetail?.id}/events`,
          {
            params: {
              limit: 10,
              offset: 10 * (charEventsPage - 1),
            },
          },
        );
        setCharEventsTotal(data.data.total);
        if (charEventsPage > 1) {
          setCharEvents(oldValue => [...oldValue, ...data.data.results]);
        } else {
          setCharEvents(data.data.results);
        }
      } catch (error) {
        // ..
      } finally {
        setIsLoadingEvents(false);
      }
    }

    if (characterDetail) {
      getEvents();
    }
  }, [characterDetail, charEventsPage]);

  useEffect(() => {
    async function getSeries(): Promise<void> {
      try {
        setIsLoadingSeries(true);
        const { data } = await api.get<APIResponseSeries>(
          `characters/${characterDetail?.id}/series`,
          {
            params: {
              limit: 10,
              offset: 10 * (charSeriesPage - 1),
            },
          },
        );
        setCharSeriesTotal(data.data.total);
        if (charSeriesPage > 1) {
          setCharSeries(oldValue => [...oldValue, ...data.data.results]);
        } else {
          setCharSeries(data.data.results);
        }
      } catch (error) {
        // ..
      } finally {
        setIsLoadingSeries(false);
      }
    }

    if (characterDetail) {
      getSeries();
    }
  }, [characterDetail, charSeriesPage]);

  return (
    <div className={styles.container}>
      {isLoading || !characterDetail ? (
        <Loading />
      ) : (
        <>
          <div className={styles.cardImageName}>
            <img
              className={styles.charAvatar}
              src={`${characterDetail.thumbnail.path}.${characterDetail.thumbnail.extension}`}
              alt={characterDetail.name}
            />
            <h3 className={styles.charName}>{characterDetail.name}</h3>
            <div className={styles.charDescription}>
              <h4>Descrição:</h4>
              <span>
                {characterDetail.description ||
                  'Não possui descrição cadastrada'}
              </span>
            </div>
          </div>
          <div className={styles.heDoThisDetail}>
            <div className={styles.eventsDetail}>
              <span>Eventos</span>
              <ul>
                {charEvents.map(item => (
                  <CardEventsDetail
                    title={item.title}
                    imgUrl={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                    description={item.description}
                  />
                ))}
              </ul>
              {isLoadingEvents ? (
                <Loading />
              ) : charEvents.length === 0 ? (
                <div className={styles.anyEntry}>
                  <h4>Não foi encontrado nenhum item.</h4>
                </div>
              ) : (
                Math.ceil(charEventsTotal / 10) !== charEventsPage && (
                  <button
                    className={styles.fetchMoreButton}
                    type="button"
                    onClick={() => {
                      setCharEventsPage(charEventsPage + 1);
                    }}
                  >
                    Carregar mais
                  </button>
                )
              )}
            </div>
            <div className={styles.eventsDetail}>
              <span>Series</span>
              <ul>
                {charSeries.map(item => (
                  <CardEventsDetail
                    title={item.title}
                    imgUrl={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                    description={item.description}
                  />
                ))}
              </ul>
              {isLoadingSeries ? (
                <Loading />
              ) : (
                Math.ceil(charSeriesTotal / 10) !== charSeriesPage && (
                  <button
                    className={styles.fetchMoreButton}
                    type="button"
                    onClick={() => {
                      setCharSeriesPage(charSeriesPage + 1);
                    }}
                  >
                    Carregar mais
                  </button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
