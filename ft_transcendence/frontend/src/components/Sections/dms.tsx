import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { Blockedpoeple, Chat } from "./findAFriend";
import { HiRocketLaunch, HiUser } from "react-icons/hi2";
import Avatar from "../avatar";
import PublicAvatar from "../FriendAvatar";
import { useSocket } from "../socket_context";

interface userData {
  matches: string;
  wins: string;
  loses: string;
}

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  FirstLogin: boolean;
  TwofaAutEnabled: boolean;
  TwofaAutSecret: string | null;
  avatarUrl: string;
  email: string;
  friendStatus: string;
  hash: string;
  nickname: string;
  provider: string;
  state: string;
  isChanged: boolean;
}

interface Seen {
  FirstLogin: boolean;
  TwofaAutEnabled: boolean;
  TwofaAutSecret: string | null;
  avatarUrl: string;
  createdAt: string;
  email: string;
  friendStatus: string;
  hash: string;
  id: number;
  nickname: string;
  provider: string;
  state: string;
  updatedAt: string;
}

interface Sender {
  FirstLogin: boolean;
  TwofaAutEnabled: boolean;
  TwofaAutSecret: string | null;
  avatarUrl: string;
  createdAt: string;
  email: string;
  friendStatus: string;
  hash: string;
  id: number;
  nickname: string;
  provider: string;
  state: string;
  updatedAt: string;
}

interface Message {
  content: string;
  createdAt: string;
  id: number;
  recieverID: number;
  roomID: string;
  seen: Seen[];
  sender: User;
}

// interface Chat {
//   id: number;
//   createdAt: string;
//   lastMessageAt: string;
//   messages: Message[];
//   name: string | null;
//   ownerID: number | null;
//   password: string | null;
//   uid: string;
//   users: User[];
//   isGroup: boolean | null;
//   isPrivate: boolean | null;
// }

interface DmProps {
  dm: string;
  updateItem: (newValue: string, newDm: string) => void;
  chat: Chat;
  setChatList: (newValue: Array<any>) => void;
  other: User;
  setOther: React.Dispatch<React.SetStateAction<User | undefined>>;
  patch: string;
  // setOther: (newValue: User) => void;
}

type Friend = {
  avatarUrl: string;
  id: string;
  nickname: string;
  email: string;
  state: string;
  friendStatus: string;
  provider: string;
};

