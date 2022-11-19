import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>StS Tierlist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-[calc(100vh-3rem)] w-[100vw] flex-col items-center justify-start">
        <p className=" mt-24 text-7xl">Slay The Spire Tierlist</p>
        <p className=" mt-12 text-2xl">
          To contribute to the tierlist, go ahead and vote
        </p>
      </div>
    </>
  );
};

export default Home;
