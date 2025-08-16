import './App.css'
import Home from './Home'
import SignIn from './components/SignIn'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element= {<SignIn />} />
      </Routes>
    </>
  )
}

export default App
