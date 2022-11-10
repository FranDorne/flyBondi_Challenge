import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import styles from "../styles/App.module.css";
import Image from "next/image";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenido a{" "}
          <Link href="/">
            <p>FlyBondi!</p>
          </Link>
        </h1>

        <p className={styles.description}>
          Encontra vuelos baratos desde tu origen
        </p>

        <Component {...pageProps} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
