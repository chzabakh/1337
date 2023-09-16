import Image from "next/image";
import { useEffect, useState } from "react";
import Dms from "../Sections/dms";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Avatar from "../avatar";

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
  sender: Sender;
}

interface Chat {
  id: number;
  createdAt: string;
  lastMessageAt: string;
  messages: Message[];
  name: string | null;
  ownerID: number | null;
  password: string | null;
  uid: string;
  users: User[];
  isGroup: boolean | null;
  isPrivate: boolean | null;
}

interface MessageProps {
  lastmsg: string;
  setLastmsg: (newValue: string) => void;
  dm: string;
  updateItem: (newValue: string, newDm: string) => void;
  chat: Chat;
  setChatList: (newValue: Array<any>) => void;
}

const Dmpreview: React.FC<MessageProps> = ({
  lastmsg,
  setLastmsg,
  dm,
  updateItem,
  chat,
  setChatList,
}) => {
  const [other, setOther] = useState<User>();
  const [pdp, setPdp] = useState<string | undefined>();

  useEffect(() => {
    setLastmsg(chat.messages[chat.messages.length - 1]?.content);
  }, [chat]);

  useEffect(() => {
    const getOther = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/chat/${chat.uid}/other-user`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setOther(res.data);

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
      } catch (err) {
        if (err instanceof AxiosError) {
          err.response?.data.message;
        } else {
        }
      }
    };
    getOther();
  }, []);

  return (
    <>
      {dm == chat.id.toString() && other ? (
        // <div className="absolute top-0 z-2 flex justify-evenly border-2  border-opacity-30 w-[100%] h-full border-violet-400 dbg-opacity-5 bg-[#47365ad6] bg-gradient-to-l from-[rgba(255,255,255,0.27)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <Dms
          dm={dm}
          updateItem={updateItem}
          chat={chat}
          setChatList={setChatList}
          other={other}
          setOther={setOther}
          patch={"off"}
        />
      ) : (
        //  </div>
        <button
          onClick={() => {
            // setDm("1");
            updateItem("7", chat.id.toString());
          }}
          className=" -z-20 border-2 border-gray-500 hover:bg-gray-500 bg-gray-600 rounded-lg items-center my-2 w-[90%] cursor-pointer flex mx-2 p-2 gap-5 flex-row"
        >
          <div className="flex flex-col chat-image avatar -z-10">
            <div className="w-10 rounded-full">
              {other?.provider === "intra" && other?.isChanged === false ? (
                <Image
                  src={other.avatarUrl || "/place.png"}
                  width={100}
                  height={100}
                  alt="friend"
                />
              ) : (
                <>{other ? <Avatar currentUser={other} /> : null}</>
              )}
              {/* {other?.provider === "intra" && !other?.isChanged ? (
                <Image
                  src={`${other?.avatarUrl}`}
                  width={100}
                  height={100}
                  alt="friend"
                />
              ) : null} */}
            </div>
          </div>
          {!chat.messages[chat.messages.length - 1]?.content ? (
            <div className="flex flex-col flex-grow">
              <p className="italic text-xs xs:lg lg:text-xl text-left">
                {other?.nickname}
              </p>
              <p className="text-xs italic text-left">
                You are new friends, Start chatting now!
              </p>
            </div>
          ) : (
            <div className="flex flex-col flex-grow">
              <p className="italic text-xs xs:lg lg:text-xl text-left">
                {other?.nickname}
              </p>
              <p className="text-xs italic text-left">
                {/* {chat.messages[chat.messages.length - 1]?.content} */}
                {/* {lastmsg} */}
              </p>
            </div>
          )}
        </button>
      )}
    </>
  );
};
export default Dmpreview;
