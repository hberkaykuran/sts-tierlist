import Head from "next/head";
import React,{ useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";

interface StSCard{
  id:number;
  name:string;
  details:string;
  image:string;
  stSClassId:number;
}

interface StSCardVote{
  id:number;
  class:string;
  upvotes:number;
  timesListed:number;
  cardId:number;
  card: StSCard;
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function All () {
  const [comparedCards, setComparedCards] = useState<StSCardVote[]>([]);
  const [allCards, setAllCards] = useState<StSCardVote[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  
    axios.get<StSCardVote[]>("https://sts-api.vercel.app/api/vote?class=All").then((response:AxiosResponse) => {
      setAllCards(response.data);
    
    })
  }, [])

  useEffect(() => {
    if(allCards.length > 0){
      refreshCards();
    }
  }, [allCards])  
  
  function refreshCards(){   
      var first = 0;
      var second = 0;
      first = Math.floor(Math.random() * allCards.length);
      do{
        second = Math.floor(Math.random() * allCards.length);
      }while(first == second);
      setComparedCards([allCards[first] as StSCardVote,allCards[second] as StSCardVote]);  
  }

  async function submitVote(upvote:number, downvote:number){
    setLoading(true);
    console.log(upvote + " " + downvote);
    axios.post(`https://sts-api.vercel.app/api/vote?class=All&upvoteId=${upvote}&downvoteId=${downvote}`); 
    refreshCards();
    await sleep(1250);
    setLoading(false);
  }
  
  return (
    <>
      <Head>
        <title>StS All Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-[100vw] h-[calc(100vh-3rem)] flex-col justify-between items-center">
        {comparedCards &&  (
          <div className={`flex flex-row space-x-10 justify-center mt-32 ${loading && "hidden"}`} >
            <div className="flex flex-col space-y-10 items-center">         
              <img src={comparedCards[0]?.card.image}/>
              <div className="w-24 h-12 bg-neutral-900 rounded-full flex items-center justify-center hoverAnimation" onClick={()=> submitVote(comparedCards[0]?.id as number,comparedCards[1]?.id as number)}>
                Card 1
              </div>
            </div>
            <div className="flex flex-col space-y-10 items-center">         
              <img src={comparedCards[1]?.card.image}/>
              <div className="w-24 h-12 bg-neutral-900 rounded-full flex items-center justify-center hoverAnimation" onClick={()=> submitVote(comparedCards[1]?.id as number,comparedCards[0]?.id as number)}>
                Card 2
              </div>
            </div>         
          </div>)
        }
        <div className={`flex flex-row space-x-10 justify-center mt-32 ${!loading && "hidden"}`}>
          <p className=" text-green-500 font-bold text-2xl"> Vote Submitted!</p>
        </div>
        <div className="mb-24 w-32 h-10 rounded-full bg-neutral-900 items-center justify-center flex text-lg hoverAnimation"><Link href="/All/Results">See results</Link> </div>
      </div>
    </>
  );
};