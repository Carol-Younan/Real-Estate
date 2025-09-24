import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css'
import Nav from './Nav';
import Home from './Home';
import { useRef } from 'react';
import Footer from './Footer';

function App() {
  const footerRef = useRef<HTMLDivElement>(null);

    const handleContactClick = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <BrowserRouter>
      <Nav onContactClick={handleContactClick}/>
      <Routes>
        <Route path='/' element= {<Home/>} />

      </Routes>
    </BrowserRouter>
    <Footer ref={footerRef} />
    </>
  )
}

export default App
