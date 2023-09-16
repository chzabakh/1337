import { useState } from "react";
import FindAFriend from "../components/Sections/findAFriend";
import Channels from "@/components/Sections/channels";
import Dms from "../components/Sections/dms";
import Messages from "../components/Sections/messages";
import Friends from "../components/Sections/friends";
import { HiUsers, HiChatBubbleLeftEllipsis, HiTv } from "react-icons/hi2";
import DashboardLayout from "@/components/Layout/dashboardLayout";

const Chat = () => {
  const [item, setItem] = useState("6");
  const [dm, setDm] = useState("0");

  const updateItem = (newValue: string, newDm: string) => {
    setItem(newValue);
    setDm(newDm);
  };
  return (
    <>
      {/* <DashboardLayout> */}
      <div className="sm:flex-row min-h-[500px] w-full items-center justify-center my-20 h-[80%] gap-3 flex flex-col-reverse pw-[85%] mx-[2rem] border-2  border-opacity-30 border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="sm:h-1/2 h-[10%] sm:flex-col overflow-auto sm:py-20 flex flex-row sm:space-y-10 border-2  border-opacity-30 w-full sm:w-[15%] flex-auto border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <button
            onClick={() => setItem("6")}
            className={`hidden lg:block p-0 hover:text-[#D6B3F1] text-left text-xs xl:text-xl transition-all duration-300 ease-in ${
              item === "6" ? "text-[#bd68dc] hover:text-[#bd68dc]" : ""
            }`}
          >
            Find a Friend
          </button>
          <button
            onClick={() => setItem("6")}
            className={`mx-auto lg:hidden p-0 hover:text-[#D6B3F1] text-left text-2xl xl:text-xl transition-all duration-300 ease-in ${
              item === "6" ? "text-[#bd68dc] hover:text-[#bd68dc]" : ""
            }`}
          >
            <HiUsers />
          </button>
          <button
            onClick={() => setItem("7")}
            className={`hidden lg:block p-0 hover:text-[#D6B3F1] text-left text-xs xl:text-xl transition-all duration-300 ease-in ${
              item === "7" ? "text-[#bd68dc] hover:text-[#bd68dc]" : ""
            }`}
          >
            Direct messages
          </button>
          <button
            onClick={() => setItem("7")}
            className={`mx-auto lg:hidden p-0 hover:text-[#D6B3F1] text-left text-2xl xl:text-xl transition-all duration-300 ease-in ${
              item === "7" ? "text-[#bd68dc] hover:text-[#bd68dc]" : ""
            }`}
          >
            <HiChatBubbleLeftEllipsis />
          </button>
          {/* <button
            onClick={() => setItem("9")}
            className={`p-0 hover:text-[#D6B3F1] text-left text-xs xl:text-xl transition-all duration-300 ease-in ${
              item === "9" ? "text-[#bd68dc] hover:text-[#bd68dc]" : ""
            }
            
            
            `}
            >
            Friends
          </button> */}
          <button
            onClick={() => setItem("8")}
            className={`hidden lg:block p-0 hover:text-[#D6B3F1] text-left text-xs xl:text-xl transition-all duration-300 ease-in ${
              item === "8" ? "text-[#bd68dc] hover:text-[#bd68dc]" : ""
            }`}
          >
            Channels
          </button>
          <button
            onClick={() => setItem("8")}
            className={` mx-auto lg:hidden p-0 hover:text-[#D6B3F1] text-left text-2xl xl:text-xl transition-all duration-300 ease-in ${
              item === "8" ? "text-[#bd68dc] hover:text-[#bd68dc]" : ""
            }`}
          >
            <HiTv />
          </button>
        </div>
        {item == "0" ? (
          <div className="overflow-y-auto overflow-x-hidden flex flex-col border-2 h-full w-full sm:w-[77%] border-opacity-30 border-green-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
            empty
          </div>
        ) : null}
        {item == "6" ? <FindAFriend dmm={dm} updateItemm={updateItem} /> : null}
        {/* {item == "7" ? <Dms/> : null} */}
        {item == "7" ? <Messages dm={dm} updateItem={updateItem} /> : null}
        {item === "8" ? <Channels /> : null}
        {/* {item === "9" ? <Friends /> : null} */}
      </div>
      {/* </DashboardLayout> */}
    </>
  );
};
export default Chat;
