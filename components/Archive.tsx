import React, { useState } from 'react'
import ArchiveCard from './ArchiveCard'
import{motion} from 'framer-motion'

const Archive = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className='max-w-contentContainer mx-auto px-4 py-24'>
    <div className='w-full flex flex-col items-center'>
      <h2 className='text-3xl font-titleFont font-semibold'>Other Noteworthy Projects</h2>
      <p className='text-md font-titleFont text-textGreen mt-3'>View the archive</p>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6
    mt-10 lgl:px-10'>
      <ArchiveCard 
      title="Felitech Program Learning Academy" 
      des=" Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC."
      listItem={["Reactjs","Tailwind CSS", "getform.io" ]} 
      link="https://dribbble.com" />

<ArchiveCard 
      title="Felitech Program Learning Academy" 
      des=" Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC."
      listItem={["Reactjs","Tailwind CSS", "getform.io" ]} 
      link="https://dribbble.com" />

<ArchiveCard 
      title="Felitech Program Learning Academy" 
      des=" Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC."
      listItem={["Reactjs","Tailwind CSS", "getform.io" ]} 
      link="https://dribbble.com" />

<ArchiveCard 
      title="Felitech Program Learning Academy" 
      des=" Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC."
      listItem={["Reactjs","Tailwind CSS", "getform.io" ]} 
      link="https://dribbble.com" />

<ArchiveCard 
      title="Felitech Program Learning Academy" 
      des=" Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC."
      listItem={["Reactjs","Tailwind CSS", "getform.io" ]} 
      link="https://dribbble.com" />

<ArchiveCard 
      title="Felitech Program Learning Academy" 
      des=" Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC."
      listItem={["Reactjs","Tailwind CSS", "getform.io" ]} 
      link="https://dribbble.com" />

     {
      showMore && (
        <>
         <motion.div
         initial={{ opacity:0}}
         whileInView={{ opacity:1}}
         transition={{ delay:0.1}}
         >
          <ArchiveCard 
      title="Felitech Program Learning Academy" 
      des=" Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC."
      listItem={["Reactjs","Tailwind CSS", "getform.io" ]} 
      link="https://dribbble.com" />
           
         </motion.div>
         <motion.div
         initial={{ opacity:0}}
         whileInView={{ opacity:1}}
         transition={{ delay:0.2}}
         >
          <ArchiveCard 
      title="Felitech Program Learning Academy" 
      des=" Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC."
      listItem={["Reactjs","Tailwind CSS", "getform.io" ]} 
      link="https://dribbble.com" />
           
         </motion.div>
         <motion.div
         initial={{ opacity:0}}
         whileInView={{ opacity:1}}
         transition={{ delay:0.3}}
         >
          <ArchiveCard 
      title="Felitech Program Learning Academy" 
      des=" Contrary to popular belief, Lorem Ipsum is not simply random text. 
      It has roots in a piece of classical Latin literature from 45 BC."
      listItem={["Reactjs","Tailwind CSS", "getform.io" ]} 
      link="https://dribbble.com" />
           
         </motion.div>
         
        </>
      )
     }

    </div>
    <div className='mt-12 flex items-center justify-center'>
      {showMore ? ( 
      <button 
      onClick={() =>setShowMore(false)}
       className='w-36 h-12 rounded-md text-textGreen text-[13px] border
      border-textGreen hover:bg-hoverColor duration-300'
      >
      Show Less
      </button>
  ) : (
    <button 
      onClick={() =>setShowMore(true)}
       className='w-36 h-12 rounded-md text-textGreen text-[13px] border
      border-textGreen hover:bg-hoverColor duration-300'
      >
      Show More
      </button>)

      
      }
    </div>
    </div>
  )
}

export default Archive