import express from 'express';
import { multerMiddleware } from '../middlewares/multer.middleware';
import { uploadFile } from '../controllers/upload.controller';

const router = express.Router();

router.post('/', multerMiddleware, uploadFile);

export default router;