import DashboardLayout from "@/components/Layout/dashboardLayout";
import { User } from "@/components/Sections/types";
import Score from "@/tools/score";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Image from "next/image";
import Results from "@/tools/results";
import Avatar from "@/components/avatar";

export interface Match {
  id: number;
  createdAt: string;
  updatedAt: string;
  player1Id: number;
  player2Id: number;
  winnerId: number;
  player1Score: number;
  player2Score: number;
  winner: User;
  player1: User;
  player2: User;
}

export interface Games {
  matches: Match[];
  winCount: number;
}

const MatchHistory = () => {
  const [me, setMe] = useState<User>();
  const [games, setGames] = useState<Games>();
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
    const getGames = async () => {
      try {
        const gamesres = await axios.get(
          `http://localhost:9000/game/my-games`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        setGames(gamesres.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err.response?.data.message);
        } else {
          console.log("Unexpected error", err);
        }
      }
    };

    getUser();
    getGames();
  }, []);
  // console.log(games);

  return (
    <>
      <div className="my-20 h-[80%] gap-3 flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-blackdashboard bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="flex flex-row border-2 h-[10em] flex-auto border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className="space-x-2 flex flex-row w-1/2 items-center pl-3">
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
            <div className="flex flex-col my-auto">
              <p className="text-xs lg:text-lg">{me?.nickname}</p>
            </div>
          </div>
          <div className="w-1/2 flex flex-row pmy-auto items-center space-x-3">
            <p className="text-xs lg:text-lg">Total Wins:</p>
            <p className="text-xs lg:text-lg"> {games?.winCount}</p>
          </div>
        </div>
        <div className="w-full h-full overflow-y-scroll border-2 border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          {games?.matches?.length! > 0 ? (
            games?.matches.map((match, index) => (
              <Results key={index} match={match} />
            ))
          ) : (
            <p className="h-full flex justify-center items-center md:text-lg lg:text-2xl">
              No games available!
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default MatchHistory;
