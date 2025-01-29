import fs from 'node:fs';
import { DATA_FILE } from '../config/constants';

import { VoiceMemo } from '../types/voice-memo.type';

export class VoiceMemoService {
  static async processFile(id: string) {
    try {
      const memo = this.getFileMetadata(id);

      if (!memo) throw new Error('Voice memo not found');

      // Todo: Fetch data from emotion logic.
      // Todo: Voice memo should be removed following file processing is complete or a after a timeout.

      await new Promise((resolve) => setTimeout(resolve, 5000));

      this.markProcessed(id);
      console.log(`Processing completed for: ${memo.filename}`);
    } catch (error) {
      console.error(`Error processing file: ${error.message}`);
      this.markProcessed(id, error.message);
    }
  }
  private static readMetadata(): VoiceMemo[] {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as VoiceMemo[];
  }

  private static writeMetadata(data: VoiceMemo[]): void {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Metadata saved successfully to ${DATA_FILE}`);
  }

  static async saveFileMetadata(filename: string, filepath: string): Promise<VoiceMemo> {
    const memos = this.readMetadata();
    const id = Date.now().toString();
    const voiceMemo: VoiceMemo = {
      id,
      filename,
      filepath,
      processed: false,
    };

    memos.push(voiceMemo);
    this.writeMetadata(memos);

    return voiceMemo;
  }

  static getFileMetadata(id: string): VoiceMemo | null {
    const memos = this.readMetadata();
    return memos.find((memo) => memo.id === id) || null;
  }

  static getAllVoiceMemos(): VoiceMemo[] {
    return this.readMetadata();
  }

  static markProcessed(id: string, error?: string): void {
    const memos = this.readMetadata();
    const memo = memos.find((m) => m.id === id);

    if (memo) {
      memo.processed = !error;
      if (error) memo.error = error;
      this.writeMetadata(memos);
    }
  }
}
