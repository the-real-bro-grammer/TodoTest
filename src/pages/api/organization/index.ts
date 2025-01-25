import { NextApiRequest, NextApiResponse } from 'next';
import { defaultOrganizationDb } from '../../../lib/data/organization';
import { handleRequest } from '../../../lib/helpers/request_helpers';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    await handleRequest(req, res, { POST: post });
}

async function post(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { body } = req;

        const result = await defaultOrganizationDb.create(body);

        console.log(`Create organization ${JSON.stringify(body)}`);

        res.status(200).json({ success: result });
    } catch (error) {
        res.status(500).json(error);
    }
}
