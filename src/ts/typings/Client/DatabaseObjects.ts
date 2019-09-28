export interface User {
    id: number,
    username: string,
    rank: Rank
}

export interface Rank {
    id: number,
    name: string,
    permission: number
}
