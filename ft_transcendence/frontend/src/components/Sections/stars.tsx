import React from 'react'

const Stars = () => {
  return (
    <>
      <div className="absolute left-0 z-[-1] w-[50%] h-screen max-h-screen max-w-screen overflow-hidden">
      <div id="stars"></div>
      </div>
      <div className="absolute right-0 z-[-1] w-[50%] h-screen max-h-screen max-w-screen overflow-hidden">
      <div id="stars"></div>
      </div>
    </>
  )
}

export default Stars