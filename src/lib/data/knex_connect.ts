import knex from 'knex';
import KnexConfig from '../../types/knex/config';

export class KnexConnect {
    private connect;

    constructor(config: KnexConfig) {
        this.connect = knex(config);
    }

    public connector() {
        return this.connect;
    }
}

const defaultConfig: KnexConfig = {
    client: 'postgresql',
    connection: {
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD
    },
    pool: {
        min: 2,
        max: 10
    }
};

const defaultKnexConnect = new KnexConnect(defaultConfig);

export { defaultKnexConnect };
