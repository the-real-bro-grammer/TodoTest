import { NextApiRequest, NextApiResponse } from 'next';
import { defaultDbUsersInOrganization } from '../../../../../../lib/data/users_in_organization';
import { handleRequest } from '../../../../../../lib/helpers/request_helpers';

// Main handler for the API route
export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Delegate handling to specific HTTP method handlers
    await handleRequest(req, res, { POST: post, DELETE: del });
}

/**
 * POST /api/... - Adds a user to an organization.
 * Query Parameters:
 *   - id: The ID of the organization.
 *   - userId: The ID of the user.
 */
async function post(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, userId } = req.query; // Extract query params
        const idValue = parseInt(id[0]); // Parse organization ID
        const userIdValue = parseInt(userId[0]); // Parse user ID

        // Create entry in the database linking user and organization
        const result = await defaultDbUsersInOrganization.create({
            organizationid: idValue,
            userid: userIdValue
        });

        console.log(`Add User to Organization ${JSON.stringify({ idValue, userIdValue })}`);

        // Send success response
        res.status(200).json({ success: result });
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}

/**
 * DELETE /api/... - Removes a user from an organization.
 * Query Parameters:
 *   - id: The ID of the organization.
 *   - userId: The ID of the user.
 */
async function del(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, userId } = req.query; // Extract query params
        const idValue = parseInt(id[0]); // Parse organization ID
        const userIdValue = parseInt(userId[0]); // Parse user ID

        // Remove the user-organization link in the database
        const result = await defaultDbUsersInOrganization.removeUserFromOrganization({
            organizationid: idValue,
            userid: userIdValue
        });

        console.log(`Remove User from Organization ${JSON.stringify({ idValue, userIdValue })}`);

        // Send success response
        res.status(200).json({ success: result });
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}
