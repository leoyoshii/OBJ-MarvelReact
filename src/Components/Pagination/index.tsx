import React from 'react';
import { PaginationItem } from './PaginationItem';
import styles from './styles.module.scss';

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 2;

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page > 0);
}

export const Pagination: React.FC<PaginationProps> = ({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) => {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : [];

  return (
    <ul className={styles.paginationContainer}>
      {currentPage > 1 + siblingsCount && (
        <button
          onClick={() => onPageChange(1)}
          type="button"
          className={styles.paginationItem}
        >
          <span> {'<<'} </span>
        </button>
      )}

      {previousPages.length > 0 &&
        previousPages.map(page => {
          return (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          );
        })}

      <PaginationItem
        onPageChange={onPageChange}
        number={currentPage}
        isCurrent
      />

      {nextPages.length > 0 &&
        nextPages.map(page => {
          return (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          );
        })}

      {currentPage + siblingsCount < lastPage && (
        <>
          <button
            onClick={() => onPageChange(lastPage)}
            type="button"
            className={styles.paginationItem}
          >
            <span> {'>>'} </span>
          </button>
        </>
      )}
    </ul>
  );
};
