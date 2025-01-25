import { NextApiRequest, NextApiResponse } from 'next';
import { defaultDbUsersInOrganization } from '../../../../../lib/data/users_in_organization';
import { handleRequest } from '../../../../../lib/helpers/request_helpers';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    await handleRequest(req, res, { GET: get });
}

async function get(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;

        const idValue = id[0];

        const organizations = await defaultDbUsersInOrganization.getOrganizations(
            parseInt(idValue)
        );

        console.log(`Get organizations ${id}`);

        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).json(error);
    }
}
