import multer, { Options } from 'multer';
import fs from 'node:fs';
import { UPLOADS_DIR } from '../config/constants';

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter: Options['fileFilter'] = (req, file, cb) => {
  if (file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    cb(new Error('Only voice memos (audio files) are allowed!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB Limit
});

export const multerMiddleware = upload.single('voiceMemo');
