'use client'
import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react'
import { useState , ChangeEvent} from 'react'

const PublicChannel = () => {

  const [roomName, setChannelName] = useState("");

  function handleName(e : ChangeEvent<HTMLInputElement>)
  {
    setChannelName(e.target.value);
  }

  async function handleSubmit()
  {
    if (roomName) {
      try {
        const token = Cookies.get('token');
        const headers = { Authorization: `Bearer ${token}` };
        

        const requestBody = {
          isGroup: true,
          name: roomName,
        };

        const response = await axios.post('http://localhost:9000/chat/createroom/', requestBody, { headers });

        if (response.status === 201) {
          setChannelName('')   
        } else {
          setChannelName('')
          alert('Failed to create room');
        }
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
          const error = err.response.data.message || err.message;
          alert(error);
        } else {
          
          alert(err.message);
        }
      }
    }
  }
  
  return (
    <>
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-white dark:text-white">Channel name:</label>
    <input type="text" id="name" className="focus:border-none outline-none  border-gray-300 text-white/60 text-sm rounded-lg p-3 w-full bg-black/40" placeholder="Enter name..." value={roomName} onChange={handleName}  required>
    </input>
    <button className="border-opacity-40 border-violet-400 hover:border-[#b564eb]
  border-[3px] p-2 rounded-full w-[200px] self-center text-xs " onClick={handleSubmit} >Create Public Channel</button></>
  )
}

export default PublicChannel