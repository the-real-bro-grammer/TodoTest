import { NextApiRequest, NextApiResponse } from 'next';
import { defaultOrganizationDb } from '../../../../lib/data/organization';
import { handleRequest } from '../../../../lib/helpers/request_helpers';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    await handleRequest(req, res, { GET: get, PUT: put, DELETE: del });
}

async function get(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;

        const idValue = id[0];

        const organization = await defaultOrganizationDb.read(parseInt(idValue));

        console.log(`Get organization ${organization}`);

        res.status(200).json(organization);
    } catch (error) {
        res.status(500).json(error);
    }
}

async function put(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const { body } = req;

        const idValue = id[0];

        const success = await defaultOrganizationDb.update(parseInt(idValue), body);

        console.log(`Update organization ${JSON.stringify(body)} ${success}`);

        res.status(200).json({ success });
    } catch (error) {
        res.status(500).json(error);
    }
}

async function del(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;

        const idValue = id[0];

        const success = await defaultOrganizationDb.delete(parseInt(idValue));

        console.log(`Delete organization ${id}`);

        res.status(200).json({ success });
    } catch (error) {
        res.status(500).json(error);
    }
}
