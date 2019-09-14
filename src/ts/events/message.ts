import index = require("../index")
import { DirectInboxFeedResponseItemsItem, DirectInboxFeedResponseThreadsItem } from 'instagram-private-api/dist/responses';

module.exports.run = async (threadItem: DirectInboxFeedResponseThreadsItem, message: DirectInboxFeedResponseItemsItem) => {
    let thread = index.client.ig.entity.directThread(threadItem.thread_id)
    switch (message.item_type) {
        case "text":
            if (!message.text) return
            //Get User Object
            await index.client.db.asyncQuery!(`INSERT INTO users (id, username, rank) 
                        VALUES (?, ?, ?) 
                        ON DUPLICATE KEY UPDATE 
                        username = VALUES(username);`, [message.user_id, threadItem.users[0].username, 1])
            let user = (await index.client.db.asyncQuery!(`SELECT * FROM users WHERE id = ?`, message.user_id))[0]
            user.rank = (await index.client.db.asyncQuery!(`SELECT * FROM ranks WHERE id = ?`, user.rank))[0]
            console.log(`${user.username}: ${message.text}`)
            //Check if the message is a command
            if (!message.text.startsWith(index.config.prefix)) return
            let args = message.text.slice(index.config.prefix.length).split(/ +/g);
            let command = index.client.commands.registry[index.client.commands.map[args[0]]]
            if (!command) return
            args.shift()
            //Check for Banned User
            if (user.rank.name === "Banned")
                return thread.broadcastText(`You have been banned from using ${index.client.igLoggedIn.username}`)
            //Check Permission
            if (user.rank.hierachy < command.permission)
                return thread.broadcastText(`You don't have permission to use the ${index.config.prefix}${command.name} command.\nPermission Level Required: ${command.permission}`)
            //Run Command
            command.run(Object.assign(message, {
                user: user,
                args: args,
                thread: thread,
                threadItem: threadItem
            }))
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