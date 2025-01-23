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

async function put(req: NextApiRequest, res: NextApiResponse) {}

async function del(req: NextApiRequest, res: NextApiResponse) {}
