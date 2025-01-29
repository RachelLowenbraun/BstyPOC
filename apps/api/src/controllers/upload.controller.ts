import { Request, Response, NextFunction } from 'express';
import { VoiceMemoService } from '../services/voice-memo.service';

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded!' });
    }

    const file = await VoiceMemoService.saveFileMetadata(
      req.file.filename,
      req.file.path
    );

    res.status(201).json({ message: 'File uploaded!', fileId: file.id });
    console.log(`File uploaded: ${req.file.path}`);

    VoiceMemoService.processFile(file.id);
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
    next(error);
  }
};
