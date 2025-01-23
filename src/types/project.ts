import HasId from './has_id';

export default interface Project extends HasId {
    title: string;
    organizationId: number;
    projectOwnerId: number;
}
