import index = require("../index")
import { DirectInboxFeedResponseItemsItem, DirectInboxFeedResponseThreadsItem } from 'instagram-private-api/dist/responses';

module.exports.run = async (threadItem: DirectInboxFeedResponseThreadsItem, message: DirectInboxFeedResponseItemsItem) => {
    let thread = index.client.ig.entity.directThread(threadItem.thread_id)
    switch (message.item_type) {
        case "text":
        case "link":
        case "reel_share":
            //@ts-ignore
            message.text = message.text || (message.link ? message.link.text : undefined) || (message.reel_share ? message.reel_share.text : undefined)
            if (!message.text) return
            //Get User Object
            let threadUser = threadItem.users.find(user => user.pk === message.user_id) || index.client.igLoggedIn
            await index.client.db.asyncQuery!(`INSERT INTO users (id, username, rank) 
                        VALUES (?, ?, ?) 
                        ON DUPLICATE KEY UPDATE 
                        username = VALUES(username);`, [message.user_id, threadUser.username, 1])
            let user = (await index.client.db.asyncQuery!(`SELECT * FROM users WHERE id = ?`, message.user_id))[0]
            user.rank = (await index.client.db.asyncQuery!(`SELECT * FROM ranks WHERE id = ?`, user.rank))[0]
            if (user.id !== index.client.igLoggedIn.pk)
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
            if (user.rank.permission < command.permission)
                return thread.broadcastText(`You don't have permission to use the ${index.config.prefix}${command.name.__bold()} command.\n${"Permission Level Required".__bold()}: ${command.permission}`)
            //Run Command
            try {
                command.run(Object.assign(message, {
                    user: user,
                    args: args,
                    argsString: message.text.slice(index.config.prefix.length).split(/ (.+)/)[1] || "",
                    thread: thread,
                    threadItem: threadItem,
                    threadUser: threadUser
                }))
            } catch (error) {
                index.client.events.emit("commandError", command, error)
            }
            break;
        case "like":
            thread.broadcastText("❤️")
            break;
        case "media":
            //@ts-ignore
            console.log(message.media.image_versions2.candidates)
            break
        case "raven_media":
        case "action_log":
            break;
        default:
            console.log(message)
            break;
    }
}