import { Router } from 'express';
import * as calcController from '../controllers/calculation.js';

const router = Router();

router.post('/schema', calcController.postSchema);
router.post('/result', calcController.postResult);

// router.post('/image', calcController.postImage);
// router.post('/video', calcController.postVideo);

export default router;