import { Request, Response } from 'express';
import * as calcServer from '../servers/calculation/calculation.js';
import { getConfigurationByName } from '../servers/configurations/configuration.js';
import { rabbitMQ } from '../lib/rabbitmq.js';

export async function postSchema(req: Request, res: Response) {  
  try {
      const qubits = req.body.qubits;
      const gates = req.body.gates;
      const name = req.body.name;
      const configuration = await getConfigurationByName(name);
      const queueName = `${configuration!.id}-queue`

      if (true){ // здесь будет валидация
        try {
          await calcServer.upsertCalculation();

          await sendToQueue(res, queueName, req.body);
        } catch (error){
          res.status(500).json({ error: 'Error add calculation' });
          console.error("Error:", error);
        }
      } else res.json({ error: 'Error send a schema' });
  
    } catch (error) {
      res.json({ error: 'Not valid data' });
      console.error("Error:", error);
    }
};

export async function sendToQueue(res: Response, queueName: string, message: any) {
  try{
    await rabbitMQ.sendToQueue(queueName, message)

    res.status(200).json({
                success: true,
                message: `Message send to queue ${queueName}`,
            });
  } catch (error) {
      res.status(500).json({ error: 'Error sending to queue' });
      console.error("Error:", error);
  } 
}
