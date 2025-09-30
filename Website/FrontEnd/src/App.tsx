import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css'
import Nav from './Nav';
import Home from './HomePage/Home';
import { useRef } from 'react';
import About from './AboutPage/About';
import Footer from './Footer';
import Career from './CareerPage/Career';
import Categories from './ProjectPage/Categories';
import Project from './ProjectPage/ProjectsOfCat';
import CareerApply from './CareerPage/CareerApply';
import ScrollToTop from './ScrollToTop';

function App() {
  const footerRef = useRef<HTMLDivElement>(null);
  // const topRef = useRef<HTMLDivElement>(null); 

    const handleContactClick = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const handleHomeClick = ()=>{
  //   topRef.current?.scrollIntoView({behavior:"smooth"});
  // }


  return (
    <>
    {/* <div ref={topRef}></div> */}
    <BrowserRouter>
      <ScrollToTop/>
      <Nav onContactClick={handleContactClick} />
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/about' element= {<About/>} />
        <Route path='/career' element= {<Career/>} />
        <Route path="/career/apply" element={<CareerApply />} />
        <Route path='/projects' element= {<Categories/>} />
        <Route path="/projects/:categoryName" element={<Project />} />
      </Routes>
    </BrowserRouter>
    <Footer ref={footerRef} />
    </>
  )
}

export default App
