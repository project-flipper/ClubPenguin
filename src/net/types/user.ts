import { AvatarData } from "./avatar"
import { MembershipData } from "./membership"
import { PresenceData } from "./presence"
import { RelationshipData } from "./relationship"

export type BaseUserData = {
    id: number,
    username: string,
    nickname: string,
    avatar: AvatarData,
    member?: MembershipData,
    igloo_id?: number,
    mascot_id?: number
}

export type UserData = BaseUserData & {
    relationship?: RelationshipData,
    public_stampbook: boolean,
    presence?: PresenceData
}

export type MyUserData = BaseUserData & {
    igloo_id: number,
    is_moderator: boolean,
    is_stealth: boolean
};

export type AnyUserData = UserData | MyUserData;
