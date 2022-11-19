export interface StSCard {
  id: number;
  name: string;
  details: string;
  image: string;
  stSClassId: number;
}

export interface StSCardVote {
  id: number;
  class: string;
  upvotes: number;
  timesListed: number;
  cardId: number;
  card: StSCard;
}
