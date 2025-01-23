import { NextApiRequest, NextApiResponse } from 'next';

const handleHealthz = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Perform health check or any other necessary logic
        // For simplicity, we'll just return a static health status
        const healthStatus = 'Healthy';

        res.status(200).json({ status: healthStatus });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default handleHealthz;
