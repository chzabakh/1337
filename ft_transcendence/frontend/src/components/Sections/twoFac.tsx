import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import Place from "../../../public/place.png";
import Router from "next/router";
import Edit from "../../pages/edit";
import { handleClientScriptLoad } from "next/script";

type TwoFacProps = {
  handle: () => void;
};

const TwoFac: React.FC<TwoFacProps> = ({ handle }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [activate, setActivate] = useState(false);
  const [qr, setQr] = useState("");

  useEffect(() => {
    getImage();
  }, []);

  async function getImage() {
    try {
      const Token = Cookies.get("token");
      const headers = { Authorization: `Bearer ${Token}` };
      const res = await axios.post(
        "http://localhost:9000/2fa/generate",
        {},
        { headers, responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: "image/png" });
      const previewUrl = URL.createObjectURL(blob);
      setQr(previewUrl);
    } catch (e) {
      alert(e);
    }
  }

  const submitCode = async () => {
    try {
      const Token = Cookies.get("token");
      const data = {
        code: +code,
      };

      const headers = {
        Authorization: `Bearer ${Token}`,
        "Content-Type": "application/json",
      };
      const res = await axios.post("http://localhost:9000/2fa/verify", data, {
        headers,
      });
      if (res.data) {
        const auth = await axios.post(
          "http://localhost:9000/2fa/enable",
          {},
          { headers }
        );
        setActivate(true);
      } else {
        setError("Wrong code. Please try again.");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.request) console.log("No response received!", e.request);
        else if (e.response) console.log("Error status: ", e.response?.status);
        // console.log("Error data: ", e.response?.data);
      } else {
        console.log("Error: ", e);
      }
    }
  };

  return (
    <>
      {activate ? (
        <div className="my-20 h-[70%] gap-3 flex justify-center items-center flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className="flex items-center border-2 h-[90%] w-[70%]  lg:flex-row justify-center border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
            <p className="text-center w-full justify-center items-center self-center">
              Two factors Authentication is activated.{" "}
              <button
                onClick={handle}
                className="text-xs self-start bg-purple-500 m-3 text-white py-1 w-[60px] h-[40px] px-4 rounded-lg p-3"
              >
                Go Back
              </button>
            </p>
          </div>
        </div>
      ) : (
        <>
        {/* my-20 h-[80%] gap-3 overflow-scroll justify-between flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px] */}
          {/* <div className="my-20 h-[70%] gap-3 flex justify-center items-center flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"> */}
          <div className="my-20  h-[70%] gap-20 flex flex-col items-center w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-black bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
       
       <button
         onClick={handle}
         className=" text-xs self-start bg-purple-500 m-3 text-white p-2 h-[40px] w-[40px]  rounded-lg"
       >
         X
       </button>
  
       <div className="m-3 gap-5 md:gap-10 items-center justify-center h-[50%] w-[70%] flex lg:flex-row  flex-col-reverse  p-4 ">

         <Image
           src={qr || Place}
           alt="qr"
           width={100}
           height={100}
           className="lg:w-[20rem] lg:h-[20rem] h-[6rem] w-[6rem] bg-black flex-1 md:ml-10 text-center max-w-[400px]"
         />

         <div className="flex flex-col  gap-10 justify-between  lg:gap-30">
           <div className="self-center text-center lg:text-2xl text-md font-extrabold">
             <h1>Enable Two Factor</h1>
           </div>
           <div className="flex flex-col lg:gap-4 gap-4 justify-between">
             <p className="text-[10px] md:text-sm">
               Scan the QR Code and enter the code:
             </p>
             <input
               className="lg:p-5 p-3 rounded-2xl bg-black/40 border-2 border-violet-400 border-opacity-30 focus:outline-none"
               type="text"
               placeholder="Enter the digits"
               onChange={(e: ChangeEvent<HTMLInputElement>) =>
                 setCode(e.target.value.replace(/\s+/g, ""))
               }
             ></input>
             {error && (
               <p className="text-xs self-center text-red-700">{error}</p>
             )}
             <button
               className="border-2 border-[#531f88] hover:text-[#c084fc] hover:border-white p-3 rounded-2xl w-[70%] self-center"
               onClick={submitCode}
             >
               Activate
             </button>
           </div>
         </div>
       </div>
       {/* </div> */}
     </div>
        </>
      )}
    </>
  );
};

export default TwoFac;
