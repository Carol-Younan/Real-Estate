import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css'
import Nav from './Nav';
import Home from './HomePage/Home';
import { useRef } from 'react';
import About from './About';
import Footer from './Footer';
import Career from './CareerPage/Career';

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
      <Nav onContactClick={handleContactClick} />
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/about' element= {<About/>} />
        <Route path='/career' element= {<Career/>} />
      </Routes>
    </BrowserRouter>
    <Footer ref={footerRef} />
    </>
  )
}

export default App
