import React from 'react';
import { Link } from 'react-router-dom';
import PillaiName from '../../assets/Intopage/PillaiName.jpeg';
import PillaiLogo from '../../assets/Intopage/PillaiLogo.webp';
import Carousel from './Carousel';
import WhyChooseUs from './WhyChooseUs';
import WeUnderstandStudent from './WeUnderstandStudent';
import StudentSaysAboutUs from './StudentSaysAboutUs';
import Contact from './contact';

const Navbar = () => {
  return (
    <>
      <div className="sticky bg-gray-100">
        <div className="flex items-center h-16 w-full text-black font-montserrat font-medium">
          <img src={PillaiName} alt="Pillai Logo" className="h-12 ml-5" />
          <img src={PillaiLogo} alt="MES Logo" className="h-12 ml-5" />
          <div>
            <button>
            <span className="material-symbols-outlined text-4xl  ml-2 md:hidden ">
              menu
            </span>
            </button>
          </div>
          <ul className="flex list-none mx-auto p-0">
            <li className="md:mx-9 md:text-sm hidden md:block">
              <a href="#" className="text-black font-bold hover:bg-orange-400 rounded-full p-1  hover:text-white no-underline" alt="Home">Home</a>
            </li>
            <li className="md:mx-6 md:text-sm hidden md:block">
              <a href="#" className="text-black font-bold hover:bg-orange-400 rounded-full p-1  hover:text-white no-underline" alt="Reasons to choose us">Why WE</a>
            </li>

            <li className="md:mx-6 md:text-sm hidden md:block">
              <a href="#" className="text-black font-bold hover:bg-orange-400 rounded-full p-1  hover:text-white no-underline" alt="What students say">About us </a>
            </li>
            <li className="md:mx-6 md:text-sm hidden md:block">
              <a href="#" className="text-black font-bold hover:bg-orange-400 rounded-full p-1  hover:text-white no-underline" alt="Contact us">Contact us</a>
            </li>
          </ul>
          <Link to='/features' >
            <button className="mr-5 sm:px-5 sm:py-2 px-3 py-1  bg-[#292F5C]  text-white border-none rounded cursor-pointer text-base flex items-center">
              Get Started <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </Link>
        </div>
      </div>
       <div>
        <Carousel />
      </div>
    <div>
        <WhyChooseUs />
      </div>
       <div>
        <WeUnderstandStudent />
      </div>
      <div>
        <StudentSaysAboutUs />
      </div>
      <div>
        <Contact />
      </div>
    </>
  );
};

export default Navbar;
