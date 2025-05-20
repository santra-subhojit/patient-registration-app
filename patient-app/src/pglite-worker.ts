import { PGlite } from '@electric-sql/pglite';
import { worker } from '@electric-sql/pglite/worker';

worker({
  async init() {
    const db = new PGlite('idb://patients');

    await db.query(`
      CREATE TABLE IF NOT EXISTS patient (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER,
        gender TEXT
      );
    `);

    try {
      await db.query(`ALTER TABLE patient ADD COLUMN IF NOT EXISTS disease TEXT;`);
    } catch (err) {
      console.warn('Could not add disease column:', err);
    }

    try {
      await db.query(`
        ALTER TABLE patient
        ADD COLUMN IF NOT EXISTS date_of_entry DATE NOT NULL DEFAULT CURRENT_DATE;
      `);
    } catch (err) {
      console.warn('Could not add date_of_entry column:', err);
    }

    return db;
  },
});
