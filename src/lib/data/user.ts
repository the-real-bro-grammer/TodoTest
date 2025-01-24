import DbUser from '../../types/data/user';
import { DbConnect } from './connect/db_connect';
import { defaultKnexConnect } from './connect/knex_connect';

export class UserDb extends DbConnect<DbUser> {
    protected tableName: string = 'users';
}

const defaultUserDb = new UserDb(defaultKnexConnect);
export { defaultUserDb };
