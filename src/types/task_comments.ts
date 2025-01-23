import HasId from './has_id';

export default interface TaskComments extends HasId {
    comments: string;
    authorId: number;
    creationDate: Date;
}
