import KnexConnection from './connection';
import KnexPool from './pool';

export default interface KnexConfig {
    client: string;
    connection: KnexConnection;
    pool: KnexPool;
}
