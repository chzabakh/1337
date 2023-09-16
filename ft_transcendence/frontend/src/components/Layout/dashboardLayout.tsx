import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { SocketProvider, useSocket } from "../socket_context";
import Router, { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Place from "../../../public/place.png";
import { HiBars4, HiMiniXCircle } from "react-icons/hi2";
import Card from "@/tools/card";
import Loading from "@/components/Sections/loading";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Avatar from "../avatar";
import { User } from "../Sections/types";
import Stars from "../Sections/stars";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const [item, setItem] = useState("27");
  const [Preview, setPreview] = useState("");
  const [windowWidth, setWindowWidth] = useState(0);
  const [username, setUser] = useState("");
  const [token, setToken] = useState("");
  const [provider, setProvider] = useState("");
  const [menu, setMenu] = useState("off");
  const [me, setMe] = useState<User>();
  const [delayedLoading, setDelayedLoading] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isIn, setIn] = useState(false);
  const [invites, setInvites] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const { socket } = useSocket();

  const inviteHandler = (data: any) => {
    const { sender } = data;

    if (!invites.includes(sender)) {
      setInvites((current) => [...current, sender]);

      setTimeout(() => {
        setInvites([]);
      }, 10000);
    }
  };

  socket?.removeAllListeners("IncomingInvite");

  socket?.on("IncomingInvite", inviteHandler);

  const redirectHandler = useCallback(
    (roomName: string) => {
      router.push(`/private-game/${roomName}`);
    },
    [router]
  );

  useEffect(() => {
    socket?.on("game:redirect", redirectHandler);
  }, [socket]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIn(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isIn) {
      // false
      if (!isLoading && !delayedLoading)
        // false , true
        router.push("/login");
    }
  }, [isIn, isLoading, delayedLoading]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get("http://localhost:9000/users/me", {
          headers,
        });

        setUser(res.data.nickname);
        setMe(res.data);

        if (!res.data.isChanged && res.data.provider === "intra") {
          setPreview(res.data.avatarUrl);
        } else {
          const avatarRes = await axios.get(
            "http://localhost:9000/users/my-avatar",
            { headers, responseType: "blob" }
          );
          const blob = new Blob([avatarRes.data], { type: "image/png" });
          const previewUrl = URL.createObjectURL(blob);
          setPreview(previewUrl);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [Cookies.get("token")]); // Dependency on the token

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      // Clean up the event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  if (delayedLoading || isLoading) {
    return <Loading />;
  }

  const onAcceptClick = async (toAccpetUser: string) => {
    try {
      const token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        `http://localhost:9000/users/${toAccpetUser}/other`,
        {
          headers,
        }
      );

      const userID = response.data.id;

      setInvites((current) => {
        return [...current.filter((user) => user !== toAccpetUser)];
      });

      socket?.emit("accept-invite", {
        player2: userID,
        player1: me?.id,
      });
    } catch (error) {
      error;
    }
  };

  const onDeclineClick = (decline: string) => {
    setInvites((current) => {
      return [...current.filter((user) => user !== decline)];
    });
  };
  return (
    <>
      <Stars />

      <div className="flex flex-row h-full">
        {invites.map((user, index) => (
          <div
            key={index}
            style={{ bottom: `${index * 64}px` }}
            className="px-5 justify-between items-center flex flex-row border-2 border-slate-700 z-50 absolute h-16 w-[400px] bottom-0 right-0 card bg-purple-700 text-primary-content"
          >
            <Card
              onDeclineClick={() => {
                onDeclineClick(user);
              }}
              onAcceptClick={() => {
                onAcceptClick(user);
              }}
              user={user}
            />
          </div>
        ))}
        {windowWidth > 768 ? (
          <>
            <div className=" flex flex-col border-2  border-opacity-30 border-violet-400 min-h-screen h-full w-[30%] lg:w-[20%] bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-lg">
              <div>
                <Image
                  className="object-cover flex-auto mx-auto rounded-[30px]"
                  src={Preview || Place}
                  alt={"Jello"}
                  height={200}
                  width={200}
                  priority={true}
                />
                <p className="font-inter text-purple-400 tracking-widest  text-center py-5 text-xl">
                  {username}
                </p>
              </div>
              <div className="w-full flex flex-col pt-[2rem]">
                <button
                  onClick={() => {
                    setItem("1");
                    router.push("/leaderboard");
                  }}
                  className={`hover:text-[#a733ff] hover:bg-white py-5 text-left pl-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl transition-all duration-300 ease-in 
              ${item !== "1" ? "hover:bg-white/30" : ""} ${
                    pathname === "/leaderboard" ? "text-[#a733ff] bg-white" : ""
                  }

              `}
                >
                  LeaderBoard
                </button>
                <button
                  onClick={() => {
                    setItem("2");
                    router.push("/chat");
                  }}
                  className={`hover:text-[#a733ff] hover:bg-white py-5 text-left pl-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl transition-all duration-300 ease-in 
                   
                       ${item !== "2" ? "hover:bg-white/30" : ""}
                       ${pathname === "/chat" ? "text-[#a733ff] bg-white" : ""}
                              `}
                >
                  Chat
                </button>
                <button
                  onClick={() => {
                    setItem("3");
                    router.push("/game");
                  }}
                  className={`hover:text-[#a733ff] hover:bg-white py-5 text-left pl-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl transition-all duration-300 ease-in 
                    
              
              ${item !== "3" ? "hover:bg-white/30" : ""}
              ${pathname === "/game" ? "text-[#a733ff] bg-white" : ""}

              `}
                >
                  Play Game
                </button>
                <button
                  onClick={() => {
                    setItem("4");
                    router.push("/history");
                  }}
                  className={`hover:text-[#a733ff] hover:bg-white py-5 text-left pl-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl transition-all duration-300 ease-in 
                  
              
              ${item !== "4" ? "hover:bg-white/30" : ""}
              ${pathname === "/history" ? "text-[#a733ff] bg-white" : ""}

              `}
                >
                  Match history
                </button>
                <button
                  onClick={() => {
                    setItem("5");
                    router.push("/edit");
                  }}
                  className={`hover:text-[#a733ff] hover:bg-white py-5 text-left pl-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl transition-all duration-300 ease-in
                    
              
              ${item !== "5" ? "hover:bg-white/30" : ""}
              ${pathname === "/edit" ? "text-[#a733ff] bg-white" : ""}

              `}
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    socket?.disconnect();
                    Cookies.remove("token", { path: "/" });
                    router.push("/login");
                  }}
                  className={`hover:text-[#a733ff] hover:bg-white py-5 text-left pl-4 text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl transition-all duration-300 ease-in
              ${item !== "6" ? "hover:bg-white/30" : ""}
              `}
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <button
              className="z-10 text-4xl absolute top-5 left-5 bg-purple-800 p-2 rounded-md"
              onClick={() => setMenu("on")}
            >
              <HiBars4 />
            </button>
            <div
              className={`absolute z-50 bg-gradient-to-r from-black to-purple-900 h-screen w-screen ${
                menu === "off" ? "-translate-x-full" : ""
              } transition-transform duration-700`}
            >
              <button
                className="text-6xl absolute top-5 left-5 p-0 rounded-md"
                onClick={() => setMenu("off")}
              >
                <HiMiniXCircle />
              </button>

              <>
                <div className="mt-20">
                  <Image
                    className="object-cover flex-auto mx-auto rounded-[30px]"
                    src={Preview || Place}
                    alt={"asd"}
                    height={200}
                    width={200}
                    priority={true}
                  />
                  <p className="font-inter tracking-widest text-center py-5 text-xl">
                    {username}
                  </p>
                </div>
                <div className="w-full flex flex-col pt-[2rem]">
                  <button
                    onClick={() => {
                      setMenu("off");
                      setItem("1");
                      Router.push("/leaderboard");
                    }}
                    className={`hover:text-[#a733ff] hover:bg-white py-5 text-center pl-4 text-xl  transition-all duration-300 ease-in ${
                      item === "1" ? "text-[#a733ff] bg-white" : ""
                    } ${item !== "1" ? "hover:bg-white/30" : ""}`}
                  >
                    LeaderBoard
                  </button>
                  <button
                    onClick={() => {
                      setMenu("off");
                      setItem("2");
                      Router.push("/chat");
                    }}
                    className={`hover:text-[#a733ff] hover:bg-white py-5 text-center pl-4 text-xl  transition-all duration-300 ease-in 
                      ${item === "2" ? "text-[#a733ff] bg-white" : ""}
                      ${item === "2" ? "hover:bg-white/30" : ""}`}
                  >
                    Chat
                  </button>
                  <button
                    onClick={() => {
                      setMenu("off");
                      setItem("3");
                      Router.push("/game");
                    }}
                    className={`hover:text-[#a733ff] hover:bg-white py-5 text-center pl-4 text-xl  transition-all duration-300 ease-in ${
                      item === "3" ? "text-[#a733ff] bg-white" : ""
                    }${item !== "3" ? "hover:bg-white/30" : ""}`}
                  >
                    Play Game
                  </button>
                  <button
                    onClick={() => {
                      setMenu("off");
                      setItem("4");
                      Router.push("/history");
                    }}
                    className={`hover:text-[#a733ff] hover:bg-white py-5 text-center pl-4 text-xl  transition-all duration-300 ease-in ${
                      item === "4" ? "text-[#a733ff] bg-white" : ""
                    }${item !== "4" ? "hover:bg-white/30" : ""}`}
                  >
                    Match history
                  </button>
                  <button
                    onClick={() => {
                      setMenu("off");
                      setItem("5");
                      Router.push("/edit");
                    }}
                    className={`hover:text-[#a733ff] hover:bg-white py-5 text-center pl-4 text-xl  transition-all duration-300 ease-in ${
                      item === "5" ? "text-[#a733ff] bg-white" : ""
                    }${item !== "5" ? "hover:bg-white/30" : ""}`}
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      socket?.disconnect();
                      Cookies.remove("token", { path: "/" });
                      router.push("/login");
                    }}
                    className={`hover:text-[#a733ff] hover:bg-white py-5 text-center pl-4 text-xl  transition-all duration-300 ease-in ${
                      item === "6" ? "text-[#a733ff] bg-white" : ""
                    }${item !== "6" ? "hover:bg-white/30" : ""}`}
                  >
                    Logout
                  </button>
                </div>
              </>
            </div>
          </>
        )}
        <div className="h-screen w-full md:w-[90%] flex mx-auto ">
          {children}
        </div>
      </div>
    </>
  );
}
