import { logo, online } from "@/public/assets";
import {useRef, useState} from "react"
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


// variants
import {fadeIn} from '../variants'
import LeftSide from "./LeftSide";

const Navbar = () => {
  const ref = useRef<string | any>("")
  const [showMenu,setShowMenu]= useState(false);
  const handleScroll =(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
   e.preventDefault();
   setShowMenu(false);
   const href = e.currentTarget.href;
   const targetId = href.replace(/.*\#/, "");
   const elem = document.getElementById(targetId);
   elem?.scrollIntoView({
    behavior: "smooth",
   });
   // Update the class name of the clicked link
   const links = document.querySelectorAll(".nav-link")
   links.forEach((link) => {
    link.classList.remove("active")
   });
   e.currentTarget.classList.add("active");
 };

 function handleClick(e:any){
  if(e.target.contains(ref.current)){
    // do something with myRef.current
    setShowMenu(false);
  }
 }

  return  (
  <div className="w-full h-20 lg:h-[12vh] sticky top-0 z-50 bg-bodyColor 
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
        <div className="hidden sml:inline-flex justify-center items-center gap-3">
          <Image src={online} alt="online" 
          className="w-[8px] mb-1"/> 
          <h4 className="font-titleFont font-semibold">Available for work</h4>
        </div>
        
       <span className="absolute w-full h-[1px] bg-textGreen left-0 bottom-1
       -translate-x-[110%] group-hover:translate-x-0 transition-transform
       duration-500"></span>
 <div className="flex items-center gap-7 mt-3">
          <ul className="flex text-[12px]  gap-7">

  <Link href="#project"
          onClick={handleScroll}>
     <span 
     className="font-bold uppercase text-textDark inline-flex relative cursor-pointer h-7
     overflow-x-hidden group nav-link">
      PROJECTS
       <span className="absolute w-full h-[1px] bg-textGreen left-0 bottom-1
       -translate-x-[110%] group-hover:translate-x-0 transition-transform
       duration-500"></span>
   </span>
  </Link>  
  <Link href="#about"
          onClick={handleScroll}>
     <span
     className="font-bold uppercase text-textDark inline-flex relative cursor-pointer h-7
     overflow-x-hidden group nav-link">
     ABOUT
       <span className="absolute w-full h-[1px] bg-textGreen left-0 bottom-1
       -translate-x-[110%] group-hover:translate-x-0 transition-transform
       duration-500"></span>
   </span>
  </Link>  
  <Link href="#contact"
          onClick={handleScroll}>
     <span 
     className="font-bold uppercase text-textDark inline-flex relative cursor-pointer h-7
     overflow-x-hidden group ">
      CONTACT
       <span className="absolute w-full h-[1px] bg-textGreen left-0 bottom-1
       -translate-x-[110%] group-hover:translate-x-0 transition-transform
       duration-500"></span>
   </span>
  </Link>       
         </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar; 