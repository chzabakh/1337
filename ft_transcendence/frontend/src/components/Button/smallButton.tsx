import React from 'react';
import Link from 'next/link';
import styles from './button.module.css';

interface SmallButtonProps {
  text: string;
  url: string;
}

const SmallButton: React.FC<SmallButtonProps> = ({ text, url }) => {
  return (
    <Link href={url} passHref>
      <button className={styles.buttonSmall}>{text}</button>
    </Link>
  );
};

export default SmallButton;
