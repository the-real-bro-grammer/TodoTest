import DbUserInOrganization from '../../types/data/user_in_organization';
import { defaultKnexConnect, KnexConnect } from './connect/knex_connect';

export class DbUsersInOrganization {
    protected connect: KnexConnect; // Database connection object
    protected tableName = 'usersinorganization'; // Name of the database table

    // Constructor initializing the database connection
    constructor(connect: KnexConnect) {
        this.connect = connect;
    }

    /**
     * Create a new user in an organization.
     * @param data - The data representing a user in an organization.
     * @returns A promise that resolves to a boolean indicating success or failure.
     */
    public async create(data: DbUserInOrganization): Promise<boolean> {
        try {
            const query = this.connect.connector().from(this.tableName); // Prepare insert query
            const results = await query.insert(data); // Execute insert operation
            return results != null; // Return true if insert was successful
        } catch (error) {
            console.error(`Error creating entry in table ${this.tableName}:`, error);
            return false; // Return false if an error occurred
        }
    }

    /**
     * Get all users associated with a specific organization.
     * @param organizationid - The ID of the organization.
     * @returns A promise that resolves to an array of user IDs or null if none found.
     */
    public async getUsers(organizationid: number): Promise<number[]> {
        try {
            const query = this.connect.connector().from(this.tableName); // Prepare select query
            const results = await query.where({ organizationid }); // Execute filter by organization ID
            return results.length > 0 ? results.map(({ userid }) => userid as number) : null; // Map results to user IDs or return null
        } catch (error) {
            console.error(
                `Error reading entry in table ${this.tableName} with ID ${organizationid}:`,
                error
            );
            return null; // Return null if an error occurred
        }
    }

    /**
     * Get all organizations associated with a specific user.
     * @param userid - The ID of the user.
     * @returns A promise that resolves to an array of organization IDs or null if none found.
     */
    public async getOrganizations(userid: number): Promise<number[]> {
        try {
            const query = this.connect.connector().from(this.tableName); // Prepare select query
            const results = await query.where({ userid }); // Execute filter by user ID
            return results.length > 0
                ? results.map(({ organizationid }) => organizationid as number)
                : null; // Map results to organization IDs or return null
        } catch (error) {
            console.error(
                `Error reading entry in table ${this.tableName} with ID ${userid}:`,
                error
            );
            return null; // Return null if an error occurred
        }
    }

    /**
     * Remove a user from an organization.
     * @param data - The data representing a user in an organization to be removed.
     * @returns A promise that resolves to a boolean indicating success or failure.
     */
    public async removeUserFromOrganization(data: DbUserInOrganization): Promise<boolean> {
        try {
            let query = this.connect.connector().from(this.tableName); // Prepare delete query
            query = query.where(data); // Filter by user and organization data
            const results = await query.del(); // Execute delete operation
            return results > 0; // Return true if delete was successful
        } catch (error) {
            console.error(
                `Error deleting entry in table ${this.tableName} with values ${JSON.stringify(
                    data
                )}:`,
                error
            );
            return false; // Return false if an error occurred
        }
    }
}

// Default instance of the DbUsersInOrganization using default connection
const defaultDbUsersInOrganization = new DbUsersInOrganization(defaultKnexConnect);

export { defaultDbUsersInOrganization };
