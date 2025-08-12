import { Request, Response } from 'express';
import * as configurationServer from '../servers/configurations/configuration.js';

export async function getConfiguration(req: Request, res: Response) {  
  try {
    const configurations = await configurationServer.getConfiguration();
    res.json(configurations);
  } catch (error) {
    res.status(500).json({ error: 'Error getting configurations' });
  }
};