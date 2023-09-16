import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { GameTable, Player, Result } from "../game";
import { usePathname, useRouter } from "next/navigation";
import { Friend, User } from "@/components/Sections/types";
import PongGame from "@/components/Game/PongGame";
import Image from "next/image";
import place from "../../../public/place.png";
import Avatar from "@/components/avatar";
import { useSocket } from "@/components/socket_context";
import Stars from "@/components/Sections/stars";

const roomName = () => {
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
  const [checked, setChecked] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { socket } = useSocket();

  useEffect(() => {
    const newSocket = io("http://localhost:9000/game");
    setGameSocket(newSocket);
    const token = Cookies.get("token");

    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get("http://localhost:9000/users/me", { headers })
      .then((response) => {
        newSocket?.emit("joinQueue", {
          id: response.data.id,
          username: response.data.nickname,
          playOption: `privateGame`,
          roomName: pathname.split("/").at(2),
        });
        setUser(response.data);
      })
      .catch((error) => {
        error;
      });

    return () => {
      newSocket?.disconnect();
    };
  }, []);

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
            error;
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
            error;
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
            // (response.data);
            setPlayer2(response.data);
          })
          .catch((error) => {
            error;
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
            // (response.data);
            setPlayer2(response.data);
          })
          .catch((error) => {
            error;
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

  // useEffect(() => {
  //   if (gameSocket) {
  const playerScored = (data: any) => {
    // (data);

    const { player1Score, player2Score } = data;
    // playerNickname !== user?.nickname
    //   ? setPlayer1Score(player1Score + 1)
    //   : setPlayer2Score(player2Score + 1);
    // ("Player1 Scored");

    setPlayer1Score(player1Score);
    setPlayer2Score(player2Score);
  };

  // const player2ScoredHandler = () => {
  // gameTable?.player1?.nickname === user?.nickname
  //   ? setPlayer1Score(player1Score + 1)
  //   : setPlayer2Score(player2Score + 1);
  //   ("Player2 Scored");

  //   gameSocket.off("player2Scored", player2ScoredHandler);
  // };

  gameSocket?.removeAllListeners("playerScored");

  gameSocket?.on("playerScored", playerScored);

  //     return () => {
  //       gameSocket?.off("playerScored", playerScored);
  //     };
  //   }
  // }, [gameSocket]);

  useEffect(() => {
    if (gameSocket) {
      const eventListener = (data: any) => {
        setInQueue(true);
        setGameEnded(false);
        gameSocket.off("inQueue", eventListener);
      };

      const gameStarted = (gameTable: GameTable) => {
        // (gameTable);
        setGameTable(gameTable);
        setGamestart(true);

        gameSocket.off("gameStarted", eventListener);
      };

      const gameEnded = (data: { winner: string; result: Result }) => {
        const { winner, result } = data;
        // (winner);
        setWinner(winner);
        setGameEnded(true);
        // setGamestart(false);
        setInQueue(false);
      };

      gameSocket.on("gameEnded", gameEnded);
      gameSocket.on("gameStarted", gameStarted);
      gameSocket.on("inQueue", eventListener);
    }
  }, [gameSocket]);

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

  return (
    <>
      {gameStart ? (
        <>
          {countdown !== null ? (
            <>
              <h1 className="text-7xl">{countdown}</h1>
            </>
          ) : (
            <>
              <div className="flex h-full w-full justify-center items-center">
                <div className="my-6 bg-black h-[94%] gap-3 flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20  bg-blur-lg backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                  <div className="border-2 h-[10%] flex justify-between border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#45167233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                    <div className="flex justify-between w-[30%]">
                      {player1?.provider === "intra" && !player1?.isChanged ? (
                        <>
                          <Image
                            src={player1?.avatarUrl || place}
                            width={50}
                            height={50}
                            alt=""
                            className="rounded-full"
                          />
                        </>
                      ) : (
                        <>
                          <Avatar currentUser={player1!} />
                        </>
                      )}
                      <div>
                        <div>{user?.nickname}</div>
                        <div>
                          {gameTable?.player1?.nickname === user?.nickname ? (
                            <>{player1Score}</>
                          ) : (
                            <>{player2Score}</>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between w-[30%]">
                      <div>
                        {gameTable?.player1?.nickname === user?.nickname ? (
                          <>
                            <div>{gameTable?.player2?.nickname}</div>
                          </>
                        ) : (
                          <>
                            <div>{gameTable?.player1?.nickname}</div>
                          </>
                        )}
                        <div>
                          {gameTable?.player1?.nickname === user?.nickname ? (
                            <>{player2Score}</>
                          ) : (
                            <>{player1Score}</>
                          )}
                        </div>
                      </div>
                      {gameTable?.player1?.nickname === user?.nickname ? (
                        <>
                          {player2?.provider === "intra" &&
                          !player2?.isChanged ? (
                            <>
                              <Image
                                src={player2?.avatarUrl || place}
                                width={50}
                                height={50}
                                alt=""
                                className="rounded-full"
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
                          !player2?.isChanged ? (
                            <>
                              <Image
                                src={player2?.avatarUrl || place}
                                width={50}
                                height={50}
                                alt=""
                                className="rounded-full"
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
                  <div className="Game border-2 flex h-[90%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#53139233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
                    {gameEnded ? (
                      <>
                        <div className="flex flex-col w-full h-full gap-9 justify-center">
                          <Stars />
                          <div className="text-6xl w-full text-center">
                            Game Ended
                          </div>
                          <div className="flex flex-row">
                            <div className=" w-full text-2xl  text-center ">
                              The Winner is:{" "}
                              <span className="text-purple-700">{winner}</span>{" "}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <canvas
                          className={`${checked ? "bg-black" : ""} h-1/2 mt-20 
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
              </div>{" "}
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default roomName;
