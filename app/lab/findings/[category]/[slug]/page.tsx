'use client'

import { Navigation } from '@/components/layout/Navigation'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import client from '../../../../../tina/__generated__/client'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import type { TinaMarkdownContent } from '../../../../../types/tina'

interface FindingDetail {
  id: string
  title: string
  category: string
  week: string
  date: string
  body: TinaMarkdownContent | null
  _sys: {
    filename: string
    basename: string
    path: string
    relativePath: string
    extension: string
  }
}

export default function FindingDetailPage() {
  const params = useParams()
  const [finding, setFinding] = useState<FindingDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFinding() {
      try {
        const response = await client.queries.findingsConnection({
          filter: {
            category: {
              eq: params.category?.toString().toUpperCase()
            }
          }
        })
        
        const findings = response.data.findingsConnection.edges?.map(edge => ({
          id: edge?.node?.id || '',
          title: edge?.node?.title || '',
          category: edge?.node?.category || '',
          week: edge?.node?.week || '',
          date: edge?.node?.date || '',
          body: edge?.node?.body,
          _sys: {
            filename: edge?.node?._sys?.filename || '',
            basename: edge?.node?._sys?.basename || '',
            path: edge?.node?._sys?.path || '',
            relativePath: edge?.node?._sys?.relativePath || '',
            extension: edge?.node?._sys?.extension || ''
          }
        })) || []
        
        // Find the specific finding by slug (title converted to slug)
        const targetFinding = findings.find(f => 
          f.title.toLowerCase().replace(/\s+/g, '-') === params.slug
        )
        
        setFinding(targetFinding || null)
      } catch (error) {
        console.error('Error fetching finding:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.category && params.slug) {
      fetchFinding()
    }
  }, [params.category, params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: 'url(/images/lab-background.jpg)'}}>
        <Navigation />
        <main className="pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-white text-center">Loading finding...</div>
          </div>
        </main>
      </div>
    )
  }

  if (!finding) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: 'url(/images/lab-background.jpg)'}}>
        <Navigation />
        <main className="pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link href={`/lab/findings/${params.category?.toString().toLowerCase()}`}>
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft size={16} className="mr-2" />
                Back to {params.category} Findings
              </Button>
            </Link>
            <div className="text-white text-center">Finding not found</div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: 'url(/images/lab-background.jpg)'}}>
      <Navigation />
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link href={`/lab/findings/${params.category?.toString().toLowerCase()}`}>
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft size={16} className="mr-2" />
                Back to {params.category} Findings
              </Button>
            </Link>
            <h1 className="cyberpunk-title text-4xl font-bold text-white mb-4">
              {finding.title}
            </h1>
            <div className="flex items-center space-x-4 text-white/60">
              <span className="text-2xl">{params.category === 'work' ? '💼' : '🌱'}</span>
              <span>{params.category?.toString().toUpperCase()} Finding</span>
              <span>•</span>
              <span>
                {new Date(finding.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassPanel className="p-8">
              <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:mb-6 prose-p:leading-relaxed prose-p:text-white/80 prose-strong:text-white prose-em:text-white/80 prose-li:text-white/80 prose-ul:text-white/80 prose-ol:text-white/80 prose-blockquote:text-white/80 prose-code:text-white prose-pre:text-white/80 text-white/80">
                {finding.body && (
                  <TinaMarkdown content={finding.body} />
                )}
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </main>
    </div>
  )
}