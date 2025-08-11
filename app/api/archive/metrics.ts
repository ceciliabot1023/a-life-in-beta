import { NextResponse } from 'next/server'
import client from '../../../tina/__generated__/client'

export async function GET() {
  // Log environment check
  console.log('Metrics API: Checking environment', {
    hasToken: !!process.env.TINA_TOKEN,
    hasClientId: !!process.env.TINA_CLIENT_ID,
  })

  try {
    const response = await client.queries.metricsConnection()
    
    console.log('Metrics API: Response received', {
      hasData: !!response.data,
      edgeCount: response.data.metricsConnection.edges?.length || 0
    })
    
    const metricsData = response.data.metricsConnection.edges?.map(edge => ({
      category: edge?.node?.category || '',
      week: edge?.node?.week || '',
      value: edge?.node?.value || '',
      unit: edge?.node?.unit || '',
      trend: edge?.node?.trend || ''
    })) || []
    
    return NextResponse.json({ 
      metrics: metricsData,
      debug: {
        count: metricsData.length,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error: any) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch metrics', 
      details: error.message,
      metrics: [] 
    }, { status: 500 })
  }
}

// Allow this route to be dynamically rendered
export const dynamic = 'force-dynamic'

