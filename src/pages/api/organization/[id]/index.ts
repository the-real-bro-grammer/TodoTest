import { NextApiRequest, NextApiResponse } from 'next';
import { defaultOrganizationDb } from '../../../../lib/data/organization';
import { handleRequest } from '../../../../lib/helpers/request_helpers';

// Main handler for the API route
export default async function (req: NextApiRequest, res: NextApiResponse) {
    // Delegate handling to specific HTTP method handlers
    await handleRequest(req, res, { GET: get, PUT: put, DELETE: del });
}

/**
 * GET /api/... - Retrieves an organization by ID.
 * Query Parameters:
 *   - id: The ID of the organization to retrieve.
 */
async function get(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query; // Extract query param

        const idValue = id[0]; // Get the first ID value

        // Fetch the organization data from the database
        const organization = await defaultOrganizationDb.read(parseInt(idValue));

        console.log(`Get organization ${organization}`);

        // Send the organization data as a response
        res.status(200).json(organization);
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}

/**
 * PUT /api/... - Updates an organization by ID with new data.
 * Query Parameters:
 *   - id: The ID of the organization to update.
 */
async function put(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query; // Extract query param
        const { body } = req; // Extract request body

        const idValue = id[0]; // Get the first ID value

        // Update the organization data in the database
        const success = await defaultOrganizationDb.update(parseInt(idValue), body);

        console.log(`Update organization ${JSON.stringify(body)} ${success}`);

        // Send success status as a response
        res.status(200).json({ success });
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}

/**
 * DELETE /api/... - Deletes an organization by ID.
 * Query Parameters:
 *   - id: The ID of the organization to delete.
 */
async function del(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query; // Extract query param

        const idValue = id[0]; // Get the first ID value

        // Delete the organization data from the database
        const success = await defaultOrganizationDb.delete(parseInt(idValue));

        console.log(`Delete organization ${id}`);

        // Send success status as a response
        res.status(200).json({ success });
    } catch (error) {
        // Send error response in case of failure
        res.status(500).json(error);
    }
}
