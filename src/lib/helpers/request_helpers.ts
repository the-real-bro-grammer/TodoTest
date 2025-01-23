import { NextApiRequest, NextApiResponse } from 'next';

export async function handleRequest(
    req: NextApiRequest,
    res: NextApiResponse,
    handler: { [key: string]: (req: NextApiRequest, res: NextApiResponse) => void }
): Promise<void> {
    const { method } = req;

    if (!method) {
        return null;
    }

    // Handle requests that aren't supported by the API
    if (!handler[method]) {
        res.status(405).end(`Method ${method} Not Allowed`);

        return;
    }

    await handler[method](req, res);
}
