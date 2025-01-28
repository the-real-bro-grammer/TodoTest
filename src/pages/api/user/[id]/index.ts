import { NextApiRequest, NextApiResponse } from 'next';
import { defaultUserDb } from '../../../../lib/data/user';
import { handleRequest } from '../../../../lib/helpers/request_helpers';

// Main handler for the API route
export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Delegate handling to specific HTTP method handlers
    await handleRequest(req, res, { GET: get, PUT: put, DELETE: del });
}

/**
 * GET /api/... - Retrieves a user by ID.
 * Query Parameters:
 *   - id: The ID of the user to be retrieved.
 */
async function get(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query; // Extract query parameter

        const idValue = id[0]; // Get the first element if `id` is an array

        // Retrieve user from the database
        const user = await defaultUserDb.read(parseInt(idValue));

        console.log(`Get user ${user}`);

        // Send success response with retrieved user
        res.status(200).json(user);
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}

/**
 * PUT /api/... - Updates a user's details.
 * Query Parameters:
 *   - id: The ID of the user to be updated.
 * Request Body:
 *   - body: JSON object with user details to update.
 */
async function put(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const { body } = req; // Extract request body

        const idValue = id[0];

        // Update user in the database
        const success = await defaultUserDb.update(parseInt(idValue), body);

        console.log(`Update user ${JSON.stringify(body)} ${success}`);

        // Send success response with the result of the update
        res.status(200).json({ success });
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}

/**
 * DELETE /api/... - Deletes a user by ID.
 * Query Parameters:
 *   - id: The ID of the user to be deleted.
 */
async function del(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;

        const idValue = id[0];

        // Delete user from the database
        const success = await defaultUserDb.delete(parseInt(idValue));

        console.log(`Delete user ${id}`);

        // Send success response with the result of the deletion
        res.status(200).json({ success });
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}
