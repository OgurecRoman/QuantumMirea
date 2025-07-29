import express, { Request, Response } from 'express';
import router from './routes';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running! 🚀');
});

app.use('/', router);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
