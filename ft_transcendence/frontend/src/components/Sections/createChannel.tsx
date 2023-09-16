"use client";
import React, { useState } from "react";
import PublicChannel from "../channels/publicChannel";
import PrivateChannel from "../channels/privateChannel";
// import BrowseChannel from "./browseChannel";
import ProtectedChannel from "../channels/protectedChannel";
import Channels from "./channels";
import Description from "../channels/description";
const CreateChannel = () => {
  const [active, setActive] = useState("null");
  const [back, setback] = useState(false);

  function activatePublic() {
    setActive("public");
  }

  function activatePrivate() {
    setActive("private");
  }

  function activateProtected() {
    setActive("protected");
  }

  function handleback() {
    setback(true);
  }
  return (
    <>
      {back ? (
        <Channels />
      ) : (
        <>
          {
            <div className="overflow-y-auto overflow-x-hidden flex flex-col border-2 h-full w-[77%] border-opacity-30 border-violet-400 bg-opacity-5 bg-gradient-to-l from-[rgba(255,255,255,0.20)] bg-transparent bg-blur-md backdrop-filter backdrop-blur-md rounded-[30px]">
              <button
                className="self-start m-4 hover:border-[#b564eb] hover:transition  w-[100px] border-[3px] border-opacity-40 border-violet-400 rounded-full"
                onClick={handleback}
              >
                Back
              </button>
              <h1 className="self-start my-1 text-xl m-5">Create a channel:</h1>
              <div className="w-full h-[78%]  flex justify-between items-center px-1">
                <div className="flex flex-col justify-between gap-1">
                  <div className="text-md mx-5 font-[40px]">Select type of channel:</div>
                  <div className="flex m-5 flex-col gap-1 flex-1">
                    <div>
                      <input
                        id="default-radio-0"
                        type="radio"
                        value="public"
                        name="default-radio"
                        className=" mr-3 text-xs border-gray-300 "
                        onClick={activatePublic}
                      />
                      <label
                        htmlFor="default-radio-0"
                        className="text-sm  text-white dark:text-gray-300"
                      >
                        Public channel
                      </label>
                    </div>
                    <div>
                      <input
                        id="default-radio-1"
                        type="radio"
                        value="private"
                        name="default-radio"
                        className=" mr-3  border-gray-300 "
                        onClick={activatePrivate}
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="text-sm  text-white dark:text-gray-300"
                      >
                        Private channel
                      </label>
                    </div>

                    <div>
                      <input
                        id="default-radio-2"
                        type="radio"
                        value="protected"
                        name="default-radio"
                        className=" mr-3  border-gray-300 "
                        onClick={activateProtected}
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="text-sm  text-white dark:text-gray-300"
                      >
                        Protected channel
                      </label>
                    </div>
                  </div>
                </div>
                <div className="border-[3px] border-opacity-50 border-violet-400 rounded-xl p-3 flex justify-center flex-col h-[100%] w-[70%] mr-5">
                  <div className="self-start text-md">
                    <div className="text-md">Channel Information:</div>
                  </div>
                  <div className=" p-5 h-full flex flex-col justify-evenly">
                    {active && active === "public" && <PublicChannel />}
                    {active && active === "private" && <PrivateChannel />}
                    {active && active === "protected" && <ProtectedChannel />}
                    {active === "null" && <Description />}
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      )}
    </>
  );
};

export default CreateChannel;