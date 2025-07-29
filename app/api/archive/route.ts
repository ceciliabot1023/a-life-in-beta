import { NextRequest, NextResponse } from 'next/server'
import { WeeklyArchiver } from '@/utils/archive'

export async function POST(request: NextRequest) {
  try {
    const { weekId } = await request.json()
    const archiver = new WeeklyArchiver()
    
    if (weekId) {
      await archiver.archiveWeek(weekId)
    } else {
      await archiver.archiveCurrentWeek()
    }
    
    return NextResponse.json({ success: true, message: 'Week archived successfully' })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to archive week' },
      { status: 500 }
    )
  }
}