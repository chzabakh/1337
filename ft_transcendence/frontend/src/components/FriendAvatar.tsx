import { User, Users } from "@/components/Sections/types";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Friend } from "./Sections/findAFriend";

interface PublicAvatarProps {
  currentUser: Friend;
}

const PublicAvatar: React.FC<PublicAvatarProps> = ({ currentUser }) => {
  const [imageURL, setImageURL] = useState<string>();

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
        alt="aasdsd"
        width={200}
        height={200}
        className="object-cover h-12 w-12 sm:h-20 sm:w-20 md:h-w-30 md:w-30 xl:h-40 xl:w-40 2xl:h-60 2xl:w-60 mx-auto rounded-[20px]"
      />
    </>
  );
};

export default PublicAvatar;
