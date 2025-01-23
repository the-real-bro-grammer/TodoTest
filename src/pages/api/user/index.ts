import { NextApiRequest, NextApiResponse } from 'next';
import { handleRequest } from '../../../lib/helpers/request_helpers';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    await handleRequest(req, res, { POST: post });
}

async function post(req: NextApiRequest, res: NextApiResponse) {}
