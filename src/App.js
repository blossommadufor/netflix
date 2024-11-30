import React from 'react'
import Home from './Pages/Home/Home'
import {BrowserRouter as Router, Route,} from 'react-router-dom'
import Login from './Pages/Login/Login'

const App = () => {
  return (
    <div>
      <Router>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Router>
        
    </div>
  )
}

export default App
