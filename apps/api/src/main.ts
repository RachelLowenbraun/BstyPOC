import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import voiceMemoRouter from './routes/voice-memo.router';
import { IS_DEV } from './config/constants';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(
  cors({
    origin: IS_DEV ? 'http://localhost:4200' : '',
  })
);

app.use('/api/voice-memo', voiceMemoRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
