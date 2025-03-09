import React from 'react'
import Image from 'next/image'
import logo from '@/public/images/PartlyCloudy.png'

function Header() {
  return (
    <div>
      <div className="px-20 flex flex-row h-[10rem] w-full  ">
      <Image src={logo} alt="logo" width={150} height={150} />
      <h1 className="text-white pl-10 pt-22 text-4xl font-bold"> Weather Analyze</h1>

      </div>
    </div>
  )
}

export default Header
