import React from 'react'
import Image from "next/image";
import { online } from "@/public/assets";

const Footer = () => {
  return (
    <footer className='w-full h-full xl:hidden relative overflow-hidden'>
        <div className="flex justify-center items-center py-5 mt-[2rem] gap-4">
          <Image src={online} alt="online" 
          className="w-[8px] mb-1"/> 
          <h4 className="font-titleFont text-textDark font-semibold">Available for work</h4>
        </div>
    </footer>
  )
}

export default Footer