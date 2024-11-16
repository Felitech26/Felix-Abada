import { logo, online } from "@/public/assets";
import Image from "next/image";

import { motion } from "framer-motion";

import { CiMail } from "react-icons/ci";


const nav = {
  initial: {
    y: "-100%",
  },
  animate: {
    y: "0%",
    transition: {
      duration: .7,
      ease: [0.24, 0, 0.28, 0],
    },
  },
};



const Navbar = () => {
 
  return  (
  <motion.div 
  variants={nav}
   initial="initial"
   animate="animate"
  className="w-full py-4 fixed top-0 z-50 bg-bodyColor 
  px-5 lg:px-[10rem]">
   <div className="max-w-container h-full mx-auto py-1 font-titleFont flex items-center
      justify-between">
        <div >
       <div className="font-lato text-textDark text-[13px] md:text-[17px] font-semibold">
            <span className="text-[14px] animate-ping text-green-500 mr-2">
              &#x2022;
            </span>
            Available for work
          </div>
        </div>

      

        <div className="flex justify-center items-center ">
       <a href='mailto:felitech26@outlook.com' className="flex flex-row justify-center
       items-center gap-2 text-textDark 
       hover:text-accent hover:translate-x-1 transition-all duration-500">
        <CiMail  className="text-[15px] md:text-[17px]"/>
        <h5 className="font-lato text-[13px] md:text-[17px] font-semibold">Send Mail</h5>
      </a>
      </div>
        

      </div>
    </motion.div>
  );
};

export default Navbar; 