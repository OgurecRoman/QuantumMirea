import { Router } from 'express';
import userRouter from './user.js';
import configurationRouter from './configuration.js';
import calcController from './calculation.js';

const router = Router();

router.use('/user', userRouter);
router.use('/configurations', configurationRouter);
router.use('/calculation', calcController);

export default router;