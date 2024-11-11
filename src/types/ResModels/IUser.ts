import { ICandidate } from "./ICandidate"

export interface IUser {
    username  : string,
    password  : string,
    age       : number,
    isAdmin?  : boolean,
    hasVoted? : boolean,
    votedFor? : ICandidate
}