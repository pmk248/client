import { ICandidate } from "./ICandidate"

export interface IUser { 
    username  : string;
    age       : number;
    hasVoted? : boolean;
    votedFor? : ICandidate | null;
}