'use client'

import { Navigation } from '@/components/layout/Navigation'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import client from '../../../../tina/__generated__/client'
import { TinaMarkdown } from "tinacms/dist/rich-text";

interface Finding {
  id: string;
  title: string;
  category: string;
  date: string;
  body: any | null; // Make it explicitly nullable
}

export default function WorkFindingsPage() {
  const [findings, setFindings] = useState<Finding[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFindings() {
      try {
        const response = await client.queries.findingsConnection({
          filter: {
            category: {
              eq: 'WORK'
            }
          },
          sort: 'date'
        })
        
        const findingsData = response.data.findingsConnection.edges?.map(edge => ({
          id: edge?.node?.id || '',
          title: edge?.node?.title || '',
          category: edge?.node?.category || '',
          date: edge?.node?.date || '',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          body: edge?.node?.body as any  // Type assertion for TinaMarkdown compatibility
        })).filter(f => f.id) || []
        
        setFindings(findingsData)
      } catch (error) {
        console.error('Error fetching findings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFindings()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: 'url(/images/lab-background.jpg)'}}>
        <Navigation />
        <main className="pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-white text-center">Loading work findings...</div>
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
            <Link href="/lab">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft size={16} className="mr-2" />
                Back to Lab
              </Button>
            </Link>
            <h1 className="cyberpunk-title text-4xl font-bold text-white mb-4">
              Work <span className="text-neon-red">Findings</span>
            </h1>
            <p className="text-white/80 text-lg">
              Professional insights, learning, and achievements
            </p>
          </div>
          
          <div className="space-y-8">
            {/* In the findings map section, wrap each finding with a Link: */}
            {findings.map((finding, index) => {
              const slug = finding.title.toLowerCase().replace(/\s+/g, '-')
              const bodyContent = finding.body ? (
                <TinaMarkdown content={finding.body} />
              ) : null
              
              return (
                <motion.div
                  key={finding.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/lab/findings/work/${slug}`}>
                    <GlassPanel className="p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center space-x-3 mb-6">
                        <span className="text-3xl">💼</span>
                        <h2 className="cyberpunk-title-glow text-3xl font-bold text-white">{finding.title}</h2>
                      </div>
                      
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <div className="text-white/70 text-sm leading-relaxed mb-2">
                          <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-headings:font-bold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:mb-4 prose-p:leading-relaxed prose-p:text-white/70 prose-strong:text-white prose-li:text-white/70 line-clamp-3">
                            {bodyContent}
                          </div>
                        </div>
                        <div className="text-white/40 text-xs">
                          {new Date(finding.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>
                    </GlassPanel>
                  </Link>
                </motion.div>
              )
            })}
            
            {findings.length === 0 && (
              <GlassPanel className="p-6">
                <div className="text-center text-white/70">
                  No work findings found. Add some content through the Tina CMS admin!
                </div>
              </GlassPanel>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}