import IHasCrud from './i_has_crud';
import { KnexConnect } from './knex_connect';

// Abstract class representing a database connection with CRUD operations
export abstract class DbConnect<TData> implements IHasCrud<TData> {
    protected connect: KnexConnect;
    protected abstract tableName: string;

    // Constructor initializing the database connection
    constructor(connect: KnexConnect) {
        this.connect = connect;
    }

    /**
     * Creates a new entry in the database.
     * @param data - The data to be inserted into the table.
     * @returns Promise<boolean> - Returns true if the insert is successful, false otherwise.
     */
    public async create(data: TData): Promise<boolean> {
        try {
            const results = await this.connect.connector()(this.tableName).insert(data);
            return results != null;
        } catch (error) {
            console.error(`Error creating entry in table ${this.tableName}:`, error);
            return false;
        }
    }

    /**
     * Reads an entry from the database based on ID.
     * @param id - The ID of the record to be retrieved.
     * @returns Promise<TData | null> - Returns the data if found, otherwise null.
     */
    public async read(id: number): Promise<TData | null> {
        try {
            const results = await this.connect.connector()(this.tableName).where({ id });
            return results.length > 0 ? results[0] : null;
        } catch (error) {
            console.error(`Error reading entry in table ${this.tableName} with ID ${id}:`, error);
            return null;
        }
    }

    /**
     * Updates an entry in the database.
     * @param id - The ID of the record to be updated.
     * @param data - The new data to update in the table.
     * @returns Promise<boolean> - Returns true if the update is successful, false otherwise.
     */
    public async update(id: number, data: TData): Promise<boolean> {
        try {
            const results = await this.connect
                .connector()(this.tableName)
                .where({ id })
                .update(data);
            return results > 0;
        } catch (error) {
            console.error(`Error updating entry in table ${this.tableName} with ID ${id}:`, error);
            return false;
        }
    }

    /**
     * Deletes an entry from the database.
     * @param id - The ID of the record to be deleted.
     * @returns Promise<boolean> - Returns true if the delete is successful, false otherwise.
     */
    public async delete(id: number): Promise<boolean> {
        try {
            const results = await this.connect.connector()(this.tableName).where({ id }).del();
            return results > 0;
        } catch (error) {
            console.error(`Error deleting entry in table ${this.tableName} with ID ${id}:`, error);
            return false;
        }
    }
}
