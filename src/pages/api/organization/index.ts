import { NextApiRequest, NextApiResponse } from 'next';
import { defaultOrganizationDb } from '../../../lib/data/organization';
import { handleRequest } from '../../../lib/helpers/request_helpers';

// Main handler for the API route
export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Delegate handling to specific HTTP method handlers
    await handleRequest(req, res, { POST: post });
}

/**
 * POST /api/... - Creates a new organization.
 * Request Body:
 *   - The details of the organization to create.
 */
async function post(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { body } = req; // Extract request body

        // Create a new organization in the database
        const result = await defaultOrganizationDb.create(body);

        console.log(`Create organization ${JSON.stringify(body)}`);

        // Send success response with creation result
        res.status(200).json({ success: result });
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}
