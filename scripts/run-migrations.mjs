import postgres from 'postgres'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const dbUrl = process.env.DATABASE_POOLED_URL || process.env.DATABASE_URL

if (!dbUrl) {
  console.error('DATABASE_POOLED_URL or DATABASE_URL not found in environment')
  process.exit(1)
}

console.log('Connecting to database via pooler...')
const sql = postgres(dbUrl, {
  ssl: 'require',
  prepare: false, // Essential for Supabase transaction pooler (port 6543)
  connect_timeout: 30
})

async function run() {
  const migrationsDir = join(process.cwd(), 'supabase', 'migrations')
  const files = readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort()

  for (const file of files) {
    console.log(`Executing migration: ${file}`)
    const filePath = join(migrationsDir, file)
    const content = readFileSync(filePath, 'utf-8')
    try {
      await sql.unsafe(content)
      console.log(`✓ Completed: ${file}`)
    } catch (err) {
      console.error(`✗ Error executing ${file}:`, err.message)
    }
  }

  await sql.end()
  console.log('All migrations processed.')
}

run().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
