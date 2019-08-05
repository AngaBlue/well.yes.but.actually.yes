import { IgApiClient } from 'instagram-private-api';
import { EventEmitter } from "events";
import { CommandHandler } from './Client/CommandHandler'

export interface Client {
    ig: IgApiClient
    events: EventEmitter
    commands: CommandHandler
}

export class Client {
    constructor() {
        this.ig = new IgApiClient
        this.commands = new CommandHandler
        this.events = new EventEmitter
    }
}