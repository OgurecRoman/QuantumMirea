import { Router } from 'express';
import * as confController from '../controllers/configuration.js';

const router = Router();

router.get('/', confController.getConfiguration);

export default router;