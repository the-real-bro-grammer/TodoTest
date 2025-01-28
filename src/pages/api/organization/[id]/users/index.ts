import { NextApiRequest, NextApiResponse } from 'next';
import { defaultDbUsersInOrganization } from '../../../../../lib/data/users_in_organization';
import { handleRequest } from '../../../../../lib/helpers/request_helpers';

// Main handler for the API route
export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Delegate handling to specific HTTP method handlers
    await handleRequest(req, res, { GET: get });
}

/**
 * GET /api/... - Retrieves users in an organization.
 * Query Parameters:
 *   - id: The ID of the organization.
 */
async function get(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query; // Extract query param

        const idValue = id[0]; // Get the first ID value

        // Fetch users associated with the organization ID from the database
        const users = await defaultDbUsersInOrganization.getUsers(parseInt(idValue));

        console.log(`Get users in Organization ${id}`);

        // Send the list of users as a response
        res.status(200).json(users);
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}
