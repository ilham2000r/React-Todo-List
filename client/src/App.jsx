import React from 'react'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <div className='bg-stone-900 grid py-4 min-h-screen'>
      <ToastContainer />
      <Home />
    </div>
  )
}

export default App