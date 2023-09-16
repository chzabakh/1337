import React, { useState } from "react";
import place from "../../../public/place.png";
import Image from "next/image";
import { Button } from "@mui/base";
import Options from "../../pages/game";
import DashboardLayout from "../Layout/dashboardLayout";
const Play = () => {
  const [back, setBack] = useState(false);

  return back ? (
    <Options />
  ) : (
    <DashboardLayout>
      <div className="my-6 h-[90%] gap-3 flex flex-col w-full mx-[2rem]  border-2 border-opacity-30 border-violet-400 bg-opacity-20 bg-black bg-blur-lg backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
        <button
          className="self-start border-2 py-2 w-[100px] rounded-full"
          onClick={() => setBack(true)}
        >
          Back
        </button>
        <div className="border-2 h-[20%] flex justify-between border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#45167233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <div className="flex justify-between w-[30%]">
            <Image
              src={place}
              width={100}
              height={100}
              alt=""
              className="rounded-full"
            />
            <div>
              <div>Player2</div>
              <div>Score</div>
            </div>
          </div>
          <div className="flex justify-between w-[30%]">
            <div>
              <div>Player1</div>
              <div>Score</div>
            </div>
            <Image
              src={place}
              width={100}
              height={100}
              alt=""
              className="rounded-full"
            />
          </div>
        </div>
        <div className="border-2 flex h-[90%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#53139233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]"></div>
        <div className="border-2 h-[15%] flex justify-around border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[#45167233] bg-blur-md backdrop-filter backdrop-blur-md p-4 rounded-[30px]">
          <Button className="border-2 border-white px-4 m-1 rounded-full ">
            Left
          </Button>
          <Button className="border-2 border-white px-4 m-1 rounded-full ">
            Right
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Play;