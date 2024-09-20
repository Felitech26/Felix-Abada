import {motion} from "framer-motion";

// variants
import {fadeIn} from '../variants'
import {fadeOut} from '../motion'

const Banner = () => {
  return <section id="home"
  className="max-w-contentContainer container mx-auto py-10 xl:py-15 flex flex-col
  gap-4 lgl:gap-8 overflow-hidden">

  <div className="w-[450px] p-10 bg-[#151515] rounded-[15px]">
  <motion.h1
   className="text-3xl lgl:text-5xl font-titleFont font-bold flex flex-col">
    Felix Abada <span className="text-textDark text-lg font-medium mt-2 lgl:mt-4 capitalize"> full stack web developer</span></motion.h1>

  <motion.p 
  variants={fadeIn('up', 0.4)}
  initial="hidden"
  animate="show"
  exit="hidden"
  className="text-base font-titleFont md:max-w-[500px] mt-2 font-medium"
  >
 PRODUCT DESIGN | BRANDING | STRATEGY   {" "}   
          
 </motion.p>
  <motion.p 
  variants={fadeIn('up', 0.4)}
  initial="hidden"
  animate="show"
  exit="hidden"
  className="text-base md:max-w-[400px] text-textDark font-medium"
  >
  Driven by critical thinking and constant dedication, 
  I ve had the opportunity to shape my path across diverse sectors, 
    {" "}   
          
 </motion.p>
 <a href="https://felitech-portfolio.vercel.app/" target="_blank">
     <span className="text-textGreen inline-flex relative cursor-pointer h-7
     overflow-x-hidden group uppercase font-titleFont font-bold">
     My Resume
       <span className="absolute w-full h-[1px] bg-textGreen left-0 bottom-1
       -translate-x-[110%] group-hover:translate-x-0 transition-transform
       duration-500"></span>
   </span>
  </a>
  </div>
 
 </section>
  
};

export default Banner