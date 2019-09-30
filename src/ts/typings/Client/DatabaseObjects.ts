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

export interface Reminder {
    id: number,
    user: number,
    message: string,
    time: number
}