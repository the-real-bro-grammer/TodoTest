import { Knex } from 'knex';

const defaultConfig: Knex.Config = {
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

export default defaultConfig;
