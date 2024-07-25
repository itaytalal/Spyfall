export interface Place{
    id:number,
    name:string,
    jobs:string[]
}
//not used fornow
export interface User{
    name:string,
    players:string[]|null,
    places:Place[]|null,
    spies: Number //1|2
}