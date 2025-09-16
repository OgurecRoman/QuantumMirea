import { Request, Response } from 'express';
import * as configurationSchema from "../schemas/configuration.schema.js";
import * as configurationServer from '../servers/configurations/configuration.js';
import { connectRabbit } from '../lib/rabbitmq.js'

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

      const result = configurationSchema.ConfigurationSchema.safeParse({ id, job });

      if (result.success){
        await sendToQueue(req, res, id, job);

        const status = await configurationServer.upsertConfiguration(id, job);
      }
  
    } catch (error) {
      console.error("Error:", error);
    }
};

export async function sendToQueue(req: Request, res: Response, id: string, job: string) {
  try{
    const client = await connectRabbit();
    const channel = await client.createChannel();

    const queueName = `${id}-queue`;

    await channel.assertQueue(queueName, {
      durable: true
    });

    res.json({
            success: true,
            message: `Computer registered on ${queueName}`,
            queueName: queueName
        });
  } catch (error) {
        console.error("Error:", error);
  } 
}