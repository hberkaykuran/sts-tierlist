import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";

interface StSCard {
  id: number;
  name: string;
  details: string;
  image: string;
  stSClassId: number;
}

interface StSCardVote {
  id: number;
  class: string;
  upvotes: number;
  timesListed: number;
  cardId: number;
  card: StSCard;
}

export default function AllResults() {
  const [allCards, setAllCards] = useState<StSCardVote[]>([]);
  const [loading, setLoading] = useState(false);
  const classes: string[] = ["Ironclad", "Silent", "Defect", "Watcher"];
  function calcPercentage(a: number, b: number) {
    if (a == 0 || b == 0) return 0;
    return (a / b) * 100;
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get<StSCardVote[]>("https://sts-api.vercel.app/api/vote?class=All")
      .then((response: AxiosResponse) => {
        setAllCards(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>StS All Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-[calc(100vh-3rem)] w-[100vw] flex-col items-center justify-between overflow-y-scroll">
        <div className="mt-12 flex flex-col divide-y-2 divide-gray-500 border-2 border-gray-500">
          {!loading &&
            allCards
              .sort((a, b) => {
                return calcPercentage(b.upvotes, b.timesListed) -
                  calcPercentage(a.upvotes, a.timesListed) ==
                  0
                  ? b.upvotes - a.upvotes
                  : calcPercentage(b.upvotes, b.timesListed) -
                      calcPercentage(a.upvotes, a.timesListed);
              })
              .map((value, index) => (
                <div
                  className="flex flex-row items-center divide-x-2 divide-gray-500"
                  key={`card-${index}`}
                >
                  <div className="center flex h-full w-24 items-center justify-center">
                    <p className="mx-4">{value.card.name}</p>
                  </div>
                  <div className="center flex h-full w-48 items-center justify-center">
                    <img src={value.card.image} className="mx-10 my-5" />
                  </div>
                  <div className="center flex h-full w-64 items-center justify-center">
                    <p className="mx-4">{value.card.details}</p>
                  </div>
                  <div className="center flex h-full w-24 items-center justify-center">
                    <p className="mx-4">
                      {classes[(value.card.stSClassId as number) - 1]}
                    </p>
                  </div>
                  <div className="center flex h-full w-24 items-center justify-center">
                    <p className="mx-4">
                      {calcPercentage(
                        value.upvotes as number,
                        value.timesListed as number
                      )}{" "}
                      %
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
