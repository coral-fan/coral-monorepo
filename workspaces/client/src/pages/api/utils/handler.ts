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
  (req, res) => {
    const method = (req.method ?? 'undefined').toLowerCase() as Method;

    const handler = handlers[method];

    handler ? handler(req, res) : defaultHandler(req, res, handlers);
  };
