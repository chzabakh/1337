import DashboardLayout from "@/components/Layout/dashboardLayout";
import { User } from "@/components/Sections/findAFriend";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Image from "next/image";
import Score from "@/tools/score";
import Avatar from "@/components/avatar";

export interface Scoreuser {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  nickname: string;
  isChanged: boolean;
  hash: string;
  TwofaAutSecret: null | string;
  TwofaAutEnabled: boolean;
  FirstLogin: boolean;
  avatarUrl: string;
  state: string;
  provider: string;
  friendStatus: string;
  matchesAsWinner: {
    id: number;
    createdAt: string;
    updatedAt: string;
    player1Id: number;
    player2Id: number;
    winnerId: number;
    player1Score: number;
    player2Score: number;
  }[];
  wins: number;
}

const Leaderboard = () => {
  const [me, setMe] = useState<User>();
  const [users, setUsers] = useState<Scoreuser[]>();
  const [rank, setRank] = useState(0);
  useEffect(() => {
    const getUser = async () => {
      try {
        const me = await axios.get(`http://localhost:9000/users/me`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setMe(me.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };
    const getUsers = async () => {
      try {
        const users = await axios.get(
          `http://localhost:9000/game/leaderboard`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setUsers(users.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };

    getUser();
    getUsers();
  }, []);

  useEffect(() => {
    if (users && me) {
      const index = users.findIndex((user) => user.nickname === me?.nickname);
      setRank(index + 1);
    }
  }, [users, me]);

  // console.log("theusers:", users);
  return (
    <>
      {/* <DashboardLayout> */}
      <div className="my-20 h-[80%] gap-3 flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="flex border-2 h-[10em] flex-auto border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(114,39,175,0.2)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className="flex space-x-6 w-full">
            <div className="my-auto w-[35%] flex flex-row items-center space-x-4">
              {me?.provider === "intra" && me?.isChanged === false ? (
                <>
                  <Image
                    className="w-15 h-15 sm:w-20 sm:h-20 rounded-md"
                    src={me?.avatarUrl!}
                    width={100}
                    height={100}
                    alt="asd"
                  />
                </>
              ) : (
                <>{me ? <Avatar currentUser={me} /> : null}</>
              )}
              <p className="text-sm sm:text-lg md:text-3xl text-purple-700">{me?.nickname}</p>
            </div>
            <div className="flex flex-row my-auto w-[65%] justify-end sm:justify-center">
              <p className="text-sm sm:text-lg md:text-3xl mr-2">Your Rank:</p>
              <p className="text-sm sm:text-lg text-purple-700 md:text-3xl">#{rank}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-full overflow-y-hidden border-2 flex-auto border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(165,89,228,0.2)] bg-blur-md backdrop-filter backdrop-blur-md py-4 rounded-[30px]">
          <div className="flex justify-around w-full h-[4em] py-4">
            <p className="text-purple-700 font-bold text-xl">User</p>
            <p className="text-purple-700 font-bold text-xl">Score</p>
            <p className="text-purple-700 font-bold text-xl">Rank</p>
          </div>
          <div
            style={{ height: "calc(100% - 4em)" }}
            className="w-full h-full overflow-y-scroll"
          >
            {users?.length! > 0 ? (
              users!.map((user, index) => (
                  <Score key={index} user={user} rank={index + 1} />
              ))
            ) : (
              <p className="h-full flex justify-center items-center md:text-lg lg:text-2xl">
                No games available!
              </p>
            )}
          </div>
        </div>
      </div>
      {/* </DashboardLayout> */}
    </>
  );
};
export default Leaderboard;
