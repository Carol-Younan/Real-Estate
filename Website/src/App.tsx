import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css'
import Nav from './Nav';
import Home from './Home';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element= {<Home/>} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
