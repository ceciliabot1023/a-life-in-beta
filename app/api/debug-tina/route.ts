import { NextResponse } from 'next/server'
import client from '../../../tina/__generated__/client'

export async function GET() {
  const debugInfo: any = {
    env: {
      hasClientId: !!process.env.TINA_CLIENT_ID,
      hasToken: !!process.env.TINA_TOKEN,
      hasPublicClientId: !!process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
      nodeEnv: process.env.NODE_ENV,
    },
    clientId: process.env.TINA_CLIENT_ID?.substring(0, 10) + '...',
  }

  try {
    // Try to fetch metrics
    const metricsResponse = await client.queries.metricsConnection()
    debugInfo.metrics = {
      success: true,
      count: metricsResponse.data.metricsConnection.edges?.length || 0,
      data: metricsResponse.data.metricsConnection.edges?.slice(0, 2) || []
    }
  } catch (error: any) {
    debugInfo.metrics = {
      success: false,
      error: error.message || 'Unknown error',
      stack: error.stack
    }
  }

  try {
    // Try to fetch findings
    const findingsResponse = await client.queries.findingsConnection()
    debugInfo.findings = {
      success: true,
      count: findingsResponse.data.findingsConnection.edges?.length || 0
    }
  } catch (error: any) {
    debugInfo.findings = {
      success: false,
      error: error.message || 'Unknown error'
    }
  }

  try {
    // Try to fetch apps
    const appsResponse = await client.queries.appsConnection()
    debugInfo.apps = {
      success: true,
      count: appsResponse.data.appsConnection.edges?.length || 0
    }
  } catch (error: any) {
    debugInfo.apps = {
      success: false,
      error: error.message || 'Unknown error'
    }
  }

  return NextResponse.json(debugInfo, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  })
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

