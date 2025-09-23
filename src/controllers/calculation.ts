import { Request, Response } from 'express';
import { getAuth } from './auth.js'
import * as calcServer from '../servers/calculation/calculation.js';
import { getConfigurationByName } from '../servers/configurations/configuration.js';
import { rabbitMQ } from '../lib/rabbitmq.js';
import { CalculationsType } from '@prisma/client'

export async function postSchema(req: Request, res: Response) {  
  try {
      // const qubits = req.body.qubits;
      // const gates = req.body.gates;
      const name = req.body.name;

      const configuration = await getConfigurationByName(name);
      const queueName = `${configuration!.id}-queue`

      const authResult = getAuth(req, res);
      if (!authResult)
        return;

      const [provider, userId] = authResult;

      if (true){ // здесь будет валидация
        try {
          const calc = await calcServer.createCalculation(provider, userId, CalculationsType.schema, 
            req.body, configuration!.id);

          await sendToQueue(res, queueName, req.body, calc.id);
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

export async function postResult(req: Request, res: Response) {
  try{
    const id = req.body.id;
    const result = req.body.result;
    const metrics = req.body.metrics;
    
    const calc = await calcServer.updateCalculation(id, result, metrics);
    res.json({status: "success", calc: calc})

  } catch (error){
    res.status(500).json({ error: 'Error post configuration' });
    console.error("Error:", error);
  }
}

export async function sendToQueue(res: Response, queueName: string, message: any, id: number) {
  try{
    await rabbitMQ.sendToQueue(queueName, { ...message, id: id });

    res.status(200).json({
                success: true,
                message: `Message send to queue ${queueName}`,
            });
  } catch (error) {
      res.status(500).json({ error: 'Error sending to queue' });
      console.error("Error:", error);
  } 
}
