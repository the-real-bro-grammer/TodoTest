import DbUserInOrganization from '../../types/data/user_in_organization';
import { defaultKnexConnect, KnexConnect } from './connect/knex_connect';

export class DbUsersInOrganization {
    protected connect: KnexConnect;
    protected tableName = 'usersinorganization';

    // Constructor initializing the database connection
    constructor(connect: KnexConnect) {
        this.connect = connect;
    }

    public async create(data: DbUserInOrganization): Promise<boolean> {
        try {
            const query = this.connect.connector().from(this.tableName);
            const results = await query.insert(data);
            return results != null;
        } catch (error) {
            console.error(`Error creating entry in table ${this.tableName}:`, error);
            return false;
        }
    }

    public async getUsers(organizationid: number): Promise<number[]> {
        try {
            const query = this.connect.connector().from(this.tableName);
            const results = await query.where({ organizationid });
            return results.length > 0 ? results.map(({ userid }) => userid as number) : null;
        } catch (error) {
            console.error(
                `Error reading entry in table ${this.tableName} with ID ${organizationid}:`,
                error
            );
            return null;
        }
    }

    public async getOrganizations(userid: number): Promise<number[]> {
        try {
            const query = this.connect.connector().from(this.tableName);
            const results = await query.where({ userid });
            return results.length > 0
                ? results.map(({ organizationid }) => organizationid as number)
                : null;
        } catch (error) {
            console.error(
                `Error reading entry in table ${this.tableName} with ID ${userid}:`,
                error
            );
            return null;
        }
    }

    public async removeUserFromOrganization(data: DbUserInOrganization): Promise<boolean> {
        try {
            let query = this.connect.connector().from(this.tableName);
            query = query.where(data);
            const results = await query.del();
            return results > 0;
        } catch (error) {
            console.error(
                `Error deleting entry in table ${this.tableName} with values ${JSON.stringify(
                    data
                )}:`,
                error
            );
            return false;
        }
    }
}

const defaultDbUsersInOrganization = new DbUsersInOrganization(defaultKnexConnect);

export { defaultDbUsersInOrganization };
