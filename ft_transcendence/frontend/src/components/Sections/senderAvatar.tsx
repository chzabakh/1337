import { User, Users } from "@/components/Sections/types";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Sender } from "./findAFriend";

interface SenderAvatarProps {
  currentUser: Sender;
}

const SenderAvatar: React.FC<SenderAvatarProps> = ({ currentUser }) => {
  const [imageURL, setImageURL] = useState<string>();

  currentUser;

  useEffect(() => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get(`http://localhost:9000/users/${currentUser?.id}/avatar`, {
        headers,
        responseType: "blob",
      })
      .then((res) => {
        const url = URL.createObjectURL(res.data);
        setImageURL(url);
      })
      .catch((err) => {
        err;
      });
  }, []);

  return (
    <>
      <Image
        src={imageURL || "/place.png"}
        alt="asd"
        width={100}
        height={100}
        className="rounded-full max-w-[50px] max-h-[50px]"
      />
    </>
  );
};

export default SenderAvatar;
