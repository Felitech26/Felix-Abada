import { logo, online } from "@/public/assets";
import Image from "next/image";

import { motion } from "framer-motion";
import { AiOutlineYoutube } from 'react-icons/ai'
import { TbBrandGithub } from 'react-icons/tb'
import { CiMail } from "react-icons/ci";



// variants
import {fadeIn} from '../variants'


const Navbar = () => {
 
  return  (
  <div className="w-full py-4 fixed top-0 z-50 bg-bodyColor 
  px-4 lg:px-[10rem]">
   <div className="max-w-container h-full mx-auto py-1 font-titleFont flex items-center
      justify-between">
        <motion.div 
         variants={fadeIn('right', 0.4)}
         initial="hidden"
         animate="show"
         exit="hidden">
        <Image src={logo} alt="logo"
        className="w-[30px]"/>
        </motion.div>

      

        <div className="flex justify-center items-center ">
<a href='mailto:felitech26@outlook.com' className="flex flex-row justify-center
       items-center gap-2 text-textDark 
       hover:text-accent hover:translate-x-3 transition-all duration-500">
        <CiMail  className="text-[18px] "/>
        <h5 className="font-lato font-semibold">Send Mail</h5>
      </a>
</div>
        

      </div>
    </div>
  );
};

export default Navbar; 