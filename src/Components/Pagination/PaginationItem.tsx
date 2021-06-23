
import React from 'react';
import styles from './styles.module.scss';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export const PaginationItem: React.FC<PaginationItemProps> = ({
  isCurrent = false,
  onPageChange,
  number,
}: PaginationItemProps) => {
  return (
    <button
      type="button"
      disabled={isCurrent}
      onClick={() => onPageChange(number)}
      className={styles.paginationItem}
    >
      {number}
    </button>
  );
};
