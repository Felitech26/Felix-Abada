import  { TbBrandGithub } from "react-icons/tb";
import  { SlSocialYoutube } from "react-icons/sl";
import {
  SlSocialLinkedin,
  SlSocialFacebook,
  SlSocialInstagram,
} from "react-icons/sl";

const LeftSide = () => {
  return (
    <div className="w-[250px] h-[50px] sml:mt-0 flex justify-center items-center bg-[#111010] rounded-xl">
        <div className="w-full h-full flex justify-center items-center gap-4
     text-textLight">
      <div className="flex justify-center items-center gap-4">
        <a href="https://github.com/Felitech26" target="_blank">
          <span className="w-6 h-6 text-lg rounded-full inline-flex
         items-center justify-center hover:text-textGreen cursor-pointer
         transition-all duration-300">
            <TbBrandGithub />
          </span>
        </a>
        <a href="https://www.youtube.com/" target="_blank">
          <span className="w-6 h-6 text-lg rounded-full inline-flex
         items-center justify-center hover:text-textGreen cursor-pointer
         transition-all duration-300">
            <SlSocialYoutube />
          </span>
        </a>

        <a href="https://github.com/Felitech26" target="_blank">
          <span className="w-6 h-6 text-lg rounded-full inline-flex
         items-center justify-center hover:text-textGreen cursor-pointer
         transition-all duration-300">
            <SlSocialLinkedin />
          </span>
        </a>

        <a href="https://web.facebook.com/felix.abada.52" target="_blank">
          <span className="w-6 h-6 text-lg rounded-full inline-flex
         items-center justify-center hover:text-textGreen cursor-pointer
         transition-all duration-300">
            <SlSocialFacebook />
          </span>
        </a>

        <a href="https://github.com/Felitech26" target="_blank">
          <span className="w-6 h-6 text-lg rounded-full inline-flex
         items-center justify-center hover:text-textGreen cursor-pointer
         transition-all duration-300">
            <SlSocialInstagram />
          </span>
        </a>
    </div>
   </div>
    </div>
   
  );
};

export default LeftSide;