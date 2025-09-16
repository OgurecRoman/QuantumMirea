import { Router } from 'express';
import * as confController from '../controllers/configuration.js';

const router = Router();

router.get('/', confController.getConfiguration);
router.post('/', confController.postConfiguration);

export default router;