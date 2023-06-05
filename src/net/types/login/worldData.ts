export type WorldDataPayload = {
    worlds: {
        id: number,
        name: string,
        population: number,
        safeChat: boolean,
        buddies: boolean
    }[],
    token: string
};