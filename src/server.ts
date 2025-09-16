import express, { Request, Response } from 'express';
import router from './routes';
import { changeStatus } from './servers/configurations/configuration.js'

async function startServer(){
  try{
    const app = express();
    const PORT = process.env.PORT;

    app.use(express.json());

    await changeStatus();

    app.get('/', (req: Request, res: Response) => {
      res.send('Server is running!');
    });

    app.use('/', router);

    // Запуск сервера
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  }catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
}

startServer();
