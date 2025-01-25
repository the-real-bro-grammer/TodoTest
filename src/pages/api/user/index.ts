import { NextApiRequest, NextApiResponse } from 'next';
import { defaultUserDb } from '../../../lib/data/user';
import { handleRequest } from '../../../lib/helpers/request_helpers';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    await handleRequest(req, res, { POST: post });
}

async function post(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { body } = req;

        const user = await defaultUserDb.create(body);

        console.log(`Create user ${user}`);

        res.status(200).json({ success: user });
    } catch (error) {
        res.status(500).json(error);
    }
}
