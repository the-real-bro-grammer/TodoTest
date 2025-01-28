import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handle incoming API requests by routing to the appropriate handler based on HTTP method.
 * @param req - The incoming Next.js API request object.
 * @param res - The outgoing Next.js API response object.
 * @param handler - An object containing methods mapped to their respective handlers for each HTTP method.
 */
export async function handleRequest(
    req: NextApiRequest,
    res: NextApiResponse,
    handler: { [key: string]: (req: NextApiRequest, res: NextApiResponse) => void }
): Promise<void> {
    const { method } = req; // Extract HTTP method from request

    if (!method) {
        return null; // Exit early if method is undefined
    }

    // Handle requests with unsupported methods
    if (!handler[method]) {
        res.status(405).end(`Method ${method} Not Allowed`); // Respond with 405 Method Not Allowed status
        return; // Exit after sending response
    }

    // Execute the appropriate handler function for the given HTTP method
    await handler[method](req, res);
}
