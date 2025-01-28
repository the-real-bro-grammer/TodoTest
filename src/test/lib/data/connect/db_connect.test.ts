import { DbConnect } from '../../../../lib/data/connect/db_connect';
import { getMockKnexConnect } from '../../../mocks/lib/data/connect/knex_connect';

const tableName = 'test_table';
class TestDbClass extends DbConnect<any> {
    protected tableName = tableName;
}

describe('DbConnect', () => {
    test('create - handles null result gracefully', async () => {
        const insert = jest.fn().mockImplementation(() => null);
        const connect = getMockKnexConnect({ insert });
        const testObj = { foo: 'bar' };

        const testDbClass = new TestDbClass(connect);
        const result = await testDbClass.create(testObj);

        expect(result).toBe(false);
    });

    test('create - throws error and logs it', async () => {
        const insert = jest.fn().mockImplementation(() => {
            throw new Error('Insert failed');
        });
        const connect = getMockKnexConnect({ insert });
        const testObj = { foo: 'bar' };

        const testDbClass = new TestDbClass(connect);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const result = await testDbClass.create(testObj);

        expect(result).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(`Error creating entry in table ${tableName}:`),
            expect.any(Error)
        );
        consoleSpy.mockRestore();
    });

    test('read - returns null if no results', async () => {
        const where = jest.fn().mockImplementation(() => []);
        const connect = getMockKnexConnect({ where });

        const testDbClass = new TestDbClass(connect);
        const result = await testDbClass.read(1);

        expect(result).toBeNull();
    });

    test('read - throws error and logs it', async () => {
        const where = jest.fn().mockImplementation(() => {
            throw new Error('Read failed');
        });
        const connect = getMockKnexConnect({ where });

        const testDbClass = new TestDbClass(connect);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const result = await testDbClass.read(1);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(`Error reading entry in table ${tableName} with ID 1:`),
            expect.any(Error)
        );
        consoleSpy.mockRestore();
    });

    test('update - handles 0 affected rows', async () => {
        const where = jest.fn().mockReturnValue({
            update: jest.fn().mockImplementation(() => 0)
        });
        const connect = getMockKnexConnect({ where });

        const testDbClass = new TestDbClass(connect);
        const result = await testDbClass.update(1, { foo: 'bar' });

        expect(result).toBe(false);
    });

    test('update - throws error and logs it', async () => {
        const where = jest.fn().mockReturnValue({
            update: jest.fn().mockImplementation(() => {
                throw new Error('Update failed');
            })
        });
        const connect = getMockKnexConnect({ where });

        const testDbClass = new TestDbClass(connect);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const result = await testDbClass.update(1, { foo: 'bar' });

        expect(result).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(`Error updating entry in table ${tableName} with ID 1:`),
            expect.any(Error)
        );
        consoleSpy.mockRestore();
    });

    test('delete - handles 0 affected rows', async () => {
        const where = jest.fn().mockReturnValue({
            del: jest.fn().mockImplementation(() => 0)
        });
        const connect = getMockKnexConnect({ where });

        const testDbClass = new TestDbClass(connect);
        const result = await testDbClass.delete(1);

        expect(result).toBe(false);
    });

    test('delete - throws error and logs it', async () => {
        const where = jest.fn().mockReturnValue({
            del: jest.fn().mockImplementation(() => {
                throw new Error('Delete failed');
            })
        });
        const connect = getMockKnexConnect({ where });

        const testDbClass = new TestDbClass(connect);

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
        const result = await testDbClass.delete(1);

        expect(result).toBe(false);
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining(`Error deleting entry in table ${tableName} with ID 1:`),
            expect.any(Error)
        );
        consoleSpy.mockRestore();
    });
});
