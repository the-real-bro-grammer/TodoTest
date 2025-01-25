import { Knex } from 'knex';
import { KnexConnect } from '../../../../../lib/data/connect/knex_connect';

export const getMockKnexConnect = (queries?: Partial<Knex.QueryBuilder<any, any>>): KnexConnect => {
    const mockKnexConnector: Partial<Knex> = {
        from: jest.fn().mockReturnValue({ ...queries })
    };

    const mockConnect: KnexConnect = {
        connect: undefined,
        connector: jest.fn(() => mockKnexConnector as Knex)
    };

    return mockConnect;
};
