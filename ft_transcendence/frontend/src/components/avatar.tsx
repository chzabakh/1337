import { User, Users } from "@/components/Sections/types";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";

interface AvatarProps {
  currentUser: User;
  custom?: string;
}

const Avatar: React.FC<AvatarProps> = ({ currentUser, custom }) => {
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
    <div className="md:w-[50px] md:h-[50px] hidden sm:block">
      <Image
        src={imageURL || "/place.png"}
        alt="asd"
        width={100}
        height={100}
        className={`rounded-full ${
          custom ? `max-w-[${custom}] max-h-[${custom}]` : "max-w-[50px]"
        }  max-h-[50px]`}
      />
    </div>
  );
};

export default Avatar;
