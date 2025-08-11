import { NextResponse } from 'next/server'
import client from '../../../tina/__generated__/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    
    const filter = category ? {
      filter: {
        category: {
          eq: category
        }
      }
    } : {}
    
    const response = await client.queries.findingsConnection(filter)
    
    const findingsData = response.data.findingsConnection.edges?.map(edge => ({
      id: edge?.node?.id || '',
      title: edge?.node?.title || '',
      category: edge?.node?.category || '',
      week: edge?.node?.week || '',
      date: edge?.node?.date || '',
      body: edge?.node?.body
    })) || []
    
    return NextResponse.json({ findings: findingsData })
  } catch (error) {
    console.error('Error fetching findings:', error)
    return NextResponse.json({ error: 'Failed to fetch findings', findings: [] }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'


