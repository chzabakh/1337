import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState, useTransition } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import Channels from './channels';
import BrowseChannel from "@/components/Sections/browseChannel";
import Loading from "./loading";

import Image from "next/image";
import pong from "../../../public/pong.png";
import Avatar from "@/components/avatar";
import { io, Socket } from "socket.io-client";
import crone from "../../../public/crone.png";
import {
  ChatRoomProps,
  Message,
  User,
  ChatRoom,
} from "@/components/Sections/types/index";
import Channels from "@/components/Sections/channels";
import { useSocket } from "../socket_context";

const ChatRoom: React.FC<ChatRoomProps> = ({ room }) => {
  const optionsMember = [
    "Ban",
    "Mute",
    "Kick",
    "Invite to Game",
    "Set as Admin",
  ];

  const optionsMemberAdmin = [
    "Ban",
    "Mute",
    "Kick",
    "Invite to Game",
    "Remove Admin",
  ];

  const optionRegularUsers = ["Invite to Game"];

  const optionsChannel = ["Add password"];

  const ITEM_HEIGHT = 30;

  const [rooms, setRooms] = useState([]);
  const [image, setImage] = useState<(string | undefined)[]>([]);
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [back, setBack] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [details, setDetails] = useState<ChatRoom | null>(null);
  const [roomId, setRoomId] = useState("");
  const [windowPass, setWindowPass] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [Otherdialog, setOtherDialog] = useState(false);
  const { socket } = useSocket();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const defaultStyle = {
    transition: "opacity 0.5s",
    opacity: 1,
  };

  const fadeOutStyle = {
    transition: "opacity 0.5s",
    opacity: 0,
  };

  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
      setDialog(false);
      setFadeOut(false);
    }, 500);
  };

  const handleDeleteRemove = () => {
    setFadeOut(true);
    setTimeout(() => {
      setOtherDialog(false);
      setFadeOut(false);
    }, 500);
  };

  const messageRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);

  const scrollDown = () => {
    if (messageRef.current)
      messageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollDown();
  }, [chatMessages]);

  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null
  );
  const openIt = Boolean(anchorElement);

  const handleClickChannel = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseChannel = () => {
    setAnchorElement(null);
    // console.log(rooms);
  };

  async function handleBane(id: number) {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      let requestBody;

      requestBody = {
        conversationId: room.uid,
        targetUser: id,
      };
      const res = await axios.post(
        "http://localhost:9000/chat/ban",
        requestBody,
        { headers }
      );
      if (res.status === 201) {
        alert("it is banned");
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

  async function handleMute(id: number) {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      let requestBody;

      requestBody = {
        conversationId: room.uid,
        targetUser: id,
      };
      const res = await axios.post(
        "http://localhost:9000/chat/mute",
        requestBody,
        { headers }
      );
      console.log(res.data);
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

  async function handleKick(id: number) {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      let requestBody;

      requestBody = {
        conversationId: room.uid,
        targetUser: id,
      };
      const res = await axios.post(
        "http://localhost:9000/chat/kick",
        requestBody,
        { headers }
      );
      if (res.status === 201) {
        alert("kicked");
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

  async function handleRemoveAdmin(id: number) {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const requestBody = {
        updatedUser: id,
        conversationId: room.uid,
      };
      const res = await axios.post(
        "http://localhost:9000/chat/removeAdmin",
        requestBody,
        { headers }
      );
      if (res.status === 201) {
        setOtherDialog(true);
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

  async function handleAdmin(id: number) {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const requestBody = {
        updatedUser: id,
        conversationId: room.uid,
      };
      const res = await axios.post(
        "http://localhost:9000/chat/setadmin",
        requestBody,
        { headers }
      );
      if (res.status === 201) {
        setDialog(true);
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

  async function handlePassword() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const requestBody = {
        password: roomId,
        conversationId: room.uid,
      };
      const res = await axios.post(
        "http://localhost:9000/chat/channel/set-password",
        requestBody,
        { headers }
      );
      setWindowPass(false);
      if (res.status === 201) {
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

  const handleSendInvite = (friendID: number, friendNickname: string) => {
    socket?.emit("send-invite", {
      recipientId: friendID,
      sender: friendNickname,
    });
    setAnchorEl(null);
  };

  const handleOptions = (option: string, id: number) => {
    switch (option) {
      case "Ban":
        handleBane(id);
        setAnchorEl(null);
        break;
      case "Mute":
        handleMute(id);
        setAnchorEl(null);
        break;
      case "Kick":
        handleKick(id);
        setAnchorEl(null);
        break;
      case "Invite to Game":
        handleSendInvite(id, nickname);
        setAnchorEl(null);
        break;

      case "Set as Admin":
        handleAdmin(id);
        setAnchorEl(null);
        break;
      case "Remove Admin":
        handleRemoveAdmin(id);
        setAnchorEl(null);
        break;
    }
  };

  const [chatSocket, setChatSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:9000/chat");
    setChatSocket(socket);

    const conversationId = room.uid;

    socket?.emit("joinRoom", { conversationId });

    return () => {
      socket?.off("joinRoom");
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatSocket) {
      const newMessageHandler = (message: Message) => {
        // console.log(message);
        setChatMessages((cur) => [...cur, message]);
      };

      chatSocket.on("message:new", newMessageHandler);
      return () => {
        chatSocket.off("message:new");
      };
    }
  }, [chatSocket]);

  const handleOptionsChannel = (option: string) => {
    switch (option) {
      case "Add password":
        setWindowPass(true);
        break;
    }
  };

  useEffect(() => {
    async function fetchAvatars() {
      const getImages = users.map(async (user) => {
        const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `http://localhost:9000/users/${user.id}/avatar`,
          { headers, responseType: "blob" }
        );
        if (user.provider === "email") {
          return URL.createObjectURL(response.data);
        }
        return user.avatarUrl;
      });

      const images = await Promise.all(getImages);
      setImage(images);
    }

    fetchAvatars();
  }, [users]);

  useEffect(() => {
    async function initialize() {
      await getAllRooms();
      await getDetails();
      await getUser();
      setIsLoading(false);
    }
    initialize();
  }, []);

  function handleCopy() {
    if (keyRef.current) {
      const text = keyRef.current.textContent;
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(text!)
          .then(() => {
            alert(text);
            // console.log("Text copied to clipboard");
          })
          .catch((error) => {
            console.error("Failed to copy text: ", error);
          });
      }
    }
  }

  async function handleChat() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const requestBody = {
        message: message,
        RoomId: room.uid,
      };
      // console.log(message + " " + room.uid);
      const res = await axios.post(
        "http://localhost:9000/chat/send-message",
        requestBody,
        { headers }
      );
      if (res.status === 201) {
        // setMessage('')
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

  async function getDetails() {
    try {
      const token = Cookies.get("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log(room.uid);
      const res: AxiosResponse<ChatRoom> = await axios.get(
        `http://localhost:9000/chat/channel/${room.uid}/details`,
        config
      );
      if (res.status === 200) {
        setDetails(res.data);
        setUsers(res.data.users);
        setChatMessages(res.data.messages);
        // console.log(res); // Assuming the backend sends the created room details
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

  async function getUser() {
    try {
      const token = Cookies.get("token");

      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("http://localhost:9000/users/me", {
        headers,
      });
      if (res.status === 200) {
        setNickname(res.data.nickname);
        // console.log(nickname);
        // console.log(res); // Assuming the backend sends the created room details
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

  async function getAllRooms() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("http://localhost:9000/chat/my-rooms", {
        headers,
      });
      setRooms(res.data);
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

  function isAdmin() {
    return details?.admins.some((admin) => nickname === admin.nickname);
  }

  function isUserAdmin(user: User) {
    return details?.admins.some((admin) => admin.nickname === user.nickname);
  }

  if (isLoading) {
    return <Loading />;
  }

  return back ? (
    <Channels />
  ) : (
    <>
      <div className="absolute top-0 z-2 flex justify-evenly border-2 rounded-3xl  border-opacity-30 w-[99.9%] h-full  border-violet-400  bg-[#571d86]  bg-blur-md backdrop-filter backdrop-blur-md p-4">
        <div className="w-[40%] flex flex-col h-full  gap-10">
          <div className="flex flex-col h-[60%] items-center gap-5">
            <button
              className="hover:border-[#b564eb] hover:transition  w-[50%] border-[3px] border-opacity-40 border-violet-400 rounded-full "
              onClick={() => setBack(true)}
            >
              Back
            </button>
            <div>
              {details?.isPrivate ? (
                <div className="flex flex-col jsutify-center">
                  Channel key :{" "}
                  <div
                    onClick={handleCopy}
                    ref={keyRef}
                    className="m-3 cursor-pointer"
                  >
                    {details.isPrivateKey}{" "}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="h-full mt-2 flex flex-col ">
            <div className="flex flex-col gap-3  h-[90%] w-full ">
              <div className="text-lg self-center">Group members:</div>

              <div className="flex gap-4 flex-col h-full ">
                <div className="flex flex-col gap-1 w-full h-full items-center overflow-scroll">
                  {users.map((user, index) => (
                    <div className="w-full  md:flex-row flex-col-reverse flex p-3  bg-[#3c005a] rounded-lg">
                      <div className="flex-1 w-[50%]">
                        {user.provider === "intra" &&
                        user.isChanged === false ? (
                          <>
                            <Image
                              key={index}
                              src={user.avatarUrl || "/place.png"}
                              alt={details!.owner.avatarUrl}
                              height={80}
                              width={80}
                              className="rounded-full max-w-[50px] max-h-[50px] relative "
                            />
                          </>
                        ) : (
                          <div className="border-1 w-[50px] h-[50px] z-3">
                            <Avatar currentUser={user} />
                          </div>
                        )}

                        <div className="relative">
                          {user.state === "online" && (
                            <div className="bg-green-500 w-2 h-2 rounded-full absolute md:left-10 md:bottom-1 sm:left-0 sm:bottom-auto"></div>
                          )}
                          {user.state === "offline" && (
                            <div className="bg-gray-500 w-2 h-2 rounded-full absolute md:left-10 md:bottom-1 sm:left-0 sm:bottom-auto"></div>
                          )}
                          {user.email === details?.owner.email && (
                            <div className="absolute left-4 bottom-10 hidden sm:block ">
                              <Image
                                src={crone}
                                width={20}
                                height={20}
                                alt="crone"
                              />
                            </div>
                          )}
                          {user.state === "playing" && (
                            <div className="absolute left-4 bottom-10">
                              <Image
                                src={pong}
                                width={20}
                                height={20}
                                alt="crone"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 w-[50%] pt-3 ">
                        {isUserAdmin(user) ? (
                          <div className="text-yellow-400">{user.nickname}</div>
                        ) : (
                          <div className="text-purple-400">{user.nickname}</div>
                        )}
                      </div>

                      <div className="flex md:flex-row flex-col  justify-end  w-[50%] self-end">
                        {!isAdmin() ? (
                          nickname === user.nickname ? null : (
                            <>
                              <IconButton
                                style={{ color: "white" }}
                                aria-label="more-again"
                                id="long-button-channel"
                                aria-controls={
                                  open ? "long-menu-channel" : undefined
                                }
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                              >
                                <MoreHorizIcon />
                              </IconButton>
                              <Menu
                                id="long-menu-channel"
                                MenuListProps={{
                                  "aria-labelledby": "long-button-channel",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: "20ch",
                                    backgroundColor: "#3c005a",
                                    color: "white",
                                  },
                                }}
                              >
                                {optionRegularUsers.map((optiontwo, index) => (
                                  <MenuItem
                                    key={index}
                                    onClick={() => {
                                      handleOptions(optiontwo, user.id);
                                    }}
                                  >
                                    {optiontwo}
                                  </MenuItem>
                                ))}
                              </Menu>
                            </>
                          )
                        ) : isAdmin() ? (
                          nickname === user.nickname ? null : (
                            <>
                              <IconButton
                                style={{ color: "white" }}
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? "long-menu" : undefined}
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                                className="bg-white"
                              >
                                <MoreHorizIcon />
                              </IconButton>
                              <Menu
                                id="long-menu"
                                MenuListProps={{
                                  "aria-labelledby": "long-button",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: "20ch",
                                    backgroundColor: "#3c005a",
                                    color: "white",
                                    // useTransition: '2sec'
                                  },
                                }}
                              >
                                {!isUserAdmin(user) ? (
                                  <div>
                                    {optionsMember.map((option) => (
                                      <MenuItem
                                        key={option}
                                        onClick={() =>
                                          handleOptions(option, user.id)
                                        }
                                      >
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </div>
                                ) : (
                                  <div>
                                    {optionsMemberAdmin.map((option) => (
                                      <MenuItem
                                        key={option}
                                        onClick={() =>
                                          handleOptions(option, user.id)
                                        }
                                      >
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </div>
                                )}
                              </Menu>
                            </>
                          )
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-opacity-30 border-violet-400 h-full my-0 mr-5 w-[1px] "></div>
        <div className="flex flex-col w-[60%]">
          <div className="flex flex-col  p-0 m-0 justify-start w-full h-full pt-">
            <div className="flex flex-row justify-between">
              <div className="self-center w-[60%] font-bold text-xl  flex felx-row justify-end">
                {details?.name}
              </div>
              {details?.isGroup === true ? (
                isAdmin() ? (
                  <>
                    <IconButton
                      style={{ color: "white" }}
                      aria-label="more-again"
                      id="long-button-channel"
                      aria-controls={openIt ? "long-menu-channel" : undefined}
                      aria-expanded={openIt ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClickChannel}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                    <Menu
                      id="long-menu-channel"
                      MenuListProps={{
                        "aria-labelledby": "long-button-channel",
                      }}
                      anchorEl={anchorElement}
                      open={openIt}
                      onClose={handleCloseChannel}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                          backgroundColor: "#3c005a",
                          color: "white",
                        },
                      }}
                    >
                      {optionsChannel.map((optionTwo, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => handleOptionsChannel(optionTwo)}
                        >
                          {optionTwo}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : null
              ) : null}
            </div>

            <div className="mb-16 overflow-auto" />
            <div className=" mb-16 flex-col flex overflow-y-auto max-h-[400px]">
              {chatMessages.map((msg, index) =>
                nickname === msg.sender.nickname ? (
                  <>
                    <div className="flex self-end gap-2 ">
                      <div>
                        <div
                          key={index}
                          className="max-w-[300px] p-[10px] m-[5px] bg-purple-500 rounded-[50px] self-end break-words "
                        >
                          <div className="flex flex-col ">{msg.content}</div>
                        </div>
                      </div>

                      <div>
                        {msg.sender.provider === "intra" &&
                        msg.sender.isChanged === false ? (
                          <>
                            <Image
                              src={msg.sender.avatarUrl || "/place.png"}
                              alt={details!.owner.avatarUrl}
                              height={50}
                              width={50}
                              className="rounded-full max-w-[50px] max-h-[50px]"
                            />
                          </>
                        ) : (
                          <>
                            <Avatar currentUser={msg.sender} />
                          </>
                        )}
                        <div className="text-xs opacity-[0.3] self-start">
                          {" "}
                          {msg.createdAt?.slice(11, 16)}
                        </div>
                      </div>
                      <div key={index} ref={messageRef}></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex self-start gap-2">
                      <div>
                        {msg.sender.provider === "intra" &&
                        msg.sender.isChanged === false ? (
                          <>
                            <Image
                              src={msg.sender.avatarUrl || "/place.png"}
                              alt={details!.owner.avatarUrl}
                              height={50}
                              width={50}
                              className="rounded-full max-w-[50px] max-h-[50px]"
                            />
                          </>
                        ) : (
                          <>
                            <Avatar currentUser={msg.sender} />
                          </>
                        )}
                      </div>
                      <div>
                        <div
                          key={index}
                          ref={messageRef}
                          className="max-w-[300px] p-[10px] m-[5px] bg-purple-400 rounded-[50px] self-start break-words"
                        >
                          <div>{msg.content}</div>
                        </div>
                        <div className="text-xs opacity-[0.3] self-start">
                          {" "}
                          {msg.createdAt?.slice(11, 16)}
                        </div>
                      </div>
                    </div>
                  </>
                )
              )}
            </div>
          </div>
          <div className="flex bottom-4 w-full border border-opacity-30  border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md rounded-[15px]">
            <input
              className="w-[100%] bg-transparent pl-3 py-4 focus:outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleChat();
                  setMessage(""); // clear only if Enter is pressed
                }
              }}
              type="text"
              value={message}
              placeholder="Type Message.."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              // onChange={handleChange}
              // value={input}
            />
            <button
              onClick={() => {
                handleChat();
                setMessage("");
              }}
            >
              <svg
                className="text-white m-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="10" y1="14" x2="21" y2="3" />
                <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
              </svg>
            </button>
          </div>
        </div>
        {windowPass && (
          <div
            style={fadeOut ? fadeOutStyle : defaultStyle}
            className="w-[300px] h-[300px]] absolute top-1/2 left-1/2 flex flex-col gap-5 transform -translate-x-1/2 -translate-y-1/2  border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]"
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
                onChange={(e) => setRoomId(e.target.value)}
              ></input>
            </div>
            <button
              className="rounded-lg border-4 border-[#3b0764] w-[40%] self-center"
              onClick={handlePassword}
            >
              Enter
            </button>
          </div>
        )}

        {dialog ? (
          <>
            <div
              style={fadeOut ? fadeOutStyle : defaultStyle}
              className="w-[300px] h-[200px] absolute top-1/2 left-1/2 flex flex-col gap-5 transform -translate-x-1/2 -translate-y-1/2  border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]"
            >
              <button
                onClick={handleDelete}
                className=" self-start bg-purple-500 m-3 text-white py-1 w-[40px] h-[40px] px-4 rounded-lg"
              >
                X
              </button>
              <div className="flex flex-col items-center m-4">
                A new Admin is Added!
              </div>
            </div>
          </>
        ) : null}
        {Otherdialog ? (
          <>
            <div
              style={fadeOut ? fadeOutStyle : defaultStyle}
              className="w-[300px] h-[200px] absolute top-1/2 left-1/2 flex flex-col gap-5 transform -translate-x-1/2 -translate-y-1/2  border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]"
            >
              <button
                onClick={handleDeleteRemove}
                className=" self-start bg-purple-500 m-3 text-white py-1 w-[40px] h-[40px] px-4 rounded-lg"
              >
                X
              </button>
              <div className="flex flex-col items-center m-4">
                The admin is removed!
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ChatRoom;