const Dms: React.FC<DmProps> = ({
  dm,
  updateItem,
  chat,
  setChatList,
  other,
  setOther,
  patch,
}) => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [newmsg, setNewmsg] = useState<Message[]>([]);
  const [profile, setProfile] = useState(false);
  const [chatSocket, setChatSocket] = useState<Socket>();
  const [con, setCon] = useState(false);
  const [pdp, setPdp] = useState<string>();
  const [otherpdp, setOtherpdp] = useState<string>();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [blocked, setBlocked] = useState("free");
  const [isblocked, setIsblocked] = useState(false);
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [blockedlist, setBlockedlist] = useState<Blockedpoeple[]>([]);
  const [friend, setFriend] = useState<Friend>({
    avatarUrl: "null",
    id: "null",
    nickname: "null",
    email: "null",
    state: "null",
    friendStatus: "null",
    provider: "null",
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();
  const [userData, setUserData] = useState<userData>();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/users/${other.id}/other-games`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
    setSearch(e.target.value);
  };

  const sendMsg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:9000/chat/send-message`,
        {
          RoomId: chat.uid,
          message: input,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      // setAvatar(res.data.avatarUrl);
      // setNickname(res.data.nickname);
      // console.log(reload);
      // setInput("");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  useEffect(() => {
    // console.log("df");
    bottomRef?.current?.scrollIntoView();
    // if (!con) {
    // setCon(true);
    const socket = io("http://localhost:9000/chat");
    setChatSocket(socket);
    const conversationId = chat.uid;
    socket?.emit("joinRoom", { conversationId });
    // }
    return () => {
      socket?.emit("leaveRoom", { conversationId });
      socket.off("leaveRoom");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatSocket) {
      const newMessageHandler = (message: Message) => {
        setNewmsg((cur) => [...cur, message]);
        bottomRef?.current?.scrollIntoView();
      };

      chatSocket.on("message:new", newMessageHandler);
      return () => {
        chatSocket.off("message:new");
        // socket?.disconnect();
      };
    }
  }, [chatSocket]);

  useEffect(() => {
    // console.log(socket);
    const getMe = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/users/me`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setAvatar(res.data.avatarUrl);
        setNickname(res.data.nickname);
        setUser1(res.data.nickname);

        const response = await axios.get(
          `http://localhost:9000/users/${res.data.id}/avatar`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setPdp(URL.createObjectURL(response.data));

        const responseother = await axios.get(
          `http://localhost:9000/users/${other.id}/avatar`,
          {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        const url = URL.createObjectURL(responseother.data);
        setOtherpdp(url);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };

    const getFriend = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/users/${chat.users[1].nickname}/profile`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setFriend(res.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };

    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/chat/${chat.uid}/messages`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setNewmsg(res.data);
        // console.log("tttt", res.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };
    // console.log("[", chat.users[0].nickname.length, "]");
    // setMyinput(chat.users[0].nickname);
    getMe();
    getMessages();
    getFriend();
    setIsLoading(false);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // e.currentTarget.blur();
      sendMsg(e as any);
      setSearch("");
      // handleSubmit(e as any, input); // As we're simulating a button click, we cast the event to any.
    }
  };

  const blockUser = async () => {
    try {
      const block = await axios.post(
        `http://localhost:9000/users/${other.nickname}/block-user`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setBlocked("jail");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  const handleBlock = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await blockUser();
  };

  const unblockUser = async () => {
    try {
      const unblock = await axios.delete(
        `http://localhost:9000/users/${user1}/${other.nickname}/unblock`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setBlocked("free");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  const handleUnblock = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await unblockUser();
  };

  // useEffect(() => {
  //   // if (!other){

  //     const getOther = async () => {
  //       try {
  //         const res = await axios.get(
  //         `http://localhost:9000/chat/${chat.uid}/other-user`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${Cookies.get("token")}`,
  //           },
  //         }
  //         );
  //         setOther(res.data);
  //         console.log("rrrrrrrrr", res.data, chat.uid, "end");
  //       } catch (err) {
  //         if (err instanceof AxiosError) {
  //           console.log(err.response?.data.message);
  //         } else {
  //           console.log("Unexpected error", err);
  //         }
  //       }
  //     };
  //     getOther();
  //   // }
  // }, []);

  const handleSendInvite = (friendID: number, friendNickname: string) => {
    socket?.emit("send-invite", {
      recipientId: friendID,
      sender: friendNickname,
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function hasBlocked(
    blockingUserNickname: string,
    blockedUserNickname: string,
    blockInfoArray: Blockedpoeple[]
  ) {
    // console.log("array", blockInfoArray);
    // console.log(
    //   "these are the users:",
    //   blockingUserNickname,
    //   blockedUserNickname
    // );
    for (const blockInfo of blockInfoArray) {
      // console.log(
      //   "blockingraw and blockinglist:",
      //   blockingUserNickname,
      //   blockInfo.blockingUserNickname
      // );
      // console.log(
      //   "blockedraw and blockedlist:",
      //   blockedUserNickname,
      //   blockInfo.blockedUserNickname
      // );
      if (
        blockInfo.blockingUserNickname === blockingUserNickname &&
        blockInfo.blockedUserNickname === blockedUserNickname
      ) {
        setIsblocked(true);
        return;
      }
    }
    // console.log("false returned");
    setIsblocked(false);
  }

  useEffect(() => {
    const blockedUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/users/blockedusers`,

          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setBlockedlist(res.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };
    blockedUsers();
  }, []);
  // console.log("here: ", otherpdp);
  return (
    <>
      {profile ? (
        <div className="absolute z-2 flex border-2  border-opacity-30 w-[100%] h-[100%] border-violet-400  bg-[#571d86]  backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className="w-[40%]">
            {other.provider === "intra" && other.isChanged === false ? (
              <>
                <Image
                  className="object-cover mx-auto rounded-[20px]"
                  src={`${other.avatarUrl}`}
                  alt="pdp2"
                  height={200}
                  width={200}
                />
              </>
            ) : (
              <>
                {/* <Image
                  className="object-cover mx-auto rounded-[20px]"
                  src={otherpdp}
                  alt="pdp1"
                  height={100}
                  width={100}
                /> */}
                <PublicAvatar currentUser={other} />
                {/* <Avatar currentUser={other} /> */}
              </>
            )}
            <p className="font-serif text-center py-5 text-xs">
              {other.nickname}
            </p>
            <div className="gap-5 w-full flex flex-col">
              {blocked === "free" && !isblocked ? (
                <button
                  onClick={(e) => handleBlock(e)}
                  className="mx-auto text-white hover:bg-white hover:bg-opacity-10 w-[90%] text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                >
                  Block user
                </button>
              ) : null}
              {isblocked || blocked === "jail" ? (
                <button
                  onClick={(e) => handleUnblock(e)}
                  className="mx-auto text-white hover:bg-white hover:bg-opacity-10 w-[90%] text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                >
                  Unblock user
                </button>
              ) : null}

              <button
                onClick={() => setProfile(false)}
                className="hover:text-[#D6B3F1] mx-auto m-0 p-0 w-16"
                // onClick={() => setItem("2")}/////////////////////////////////
              >
                &larr; Back
              </button>
            </div>
          </div>
          <div className="py-20 ml-10 w-[60%] flex flex-col gap-10">
            <p>Number of matches: {userData?.matches}</p>
            <p>Wins: {userData?.wins}</p>
            <p>Loses: {userData?.loses}</p>
          </div>
        </div>
      ) : (
        <>
          {windowWidth > 1000 ? (
            <>
              <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-full border-violet-400 bg-[#571d86] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                <div className="w-[400px] flex flex-xol justify-center">
                  <div className="w-[50%] mt-10">
                    <div className="chat-image avatar mx-auto">
                      <div className="w-50 rounded-full">
                        {other?.provider === "intra" &&
                        other?.isChanged === false ? (
                          <>
                            <Image
                              src={`${other.avatarUrl}`}
                              width={200}
                              height={200}
                              alt="asd"
                            />
                          </>
                        ) : (
                          <>
                            <PublicAvatar currentUser={other} />
                          </>
                        )}
                      </div>
                    </div>
                    {other ? (
                      <p className="text-center">
                        {other?.nickname} Status: {other?.state}
                      </p>
                    ) : null}
                    <div className="flex flex-col">
                      <button
                        onClick={() => {
                          handleSendInvite(other.id, nickname);
                        }}
                        className=" hover:bg-white hover:bg-opacity-10 w-full py-1 my-3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                      >
                        Invite to a game
                      </button>
                      <button
                        onClick={() => {
                          setProfile(true);
                          hasBlocked(user1, other.nickname, blockedlist);
                        }}
                        className=" hover:bg-white hover:bg-opacity-10 w-full py-1 my-3 text-xs border-2  border-opacity-30 border-violet-400 bg-opacity-5 bg-black bg-gradient-to-l from-[rgba(255,255,255,0.15)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"
                      >
                        View Profile
                      </button>
                      <button
                        className="hover:text-[#D6B3F1] mx-auto m-0 p-0 w-16"
                        onClick={() => {
                          updateItem("7", "0");
                        }}
                      >
                        &larr; Back
                      </button>
                    </div>
                  </div>
                </div>
                <div className="border border-opacity-30 border-violet-400 h-full my-0 mr-5 w-[1px]"></div>
                <div className="flex Hello flex-col justify-center w-full h-full pt-5">
                  <div
                    className="flex-1 overflow-y-auto "
                    ref={chatContainerRef}
                  >
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      newmsg?.map((chat, index) => (
                        // chat.messages.map((chat, index) => (
                        <div key={index}>
                          {chat.sender.nickname == nickname ? (
                            <div className="chat chat-end">
                              <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                  {chat.sender.provider === "intra" &&
                                  chat.sender.isChanged === false ? (
                                    <>
                                      <Image
                                        src={`${chat.sender.avatarUrl}`}
                                        width={100}
                                        height={100}
                                        alt="HELLO"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <Avatar currentUser={chat.sender} />
                                    </>
                                  )}
                                  {/* {chat.sender.provider === "intra" &&
                                  chat.sender.isChanged === false ? (
                                    <>
                                      <Image
                                        src={pdp || "/place.png"}
                                        width={100}
                                        height={100}
                                        alt="HELLO"
                                      />
                                    </>
                                  ) : null} */}
                                </div>
                              </div>
                              <div className="chat-bubble">{chat.content}</div>
                            </div>
                          ) : (
                            <div className="chat chat-start">
                              <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                  {chat.sender.provider === "intra" &&
                                  chat.sender.isChanged === false ? (
                                    <>
                                      <Image
                                        src={`${chat.sender.avatarUrl}`}
                                        width={100}
                                        height={100}
                                        alt="HELLO"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <Avatar currentUser={chat.sender} />
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="chat-bubble">{chat.content}</div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    <div className="pt-24" ref={bottomRef} />
                  </div>
                  <div className="flex bottom-4 w-[100%] lg:w-[100%] xl:w-[100%] border border-opacity-30  border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md rounded-[15px]">
                    <input
                      className="w-full bg-transparent pl-3 py-4 focus:outline-none"
                      onKeyDown={(e) => {
                        handleKeyDown(e);
                        // setReload(!reload);
                      }}
                      type="text"
                      placeholder="Type Message.."
                      onChange={handleChange}
                      value={search}
                    />
                    <button
                      onClick={(e) => {
                        sendMsg(e);
                        setSearch("");
                        // setReload(!reload);
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
              </div>
            </>
          ) : (
            <>
              {patch === "off" ? (
                <div className="w-full flex justify-center z-10  sticky">
                  <div className="w-full mt-0 flex flex-row items-center pt-5 pb-5 pr-5 pl-2 ">
                    <div className="flex flex-col">
                      <div className="chat-image avatar mx-auto my-auto">
                        <div className="w-12 rounded-full">
                          {other?.provider === "intra" &&
                          other?.isChanged === false ? (
                            <>
                              <Image
                                src={`${other.avatarUrl}`}
                                width={200}
                                height={200}
                                alt="friend"
                              />
                            </>
                          ) : (
                            <>
                              <Avatar currentUser={other} />
                            </>
                          )}
                          {/* {other?.provider === "intra" ? (
                            
                          ) : null} */}
                        </div>
                      </div>
                      {other ? (
                        <p className="text-center text-xs mt-2">
                          {other?.nickname}: {other.state}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-row w-40 space-x-4">
                      <button className=" hover:bg-white hover:bg-opacity-10 h-6 w-6 text-lg  irounded-[10px]">
                        <HiRocketLaunch />
                      </button>
                      <button
                        onClick={() => setProfile(true)}
                        className=" hover:bg-white hover:bg-opacity-10 h-6 w-6 text-lg  orounded-[30px]"
                      >
                        <HiUser />
                      </button>
                      <button
                        className="hover:text-[#D6B3F1]  m-0 p-0 w-12 text-xs"
                        onClick={() => {
                          updateItem("7", "0");
                        }}
                      >
                        &larr; Back
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center z-10  sticky h-24">
                  <div className="w-full mt-0 flex flex-row items-center pt-5 pb-5 pr-5 pl-2 ">
                    <div className="flex flex-col">
                      <div className="chat-image avatar mx-auto my-auto">
                        <div className="w-12 rounded-full">
                          {other?.provider === "intra" &&
                          other?.isChanged === false ? (
                            <>
                              <Image
                                src={`${other.avatarUrl}`}
                                width={200}
                                height={200}
                                alt="friend"
                              />
                            </>
                          ) : (
                            <>
                              <Avatar currentUser={other} />
                            </>
                          )}
                        </div>
                      </div>
                      {other ? (
                        <p className="text-center text-xs mt-2">
                          {other?.nickname}: {other?.state}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-row w-40 space-x-4">
                      <button className=" hover:bg-white hover:bg-opacity-10 h-6 w-6 text-lg  irounded-[10px]">
                        <HiRocketLaunch />
                      </button>
                      <button
                        onClick={() => setProfile(true)}
                        className=" hover:bg-white hover:bg-opacity-10 h-6 w-6 text-lg  orounded-[30px]"
                      >
                        <HiUser />
                      </button>
                      <button
                        className="hover:text-[#D6B3F1]  m-0 p-0 w-12 text-xs"
                        onClick={() => {
                          updateItem("7", "0");
                        }}
                      >
                        &larr; Back
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-full border-violet-400 dbg-opacity-5 bg-[#571d86] bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                <div className="mt-0 flex Hello flex-col justify-center w-full h-full pt-5">
                  <div
                    className="flex-1 overflow-y-auto mt-[100px]"
                    ref={chatContainerRef}
                  >
                    {isLoading ? (
                      <p>Loading...</p>
                    ) : (
                      newmsg?.map((chat, index) => (
                        // chat.messages.map((chat, index) => (
                        <div key={index}>
                          {chat.sender.nickname == nickname ? (
                            <div className="chat chat-end">
                              <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                  {chat.sender.provider === "intra" &&
                                  chat.sender.isChanged === false ? (
                                    <Image
                                      src={
                                        chat.sender.avatarUrl || "/place.png"
                                      }
                                      width={100}
                                      height={100}
                                      alt="HELLO"
                                    />
                                  ) : (
                                    <>
                                      <Avatar currentUser={chat.sender} />
                                    </>
                                  )}
                                  {/* {chat.sender.provider === "intra" &&
                                  !chat.sender.isChanged ? (
                                    <Image
                                      src={`${chat.sender.avatarUrl}`}
                                      width={100}
                                      height={100}
                                      alt="HELLO"
                                    />
                                  ) : null} */}
                                </div>
                              </div>
                              <div className="chat-bubble">{chat.content}</div>
                            </div>
                          ) : (
                            <div className="chat chat-start">
                              <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                  {chat.sender.provider === "intra" &&
                                  chat.sender.isChanged === false ? (
                                    <>
                                      <Image
                                        src={`${chat.sender.avatarUrl}`}
                                        width={100}
                                        height={100}
                                        alt="me"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <Avatar currentUser={chat.sender} />
                                    </>
                                  )}
                                  {/* {chat.sender.provider === "intra" ? (
                                    
                                  ) : null} */}
                                </div>
                              </div>
                              <div className="chat-bubble">{chat.content}</div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    <div className="pt-24" ref={bottomRef} />
                  </div>
                  <div className="flex bottom-4 w-[100%] lg:w-[100%] xl:w-[100%] border border-opacity-30  border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md rounded-[15px]">
                    <input
                      className="w-full bg-transparent pl-3 py-4 focus:outline-none"
                      onKeyDown={(e) => {
                        handleKeyDown(e);
                        // setReload(!reload);
                      }}
                      type="text"
                      placeholder="Type Message.."
                      onChange={handleChange}
                      value={search}
                    />
                    <button
                      onClick={(e) => {
                        sendMsg(e);
                        setSearch("");
                        // setReload(!reload);
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
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
export default Dms;
