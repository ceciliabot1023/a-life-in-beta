import { NextResponse } from 'next/server'
import client from '../../../tina/__generated__/client'

export async function GET() {
  try {
    console.log('Fetching apps from TinaCMS...')
    
    const response = await client.queries.appsConnection()
    
    // Log what we got from TinaCMS
    console.log('Apps response:', response.data.appsConnection.edges?.length, 'apps found')
    
    const appsData = response.data.appsConnection.edges?.map(edge => ({
      id: edge?.node?.id || '',
      title: edge?.node?.title || '',
      status: edge?.node?.status || '',
      description: edge?.node?.description,
      body: edge?.node?.body
    })) || []
    
    // Make sure we return the correct structure
    const responseData = { apps: appsData }
    console.log('Returning apps data:', responseData)
    
    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching apps:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch apps', 
      apps: [] 
    }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'



