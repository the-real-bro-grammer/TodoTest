import HasId from '../has_id';

export default interface DbOrganization extends HasId {
    title: string;
    ownerid: number;
}
