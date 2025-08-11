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
    const metricsResponse = await client.queries.metricsConnection()
    debugInfo.metrics = {
      success: true,
      count: metricsResponse.data.metricsConnection.edges?.length || 0,
      sample: metricsResponse.data.metricsConnection.edges?.[0] || null
    }
  } catch (error: any) {
    debugInfo.metrics = {
      success: false,
      error: error.message || 'Unknown error'
    }
  }

  try {
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

  return NextResponse.json(debugInfo)
}

export const dynamic = 'force-dynamic'



