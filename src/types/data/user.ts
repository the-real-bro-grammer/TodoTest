import HasId from '../has_id';

export default interface DbUser extends HasId {
    email: string;
    passwordhash: string;
    passwordsalt: string;
}
