import React from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Home() {

	const navigate = useNavigate();

	const handleLogout = async (e)=>{
		e.preventDefault();

		console.log("call kar raha hu")

		const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, {
			withCredentials: true
		});

		console.log(result)
		
		alert(result.data.message);

		if(result.data.status){
			navigate("/")
		}

	}

  return (
    <div className='h-screen bg-[#212121] text-white'>
	<button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home