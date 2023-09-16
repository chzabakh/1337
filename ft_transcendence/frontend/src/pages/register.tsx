import React from "react";
import styles from "../styles/register.module.css";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import fourty from "../../public/fourty.png";
import gog from "../../public/google.png";
import Layout from "@/components/Layout/layout";
import { Route } from "react-router-dom";
import { useRouter } from "next/router";
import Stars from "@/components/Sections/stars";

export const Register = () => {
  const router = useRouter();
  const [status, setStatus] = useState("0");
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    nickname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postData(data);
  };

  const postData = (data: {
    nickname: string;
    email: string;
    password: string;
  }) => {
    axios
      .post("http://localhost:9000/auth/register", data)
      .then((res: any) => {
        setStatus("1");
        setMessage("Created successfully");
        router.push("/login");
      })
      .catch((err: any) => {
        setStatus("-1");
        setMessage(err?.response?.data?.message);
      });
  };

  return (
    <>
    <Stars />
    <div className="flex flex-col overflow-y-hidden justify-between max-w-full md:mx-[6rem]  h-full lg:h-screen max-h-full">
      <Layout>
        <div className="flex overflow-y-hidden w-[100%] flex-col items-center gap-4 justify-center relative mb-2">
          <div className={styles.auth}>
          </div>
          <form className={styles.formy} onSubmit={handleSubmit}>
            <div className={styles.infos}>
              <h1 className={styles.title}>Sign Up</h1>
              <label className={styles.label}>Username:</label>
              <input
                type="nickname"
                placeholder="TheLegend27"
                className={styles.input}
                name="nickname"
                value={data.nickname}
                onChange={handleChange}
                required
              />

              <label className={styles.label}>Email:</label>
              <input
                type="email"
                placeholder="qwe@qwe.com"
                className={styles.input}
                name="email"
                value={data.email}
                onChange={handleChange}
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
                required
              />

              {status === "1" ? <p>{message}</p> : null}
              {status === "-1" ? <p>{message}</p> : null}

              <button type="submit" className={styles.register}>
                Register
              </button>
              
            <Link href="login" className="text-xs">Already have an account ? Log In.</Link>
            </div>
          </form>
        </div>
      </Layout>
    </div>
    </>
  );
};

export default Register;
