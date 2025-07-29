import cron from 'node-cron'
import { WeeklyArchiver } from './archive'

export function setupWeeklyArchiving() {
  const archiver = new WeeklyArchiver()
  
  // Run every Sunday at 11:59 PM to archive the completed week
  cron.schedule('59 23 * * 0', async () => {
    console.log('🕐 Running weekly archive job...')
    try {
      await archiver.archiveCurrentWeek()
      console.log('✅ Weekly archive completed successfully')
    } catch (error) {
      console.error('❌ Weekly archive failed:', error)
    }
  }, {
    timezone: 'Asia/Shanghai' // Beijing Time (UTC+8)
  })
  
  console.log('📅 Weekly archiving scheduler initialized')
}