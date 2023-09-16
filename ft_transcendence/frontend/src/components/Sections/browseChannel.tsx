// import { SocketProvider } from "@/components/socket_context";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
// import PrivateChannel from '../../../last_transcendance/src/components/channels/privateChannel';
import Channels from "./channels";
import ChatRoom from "../../components/Sections/chatRoom";
import Loading from "@/components/Sections/loading";
import { Channel, Owner, Users } from "./types/index";
import SmallButton from "../Button/smallButton";

const BrowseChannel = () => {
  const defaultStyle = {
    transition: "opacity 0.5s",
    opacity: 1,
  };

  const fadeOutStyle = {
    transition: "opacity 0.5s",
    opacity: 0,
  };

  const [back, setback] = useState(false);
  const [rooms, setRooms] = useState<Channel[]>([]);
  const [PublicRooms, setPublicRooms] = useState<Channel[]>([]);
  const [ProtectedRooms, setProtectedRooms] = useState<Channel[]>([]);
  const [isprivate, setPrivate] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [chat, setChat] = useState(false);
  const [channel, setChannel] = useState<Channel | undefined>();
  // const [joinedRooms, setJoinedRooms] = useState<JoinedRoom[]>([]);
  const [email, setUserEmail] = useState("");
  const [hide, setHide] = useState<boolean>(false);
  const [enterPass, setEnterPass] = useState(false);
  const [roomPass, setRoomPass] = useState("");
  const [entered, setEntered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [myRooms, setMyRooms] = useState<Channel[]>([]);
  const [error, setError] = useState("");
  //this is not a good way but yeah we should do this in sockets

  useEffect(() => {
    async function initialize() {
      await getUser();
      await getPublicChannels();
      await getProtectedChannels();
      await getAllRooms();

      setIsLoading(false);
    }
    initialize();
  }, []);

  function handleback() {
    setback(true);
  }

  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
      setPrivate(false);
      setEnterPass(false);
      setError("");
      setFadeOut(false);
    }, 500);
  };

  async function getAllRooms() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("http://localhost:9000/chat/my-rooms", {
        headers,
      });
      setMyRooms(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        // console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  async function joinPublicRoom(uid: string) {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const requestBody = {
        isGroup: true,
        conversationId: uid,
      };
      const res = await axios.post(
        "http://localhost:9000/chat/join-room",
        requestBody,
        { headers }
      );
      if (res.status === 201) {
        setHide(true);
        // console.log(res.data); // Assuming the backend sends the created room details
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        // console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  async function joinProtectRoom(channel: Channel) {
    try {
      // console.log("This is the channe:" , channel)
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const requestBody = {
        isProtected: true,
        conversationId: channel.uid,
        password: roomPass,
      };

      // console.log(roomPass)
      // console.log(requestBody)
      const res = await axios.post(
        "http://localhost:9000/chat/join-room",
        requestBody,
        { headers }
      );
      // console.log(res)

      if (res.status === 201) {
        setEnterPass(false);
        
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError("Invalid room password, try again!");
      } else {
        alert(e);
      }
    }
  }

  async function joinPrivate() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const requestBody = {
        isPrivate: true,
        roomKey: roomId,
      };

      const res = await axios.post(
        "http://localhost:9000/chat/join-room",
        requestBody,
        { headers }
      );
      if (res.status === 201) {
        setPrivate(false)
        setChat(true);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response?.data) console.log("Error status: ", e.response?.status);
        setError("Invalid room ID , try again!");
      } else {
        // setError(error);
      }
    }
  }

  async function handlePublicRoom(Channel: Channel) {
    await joinPublicRoom(Channel.uid);
  }

  async function handleProtectRoom(Channel: Channel | undefined) {
    if(Channel)
      await joinProtectRoom(Channel);

  }

  async function getPublicChannels() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("http://localhost:9000/chat/isGroup/all", {
        headers,
      });
      // console.log(res.data)
      setPublicRooms(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  async function getUser() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("http://localhost:9000/users/me", {
        headers,
      });
      setUserEmail(res.data.email);
      // console.log(email);
      // console.log(res.data.email);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        // console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  // function handleChat(Channel: Channel) {
  //   console.log("Hhia channel", Channel);
  //   setChannel(Channel);
  //   setChat(true);
  // }

  async function getProtectedChannels() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(
        "http://localhost:9000/chat/isProtected/all",
        { headers }
      );
      setProtectedRooms(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        // console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  function findRoom(channel: Channel) {
    return myRooms.some((room) => room.name === channel.name);
  }

  return back === true ? (
    <Channels />
  ) : chat && channel ? (
    <ChatRoom room={channel} />
  ) : (
    <>
      {
        <>
          {
            <div className="flex flex-col border-2 items-center justify-center gap-10 h-full  w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#3a0e6c33] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
              <div className="flex flex-col   h-[80%] w-[90%] gap-8">
                <div className="flex justify-between gap-10 w-full">
                  <button
                    className="hover:border-[#b564eb] hover:transition  w-[100px] border-[3px] border-opacity-40 border-violet-400 rounded-full "
                    onClick={handleback}
                  >
                    Back
                  </button>
                  <button
                    className="hover:border-[#b564eb] hover:transition  w-[200px] border-[3px] border-opacity-40 border-violet-400 rounded-full"
                    onClick={() => setPrivate(true) }
                  >
                    Join Private
                  </button>

                  {isprivate && (
                    <div
                      style={fadeOut ? fadeOutStyle : defaultStyle}
                      className="w-[300px] h-[300px]] absolute top-1/2 left-1/2 flex flex-col gap-5 transform -translate-x-1/2 -translate-y-1/2  border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]"
                    >
                      <button
                        onClick={handleDelete}
                        className="self-start bg-purple-500 m-3 text-white py-1 w-[40px] h-[40px] px-4 rounded-lg"
                      >
                        X
                      </button>
                      <div className="flex flex-col gap-7 items-center">
                        <h2>Enter the room ID:</h2>
                        <input
                          type="text"
                          className="bg-black/30 h-[20px] p-6 text-white mx-2"
                          onChange={(e) => setRoomId(e.target.value)}
                        ></input>
                      </div>
                      {error && (<div className="text-red-500 text-xs self-center">{error}</div>)}
                      <button
                        className="rounded-lg border-4 border-[#3b0764] w-[40%] self-center"
                        onClick={() => {joinPrivate(); }}
                      >
                        Enter
                      </button>
                    </div>
                  )}

                  {enterPass && (
                    <div
                      style={fadeOut ? fadeOutStyle : defaultStyle}
                      className="w-[300px] h-[300px]] absolute top-1/2 left-1/2 flex flex-col gap-5 transform -translate-x-1/2 -translate-y-1/2  border-opacity-10 border-violet-400 bg-opacity-1 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]"
                    >
                      <button
                        onClick={handleDelete}
                        className=" self-start bg-purple-500 m-3 text-white py-1 w-[40px] h-[40px] px-4 rounded-lg"
                      >
                        X
                      </button>
                      <div className="flex flex-col gap-7 items-center">
                        <h2>Enter the room ID:</h2>
                        <input
                          type="text"
                          className="bg-black/30 h-[20px] p-6 text-white mx-2"
                          onChange={(e) => setRoomPass(e.target.value)}
                        ></input>
                      </div>
                      {error && (<div className="text-red-500 text-xs self-center">{error}</div>)}
                      <button
                        className="rounded-lg border-4 border-[#3b0764] w-[40%] self-center"
                        onClick={() => {
                          handleProtectRoom(channel);
                         
                        }}
                      >
                        Enter
                      </button>
                    </div>
                  )}
                </div>
                <p>Public Channels:</p>
                <div className=" w-full p-4 h-[100%] overflow-scroll">
                  <div className="grid grid-cols6 gap-4">
                    {PublicRooms.map((ChannelName: Channel) =>
                      ChannelName.owner.email !== email ? (
                        findRoom(ChannelName) ? null : (
                          <div    
                            key={ChannelName.id}
                            className="bg-gradient-to-r  from-black to-purple-500 p-4 rounded-md text-white shadow-md"
                          >
                            <h3 className="text-xl font-semibold">
                              {ChannelName.name}
                            </h3>
                            <div className="self-end flex items-end justify-end">
                              {
                                <>
                                  <button
                                    className=" text-white border-4 border-black rounded-full 
                                            px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                                    onClick={() =>
                                      handlePublicRoom(ChannelName)
                                    }
                                  >
                                    Join
                                  </button>
                                </>
                              }
                            </div>
                          </div>
                        )
                      ) : null
                    )}
                  </div>
                </div>
                <div className=" w-full p-4 h-[100%] overflow-scroll">
                  <p>Protected Channels:</p>
                  <div className="grid grid-cols6 gap-4">
                    {ProtectedRooms.map((ChannelName: Channel) =>
                      ChannelName.owner.email !== email ? (
                        findRoom(ChannelName) ? null : (
                          <div
                            key={ChannelName.id}
                            className="bg-gradient-to-r from-black to-purple-500 p-4 rounded-md text-white shadow-md"
                          >
                            <h3 className="text-xl font-semibold">
                              {ChannelName.name}
                            </h3>
                            <div className="self-end flex items-end justify-end">
                              {
                                <>
                                  <button
                                    className=" text-white border-4 border-black rounded-full 
                                    px-4 py-2 mt-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                                    onClick={() => {
                                      setChannel(ChannelName);
                                      setEnterPass(true);
                                    }}
                                  >
                                    Join
                                  </button>
                                </>
                              }
                            </div>
                          </div>
                        )
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      }
    </>
  );
};

export default BrowseChannel;