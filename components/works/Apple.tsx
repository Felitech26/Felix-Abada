import {motion} from "framer-motion";
import {TiArrowForward} from "react-icons/ti";

const Apple = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full"
    >
    <h3 className="flex gap-1 font-medium text-xl font-titleFont">
      Engineer 
      <span className="text-textGreen tracking-wide">@Apple</span></h3>
    <p className="text-sm mt-1 font-medium text-textDark">Sep 2023 - Present</p>
    <ul className="mt-6 flex flex-col gap-3">
      <li className="text-base flex gap-2 text-textDark">
      <span className="text-textGreen mt-1"><TiArrowForward /></span>{""}
      Write modern, performant, maintainable code for a diverse array 
      of clients and internal projects</li>

      <li className="text-base flex gap-2 text-textDark">
      <span className="text-textGreen mt-1"><TiArrowForward /></span>{""}
      Write modern, performant, maintainable code for a diverse array 
      of clients and internal projects</li>

      
      </ul> 
      </motion.div>
  )
}

export default Apple