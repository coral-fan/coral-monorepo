import { NextApiRequest, NextApiResponse } from 'next';
import { Handler, MethodHandlers, Method } from '../types';

const defaultHandler = (req: NextApiRequest, res: NextApiResponse, handlers: MethodHandlers) => {
  // gets allowed headers by looking at keys on handler object and uppercasing the value
  const allowedMethods = Object.keys(handlers).map((method) => method.toUpperCase());
  res.setHeader('Allow', allowedMethods);
  res.status(405).send(`Method ${req.method} Not Allowed.`);
};

export const getHandler =
  (handlers: MethodHandlers): Handler =>
  async (req, res) => {
    /* 
    cast as Method to suppress warning about undefined being used as index type
    even if method is undefined, reference undefined as a key on an object will simply return undefined
    */
    const method = req.method?.toLowerCase() as Method;

    const handler = handlers[method];

    handler ? await handler(req, res) : defaultHandler(req, res, handlers);
  };
