import { DbConnect } from '../../../../lib/data/connect/db_connect';
import { getMockKnexConnect } from '../../../mocks/lib/data/connect/knex_connect';

class TestDbClass extends DbConnect<any> {
    protected tableName = 'test_table';
}

describe('db_connect', () => {
    test('create', async () => {
        const insert = jest.fn().mockImplementation((data: any) => [1]);
        const connect = getMockKnexConnect({ insert });
        const testObj = { foo: 'bar' };

        const testDbClass = new TestDbClass(connect);
        const result = await testDbClass.create(testObj);

        expect(result).toBe(true);
    });

    test('read', async () => {
        const testObj = { foo: 'bar' };
        const where = jest.fn().mockImplementation((data: any) => [testObj]);
        const connect = getMockKnexConnect({ where });

        const testDbClass = new TestDbClass(connect);
        const result = await testDbClass.read(1);

        expect(result).toEqual(testObj);
    });

    test('update', async () => {
        const testObj = { foo: 'bar' };
        const where = jest.fn().mockReturnValue({
            update: jest.fn().mockImplementation((data: any) => [1])
        });

        const connect = getMockKnexConnect({ where });

        const testDbClass = new TestDbClass(connect);
        const result = await testDbClass.update(1, testObj);

        expect(result).toBe(true);
    });

    test('delete', async () => {
        const where = jest.fn().mockReturnValue({
            del: jest.fn().mockImplementation(() => [1])
        });

        const connect = getMockKnexConnect({ where });

        const testDbClass = new TestDbClass(connect);
        const result = await testDbClass.delete(1);

        expect(result).toBe(true);
    });
});
