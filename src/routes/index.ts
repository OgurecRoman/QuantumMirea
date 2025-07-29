import { Router } from 'express';
import printersRouter from './user.js';

const router = Router();

router.use('/user', printersRouter);

export default router;