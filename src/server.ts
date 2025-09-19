import express, { Request, Response } from 'express';
import router from './routes';
import { changeStatus } from './servers/configurations/configuration.js'
import { rabbitMQ } from './lib/rabbitmq.js'
import { integer } from 'zod/v4/core/regexes.cjs';

async function startServer(){
  try{
    const app = express();
    const PORT = process.env.PORT;

    app.use(express.json());

    // change configuration status 
    await changeStatus();

    setInterval(async () => {
      try{
        await rabbitMQ.check_connection();
      } catch (error) {
        console.error('Error in recurring task:', error);
      }
    }, Number(process.env.TIME_REPEAT) * 1000 );

    // routes
    app.get('/', (req: Request, res: Response) => {
      res.send('Server is running!');
    });

    app.use('/', router);

    // start server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  }catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
}

startServer();
