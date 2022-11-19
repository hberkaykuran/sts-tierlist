import Head from "next/head";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { StSCardVote } from "../../utils/stsUtils";

export default function Ironclad() {
  const [comparedCards, setComparedCards] = useState<StSCardVote[]>([]);
  const [allCards, setAllCards] = useState<StSCardVote[]>([]);
  const [loading, setLoading] = useState(false);
  const [firstSet, setFirstSet] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get<StSCardVote[]>("https://sts-api.vercel.app/api/vote?class=Ironclad")
      .then((response: AxiosResponse) => {
        setAllCards(response.data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allCards.length > 0) refreshCards();
  }, [allCards]);

  function refreshCards() {
    if (comparedCards.length < 4) {
      var arr: number[] = [];
      while (arr.length < 4) {
        var r = Math.floor(Math.random() * allCards.length);
        if (arr.indexOf(r) == -1) arr.push(r);
      }
      setComparedCards([
        allCards[arr[0] as number] as StSCardVote,
        allCards[arr[1] as number] as StSCardVote,
        allCards[arr[2] as number] as StSCardVote,
        allCards[arr[3] as number] as StSCardVote,
      ]);
    } else {
      var first = 0;
      var second = 0;
      first = Math.floor(Math.random() * allCards.length);
      do {
        second = Math.floor(Math.random() * allCards.length);
      } while (first == second);
      if (firstSet) {
        setComparedCards([
          allCards[first] as StSCardVote,
          allCards[second] as StSCardVote,
          comparedCards[2] as StSCardVote,
          comparedCards[3] as StSCardVote,
        ]);
      } else {
        setComparedCards([
          comparedCards[0] as StSCardVote,
          comparedCards[1] as StSCardVote,
          allCards[first] as StSCardVote,
          allCards[second] as StSCardVote,
        ]);
      }
      setFirstSet(!firstSet);
    }
  }

  async function submitVote(upvote: number, downvote: number) {
    axios.post(
      `https://sts-api.vercel.app/api/vote?class=Ironclad&upvoteId=${upvote}&downvoteId=${downvote}`
    );
    refreshCards();
  }

  return (
    <>
      <Head>
        <title>StS All Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-[calc(100vh-3rem)] w-[100vw] flex-col items-center justify-between">
        {comparedCards && (
          <div
            className={`mt-32 flex flex-row justify-center space-x-10 ${
              loading && "hidden"
            }`}
          >
            <div className="flex flex-col items-center space-y-10">
              <img src={comparedCards[0]?.card.image} hidden={!firstSet} />
              <img src={comparedCards[2]?.card.image} hidden={firstSet} />
              <div
                className="hoverAnimation flex h-12 w-24 items-center justify-center rounded-full bg-neutral-900"
                onClick={() =>
                  submitVote(
                    comparedCards[0 + (firstSet ? 0 : 2)]?.id as number,
                    comparedCards[1 + (firstSet ? 0 : 2)]?.id as number
                  )
                }
              >
                Card 1
              </div>
            </div>
            <div className="flex flex-col items-center space-y-10">
              <img src={comparedCards[1]?.card.image} hidden={!firstSet} />
              <img src={comparedCards[3]?.card.image} hidden={firstSet} />
              <div
                className="hoverAnimation flex h-12 w-24 items-center justify-center rounded-full bg-neutral-900"
                onClick={() =>
                  submitVote(
                    comparedCards[1 + (firstSet ? 0 : 2)]?.id as number,
                    comparedCards[0 + (firstSet ? 0 : 2)]?.id as number
                  )
                }
              >
                Card 2
              </div>
            </div>
          </div>
        )}
        <div className="hoverAnimation absolute bottom-24 flex h-10 w-32 items-center justify-center rounded-full bg-neutral-900 text-lg">
          <Link href="/Ironclad/Results">See results</Link>{" "}
        </div>
      </div>
    </>
  );
}
