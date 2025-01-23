import DbUser from '../../types/data/user';
import HasCrud from './has_crud';
import { defaultKnexConnect, KnexConnect } from './knex_connect';

const tableName: string = 'users';
export class UserDb implements HasCrud<DbUser> {
    private connect: KnexConnect;

    constructor(connect: KnexConnect) {
        this.connect = connect;
    }

    public async create(data: DbUser): Promise<boolean> {
        var results = await this.connect.connector()(tableName).insert(data);
        return results[0] != null;
    }

    public async read(id: number): Promise<DbUser> {
        const results = await this.connect.connector()(tableName).where({ id });
        return results[0];
    }

    public async update(id: number, data: DbUser): Promise<boolean> {
        const results = await this.connect.connector()(tableName).where({ id }).update(data);
        return results[0] != null;
    }

    public async delete(id: number): Promise<boolean> {
        const results = await this.connect.connector()(tableName).where({ id }).del();
        return results[0] != null;
    }
}

const defaultUserDb = new UserDb(defaultKnexConnect);
export { defaultUserDb };
