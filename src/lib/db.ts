import mysql from 'mysql2/promise';

const globalForDb = globalThis as unknown as {
  connection: mysql.Connection | undefined;
};

export const getDb = async () => {
  if (globalForDb.connection) {
    return globalForDb.connection;
  }

  const connection = await mysql.createConnection(
    process.env.DATABASE_URL || ''
  );

  globalForDb.connection = connection;
  return connection;
};

export type Company = {
  id: number;
  name: string;
  city: string;
  speciality: string;
  email: string;
  phone: string | null;
  website: string | null;
  priority: 'high' | 'medium' | 'low';
  description: string | null;
  created_at: Date;
};
