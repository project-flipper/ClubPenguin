export enum RelationshipType {
    IGNORED = 'ignored',
    PENDING = 'pending',
    FRIEND = 'friend',
    BEST_FRIEND = 'bestfriend'
}

export type Relationship = {
    type: RelationshipType,
    since: string
};
