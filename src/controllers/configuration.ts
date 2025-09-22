import { Request, Response } from 'express';
import * as configurationSchema from "../schemas/configuration.schema.js";
import * as configurationServer from '../servers/configurations/configuration.js';
import { rabbitMQ } from '../lib/rabbitmq.js';

export async function getConfiguration(req: Request, res: Response) {  
  try {
    const configurations = await configurationServer.getConfiguration();
    res.status(200).json(configurations);
  } catch (error) {
    res.status(500).json({ error: 'Error getting configurations' });
  }
};

export async function postConfiguration(req: Request, res: Response) {  
  try {
      const id = req.body.id;
      const name = req.body.name;
      const job = req.body.job;
      const type = req.body.type;

      const result = configurationSchema.ConfigurationSchema.safeParse({ id, name, job, type });

      if (result.success){
        const configuration_exist = await configurationServer.upsertConfiguration(id, name, job, type);

        const queueName = `${id}-queue`;

        if (!configuration_exist) {
          await sendToQueue(res, queueName);
        }
        else res.status(200).json(
          { success: true, 
            message: `Queue ${queueName} already exists`,
            queueName: queueName }
        );
        
      } else res.status(500).json({ error: 'Error adding configuration' });
  
    } catch (error) {
      res.status(500).json({ error: 'Error post configuration' });
      console.error("Error:", error);
    }
};

export async function sendToQueue(res: Response, queueName: string) {
  try{
    await rabbitMQ.assertQueue(queueName)

    res.status(200).json({
                success: true,
                message: `Queue ${queueName} registred`,
                queueName: queueName
            });
  } catch (error) {
      res.status(500).json({ error: 'Error posting configuration to queue' });
      console.error("Error:", error);
  } 
}
