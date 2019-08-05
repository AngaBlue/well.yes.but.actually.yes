import { DirectThreadEntity } from "instagram-private-api";
import { DirectInboxFeedResponseItemsItem } from "instagram-private-api/dist/responses";

export interface Command {
    path: string,
    name: string,
    aliases: string[],
    usage: string[],
    description: string,
    permission: string,
    run(thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem, args: string[]): Promise<any>,
}

export class Command {
    constructor(path: string) {
        let commandFile = require(path)
        if (!commandFile || commandFile.name) throw new Error(`Unknown/Invalid Command File at "${path}"`)
        this.path = path
        this.name = commandFile.name
        this.aliases = commandFile.aliases || []
        this.description = commandFile.description || ""
        this.usage = commandFile.usage || commandFile.name
        this.permission = commandFile.permission || "everyone"
        this.run = commandFile.run || (() => { })
    }
}
