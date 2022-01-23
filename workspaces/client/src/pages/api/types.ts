import { NextApiRequest, NextApiResponse } from 'next';

export type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export interface MethodHandlers {
  get?: Handler;
  post?: Handler;
}
export type Method = keyof MethodHandlers;
