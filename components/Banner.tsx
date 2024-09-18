import {motion} from "framer-motion";

// variants
import {fadeIn} from '../variants'

const Banner = () => {
  return <section id="home"
  className="max-w-contentContainer mx-auto py-10 mdl:py-24 flex flex-col
  gap-4 lgl:gap-8 ndl:px-10 xl:px-4">
  <motion.h3 
  variants={fadeIn('right', 0.2)}
  initial="hidden"
  animate="show"
  exit="hidden"
   className="text-lg font-titleFont tracking-wide text-textGreen">
    Hi, my name is</motion.h3>

  <motion.h1
     variants={fadeIn('left', 0.3)}
     initial="hidden"
     animate="show"
     exit="hidden"
   className="text-6xl ldl:text-6xl font-titleFont font-bold flex flex-col">
    Felix Abada. <span className="text-textDark mt-2 lgl:mt-4">I solve the worlds biggest problems.</span></motion.h1>

  <motion.p 
  variants={fadeIn('up', 0.4)}
  initial="hidden"
  animate="show"
  exit="hidden"
  className="text-base md:max-w-[500px] text-textDark font-medium"
  >
   I am a web developer with 2+ years experience in React. I have a
   strong foundation in front-end & back-end development and am skilled in
   creating user-friendly and responsive web applications using React and 
   its ecosystem.I work on remote projets.   {" "}   
  <a href="https://felitech-portfolio.vercel.app/" target="_blank">
     <span className="text-textGreen inline-flex relative cursor-pointer h-7
     overflow-x-hidden group">
      Learn More
       <span className="absolute w-full h-[1px] bg-textGreen left-0 bottom-1
       -translate-x-[110%] group-hover:translate-x-0 transition-transform
       duration-500"></span>
   </span>
  </a>         
 </motion.p>
 <motion.button
 variants={fadeIn('left', 0.4)}
 initial="hidden"
 animate="show"
 exit="hidden"
  className="w-52 h-14 text-sm font-titleFont border border-textGreen
 rounded-md text-textGreen tracking-wide hover:bg-hoverColor duration-300"
 ><a href="https://github.com/Felitech26" target="_blank">Check out my Project! {" "} </a>
 </motion.button>
 </section>
  
};

export default Banner