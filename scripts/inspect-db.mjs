import postgres from 'postgres'

const dbUrl = process.env.DATABASE_POOLED_URL || process.env.DATABASE_URL
if (!dbUrl) {
  console.error('No DB URL')
  process.exit(1)
}

const sql = postgres(dbUrl, { ssl: 'require', max: 1 })

async function inspect() {
  const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;`
  console.log('Tables:', tables.map(t => t.table_name))

  const services = await sql`SELECT id, slug, title FROM public.services ORDER BY display_order;`
  console.log('Services in DB:', services)

  const quoteColumns = await sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'quote_requests';`
  console.log('Quote Request Columns:', quoteColumns.map(c => `${c.column_name} (${c.data_type})`))

  await sql.end()
}

inspect().catch(err => {
  console.error(err)
  process.exit(1)
})
