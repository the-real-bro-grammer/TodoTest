import { NextApiRequest, NextApiResponse } from 'next';
import { defaultUserDb } from '../../../lib/data/user';
import { handleRequest } from '../../../lib/helpers/request_helpers';

// Main handler for the API route
export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Delegate handling to specific HTTP method handler
    await handleRequest(req, res, { POST: post });
}

/**
 * POST /api/... - Creates a new user.
 * Request Body:
 *   - body: JSON object containing details of the user to be created.
 */
async function post(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { body } = req; // Extract request body

        // Create a new user in the database
        const result = await defaultUserDb.create(body);

        console.log(`Create user ${JSON.stringify(body)}`);

        // Send success response with the result of the creation
        res.status(200).json({ success: result });
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}
