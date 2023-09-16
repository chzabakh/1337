import React from "react";
import styles from "../styles/contact.module.css";
import Image from "next/image";
import bg from "@/../public/bg.png";
import SmallButton from "../components/Button/smallButton";
import Layout from "@/components/Layout/layout";

const Contact = () => {

  return (
    <div className="containera">
      <Layout>
        <div className={styles.container}>
          <div>
            <Image alt="" src={bg} className={styles.imge} />
          </div>
          <form className={styles.form}>
            <input placeholder="Name" className={styles.input} type="text" />
            <input placeholder="Email" className={styles.input} type="text" />
            <textarea placeholder="Your message" className={styles.text} />
            <SmallButton url="send" text="Send" />
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Contact;
