import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './styles.module.scss';

interface IProps {
  handleSearch: (nameToSearch: string) => void;
}

export const Search: React.FC<IProps> = ({ handleSearch }) => {
  const [nameToSearch, setNameToSearch] = useState('');
  const [searchOnChange, setsearchOnChange] = useState(false);

  function search(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    handleSearch(nameToSearch);
  }

  function handleSearchOnChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setNameToSearch(event.target.value);
    if (searchOnChange) {
      handleSearch(event.target.value);
    }
  }

  return (
    <section className={styles.searchContainer}>
      <h1>Busca de personagens</h1>
      <h4>Nome do personagem</h4>
      <form
        noValidate
        className={styles.searchBox}
        onSubmit={event => {
          search(event);
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={nameToSearch}
          onChange={handleSearchOnChange}
        />
        <button className={styles.icon} type="submit">
          <FaSearch />
        </button>
      </form>
      <div className={styles.helperText}>
        <input
          type="checkbox"
          checked={searchOnChange}
          onChange={event => {
            setsearchOnChange(event.target.checked);
          }}
        />
        <span>Buscar ao digitar </span>
      </div>
    </section>
  );
};
