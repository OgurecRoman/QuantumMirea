import { Router } from 'express';
import * as usersController from '../controllers/user.js';

const router = Router();

router.get('/', usersController.getUser);

router.get('/gate', usersController.getGates);
router.post('/gate', usersController.postGate);
router.patch('/gate', usersController.patchGate);
router.delete('/gate', usersController.deleteGate);

router.get('/algorithm', usersController.getAllAlgorithms);
router.post('/algorithm', usersController.postAlgorithm);
router.patch('/algorithm', usersController.patchAlgorithm);
router.delete('/algorithm', usersController.deleteAlgorithm);

export default router;