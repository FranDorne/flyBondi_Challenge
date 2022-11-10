import { GetStaticProps } from "next";
import Link from "next/link";

import api from "../api";
import styles from "../styles/App.module.css";
import { Flight } from "../types";

type Props = {
  origins: Flight["origin"][];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const origins = await api.origin.list();

  return {
    props: {
      origins,
    },
  };
};

export default function Home<Props>({origins}: any) {
  console.log(origins);
  return (
    <div className={styles.grid}>
          {origins.map((origin: any) => (
            <Link key={origin} href={`/${origin}`}>
            <div className={styles.card}>
              <h2>{origin} &rarr;</h2>
            </div>
          </Link>
          ))}
        </div>
  );
}