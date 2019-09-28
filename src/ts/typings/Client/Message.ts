import { DirectInboxFeedResponseItemsItem, DirectInboxFeedResponseThreadsItem, DirectInboxFeedResponseUsersItem, AccountRepositoryLoginResponseLogged_in_user } from "instagram-private-api/dist/responses";
import { User } from "./DatabaseObjects";
import {  DirectThreadEntity } from "instagram-private-api";

export interface Message extends DirectInboxFeedResponseItemsItem {
    user: User
    thread: DirectThreadEntity
    threadItem: DirectInboxFeedResponseThreadsItem
    threadUser: DirectInboxFeedResponseUsersItem | AccountRepositoryLoginResponseLogged_in_user
    args: string[]
    argsString: string
}