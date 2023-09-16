import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import gb from '../../../public/gb.png'
import Link from 'next/link'
const Footer = () => {
  return (
    <div className="hidden md:flex justify-between w-full text-xs mb-3">
    <div className='opacity-50'>@2023 Made with &lt;3 for Trancendance.</div>
    <Link href="https://github.com/chzabakh/last_tr" target="blank">
      <Image src={gb} width={16} height={16} alt="" />
    </Link>
  </div>
  )
}

export default Footer