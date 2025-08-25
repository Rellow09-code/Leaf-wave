import './App.css'
import Home from './Home'
import SignIn from './pages/SignIn'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element= {<SignIn />} />
        <Route path='/Register' element={<Register></Register>}></Route>
      </Routes>
    </>
  )
}

export default App
