import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Place from "../../public/place.png";
import Cookies from "js-cookie";

const addInfos = () => {
  useEffect(() => {
    async function getAvatar() {
      try {
        const Token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${Token}` };

        const response = await axios.get("http://localhost:9000/users/me", {
          headers,
        });

        if (response.data.provider === "intra") {
          setPreview(response.data.avatarUrl);
        } else {
          const res = await axios.get("http://localhost:9000/users/my-avatar", {
            headers,
            responseType: "blob",
          });
          const blob = new Blob([res.data], { type: "image/png" });
          const previewUrl = URL.createObjectURL(blob);
          setPreview(previewUrl);
        }
      } catch (err) {
        err;
      }
    }
    getAvatar();
  }, []);

  const [Avatar, setAvatar] = useState<File | null>(null);
  const [Preview, setPreview] = useState("");
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [error, seterror] = useState("");
  const [Username, setUsername] = useState("");
  const [isUsernameChanged, setIsUsernameChanged] = useState(false);

  const router = useRouter();

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setIsAvatarChanged(true);
      setAvatar(file); // Save the file in the state for later submission
    } else {
      seterror("No file Upladed");
    }
  }

  function handleNickChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
    setIsUsernameChanged(true);
  }

  async function handleSaveChanges() {
    try {
      if (isAvatarChanged && Avatar) {
        const token = Cookies.get("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const data = new FormData();
        data.append("avatar", Avatar);

        try {
          await axios.patch("http://localhost:9000/users/upload/avatar", data, {
            headers: {
              ...headers,
            },
          });

          alert("Avatar updated!");
        } catch (err: any) {
          if (axios.isAxiosError(err) && err.response) {
            const error = err.message;
            seterror(error);
          } else {
            alert(err.message);
          }
        }
      }

      if (isUsernameChanged && Username) {
        try {
          const Token = Cookies.get("token");
          const headers = { Authorization: `Bearer ${Token}` };
          const data = { nickname: Username };
          await axios.patch(
            "http://localhost:9000/users/me/settings/change-username",
            data,
            { headers }
          );
          alert("Username changed!");
        } catch (err: any) {
          if (axios.isAxiosError(err) && err.response) {
            const error = err.message;
            seterror(error);
          } else {
            alert(err.message);
          }
        }
      }
    } catch (e) {
      alert(e);
    }
    if (!isUsernameChanged && !isUsernameChanged) {
      const confirmation = window.confirm(
        "You have not changed the username or password. Are you sure you want to continue without making changes?"
      );
      if (!confirmation) {
        return;
      }
    }
    router.push("/chat");
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="h-[35rem] w-[50rem] gap-3 flex justify-center items-center flex-col  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <div className="flex flex-col justify-center  items-center gap-6">
          <div className="lg:text-lg text-xs max-w-full">
            Change the Avatar and Username
          </div>

          <Image
            src={Preview || Place}
            alt=""
            width={100}
            height={100}
            className="border-2 self-center rounded-full"
          />
          <input
            key="avatar"
            required
            type="file"
            accept=".jpg, .jpeg, .png"
            className="my-1 bg-black/20 text-xs"
            onChange={(e) => {
              handleAvatarChange(e);
            }}
          />
        </div>

        <div className="px-5 gap-10 items-center  h-[60%] w-[70%] flex  flex-col justify-center">
          <div className="self-center">Change username:</div>
          <input
            className="p-2 rounded-lg w-[50%] text-white bg-black/20 sborder-none border-2 border-opacity-30 border-violet-400  focus:outline-none "
            type="text"
            placeholder="Type new username"
            required
            onChange={handleNickChange}
          />
        </div>
        <button
          className="border-2 border-opacity-30 border-violet-400 hover:text-white text-[#b8b8b8]  p-3 rounded-2xl"
          onClick={handleSaveChanges}
        >
          Save changes
        </button>
      </div>
      <div />
    </div>
  );
};

export default addInfos;
