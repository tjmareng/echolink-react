export interface AppState{
    message: String;
    users: Array<User>;
}

export interface User {
    id: any;
    username: any;
    room: any;
}

export const CONTAINER_KEY: string = "container/Chat";