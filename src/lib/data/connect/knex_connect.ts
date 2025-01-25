import knex, { Knex } from 'knex';
import defaultConfig from '../../../data/default_knex_config';

export class KnexConnect {
    connect: Knex;

    constructor(config: Knex.Config) {
        this.connect = knex(config);
    }

    public connector() {
        return this.connect;
    }
}

const defaultKnexConnect = new KnexConnect(defaultConfig);

export { defaultKnexConnect };
