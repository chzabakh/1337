"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import SmallButton from "../Button/smallButton";

const link = [
  {
    id: 1,
    title: "Home",
    url: "/",
  }
];

const Navbar = () => {
  return (
    <div className={styles.container} id="home">
      <Link href="/">
        <svg
          height="27"
          viewBox="0 0 166 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.logo}
        >
          <path
            d="M36.791 25.209H32.209V29.791H13.791V39H4.60449V6.79102H32.209V11.3955H36.791V25.209ZM27.6045 25.209V11.3955H13.791V25.209H27.6045ZM78.209 34.3955H73.627V39H50.627V34.3955H46.0225V11.3955H50.627V6.79102H73.627V11.3955H78.209V34.3955ZM69.0225 34.3955V11.3955H55.209V34.3955H69.0225ZM119.627 39H110.44V29.791H105.836V25.209H101.231V20.6045H96.627V39H87.4404V6.79102H96.627V11.3955H101.231V16H105.836V20.6045H110.44V6.79102H119.627V39ZM161.045 34.3955H156.463V39H133.463V34.3955H128.858V11.3955H133.463V6.79102H161.045V11.3955H138.045V34.3955H151.858V25.209H142.649V20.6045H161.045V34.3955Z"
            fill="white"
          />
        </svg>
      </Link>
      <div className={styles.links}>
        {link.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
      </div>
      <div className={styles.about}>
      <SmallButton url="about" text="About Us"/>
      </div>
    </div>
  );
};

export default Navbar;
