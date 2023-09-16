import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  nickname: string;
  TwofaAutEnabled: boolean;
  avatarUrl: string;
  state: string;
  provider: string;
  friendStatus: string;
  isChanged: boolean;
}

const Friends = () => {
  useEffect(() => {
    getMe();
    getFriends();
  }, []);

  const [me, setMe] = useState<User>({
    id: 0,
    createdAt: "",
    updatedAt: "",
    email: "",
    nickname: "",
    TwofaAutEnabled: false,
    avatarUrl: "",
    state: "",
    provider: "",
    friendStatus: "",
    isChanged: false,
  });

  const [friend, setFriend] = useState<string[]>([]);

  const fake = [
    { id: 1, name: "oumaima" },
    { id: 2, name: "oum" },
    { id: 3, name: "oumma" },
    { id: 4, name: "oum" },
    { id: 5, name: "ouima" },
    { id: 6, name: "oum" },
    { id: 7, name: "oumaima" },
    { id: 8, name: "oum" },
    { id: 9, name: "omaima" },
    { id: 10, name: "oum" },
    { id: 11, name: "oumaima" },
    { id: 12, name: "om" },
  ];

  async function getMe() {
    try {
      const Token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${Token}` };
      const res = await axios.get("http://localhost:9000/users/me", {
        headers,
      });
      setMe(res.data);
    } catch (e) {
      alert(e);
    }
  }

  async function getFriends() {
    try {
      const Token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${Token}` };
      const user = me.nickname;
      // const res = await axios.get(`http://localhost:9000/users/${user}/friendlist`, {headers});
      const friends = fake.map((i) => i.name);
      setFriend(friends);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden flex flex-col border-2 h-full w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
        <div className="overflow-y-auto overflow-x-hidden  my-auto  h-[90%] ">
          <div className="flex flex-col overflow-scroll p-4">
            {friend &&
              friend.map((i) => (
                // TODO : BASED on the status of the friend : we display the color of status

                <div className="p-1 m-4 border-4 border-black w-[80%]">{i}</div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
