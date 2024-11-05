import {motion} from "framer-motion";
import Image from "next/image";
import { profileImg } from "@/public/assets";
import { RxOpenInNewWindow } from 'react-icons/rx'
import {bev, united } from '@/public/assets'

// variants
import {fadeIn} from '../variants'
import {fadeOut} from '../motion'

const Banner = () => {
  return <section id="home"
  className="w-full xl:h-screen px-3 flex justify-center items-center xl:px-[7rem] py-[8rem] lg:py-[7rem] xl:py-[12rem] overflow-hidden">

<div className="w-full flex flex-col xl:flex-row justify-center items-center overflow-hidden gap-[3rem]">
<div className="flex flex-col justify-center items-center">
    <div className="mb-7">
        <Image  
        src={profileImg}
        alt="profileImg"
        className="w-[100px] "
        />
    </div> 
    <div className="flex flex-col justify-center items-center">
  <motion.h1
   className="text-2xl lgl:text-5xl font-titleFont font-bold">
    Felix Abada </motion.h1>
  <p className="text-textDark text-lg font-medium mt-2 lgl:mt-4 capitalize"> full stack web developer</p>

  <motion.p 
  variants={fadeIn('up', 0.4)}
  initial="hidden"
  animate="show"
  exit="hidden"
  className="text-base font-titleFont max-w-[400px] mt-2 font-medium"
  >
 PRODUCT DESIGN | BRANDING | STRATEGY   {" "}   
          
 </motion.p>
  <motion.p 
  variants={fadeIn('up', 0.4)}
  initial="hidden"
  animate="show"
  exit="hidden"
  className="text-base w-[400px] text-textDark font-medium capitalize mt-3 text-center"
  >
  Driven by critical thinking and constant dedication, 
  I have had the opportunity to shape my path across the web with my 
  passion for Web Development
    {" "}   
          
 </motion.p>
 <a href="https://felitech-portfolio.vercel.app/" target="_blank">
     <span className="text-textGreen inline-flex relative cursor-pointer h-7
     overflow-x-hidden group uppercase font-titleFont font-bold mt-5">
     My Resume
       <span className="absolute w-full h-[1px] bg-textGreen left-0 bottom-1
       -translate-x-[110%] group-hover:translate-x-0 transition-transform
       duration-500"></span>
   </span>
  </a>
  </div>


    </div>


<div className="w-full flex flex-col justify-center overflow-hidden">
  <div><h1 className="mb-5 font-extrabold">PROJECTS</h1></div>
  <div className="flex flex-col mdl:flex-row justify-center items-center gap-[2rem] xl:gap-[4rem]">
  <div className="w-full md:w-[410px] py-4 bg-white/[0.015] border border-gray-700 
  rounded-[10px] border-opacity-10">
    <div className="flex justify-between items-center px-4">
      <h1 className="text-[18px] font-titleFont font-bold text-white">Bev Couture</h1>
      <a className='hover:text-textGreen duration-300' 
            href="https://bev-couture.vercel.app/"
             target='_blank'>
              <RxOpenInNewWindow className="text-[20px]" />
             </a>
    </div>
    <div className="px-4 pt-3"><Image className='w-full h-full object-cover'
          src={bev}
          alt='bev' /></div>
    <div className="flex gap-4 px-4 mt-5 place-items-center">
      <h1>Fashion</h1>
      <h1>Ecommerce</h1>
      <h1>Full Stack</h1>
    </div>

  </div>
  <div className="w-full md:w-[410px] py-4 bg-white/[0.015] border border-gray-700 
  rounded-[10px] border-opacity-10">
    <div className="flex justify-between items-center px-4">
      <h1 className="text-[18px] font-titleFont font-bold text-white">United Develpment Company</h1>
      <a className='hover:text-textGreen duration-300' 
            href="https://bev-couture.vercel.app/"
             target='_blank'>
              <RxOpenInNewWindow className="text-[20px]" />
             </a>
    </div>
    <div className="px-4 pt-4"><Image className='w-full h-full object-cover'
          src={united}
          alt='united' /></div>
    <div className="flex gap-4 px-4 mt-5 place-items-center">
      <h1>Real Estate</h1>
      <h1>Portfolio</h1>
      <h1>Front End</h1>
    </div>

  </div>
  </div>
  </div>  

</div>





 
 
 </section>
  
};

export default Banner