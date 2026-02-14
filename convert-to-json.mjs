import fs from 'fs';

const sql = fs.readFileSync('./scripts/companies.sql', 'utf8');

// Extract all VALUES content
const valuesMatch = sql.match(/VALUES\s+([\s\S]+?);/);
if (!valuesMatch) {
  console.error('Could not find VALUES in SQL');
  process.exit(1);
}

const valuesContent = valuesMatch[1];

// Split by ),( to get individual rows
const rows = valuesContent.split(/\),\s*\(/);

const companies = rows.map((row, index) => {
  // Clean up row
  row = row.replace(/^\(|\)$/g, '').trim();
  
  // Extract quoted strings
  const values = [];
  let current = '';
  let inQuote = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === "'" && row[i-1] !== '\\') {
      inQuote = !inQuote;
      if (!inQuote && current) {
        values.push(current);
        current = '';
      }
    } else if (inQuote) {
      current += char;
    }
  }
  
  if (values.length >= 7) {
    return {
      id: index + 1,
      name: values[0],
      city: values[1],
      speciality: values[2],
      email: values[3],
      phone: values[4] || null,
      website: values[5] || null,
      priority: values[6],
      description: values[7] || null
    };
  }
  return null;
}).filter(Boolean);

fs.writeFileSync('./public/companies.json', JSON.stringify(companies, null, 2));
console.log(`✅ Created companies.json with ${companies.length} companies!`);