// Login.tsx
"use client";
import React, { useContext, useEffect } from "react";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import fourty from "../../public/fourty.png";
import Layout from "@/components/Layout/layout";
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import activate from "./activate";
import { match } from "assert";
import Stars from "@/components/Sections/stars";

export const Login: React.FC = () => {
  const router = useRouter();

  const [authWindow, setAuthWin] = useState<Window | null>(null);
  const [token, setToken] = useState("");

  const [status, setStatus] = useState("0");
  const [message, setMessage] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postData(data);
  };

  const postData = async (data: { email: string; password: string }) => {
    try {
      const res = await axios.post("http://localhost:9000/auth/login", data);
      const tok = res.data.access_token;

      const verify = res.data.isFirstLogin;
      const twoFac = res.data.isTwoFactorEnabled;

      Cookies.set("token", tok, { path: "/" });

      if (verify) {
        router.push("/addInfos");
      } else {
        if(twoFac === true)
        {
          router.push('/activate')
        }
        else
        router.push("/chat");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.data.message);

        setStatus("-1");
        setMessage(err.response?.data.message);
      } else {
        console.log("Unexpected error", err);
      }
    }
  };

  function openNewWindow() {
    const authWindow = window.open(
      "http://localhost:9000/auth/42/login",
      "_blank",
      "width=350,height=450"
    );
    if (authWindow) {
      const checkAuthComplete = setInterval(() => {
        const res = Cookies.get("token")?.replace("j:", "");
        const pattern =
          /"isTwoFactorEnabled":(true|false),|"isFirstLogin":(true|false),|"access_token":"(.*?)"/g;
        let parsed = {
          isTwoFactorEnabled: false,
          isFirstLogin: true,
          access_token: "",
        };
        let found;
        if (res) {
          //exec returns an array of matches or null
          while ((found = pattern.exec(res)) !== null) {
            if (found.index === pattern.lastIndex) {
              pattern.lastIndex++;
            }
            if (found[1] !== undefined) {
              parsed.isTwoFactorEnabled = found[1] === "true";
            } else if (found[2] !== undefined) {
              parsed.isFirstLogin = found[2] === "true";
            } else if (found[3] !== undefined) {
              parsed.access_token = found[3];
            }
          }
        }
        const token = parsed.access_token;
        const isFirstLogin = parsed.isFirstLogin;
        const isTwoFactorEnabled = parsed.isTwoFactorEnabled;
        if (token) {
          setToken(token);
          authWindow.close();
          clearInterval(checkAuthComplete);
          Cookies.set("token", token, { path: "/" });
          if (isFirstLogin) Router.push("/addInfos");
          else {
            if (isTwoFactorEnabled === true) {
              router.push("/activate");
            } else {
              router.push("/chat");
            }
          }
        }
      }, 500);
    } else {
      alert("Failed to open authentication window");
    }
  }

  return (
    <>
      <Stars />
      <div className="flex flex-col  justify-between max-w-full md:mx-[6rem] h-full lg:h-screen max-h-full">
        <Layout>
          <div className="w-full flex overflow-y-hidden flex-col items-center justify-center x-auto max-h-full h-full">
            <a className={styles.button} onClick={openNewWindow}>
              <Image className={styles.logo} alt="" src={fourty} />
              <p className="sm:text-lg">Login with Intra</p>
            </a>
            <div className={styles.or}>Or</div>
            <form className={styles.formy} onSubmit={handleSubmit}>
              <div className={styles.infos}>
                <h1 className={styles.title}>Log In</h1>
                <label className={styles.label}>Email:</label>
                <input
                  // type="email"
                  placeholder="abc@xyz.com"
                  className={styles.input}
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  onClick={() => setStatus("0")}
                  required
                />
                <label className={styles.label}>Password:</label>
                <input
                  type="password"
                  placeholder="P@ssw0rd"
                  className={styles.input}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  onClick={() => setStatus("0")}
                  required
                />
                {status === "-1" ? <p>{message}</p> : null}
                <button type="submit" className={styles.logIn}>
                  Login
                </button>
              </div>
              <Link href="register" className="text-sm">
                You do not have an account ? Sign Up.
              </Link>
            </form>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default Login;
