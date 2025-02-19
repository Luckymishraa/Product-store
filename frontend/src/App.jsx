import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CreateProduct from './pages/CreatePage'
import { ToastContainer } from 'react-toastify'
import './App.css'

function App() {

  return (
    <>
     <div >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreateProduct/>} />
      </Routes>
      <ToastContainer />

     </div>
    </>
  )
}

export default App
