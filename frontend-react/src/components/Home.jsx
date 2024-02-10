import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Hero from './Hero'

function Home() {
    const status = useSelector(state => state.status)
    const navigate = useNavigate()
  return status?(
    <div>
      
      <Hero />
    </div>
  ):(<p className='text-green-600 text-center mt-24'>Pls login <button className='bg-green-400 text-white p-2 rounded-md' onClick={()=>navigate("/login")}>LOGIN</button></p>)
}

export default Home