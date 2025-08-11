import { NextResponse } from 'next/server'
import client from '../../../tina/__generated__/client'

export async function GET() {
  try {
    const response = await client.queries.metricsConnection()
    
    const metricsData = response.data.metricsConnection.edges?.map(edge => ({
      category: edge?.node?.category || '',
      week: edge?.node?.week || '',
      value: edge?.node?.value || '',
      unit: edge?.node?.unit || '',
      trend: edge?.node?.trend || ''
    })) || []
    
    return NextResponse.json({ metrics: metricsData })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json({ error: 'Failed to fetch metrics', metrics: [] }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'


