import { DbUsersInOrganization } from '../../../lib/data/users_in_organization';
import { getMockKnexConnect } from '../../mocks/lib/data/connect/knex_connect';

describe('DbUsersInOrganization', () => {
    const tableName = 'usersinorganization'; // Name of the database table

    /**
     * Test: Ensures that the 'create' method returns false when it receives a null result.
     */
    test('create - handles null result gracefully', async () => {
        const insert = jest.fn().mockImplementation(() => null); // Mock insert function to return null
        const connect = getMockKnexConnect({ insert }); // Create mock connection
        const testObj = { userid: 1, organizationid: 2 }; // Test data

        const dbUsersInOrganization = new DbUsersInOrganization(connect); // Instance of DbUsersInOrganization
        const result = await dbUsersInOrganization.create(testObj); // Call create method

        expect(result).toBe(false); // Expect the result to be false
    });

    /**
     * Test: Validates that when the 'create' method throws an error, it logs the error and returns false.
     */
    test('create - throws error and logs it', async () => {
        const insert = jest.fn().mockImplementation(() => {
            throw new Error('Insert failed');
        });
        const connect = getMockKnexConnect({ insert }); // Create mock connection
        const testObj = { userid: 1, organizationid: 2 }; // Test data

        const dbUsersInOrganization = new DbUsersInOrganization(connect); // Instance of DbUsersInOrganization

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(); // Spy on console.error
        const result = await dbUsersInOrganization.create(testObj); // Call create method

        expect(result).toBe(false); // Expect the result to be false
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(`Error creating entry in table ${tableName}:`),
            expect.any(Error)
        );
        consoleSpy.mockRestore(); // Restore console.error
    });

    /**
     * Test: Checks that the 'getUsers' method returns null if no results are found for a given organization ID.
     */
    test('getUsers - returns null if no results', async () => {
        const where = jest.fn().mockImplementation(() => []); // Mock where function to return empty array
        const connect = getMockKnexConnect({ where }); // Create mock connection

        const dbUsersInOrganization = new DbUsersInOrganization(connect); // Instance of DbUsersInOrganization
        const result = await dbUsersInOrganization.getUsers(2); // Call getUsers method with org ID 2

        expect(result).toBeNull(); // Expect the result to be null
    });

    /**
     * Test: Confirms that the 'getUsers' method logs errors and returns null when an error occurs.
     */
    test('getUsers - throws error and logs it', async () => {
        const where = jest.fn().mockImplementation(() => {
            throw new Error('Read failed');
        });
        const connect = getMockKnexConnect({ where }); // Create mock connection

        const dbUsersInOrganization = new DbUsersInOrganization(connect); // Instance of DbUsersInOrganization

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(); // Spy on console.error
        const result = await dbUsersInOrganization.getUsers(2); // Call getUsers method with org ID 2

        expect(result).toBeNull(); // Expect the result to be null
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(`Error reading entry in table ${tableName} with ID 2:`),
            expect.any(Error)
        );
        consoleSpy.mockRestore(); // Restore console.error
    });

    /**
     * Test: Validates that 'getOrganizations' returns null when there are no organizations for a user ID.
     */
    test('getOrganizations - returns null if no results', async () => {
        const where = jest.fn().mockImplementation(() => []); // Mock where function to return empty array
        const connect = getMockKnexConnect({ where }); // Create mock connection

        const dbUsersInOrganization = new DbUsersInOrganization(connect); // Instance of DbUsersInOrganization
        const result = await dbUsersInOrganization.getOrganizations(1); // Call getOrganizations with user ID 1

        expect(result).toBeNull(); // Expect the result to be null
    });

    /**
     * Test: Ensures that 'getOrganizations' logs an error and returns null if an error occurs.
     */
    test('getOrganizations - throws error and logs it', async () => {
        const where = jest.fn().mockImplementation(() => {
            throw new Error('Read failed');
        });
        const connect = getMockKnexConnect({ where }); // Create mock connection

        const dbUsersInOrganization = new DbUsersInOrganization(connect); // Instance of DbUsersInOrganization

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(); // Spy on console.error
        const result = await dbUsersInOrganization.getOrganizations(1); // Call getOrganizations with user ID 1

        expect(result).toBeNull(); // Expect the result to be null
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(`Error reading entry in table ${tableName} with ID 1:`),
            expect.any(Error)
        );
        consoleSpy.mockRestore(); // Restore console.error
    });

    /**
     * Test: Checks that 'removeUserFromOrganization' returns false if no rows are affected by the deletion.
     */
    test('removeUserFromOrganization - handles 0 affected rows', async () => {
        const where = jest.fn().mockReturnValue({
            del: jest.fn().mockImplementation(() => 0) // Mock delete to return 0 affected rows
        });
        const connect = getMockKnexConnect({ where }); // Create mock connection

        const dbUsersInOrganization = new DbUsersInOrganization(connect); // Instance of DbUsersInOrganization
        const result = await dbUsersInOrganization.removeUserFromOrganization({
            userid: 1,
            organizationid: 2
        }); // Attempt to remove user from organization

        expect(result).toBe(false); // Expect the result to be false
    });

    /**
     * Test: Verifies that 'removeUserFromOrganization' logs an error and returns false when an error occurs.
     */
    test('removeUserFromOrganization - throws error and logs it', async () => {
        const where = jest.fn().mockReturnValue({
            del: jest.fn().mockImplementation(() => {
                throw new Error('Delete failed');
            })
        });
        const connect = getMockKnexConnect({ where }); // Create mock connection

        const dbUsersInOrganization = new DbUsersInOrganization(connect); // Instance of DbUsersInOrganization

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(); // Spy on console.error
        const result = await dbUsersInOrganization.removeUserFromOrganization({
            userid: 1,
            organizationid: 2
        }); // Attempt to remove user from organization

        expect(result).toBe(false); // Expect the result to be false
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(
                `Error deleting entry in table ${tableName} with values {"userid":1,"organizationid":2}:`
            ),
            expect.any(Error)
        );
        consoleSpy.mockRestore(); // Restore console.error
    });
});
