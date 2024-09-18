import SectionTitle from './SectionTitle'
import Image from 'next/image'
import { ageImg, amazonImg } from '@/public/assets'
import { AiOutlineYoutube } from 'react-icons/ai'
import { TbBrandGithub } from 'react-icons/tb'
import { RxOpenInNewWindow } from 'react-icons/rx'

const Projects = () => {
  return (
    <section id='project'
    className='max-w-container mx-auto lgl:px-20 py-24'>
    <SectionTitle title="Some Things I have Built" titleNo="03" />
  <div className='w-full flex flex-col items-center justify-between gap-28 mt-10'>
    {/*Project one */}
    <div className='w-full flex flex-col items-center justify-center gap-28 mt-10'>
        <div className='flex flex-col xl:flex-row gap-6'>
          <a className='w-full xl:w-1/2 h-auto relative group' href="https://felitech-rolls-royce.vercel.app/"
          target='_blank'>
            <div><Image className='w-full h-full object-contain'
          src={amazonImg}
          alt='amazonImg' /></div>
          </a>
          <div className='w-full xl:w-1/2 flex flex-col gap-6 lgl:justify-between
        items-end text-right xl:-ml-16 z-10'>
          <p>Featured Project</p>
          <h3 className='text-2xl font-bold'>Rolls Royce 2.0</h3>
          <p className='bg-hoverColor text-sm md:text-base p-2 md:p-5 rounded-md text-gap-2'>
            Rolls Royce clone website designed by Felitech. 
            Create an account, View our products   {" "}<span className='text-textGreen'>Models </span> and make reservations for    
               <span className='text-textGreen'> Upcomings</span>
          </p>
          <u  className="text-xs md:text-sm font-titleFont tracking-wide flex gap-2
          md:gap-5 justify-between text-textDark">
            <li>Nextjs</li>
            <li>Typescript</li>
            <li>Next-auth</li>
            <li>Stripe</li>
            <li>Vercel Deployment</li>
          </u>
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
             href="https://github.com/Felitech26"
             target='_blank'>
              <RxOpenInNewWindow />
             </a>
          </div>
          </div>
        </div> 
      </div>
      {/*Project two */}
      <div className='w-full flex flex-col items-center justify-center gap-28 mt-10'>
        <div className='flex flex-col xl:flex-row-reverse gap-6'>
          <a className='w-full xl:w-1/2 h-auto relative group' href="https://felitech-age-calculator.vercel.app/"
          target='_blank'>
            <div><Image className='w-full h-full object-contain'
          src={ageImg}
          alt='ageImg' /></div>
          </a>
          <div className='w-full xl:w-1/2 flex flex-col gap-6 lgl:justify-between
        items-end text-right z-10'>
          <p>Featured Project</p>
          <h3 className='text-2xl font-bold'>Age Calculator 3.5</h3>
          <p className='bg-hoverColor text-sm md:text-base p-2 xl:-mr-16 md:p-5 rounded-md text-gap-2'>
            An Age calculator website designed by Felitech to help ease our stress. 
            Check your age, know the {" "}<span className='text-textGreen'>Years, Months and Days </span> you have lived on    
               <span className='text-textGreen'> Earth</span>
          </p>
          <u  className="text-xs md:text-sm font-titleFont tracking-wide flex gap-2
          md:gap-5 justify-between text-textDark">
            <li>Nextjs</li>
            <li>Typescript</li>
            <li>Next-auth</li>
            <li>Stripe</li>
            <li>Vercel Deployment</li>
          </u>
          <div className='text-2xl flex gap-4'>
             <a className='hover:text-textGreen duration-300' 
             href="https://github.com/Felitech26/Felitech-Age-Calculator"
             target='_blank'>
              <TbBrandGithub />
             </a>
             <a className='hover:text-textGreen duration-300' 
             href="https://www.youtube.com/"
             target='_blank'>
              <AiOutlineYoutube />
             </a>
             <a className='hover:text-textGreen duration-300' 
             href="https://github.com/Felitech26"
             target='_blank'>
              <RxOpenInNewWindow />
             </a>
          </div>
          </div>
        </div> 
      </div>
      {/*Project three */}
  </div>
      </section>
  )
}

export default Projects