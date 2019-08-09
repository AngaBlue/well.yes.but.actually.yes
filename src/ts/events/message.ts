import index = require("../index")
import { DirectInboxFeedResponseItemsItem } from 'instagram-private-api/dist/responses';
import { DirectThreadEntity } from 'instagram-private-api';

module.exports.run = async (thread: DirectThreadEntity, message: DirectInboxFeedResponseItemsItem) => {
    switch (message.item_type) {
        case "text":
            if (!message.text) return            
            console.log(message.text)
            if (!message.text.startsWith(index.config.prefix)) return
            let args = message.text.slice(index.config.prefix.length).split(/ +/g);
            let command = index.client.commands.registry[index.client.commands.map[args[0]]]
            if (!command) return
            switch (command.permission) {
                case "owner":
                    if (message.user_id !== index.config.owner) return thread.broadcastText("Only the bot owner can use this command.")
                    break
                case "everyone":
                    break
            }
            args.shift()
            command.run(thread, message, args)
            break;
        case "like":
            thread.broadcastText("❤️")
            break;
        case "media":
            //@ts-ignore
            console.log(message.media.image_versions2.candidates)
            break
        default:
            break;
    }
}