import { NextApiRequest, NextApiResponse } from 'next';
import { defaultUserDb } from '../../../../lib/data/user';
import { handleRequest } from '../../../../lib/helpers/request_helpers';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    await handleRequest(req, res, { GET: get, PUT: put, DELETE: del });
}

async function get(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;

        const idValue = id[0];

        const user = await defaultUserDb.read(parseInt(idValue));

        console.log(`Get user ${user}`);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function put(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const { body } = req;

        const idValue = id[0];

        const success = await defaultUserDb.update(parseInt(idValue), body);

        console.log(`Update user ${JSON.stringify(body)} ${success}`);

        res.status(200).json({ success });
    } catch (error) {
        res.status(500).json(error);
    }
}

async function del(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;

        const idValue = id[0];

        const success = await defaultUserDb.delete(parseInt(idValue));

        console.log(`Delete user ${id}`);

        res.status(200).json({ success });
    } catch (error) {
        res.status(500).json(error);
    }
}
