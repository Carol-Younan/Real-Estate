import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css'
import Nav from './Nav';
import Home from './Home';
import Footer from './Footer';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element= {<Home/>} />

      </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  )
}

export default App
