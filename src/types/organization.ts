import HasId from './has_id';

export default interface Organization extends HasId {
    title: string;
    ownerId: number;
}
