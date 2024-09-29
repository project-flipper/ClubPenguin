export enum RelationshipType {
    IGNORED = 'ignored',
    PENDING = 'pending',
    FRIEND = 'friend',
    BEST_FRIEND = 'bestfriend'
}

export type RelationshipData = {
    type: RelationshipType,
    since: string
};
