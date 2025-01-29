import path from 'node:path';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const BASE_DIR = path.join(process.cwd(), 'apps', 'api');
export const DATA_DIR = path.join(BASE_DIR, 'data');
export const DATA_FILE = path.join(DATA_DIR, 'voiceMemos.json');
export const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
