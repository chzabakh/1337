import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/base";
import { Socket, io } from "socket.io-client";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import place from "../../public/place.png";
import { Friend, User } from "@/components/Sections/types";
import PongGame from "@/components/Game/PongGame";
import Avatar from "@/components/avatar";

import DashboardLayout from "@/components/Layout/dashboardLayout";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useSocket } from "@/components/socket_context";
import { useRouter } from "next/navigation";
import Stars from "@/components/Sections/stars";

const CustomSwitch = styled(Switch)(({ checked }) => ({
  "& .MuiSwitch-thumb": {
    backgroundColor: checked ? "white" : "purple",
  },
  "& .MuiSwitch-track": {
    backgroundColor: checked ? "purple" : "white",
  },
}));

export interface Player {
  id: number;
  nickname: string;
  sockerId: string;
  score: number;
}

export class Ball {
  x!: number;
  y!: number;
}

export class GameTable {
  player1: Player | null = null;
  player2: Player | null = null;
  ball: Ball | undefined;
  roomName: string | undefined;
}

export interface Result {
  player1Id: number;
  player2Id: number;
  winnerId: number;
  player1Score: number;
  player2Score: number;
}

const Options = () => {
  const [gameSocket, setGameSocket] = useState<Socket>();
  const [inQueue, setInQueue] = useState(false); // State to track inQueue status
  const [friends, setFriends] = useState<Friend[]>([]);
  const [gameStart, setGamestart] = useState(false);
  const [user, setUser] = useState<Player>();
  const [countdown, setCountdown] = useState<number | null>(3); // Countdown timer
  const [gameTable, setGameTable] = useState<GameTable>();
  const largeScreenMediaQuery = window.matchMedia("(min-width: 1024px)");
  const [winner, setWinner] = useState<string>("");
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [invite, setInvite] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [player1, setPlayer1] = useState<User>();
  const [player2, setPlayer2] = useState<User>();
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [checked, setChecked] = React.useState(true);
  const [toggleState, setToggleState] = React.useState("classic");
  const { socket } = useSocket();
  const router = useRouter();

  const handleSendInvite = (friendID: number, friendNickname: string) => {
    socket?.emit("send-invite", {
      recipientId: friendID,
      sender: friendNickname,
    });
  };

  const defaultStyle = {
    transition: "opacity 0.5s",
    opacity: 1,
  };

  const fadeOutStyle = {
    transition: "opacity 0.5s",
    opacity: 0,
  };

  useEffect(() => {
    if (gameTable) {
      const token = Cookies.get("token");

      const headers = { Authorization: `Bearer ${token}` };
      if (gameTable?.player1?.nickname === user?.nickname) {
        axios
          .get("http://localhost:9000/users/me", { headers })
          .then((response) => {
            setPlayer1(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get(
            `http://localhost:9000/users/${gameTable?.player2?.nickname}/other`,
            { headers }
          )
          .then((response) => {
            setPlayer1(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (gameTable?.player1?.nickname === user?.nickname) {
        axios
          .get(
            `http://localhost:9000/users/${gameTable?.player2?.nickname}/other`,
            {
              headers,
            }
          )
          .then((response) => {
            // console.log(response.data);
            setPlayer2(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get(
            `http://localhost:9000/users/${gameTable?.player1?.nickname}/other`,
            {
              headers,
            }
          )
          .then((response) => {
            // console.log(response.data);
            setPlayer2(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [gameTable]);

  useEffect(() => {
    if (countdown === null) {
      if (canvasRef.current) {
        if (gameSocket) {
          const userID = user?.id!;
          const pongGame = new PongGame(
            canvasRef.current,
            gameSocket,
            gameTable,
            userID,
            largeScreenMediaQuery
          );
          pongGame.render();
        }
      }
    }
  }, [countdown, gameSocket, gameTable, user, largeScreenMediaQuery]);

  useEffect(() => {
    const newSocket = io("http://localhost:9000/game");
    setGameSocket(newSocket);
    const token = Cookies.get("token");

    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get("http://localhost:9000/users/me", { headers })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      newSocket?.disconnect();
    };
  }, []);

  // useEffect(() => {
  // if (gameSocket) {
  const playerScored = (data: any) => {
    // console.log(data);

    const { player1Score, player2Score } = data;
    // playerNickname !== user?.nickname
    //   ? setPlayer1Score(player1Score + 1)
    //   : setPlayer2Score(player2Score + 1);
    // console.log("Player1 Scored");

    setPlayer1Score(player1Score);
    setPlayer2Score(player2Score);
  };

  // const player2ScoredHandler = () => {
  // gameTable?.player1?.nickname === user?.nickname
  //   ? setPlayer1Score(player1Score + 1)
  //   : setPlayer2Score(player2Score + 1);
  //   console.log("Player2 Scored");

  //   gameSocket.off("player2Scored", player2ScoredHandler);
  // };
  gameSocket?.removeAllListeners("playerScored");

  gameSocket?.on("playerScored", playerScored);

  // return () => {
  //   gameSocket?.off("playerScored", playerScored);
  // };
  // }
  // }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setToggleState(event.target.checked ? "classic" : "space");
  };

  useEffect(() => {
    if (gameSocket) {
      const eventListener = (data: any) => {
        setInQueue(true);
        setGameEnded(false);
        gameSocket.off("inQueue", eventListener);
      };

      const gameStarted = (gameTable: GameTable) => {
        // console.log(gameTable);
        setGameTable(gameTable);
        setGamestart(true);

        gameSocket.off("gameStarted", eventListener);
      };

      const gameEnded = (data: { winner: string; result: Result }) => {
        const { winner, result } = data;
        // console.log(winner);
        setWinner(winner);
        setGameEnded(true);
        // setInterval(() => {
        //   router.push("/history");
        // }, 3000);
        // setGamestart(false);
        setInQueue(false);
        socket?.off("gameEnded", gameEnded);
      };

      gameSocket.on("gameEnded", gameEnded);
      gameSocket.on("gameStarted", gameStarted);
      gameSocket.on("inQueue", eventListener);
    }
  }, [gameSocket]);

  const handleDelete = () => {
    setFadeOut(true);
    setTimeout(() => {
      setInvite(false);
      setFadeOut(false);
    }, 500);
  };

  useEffect(() => {
    async function initialize() {
      await getFriends();
    }
    initialize();
  }, []);

  async function getFriends() {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("http://localhost:9000/users/friendlist", {
        headers,
      });
      setFriends(res.data);
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

  useEffect(() => {
    if (gameStart) {
      const timer = setInterval(() => {
        if (countdown !== null) {
          if (countdown === 0) {
            clearInterval(timer);
            setCountdown(null);
          } else {
            setCountdown(countdown - 1);
          }
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [gameStart, countdown]);

  const playWithRandom = () => {
    if (gameSocket) {
      gameSocket.emit("joinQueue", {
        id: user?.id,
        username: user?.nickname,
        playOption: `playWithRandom`,
      });
    }
  };

  return (
    <>
      {/* <Stars/> */}
      {/* <DashboardLayout> */}
      <div className="my-6 h-[95%] gap-3 flex justify-center items-center flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-black bg-blur-lg backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="flex w-full h-full justify-center items-center">
          <Stars />
          {gameStart ? (
            <>
              {countdown !== null ? (
                <h1 className="text-7xl">{countdown}</h1>
              ) : (
                <>

                  <div className="flex h-full w-full justify-center items-center">
                    <div className="my-6  h-[94%] gap-3 flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20  bg-blur-lg backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                      <div className="border-2 h-[14%] flex justify-between border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#45167233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                        <div className="flex justify-between items-center w-[30%]">
                          {player1?.provider === "intra" &&
                          !player1.isChanged ? (
                            <>
                              <Image
                                src={player1?.avatarUrl || place}
                                width={100}
                                height={100}
                                alt=""
                                className="rounded-full w-[20px] md:w-[50px] h-[20px] md:h-[50px] hidden sm:block"
                              />
                            </>
                          ) : (
                            <>
                              <Avatar currentUser={player1!} />
                            </>
                          )}
                          <div className="flex flex-col justify-center items-center">
                            <div className="font-inter tracking-wider text-purple-500">{user?.nickname}</div>
                            <div >
                              {gameTable?.player1?.nickname ===
                              user?.nickname ? (
                                <div className="text-xl">{player1Score}</div>
                              ) : (
                                <div className="text-xl">{player2Score}</div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between  items-center w-[30%]">
                          <div className=" tracking-wider ">
                            {gameTable?.player1?.nickname === user?.nickname ? (
                              <>
                                <div className="font-inter text-purple-500">{gameTable?.player2?.nickname}</div>
                              </>
                            ) : (
                              <>
                                <div className="font-inter text-purple-500">{gameTable?.player1?.nickname}</div>
                              </>
                            )}
                            <div className="flex flex-col justify-center items-center">
                              {gameTable?.player1?.nickname ===
                              user?.nickname ? (
                                <div className="text-md font-bold">{player2Score}</div>
                              ) : (
                                <div className="text-md font-bold">{player1Score}</div>
                              )}
                            </div>
                          </div>
                          {gameTable?.player1?.nickname === user?.nickname ? (
                            <>
                              {player2?.provider === "intra" &&
                              !player2.isChanged ? (
                                <>
                                  <Image
                                    src={player2?.avatarUrl || place}
                                    width={100}
                                    height={100}
                                    alt=""
                                    className="rounded-full w-[20px]  md:w-[50px] h-[20px] md:h-[50px] hidden sm:block"
                                  />
                                </>
                              ) : (
                                <>
                                  <Avatar currentUser={player2!} />
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {player2?.provider === "intra" &&
                              player2?.isChanged === false ? (
                                <>
                                  <Image
                                    src={player2?.avatarUrl || place}
                                    width={100}
                                    height={100}
                                    alt=""
                                    className="rounded-full md:w-[50px] md:h-[50px] hidden sm:block"
                                  />
                                </>
                              ) : (
                                <>
                                  <Avatar currentUser={player2!} />
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="Game border-2 flex flex-col h-[90%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#53139233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                        {gameEnded ? (
                          <div className="flex flex-col w-full h-full gap-9 justify-center">
                            <Stars />
                            <div className="text-6xl w-full text-center">
                              Game Ended
                            </div>
                            <div className="flex flex-row">
                              <div className=" w-full text-2xl  text-center ">
                                The Winner is:{" "}
                                <span className="text-purple-700">
                                  {winner}
                                </span>{" "}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <canvas
                              className={`${
                                checked ? "bg-black" : ""
                              } h-1/2 mt-20 
                               sm:w-full sm:h-2/3 sm:mt-20
                               lg:w-full lg:h-full lg:flex lg:justify-center lg:top-[25%] lg:left-[25%] lg:rotate-0 -rotate-90`}
                              width={700}
                              height={400}
                              ref={canvasRef}
                              id="gameCanvas"
                            ></canvas>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {inQueue ? (
                <>
                  <p className="text-purple-400 tracking-widest text-xl mt-2">
                    In Queue...
                  </p>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <div className="self-center ">
                    You play in mode :{" "}
                    <span className="text-purple-600">{toggleState}</span>
                  </div>
                  <CustomSwitch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />

                  <div>
                    <Button
                      onClick={playWithRandom}
                      className="border-opacity-40 border-violet-400 hover:border-[#b564eb]
                      border-[3px]  rounded-full m-4 w-[200px] p-3"
                    >
                      Play
                    </Button>
                    <Button
                      className="border-opacity-40 m-4 border-violet-400 hover:border-[#b564eb]
                      border-[3px] rounded-full w-[200px] p-3"
                      onClick={() => setInvite(true)}
                    >
                      Invite
                    </Button>
                  </div>
                </div>
              )}

              {invite ? (
                <div
                  style={fadeOut ? fadeOutStyle : defaultStyle}
                  className="w-[300px] h-[300px] absolute top-1/2 left-[50%] flex flex-col gap-5 transform -translate-x-1/2 -translate-y-1/2   bg-[#46126d] bg-opacity-6 rounded-[30px]"
                >
                  <button
                    onClick={handleDelete}
                    className=" self-start bg-purple-500 m-3 text-white py-1 w-[40px] h-[40px] px-4 rounded-lg"
                  >
                    X
                  </button>
                  <div className="flex flex-col gap-7 items-center">
                    <h2> Invite friends:</h2>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    {friends.map((friend) => (
                      <div key={friend.id} className="flex justify-evenly">
                        <div className="text-[purple-500]">
                          {friend.nickname}
                        </div>
                        <button
                          onClick={() => {
                            handleSendInvite(friend.id, user?.nickname!);
                          }}
                          className="border-4 border-[#3b0764] px-2 rounded-full"
                        >
                          Invite
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Options;
