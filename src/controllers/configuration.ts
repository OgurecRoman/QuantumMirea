import * as configurationSchema from "../schemas/configuration.schema.js";
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

export async function postConfiguration(req: Request, res: Response) {  
  try {
      const id = req.body.id;
      const job = req.body.job;

      console.log("айдишник ", id, job)

      const result = configurationSchema.ConfigurationSchema.safeParse({ id: id, job: job })

      if (result.success){
        console.log('aaa')
        const status = await configurationServer.createConfiguration(id, job);
        res.json(status);
      } else res.status(500).json({ error: 'Error adding configuration' });
  
    } catch (error) {
      res.status(500).json({ error: 'Error adding configuration' });
    }
};
