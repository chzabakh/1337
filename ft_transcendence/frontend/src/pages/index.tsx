import Cookies from "js-cookie";
import Homepage from "./homepage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Stars from "@/components/Sections/stars";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   Cookies.set("check", "passed", { path: "/" });
  //   if (Cookies.get("check") !== "passed") {
  //     alert("please enable cookies!");
  //     router.push("/login");
  //     if (Cookies.get("token")) {
  //       Cookies.set("token", "", { path: "/" });
  //     }
  //   }
  // }, []);

  return (
    <>
    <Stars />
 <div className="flex flex-col justify-between max-w-screen md:mx-[6rem] h-screen  max-h-screen">
   <Homepage />
 </div>
 </>
  );
}
