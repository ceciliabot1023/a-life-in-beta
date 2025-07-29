#!/usr/bin/env tsx

import { WeeklyArchiver } from '../src/utils/archive'

async function main() {
  const archiver = new WeeklyArchiver()
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    // Archive current week
    console.log('📦 Archiving current week...')
    await archiver.archiveCurrentWeek()
  } else {
    // Archive specific week
    const weekId = args[0]
    console.log(`📦 Archiving week ${weekId}...`)
    await archiver.archiveWeek(weekId)
  }
}

main().catch(console.error)