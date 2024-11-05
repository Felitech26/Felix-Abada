import { logo, online } from "@/public/assets";
import Image from "next/image";

import { motion } from "framer-motion";
import { AiOutlineYoutube } from 'react-icons/ai'
import { TbBrandGithub } from 'react-icons/tb'



// variants
import {fadeIn} from '../variants'


const Navbar = () => {
 
  return  (
  <div className="w-full h-20 lg:h-[12vh] fixed top-0 z-50 bg-bodyColor 
  px-4">
   <div className="max-w-container h-full mx-auto py-1 font-titleFont flex items-center
      justify-between">
        <motion.div 
         variants={fadeIn('right', 0.4)}
         initial="hidden"
         animate="show"
         exit="hidden">
        <Image src={logo} alt="logo"
        className="w-[35px]"/>
        </motion.div>

        <div className='text-2xl flex gap-4'>
             <a className='hover:text-textGreen duration-300' 
             href="https://github.com/Felitech26/felitech-rolls-royce"
             target='_blank'>
              <TbBrandGithub />
             </a>
             <a className='hover:text-textGreen duration-300' 
             href="https://www.youtube.com/"
             target='_blank'>
              <AiOutlineYoutube />
             </a>
             <a className='hover:text-textGreen duration-300' 
             href="https://github.com/Felitech26/felitech-rolls-royce"
             target='_blank'>
              <TbBrandGithub />
             </a>
          </div>

        <div className="flex justify-center items-center gap-3">
          <Image src={online} alt="online" 
          className="w-[8px] mb-1"/> 
          <h4 className="font-titleFont font-semibold">Available for work</h4>
        </div>
        

      </div>
    </div>
  );
};

export default Navbar; 