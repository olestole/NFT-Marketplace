import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Head>
        <title>NFT marketplace</title>
        <meta name="description" content="NFT marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col bg-gray-700 rounded p-8 text-white">
        <h1>Halla</h1>
        <p>Hvordan går det?</p>
        <Link href="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default Home;
