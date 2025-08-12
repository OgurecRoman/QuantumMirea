import { Router } from 'express';
import userRouter from './user.js';
import configurationRouter from './configuration.js';

const router = Router();

router.use('/user', userRouter);
router.use('/configurations', configurationRouter);

export default router;