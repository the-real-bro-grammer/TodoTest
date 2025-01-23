import HasId from './has_id';

export default interface Task extends HasId {
    title: string;
    description: string;
    creatorId: number;
    assignee: number;
    creationDate: Date;
    status: string;
}
