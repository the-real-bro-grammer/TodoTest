import { NextApiRequest, NextApiResponse } from 'next';
import { defaultDbUsersInOrganization } from '../../../../../../lib/data/users_in_organization';
import { handleRequest } from '../../../../../../lib/helpers/request_helpers';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    await handleRequest(req, res, { POST: post, DELETE: del });
}

async function post(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, userId } = req.query;
        const idValue = parseInt(id[0]);
        const userIdValue = parseInt(userId[0]);

        const result = await defaultDbUsersInOrganization.create({
            organizationid: idValue,
            userid: userIdValue
        });

        console.log(`Add User to Organization ${JSON.stringify({ idValue, userIdValue })}`);

        res.status(200).json({ success: result });
    } catch (error) {
        res.status(500).json(error);
    }
}

async function del(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, userId } = req.query;
        const idValue = parseInt(id[0]);
        const userIdValue = parseInt(userId[0]);

        const result = await defaultDbUsersInOrganization.removeUserFromOrganization({
            organizationid: idValue,
            userid: userIdValue
        });

        console.log(`Remove User from Organization ${JSON.stringify({ idValue, userIdValue })}`);

        res.status(200).json({ success: result });
    } catch (error) {
        res.status(500).json(error);
    }
}
