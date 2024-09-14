import { ActionData } from "./action";
import { AnyUserData } from "./user";

export type PlayerData = {
    user: AnyUserData,
    x: number,
    y: number,
    action: ActionData
};
