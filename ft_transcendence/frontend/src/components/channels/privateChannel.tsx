import axios from 'axios';
import Cookies from 'js-cookie';
import React, { ChangeEvent, useState } from 'react'
import Select ,  { ActionMeta, MultiValue } from "react-select";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    outline: 'none',
    color: 'white',
    border: 'none',
    boxShadow: '#800080',
    borderRadius: '29px',
    background: 'transparent', 
  }),
  option: (provided: any) => ({
    ...provided,
    color: 'rgba(0, 0, 0, 43)',
    backgroundColor: 'white'
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'black',
    opacity: '60%'
  }),
};

interface Friend {
  value: number;
  label: string;
}


const PrivateChannel = () => {
  const [roomName, setRoomName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Friend[] | null>(null);



  async function handleSubmit()
  {
    if (roomName) {
      try {
        const token = Cookies.get('token');
        const headers = { Authorization: `Bearer ${token}` };
        

        const requestBody = {
          isPrivate: true,
          name: roomName,
        };

        const response = await axios.post('http://localhost:9000/chat/createroom/', requestBody, { headers });

        if (response.status === 201) {
          alert('Room Created');
          setRoomName('')
        } else {
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

  //get friends from charaf
  
  function handleName(e : ChangeEvent<HTMLInputElement>)
  {
    setRoomName(e.target.value);
  }

 
  return (
    <>
     
    <label htmlFor="roomName" className="block mb-2 text-sm font-medium text-white dark:text-white"> Channel name:</label>


    <input type="text"  className="focus:border-none outline-none  border-gray-300 text-white/60 text-sm rounded-lg p-3 w-full bg-black/40" onChange={handleName} placeholder="Enter name..." value={roomName} required></input>


    <button className="border-opacity-40 border-violet-400 hover:border-[#b564eb]
  border-[3px] p-2 rounded-full w-[200px] self-center text-xs " onClick={handleSubmit}>Create Private Channel</button>
    </>

  )
}

export default PrivateChannel;