'use client'

import { GlassPanel } from '@/components/ui/GlassPanel'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import client from '../../../tina/__generated__/client'

interface Finding {
  id: string
  title: string
  category: string
  week: string
  date: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any  // TinaMarkdown requires 'any' type for rich-text content
}

export function FindingsPanel() {
  const [findings, setFindings] = useState<Finding[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchFindings() {
      try {
        const response = await client.queries.findingsConnection()
        const findingsData = response.data.findingsConnection.edges?.map(edge => ({
          id: edge?.node?.id || '',
          title: edge?.node?.title || '',
          category: edge?.node?.category || '',
          week: edge?.node?.week || '',
          date: edge?.node?.date || '',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          body: edge?.node?.body as any
        })) || []
        
        // Sort by date, most recent first
        const sortedFindings = findingsData.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        
        setFindings(sortedFindings)
      } catch (error) {
        console.error('Error fetching findings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFindings()
  }, [])
  
  const workFindings = findings.filter(f => f.category === 'WORK')
  const lifeFindings = findings.filter(f => f.category === 'LIFE')
  
  if (loading) {
    return (
      <GlassPanel className="p-6">
        <div className="text-white">Loading findings...</div>
      </GlassPanel>
    )
  }
  
  return (
    <GlassPanel className="p-6">
      <h2 className="cyberpunk-title text-2xl font-bold text-white mb-6">
        Latest <span className="text-neon-red cyber-glow">Findings</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Work Findings Card */}
        <Link href="/lab/findings/work" className="group">
          <div className="relative bg-gradient-to-br from-cyan-500/5 via-blue-600/10 to-cyan-500/5 p-6 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-[1.02] cursor-pointer backdrop-blur-sm overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-cyan-400 cyberpunk-title mb-2">Work Findings</h3>
                <p className="text-white/60 text-sm">
                  <span className="text-cyan-300 font-semibold">{workFindings.length}</span> insights available
                </p>
              </div>
              
              <p className="text-white/80 text-sm mb-4 leading-relaxed">
                Professional experiments, productivity optimizations, and career development insights from the laboratory.
              </p>
              
              <div className="flex items-center text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors font-medium">
                <Zap className="w-4 h-4 mr-2" />
                <span>Explore Work Findings</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
        
        {/* Life Findings Card */}
        <Link href="/lab/findings/life" className="group">
          <div className="relative bg-gradient-to-br from-purple-500/5 via-pink-600/10 to-purple-500/5 p-6 rounded-lg border border-purple-400/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-[1.02] cursor-pointer backdrop-blur-sm overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-purple-400 cyberpunk-title mb-2">Life Findings</h3>
                <p className="text-white/60 text-sm">
                  <span className="text-purple-300 font-semibold">{lifeFindings.length}</span> insights available
                </p>
              </div>
              
              <p className="text-white/80 text-sm mb-4 leading-relaxed">
                Personal growth discoveries, wellness experiments, and life optimization insights from ongoing research.
              </p>
              
              <div className="flex items-center text-purple-400 text-sm group-hover:text-purple-300 transition-colors font-medium">
                <Zap className="w-4 h-4 mr-2" />
                <span>Explore Life Findings</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </div>
      {/* If TinaMarkdown is used here, apply same fix */}
    </GlassPanel>
  )
}