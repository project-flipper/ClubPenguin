import { Avatar } from "./avatar"
import { Membership } from "./membership"
import { Presence } from "./presence"
import { Relationship } from "./relationship"

export type BasePenguinData = {
    id: string,
    name: string,
    avatar: Avatar,
    member?: Membership,
    iglooId?: number,
    mascotId?: number
}

export type PenguinData = BasePenguinData & {
    relationship?: Relationship,
    publicStampbook: boolean,
    presence?: Presence
}

export type MyPenguinData = BasePenguinData & {
    moderator: boolean,
    iglooId: number,
    stealth: boolean
};
