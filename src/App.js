import React from 'react'
import Home from './Pages/Home/Home'
import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom'
import Login from './Pages/Login/Login'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
        
    </div>
  )
}

export default App
