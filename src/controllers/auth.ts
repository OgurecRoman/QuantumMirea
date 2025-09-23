import { Request, Response } from 'express';

function getAuth(req: Request, res: Response): [string, string] | null{
  const provider = req.headers['provider'];
  const userId = req.headers['id'];

  if (!provider || !userId || typeof provider != 'string' || typeof userId != 'string') {
    res.status(400).json({ 
        message: 'provider, id are wrong',
        received: req.body
    });
    return null;
  }
  return [provider, userId]
}

export { getAuth };