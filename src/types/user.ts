import HasId from './has_id';

export default interface User extends HasId {
    email: string;
}
