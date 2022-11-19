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

export default function WatcherResults() {
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
      .get<StSCardVote[]>("https://sts-api.vercel.app/api/vote?class=Watcher")
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
      <div className="resultPageWrapper">
        <div className="resultHeader">
          <div className="resultRowItem w-24">Card Name</div>
          <div className="resultRowItem w-48">Card</div>
          <div className="resultRowItem w-64">Details</div>
          <div className="resultRowItem w-24">Class</div>
          <div className="resultRowItem w-[7.5rem]">Pick %</div>
        </div>
        <div className="invisible-scrollbar resultTable">
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
                <div className="resultTableRow" key={`card-${index}`}>
                  <div className="resultRowItem w-24">
                    <p className="mx-4">{value.card.name}</p>
                  </div>
                  <div className="resultRowItem w-48">
                    <img src={value.card.image} className="mx-10 my-5" />
                  </div>
                  <div className="resultRowItem w-64">
                    <p className="mx-4">{value.card.details}</p>
                  </div>
                  <div className="resultRowItem w-24">
                    <p className="mx-4">
                      {classes[(value.card.stSClassId as number) - 1]}
                    </p>
                  </div>
                  <div className="resultRowItem w-28">
                    <p className="mx-4">
                      {calcPercentage(
                        value.upvotes as number,
                        value.timesListed as number
                      ).toFixed(2)}{" "}
                      %
                    </p>
                  </div>
                </div>
              ))}
        </div>
        <Link href="/Watcher">
          <div className="hoverAnimation resultGoBackButton">
            Go back to voting
          </div>
        </Link>
      </div>
    </>
  );
}
