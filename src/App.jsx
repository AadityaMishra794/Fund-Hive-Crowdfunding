import { useState } from 'react'
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import { Web3Provider } from './hooks/web3Context';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Web3Provider>
      <Header/>
     

        <Routes>
          <Route path='' element={<Home/>}/>
        </Routes>
        <Footer/>
    

    
    </Web3Provider>
  )
}

export default App
