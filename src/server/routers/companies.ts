import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { getDb, type Company } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export const companiesRouter = router({
  search: publicProcedure
    .input(
      z.object({
        city: z.string().optional(),
        speciality: z.string().optional(),
        priority: z.enum(['high', 'medium', 'low']).optional(),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      
      let query = 'SELECT * FROM companies WHERE 1=1';
      const params: string[] = [];

      if (input.city && input.city !== 'all') {
        query += ' AND city = ?';
        params.push(input.city);
      }

      if (input.speciality && input.speciality !== 'all') {
        query += ' AND speciality = ?';
        params.push(input.speciality);
      }

      if (input.priority && input.priority !== 'all') {
        query += ' AND priority = ?';
        params.push(input.priority);
      }

      query += ' ORDER BY priority DESC, name ASC';

      const [rows] = await db.execute<RowDataPacket[]>(query, params);
      return rows as Company[];
    }),

  getCities: publicProcedure.query(async () => {
    const db = await getDb();
    const [rows] = await db.execute<RowDataPacket[]>(
      'SELECT DISTINCT city FROM companies ORDER BY city ASC'
    );
    return (rows as { city: string }[]).map((row) => row.city);
  }),

  getSpecialities: publicProcedure.query(async () => {
    const db = await getDb();
    const [rows] = await db.execute<RowDataPacket[]>(
      'SELECT DISTINCT speciality FROM companies ORDER BY speciality ASC'
    );
    return (rows as { speciality: string }[]).map((row) => row.speciality);
  }),
});
