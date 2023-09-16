import React from 'react'
import styles from './button.module.css'
import Link from 'next/link'

interface ButtonProps {
  text: string;
  url: string;
}

const Button: React.FC<ButtonProps> = ({text, url}) => {
  return (
    <Link href={url} passHref>
    <button className={styles.button}>
        {text}
    </button>
    </Link>
  )
}

export default Button