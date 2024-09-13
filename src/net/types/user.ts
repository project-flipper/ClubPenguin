import { Avatar } from "./avatar"
import { Membership } from "./membership"
import { Presence } from "./presence"
import { Relationship } from "./relationship"

export type BaseUserData = {
    id: string,
    username: string,
    nickname: string,
    avatar: Avatar,
    member?: Membership,
    iglooId?: number,
    mascotId?: number
}

export type UserData = BaseUserData & {
    relationship?: Relationship,
    publicStampbook: boolean,
    presence?: Presence
}

export type MyUserData = BaseUserData & {
    moderator: boolean,
    iglooId: number,
    stealth: boolean
};
