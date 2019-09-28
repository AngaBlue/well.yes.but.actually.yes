import { IgApiClient } from 'instagram-private-api';
import { EventEmitter } from "events";
import { CommandHandler } from './Client/CommandHandler';
import { AccountRepositoryLoginResponseLogged_in_user } from 'instagram-private-api/dist/responses';
import * as Database from "./Database";

export interface Client {
    ig: IgApiClient
    events: EventEmitter
    commands: CommandHandler
    igLoggedIn: AccountRepositoryLoginResponseLogged_in_user
    db: Database.Database
    created: number;
}

export class Client {
    constructor() {
        this.ig = new IgApiClient
        this.commands = new CommandHandler
        this.events = new EventEmitter
        this.created = Date.now()
    }
    async connectDB(dbConfig: Database.DatabaseConfig): Promise<any> {
        this.db = await Database.connect(dbConfig)
        return;
    } 
    async logOn(username: string, password: string): Promise<any> {
        this.ig.state.generateDevice(username);
        await this.ig.simulate.preLoginFlow();
        this.igLoggedIn = await this.ig.account.login(username, password);
        this.events.emit("loggedIn")
        return;
    }
}