import React from 'react';
import LandPageIntro from './LandingPage/LandPageIntro';
import Footer from './LandingPage/Footer';

const LandingPage = () => {
  return (
    <div className='flex z-30 absolute top-0 left-0  flex-col w-full'>
      <LandPageIntro/>
      <Footer/>
    </div>
  )
}

export default LandingPage;