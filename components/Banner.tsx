'use client';

import {motion} from "framer-motion";
import Image from "next/image";
import { profileImg } from "@/public/assets";
import { RxOpenInNewWindow } from 'react-icons/rx'
import {bev, united } from '@/public/assets'
import { FaFacebookF } from "react-icons/fa6";

import { TbBrandGithub } from 'react-icons/tb'
import Header3 from "./Header3";




const nav = {
  initial: {
    y: "-20%",
  },
  animate: {
    y: "0%",
    transition: {
      duration: .2,
      ease: [0.54, 0, 0.12, 0],
    },
  },
};
const yen = {
  initial: {
    y: "20%",
  },
  animate: {
    y: "0%",
    transition: {
      duration: .2,
      ease: [0.54, 0, 0.12, 0],
    },
  },
};


const headerVariant2 = {
  initial: {
    y: "100%",
  },
  animate: {
    y: 0,
    transition: {
      duration: 1.2,
      delay: 0.25,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const headerVariant1 = {
  initial: {
    y: "100%",
  },
  animate: {
    y: 0,
    transition: {
      duration: 1.2,
      delay: 0.1,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const flash = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.7,
      ease: [0.53, 0, 0.17, 1],
    },
  },
};


const topline1 = 'I am a developer base in Ghana, driven by';
const topline2 = 'critical thinking and constant dedication,';
const bottomline1 = 'I have had the opportunity to shape my path';
const bottomline2 = 'with my passion for Web Development.';

const Banner = () => {
  return <div className="relative overflow-hidden bottom-0">
  <div className="container mx-auto relative overflow-hidden">
<div className="w-full flex flex-col xl:flex-row overflow-hidden gap-[3rem] md:gap-[7rem]">
<div className="flex flex-col justify-center items-center rounded-[50px] bg-[#202020] bg-opacity-30 p-5 md:p-10">
    <div className="mb-7">
        <Image  
        src={profileImg}
        alt="profileImg"
        className="w-[160px] "
        />
    </div> 
    <div className="flex flex-col justify-center items-center">
  <motion.h1
     variants={headerVariant1}
     initial="initial"
     animate="animate"
   className="text-xl lgl:text-2xl font-titleFont font-bold">
    Felix Abada </motion.h1>
  <motion.p 
   variants={headerVariant2}
   initial="initial"
   animate="animate"
  className="text-textDark text-lg font-medium mt-2 lgl:mt-4 capitalize"> full stack developer</motion.p>

 <div className="w-full">
  <div>
    <Header3 phrase={topline1} className="" />
    <Header3 phrase={topline2} className="" />
  </div>
  <div>
  <Header3 phrase={bottomline1} className="" />
  <Header3 phrase={bottomline2} className="" />
  </div>
 </div>
  </div>
  <div className="flex flex-row mt-5 text-[#8a8a8a] 
     gap-3">

      <a href="https://github.com/Felitech26" target="blank" className="px-3 py-3 border border-sm rounded-full 
      transition-all duration-500
      hover:text-textGreen hover:border-textGreen
       text-[#8a8a8a] border-[#8a8a8a]">
      <TbBrandGithub className="text-[18px]" />
      </a>
     
      <a href="https://web.facebook.com/felix.abada.52" target="blank" className="px-3 py-3 border border-sm rounded-full 
      transition-all duration-500
      hover:text-textGreen hover:border-textGreen
       text-[#8a8a8a] border-[#8a8a8a]">
      <FaFacebookF className="text-[18px]" />
      </a>
    
      </div>

 </div>

 


<div className="w-full flex flex-col overflow-hidden xl:mt-[3rem]">
  <motion.h1 
  variants={flash}
  initial="initial"
  animate="animate"
  className="text-lg md:text-xl font-titleFont text-textDark text-center  
  font-semibold mb-5 md:mb-[3.5rem]">Featured Projects</motion.h1>

  <div className="flex flex-col justify-center md:flex-row gap-10">
  <motion.a 
   variants={nav}
   initial="initial"
   animate="animate"
  href="https://bev-couture.vercel.app/"
             target='_blank' className="w-full md:w-[410px] py-4 hover:translate-x-1 duration-300 bg-[#202020] bg-opacity-30 border border-gray-700 
  rounded-[40px] border-opacity-10">
    <div  className="flex flex-col mdl:flex-row justify-center items-center gap-[2rem] xl:gap-[4rem]"></div>
    <div className="flex justify-between items-center px-4">
      <h1 className="text-[15px] font-titleFont font-semibold text-white">Bev Couture</h1>
    </div>
    <div className="px-4 pt-3"><Image className='w-full h-full object-cover'
          src={bev}
          alt='bev' /></div>
    <div className="flex gap-4 px-4 mt-5 font-medium text-[14px] text-textDark place-items-center">
      <h1>Fashion</h1>
      <h1>Ecommerce</h1>
      <h1>Full Stack</h1>
    </div>
    </motion.a>

  
  <motion.a 
   variants={yen}
   initial="initial"
   animate="animate"
  href="https://united-development-company.vercel.app/"
             target='_blank' className="w-full md:w-[410px] py-4 bg-[#202020] bg-opacity-30 border border-gray-700 
  rounded-[40px] border-opacity-10 hover:translate-x-1 duration-300">
    <div className="flex justify-between items-center px-4">
      <h1 className="text-[15px] font-titleFont font-semibold text-white">United Develpment Company</h1>
      
    </div>
    <div className="px-4 pt-4"><Image className='w-full h-full object-cover'
          src={united}
          alt='united' /></div>
    <div className="flex gap-4 px-4 mt-5 font-medium text-[14px] text-textDark place-items-center">
      <h1>Real Estate</h1>
      <h1>Portfolio</h1>
      <h1>Front End</h1>
    </div>

  </motion.a>
  </div>
  
 
  
  </div>  




</div>



  </div>
 
  
 </div>
  

};

export default Banner