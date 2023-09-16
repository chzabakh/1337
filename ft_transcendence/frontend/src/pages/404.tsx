import React from 'react'
import error from '../../public/404.jpeg'
import Image from 'next/image'
import Stars from '@/components/Sections/stars'
import { useSocket } from '@/components/socket_context'

const Custum404 = () => {

  // const {socket} = useSocket();

  return (
<div className='relative w-screen h-screen'>
      <div
        className='absolute inset-0 bg-black/70 z-1'
        style={{ zIndex: 1 }}
      ></div>

      <div
        className='absolute inset-0 w-full h-full z-0'
        style={{
          backgroundImage: `url(${error.src})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      ></div>

      <div className="absolute text-white inset-0 z-2"  style={{ zIndex: 2 }}>
       <Stars/>
      </div>
      <div className="absolute text-white inset-0 z-2 left-[47%] top-[50%]"  style={{ zIndex: 3 }}>
       404 |  Page not found...
      </div>
    </div>
  )
}
export default Custum404