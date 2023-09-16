import React, { useState } from 'react'
import Image from 'next/image';
import ReactCardFlip from 'react-card-flip';
// import oufisaou from ""
import Stars from '../Sections/stars';
import Layout from '../Layout/layout';
import Link from 'next/link';

interface CardProps {
    picture: string;
    name: string;
    github: string;
    linkedin: string;
  } 
const Card: React.FC<CardProps> = ({picture, name, github, linkedin}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    // const [turned, setTurned] = useState(false);

    const handleMouseEnter = () => {
      if (!isFlipped) {
        setIsFlipped(true);
      }
    };
  
    const handleMouseLeave = () => {
      if (isFlipped) {
        setIsFlipped(false);
      }
    };
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: '300px', height: '300px' }}
    >
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
    <div className="front w-[300px] h-[300px] rounded-lg">
    <div className='flex flex-col justify-center w-full items-center' >
        <Image alt="" width={100} height={100} src={picture} className="relative w-full rounded-lg h-full"/>
        {/* <div className="absolute top-0 left-0 w-full h-full bg-[#00000080] "></div> */}
        <div className='absolute bottom-0 font-inter font-bold text-xl bg-black/70 w-full text-center h-[50px] flex justify-center items-center tracking-widest'>
        {name}
        </div>
    </div>
    </div>
    <div className="back w-[300px] h-[300px] rounded-lg">
    <div className="flex flex-col justify-center items-center gap-3 w-[300px]  h-[300px] rounded-lg bg-[#0000008b]">
      <div className='flex flex-col justify-center gap-4 items-center font-inter' >
        <Link href={github} target="blank" className='text-sm text-purple-400 transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110  text-center rounded-full border-2 border-white m-2 w-[150px] px-6 py-4 hover:border-[#8b11ba]'>My Github</Link>
        <Link href={linkedin} target="blank" className='text-sm text-purple-400 transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110   text-center rounded-full border-2 border-white m-2 w-[150px] px-6 py-4 hover:border-[#8b11ba]'>My LinkedIn</Link>
      </div>
    </div>
    </div>
    </ReactCardFlip>
    </div>
  )
}

export default Card