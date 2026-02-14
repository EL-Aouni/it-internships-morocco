import mysql from 'mysql2/promise';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env.local file
const envFile = fs.readFileSync(join(__dirname, '.env.local'), 'utf8');
const dbUrl = envFile.match(/DATABASE_URL="(.+)"/)[1];

console.log('Connecting to Railway database...');

const connection = await mysql.createConnection(dbUrl);

console.log('✅ Connected!');

// Read and execute the SQL file
const sql = fs.readFileSync('./scripts/companies.sql', 'utf8');

// Remove the USE statement and split by semicolon
const statements = sql
  .replace(/USE.*?;/g, '')
  .split(';')
  .filter(stmt => stmt.trim().length > 0);

console.log(`\nExecuting ${statements.length} SQL statements...`);

let executed = 0;
for (const statement of statements) {
  try {
    await connection.query(statement);
    executed++;
    if (executed % 10 === 0) {
      process.stdout.write(`\rProgress: ${executed}/${statements.length} statements...`);
    }
  } catch (err) {
    if (!err.message.includes('already exists')) {
      console.error('\nError:', err.message);
    }
  }
}

console.log('\n');

// Verify
try {
  const [rows] = await connection.query('SELECT COUNT(*) as count FROM companies');
  console.log(`✅ SUCCESS! ${rows[0].count} companies imported to Railway database!`);
} catch (err) {
  console.error('Could not verify:', err.message);
}

await connection.end();
console.log('✅ Connection closed');