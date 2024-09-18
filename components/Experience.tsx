import SectionTitle from "./SectionTitle";
import ReactBD from "./works/ReactBD";
import Google from "./works/Google";
import Apple from "./works/Apple";
import Splash from "./works/Splash";
import Amazon from "./works/Amazon";
import { useState } from "react";



const Experience = () => {
  const [workReactbd, sectionReactbd] = useState(true);
  const [workGoogle, sectionGoogle] = useState(false);
  const [workApple, sectionApple] = useState(false);
  const [workSplash, sectionSplash] = useState(false);
  const [workAmazon, sectionAmazon] = useState(false);

  const handleReactdb = () => {
    setWorkReactdb(true);
    setWorkGoogle(false);
    setWorkApple(false);
    setWorkSplash(false);
    setWorkAmazon(false);
  };

  const handleGoogle = () => {
    setWorkReactdb(false);
    setWorkGoogle(true);
    setWorkApple(false);
    setWorkSplash(false);
    setWorkAmazon(false);
  };

  const handleApple = () => {
    setWorkReactdb(false);
    setWorkGoogle(false);
    setWorkApple(true);
    setWorkSplash(false);
    setWorkAmazon(false);
  };

  const handleSplash = () => {
    setWorkReactdb(false);
    setWorkGoogle(false);
    setWorkApple(false);
    setWorkSplash(true);
    setWorkAmazon(false);
  };

  const handleAmazon = () => {
    setWorkReactdb(false);
    setWorkGoogle(false);
    setWorkApple(false);
    setWorkSplash(false);
    setWorkAmazon(true);
  };
  return (
    <section
      id="experience"
      className="max-w-containerxs mx-auto py-10 lgl:py-24 px-4"
    >
      <SectionTitle title="Where I have Worked" titleNo="02" />
      <div className="w-full mt-10 flex flex-col md:flex-row gap-16">
        <ul className="md:w-32 flex flex-col">
          <li
            onClick={handleReactdb}
            className="border-l-2 border-l-hoverColor text-textDark bg-transparent
hover:bg-[#112240] py-3 text-sm cursor-pointer duration-300
 px-8 font-medium"
          >
            ReactBD
          </li>

          <li
            onClick={handleGoogle}
            className="border-l-2 border-l-hoverColor text-textDark bg-transparent
hover:bg-[#112240] py-3 text-sm cursor-pointer duration-300
 px-8 font-medium"
          >
            Google
          </li>

          <li
            onClick={handleApple}
            className="border-l-2 border-l-hoverColor text-textDark bg-transparent
hover:bg-[#112240] py-3 text-sm cursor-pointer duration-300
 px-8 font-medium"
          >
            Apple
          </li>

          <li
            onClick={handleSplash}
            className="border-l-2 border-l-hoverColor text-textDark bg-transparent
hover:bg-[#112240] py-3 text-sm cursor-pointer duration-300
 px-8 font-medium"
          >
            Splash
          </li>

          <li
            onClick={handleAmazon}
            className="border-l-2 border-l-hoverColor text-textDark bg-transparent
hover:bg-[#112240] py-3 text-sm cursor-pointer duration-300
 px-8 font-medium"
          >
            Amazon
          </li>
        </ul>
        {workReactbd && <ReactBD />}
        {workGoogle && <Google />}
        {workApple && <Apple />}
        {workSplash && <Splash />}
        {workAmazon && <Amazon />}
      </div>
    </section>
  );
};

export default Experience;
