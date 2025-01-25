import DbOrganization from '../../types/data/organization';
import { DbConnect } from './connect/db_connect';
import { defaultKnexConnect } from './connect/knex_connect';

export default class OrganizationDb extends DbConnect<DbOrganization> {
    protected tableName = 'organization';
}

const defaultOrganizationDb = new OrganizationDb(defaultKnexConnect);
export { defaultOrganizationDb };
