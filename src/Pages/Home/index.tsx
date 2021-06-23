import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';
import { Search } from '../../Components/Search';
import { Loading } from '../../Components/Loading';
import { CardPrimary } from '../../Components/CardPrimary';
import { Pagination } from '../../Components/Pagination';
import { ICharacter } from '../../Interfaces/ICharacter';
import api from '../../Services/api';

interface APIResponse {
  data: {
    total: number;
    results: ICharacter[];
  };
}

export const Home: React.FC = () => {
  const [characters, setCharacter] = useState<ICharacter[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nameToSearch, setNametoSearch] = useState<string>('');

  useEffect(() => {
    async function getCharacter(): Promise<void> {
      try {
        setIsLoading(true);

        const { data } = await api.get<APIResponse>('characters', {
          params: {
            limit: 10,
            offset: 10 * (page - 1),
            ...(nameToSearch ? { nameStartsWith: nameToSearch } : {}),
          },
        });
        setTotalCount(data.data.total);

        if (data.data.total / 10 < page) {
          setPage(
            Math.ceil(data.data.total / 10) > 0
              ? Math.ceil(data.data.total / 10)
              : 1,
          );
        }
        setCharacter(data.data.results);
      } catch (error) {
        // ...
      } finally {
        setIsLoading(false);
      }
    }

    getCharacter();
  }, [nameToSearch, page]);

  function handleSearch(value: string): void {
    setNametoSearch(value);
  }

  return (
    <div className={styles.container}>
      <Search handleSearch={handleSearch} />

      <div className={styles.tableHeader}>
        <div className={styles.cardImageName}>
          <span>Personagem</span>
        </div>
        <div className={styles.cardListEvents}>
          <span>Eventos</span>
        </div>
        <div className={styles.cardListSeries}>
          <span>Series</span>
        </div>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : characters.length > 0 ? (
          <>
            {characters.map(char => (
              <CardPrimary data={char} key={char.id} />
            ))}
            <Pagination
              currentPage={page}
              onPageChange={currentPage => setPage(currentPage)}
              totalCountOfRegisters={totalCount}
              registersPerPage={10}
            />
          </>
        ) : (
          <div className={styles.noMatch}>
            <h4>Nenhum dado encontrado</h4>
          </div>
        )}
      </div>
    </div>
  );
};
