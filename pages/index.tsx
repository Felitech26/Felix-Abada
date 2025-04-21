/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from "next/image";
import { profileImg, bev, united } from "@/public/assets";
import { TbBrandGithub } from 'react-icons/tb';
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Felix Abada | Fullstack Developer</title>
        <meta name="description" content="Felix Abada - Full Stack Web Developer based in Ghana" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.icon" />
      </Head>
     
      <main className="min-h-screen bg-[#0a0a0b] text-white">
        {/* Side navigation bar */}
        <aside className="fixed top-0 left-0 h-full w-24 md:w-28 border-r border-[#FF5757]/20 z-50 hidden md:block">
          <div className="h-full flex flex-col justify-between items-center py-10">
            <div className="text-[#FF5757] font-bold text-2xl">FA</div>
            
            <nav className="flex flex-col gap-10">
              <a href="#about" className="group p-2 relative">
                <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-[#FF5757] group-hover:h-6 transition-all duration-300"></span>
                <span className="text-sm font-bold text-[#AAAAAA] group-hover:text-white transition-colors duration-300">About</span>
              </a>
              <a href="#projects" className="group p-2 relative">
                <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-[#FF5757] group-hover:h-6 transition-all duration-300"></span>
                <span className="text-sm font-bold text-[#AAAAAA] group-hover:text-white transition-colors duration-300">Projects</span>
              </a>
              <a href="#contact" className="group p-2 relative">
                <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-0 bg-[#FF5757] group-hover:h-6 transition-all duration-300"></span>
                <span className="text-sm font-bold text-[#AAAAAA] group-hover:text-white transition-colors duration-300">Contact</span>
              </a>
            </nav>
            
            <div className="flex flex-col gap-6">
              <a href="https://github.com/Felitech26" target="_blank" rel="noopener noreferrer" className="text-[#AAAAAA] hover:text-[#FF5757] transition-colors duration-300">
                <TbBrandGithub size={20} />
              </a>
              <a href="https://web.facebook.com/felix.abada.52" target="_blank" rel="noopener noreferrer" className="text-[#AAAAAA] hover:text-[#FF5757] transition-colors duration-300">
                <FaFacebookF size={18} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#AAAAAA] hover:text-[#FF5757] transition-colors duration-300">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </aside>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-6 right-6 z-50 md:hidden bg-[#0a0a0b] p-2 rounded"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
        
        {/* Mobile menu */}
        <div className={`fixed inset-0 bg-[#0a0a0b] z-40 md:hidden flex flex-col justify-center items-center transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <nav className="flex flex-col gap-8 text-center">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-titleFont font-semibold text-white hover:text-[#FF5757] transition-colors">About</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-2xl font-titleFont font-semibold text-white hover:text-[#FF5757] transition-colors">Projects</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-2xl font-titleFont font-semibold text-white hover:text-[#FF5757] transition-colors">Contact</a>
          </nav>
          
          <div className="flex gap-6 mt-12">
            <a href="https://github.com/Felitech26" target="_blank" rel="noopener noreferrer" className="text-[#AAAAAA] hover:text-[#FF5757] transition-colors">
              <TbBrandGithub size={24} />
            </a>
            <a href="https://web.facebook.com/felix.abada.52" target="_blank" rel="noopener noreferrer" className="text-[#AAAAAA] hover:text-[#FF5757] transition-colors">
              <FaFacebookF size={22} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#AAAAAA] hover:text-[#FF5757] transition-colors">
              <FaLinkedinIn size={22} />
            </a>
          </div>
        </div>
        
        {/* Content */}
        <div className="md:pl-28">
          {/* Hero Section */}
          <section id="about" className="min-h-screen flex flex-col justify-center pt-20 pb-10 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-[#FF5757] font-medium mb-4">Hello, I'm</h3>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-titleFont font-bold mb-6">Felix Abada</h1>
                  <h2 className="text-2xl md:text-3xl text-[#dfdcdc] font-titleFont font-medium mb-8">Full Stack Developer</h2>
                  
                  <div className="space-y-4 max-w-lg mb-8">
                    <p className="text-[#DDDDDD] font-semibold">
                      I am a developer base in Ghana, driven by critical thinking and constant dedication.
                    </p>
                    <p className="text-[#DDDDDD] font-semibold ">
                      I have had the opportunity to shape my path with my passion for Web Development.
                    </p>
                  </div>
                  
                  <div className="flex gap-4 items-center mt-8">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5757] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF5757]"></span>
                    </span>
                    <span className="text-[#FF5757]">Available for work</span>
                  </div>
                  
                  <div className="mt-12">
                    <a 
                      href="//wa.me/233508591078" target='_blank'
                      className="inline-flex items-center gap-2 px-8 py-3 bg-[#FF5757] text-white font-medium rounded-full hover:bg-[#FF5757]/90 transition-all group"
                    >
                      Let's Connect
                      <IoLogoWhatsapp  className=" w-7 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative order-first lg:order-last"
                >
                  <div className="relative z-10">
                    <Image
                      src={profileImg}
                      alt="Felix Abada"
                      width={450}
                      height={450}
                      className="rounded-xl"
                    />
                    
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#FF5757] rounded-full -z-10"></div>
                    <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-[#FF5757] rounded-full -z-10"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Projects Section */}
          <section id="projects" className="py-20 px-6 md:px-16 bg-[#0e0e10]">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-titleFont font-bold">Featured Projects</h2>
                <div className="flex-1 h-0.5 bg-[#FF5757]/20"></div>
                <span className="text-[#FF5757] font-medium">02</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group"
                >
                  <a href="https://bev-couture.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative overflow-hidden rounded-xl mb-6">
                      <Image 
                        src={bev} 
                        alt="Bev Couture" 
                        width={600}
                        height={340}
                        className="w-full transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#FF5757]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    <h3 className="text-xl font-titleFont font-semibold group-hover:text-[#FF5757] transition-colors mb-3">Bev Couture</h3>
                    
                    <p className="text-[#AAAAAA] mb-4">
                      A fashion e-commerce platform with seamless shopping experience and elegant design.
                    </p>
                    
                    <div className="flex gap-3 flex-wrap">
                      <span className="px-3 py-1 text-sm rounded-full bg-[#FF5757]/10 text-[#FF5757]">Fashion</span>
                      <span className="px-3 py-1 text-sm rounded-full bg-[#FF5757]/10 text-[#FF5757]">Ecommerce</span>
                      <span className="px-3 py-1 text-sm rounded-full bg-[#FF5757]/10 text-[#FF5757]">Full Stack</span>
                    </div>
                  </a>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group"
                >
                  <a href="https://united-development-company.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative overflow-hidden rounded-xl mb-6">
                      <Image 
                        src={united} 
                        alt="United Development Company" 
                        width={600}
                        height={340}
                        className="w-full transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#FF5757]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    
                    <h3 className="text-xl font-titleFont font-semibold group-hover:text-[#FF5757] transition-colors mb-3">United Development Company</h3>
                    
                    <p className="text-[#AAAAAA] mb-4">
                      A professional real estate portfolio showcasing premier properties and development projects.
                    </p>
                    
                    <div className="flex gap-3 flex-wrap">
                      <span className="px-3 py-1 text-sm rounded-full bg-[#FF5757]/10 text-[#FF5757]">Real Estate</span>
                      <span className="px-3 py-1 text-sm rounded-full bg-[#FF5757]/10 text-[#FF5757]">Portfolio</span>
                      <span className="px-3 py-1 text-sm rounded-full bg-[#FF5757]/10 text-[#FF5757]">Front End</span>
                    </div>
                  </a>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Contact Section */}
          <section id="contact" className="py-20 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-16">
                <h2 className="text-3xl md:text-4xl font-titleFont font-bold">Get In Touch</h2>
                <div className="flex-1 h-0.5 bg-[#FF5757]/20"></div>
                <span className="text-[#FF5757] font-medium">03</span>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <p className="text-[#AAAAAA] text-center mb-12">
                  I'm currently open to new opportunities and collaborations. 
                  Whether you have a project in mind or just want to connect, feel free to reach out!
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <a 
                    href="mailto:felitech26@outlook.com" 
                    className="flex items-center justify-between p-6 rounded-xl border border-[#FF5757]/20 hover:border-[#FF5757] hover:bg-[#FF5757]/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <CiMail className="text-2xl text-[#FF5757]" />
                      <span className="text-[#DDDDDD]">Email Me</span>
                    </div>
                    <HiOutlineArrowNarrowRight className="text-[#FF5757] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </a>
                  
                  <a 
                    href="https://github.com/Felitech26" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 rounded-xl border border-[#FF5757]/20 hover:border-[#FF5757] hover:bg-[#FF5757]/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <TbBrandGithub className="text-2xl text-[#FF5757]" />
                      <span className="text-[#DDDDDD]">GitHub</span>
                    </div>
                    <HiOutlineArrowNarrowRight className="text-[#FF5757] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </a>
                  
                  <a 
                    href="https://web.facebook.com/felix.abada.52" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 rounded-xl border border-[#FF5757]/20 hover:border-[#FF5757] hover:bg-[#FF5757]/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <FaFacebookF className="text-2xl text-[#FF5757]" />
                      <span className="text-[#DDDDDD]">Facebook</span>
                    </div>
                    <HiOutlineArrowNarrowRight className="text-[#FF5757] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </a>
                  
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 rounded-xl border border-[#FF5757]/20 hover:border-[#FF5757] hover:bg-[#FF5757]/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <FaLinkedinIn className="text-2xl text-[#FF5757]" />
                      <span className="text-[#DDDDDD]">LinkedIn</span>
                    </div>
                    <HiOutlineArrowNarrowRight className="text-[#FF5757] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="py-8 px-6 md:px-16 border-t border-[#FF5757]/10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <p className="text-[#AAAAAA] text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Felix Abada. All rights reserved.
              </p>
              
              <p className="text-[#AAAAAA] text-sm">
                Built with <span className="text-[#FF5757]">♥</span> in Ghana
              </p>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}