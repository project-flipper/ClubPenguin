import { AvatarData } from "./avatar"
import { MembershipData } from "./membership"
import { PresenceData } from "./presence"
import { RelationshipData } from "./relationship"

export type BaseUserData = {
    id: string,
    username: string,
    nickname: string,
    avatar: AvatarData,
    member?: MembershipData,
    iglooId?: number,
    mascotId?: number
}

export type UserData = BaseUserData & {
    relationship?: RelationshipData,
    publicStampbook: boolean,
    presence?: PresenceData
}

export type MyUserData = BaseUserData & {
    moderator: boolean,
    iglooId: number,
    stealth: boolean
};

export type AnyUserData = UserData | MyUserData;
