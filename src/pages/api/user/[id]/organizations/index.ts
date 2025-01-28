import { NextApiRequest, NextApiResponse } from 'next';
import { defaultDbUsersInOrganization } from '../../../../../lib/data/users_in_organization';
import { handleRequest } from '../../../../../lib/helpers/request_helpers';

// Main handler for the API route
export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Delegate handling to specific HTTP method handlers
    await handleRequest(req, res, { GET: get });
}

/**
 * GET /api/... - Retrieves organizations associated with a user.
 * Query Parameters:
 *   - id: The ID of the user to fetch organizations for.
 */
async function get(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query; // Extract query parameter

        const idValue = id[0]; // Get the first element if `id` is an array

        // Retrieve organizations for the given user ID
        const organizations = await defaultDbUsersInOrganization.getOrganizations(
            parseInt(idValue)
        );

        console.log(`Get organizations ${id}`);

        // Send success response with retrieved organizations
        res.status(200).json(organizations);
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}
