'use client'

import { GlassPanel } from '@/components/ui/GlassPanel'
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react'

interface MetricData {
  category: string
  week: string
  value: string
  unit: string
  trend: string
}

interface MetricsApiResponse {
  metrics?: MetricData[]
  error?: string
}

export function StatusPanel() {
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchMetrics() {
      try {
        // Use API route instead of direct client query
        const response = await fetch('/api/metrics')
        const data: MetricsApiResponse = await response.json()
        
        console.log('Raw metrics response:', data.metrics)
        
        const metricsData: MetricData[] = data.metrics || []
        
        console.log('Parsed metrics data:', metricsData)
        
        // Get the most recent metric for each category
        const latestMetrics: MetricData[] = []
        const categories: string[] = ['income', 'focus-time', 'wellbeing', 'energy']
        
        categories.forEach((category: string) => {
          const categoryMetrics = metricsData.filter((m: MetricData) => m.category.toLowerCase() === category.toLowerCase())
          console.log(`Metrics for ${category}:`, categoryMetrics)
          
          if (categoryMetrics.length > 0) {
            // Sort by week - handle various formats
            const sortedMetrics = categoryMetrics.sort((a: MetricData, b: MetricData) => {
              // Extract week info for comparison
              const extractWeekInfo = (weekStr: string): { year: number; week: number } => {
                // Try pattern: YYYY-W## or YYYY-week-##
                let match = weekStr.match(/(\d{4})[-\s]?[Ww]?(?:eek)?[-\s]?(\d+)/)
                if (match) {
                  return { year: parseInt(match[1]), week: parseInt(match[2]) }
                }
                
                // Try pattern: Week ## YYYY
                match = weekStr.match(/[Ww]eek\s*(\d+)\s*(\d{4})/)
                if (match) {
                  return { year: parseInt(match[2]), week: parseInt(match[1]) }
                }
                
                // Default to parsing as ISO date
                const date = new Date(weekStr)
                if (!isNaN(date.getTime())) {
                  const year = date.getFullYear()
                  const startOfYear = new Date(year, 0, 1)
                  const weekNumber = Math.ceil(((date.getTime() - startOfYear.getTime()) / 86400000 + 1) / 7)
                  return { year, week: weekNumber }
                }
                
                return { year: 2025, week: 0 }
              }
              
              const infoA = extractWeekInfo(a.week)
              const infoB = extractWeekInfo(b.week)
              
              // Sort by year first, then by week (descending)
              if (infoB.year !== infoA.year) {
                return infoB.year - infoA.year
              }
              return infoB.week - infoA.week
            })
            
            console.log(`Latest ${category} metric:`, sortedMetrics[0])
            latestMetrics.push(sortedMetrics[0])
          }
        })
        
        setMetrics(latestMetrics)
      } catch (error) {
        console.error('Error fetching metrics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])
  
  const getMetricByCategory = (category: string): MetricData | undefined => {
    return metrics.find((m: MetricData) => m.category === category)
  }
  
  const getMetricColor = (trend: string): string => {
    switch (trend) {
      case 'up': return 'text-green-400 border-green-400/30 from-green-500/10 to-green-600/20'
      case 'down': return 'text-red-400 border-red-400/30 from-red-500/10 to-red-600/20'
      case 'unstable': return 'text-yellow-400 border-yellow-400/30 from-yellow-500/10 to-yellow-600/20'
      default: return 'text-blue-400 border-blue-400/30 from-blue-500/10 to-blue-600/20'
    }
  }
  
  const getTrendIcon = (trend: string): JSX.Element => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />
      case 'down': return <TrendingDown className="w-4 h-4" />
      case 'unstable': return <AlertTriangle className="w-4 h-4" />
      default: return <Minus className="w-4 h-4" />
    }
  }
  
  if (loading) {
    return (
      <GlassPanel className="p-6">
        <div className="text-white">Loading metrics...</div>
      </GlassPanel>
    )
  }
  
  const incomeMetric = getMetricByCategory('income')
  const focusMetric = getMetricByCategory('focus-time')
  const wellbeingMetric = getMetricByCategory('wellbeing')
  const energyMetric = getMetricByCategory('energy')
  
  return (
    <GlassPanel className="p-6">
      <h2 className="cyberpunk-title text-2xl font-bold text-white mb-6">
        Current Week <span className="text-neon-cyan">Status</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Income Card */}
        <div className={`bg-gradient-to-br ${incomeMetric ? getMetricColor(incomeMetric.trend) : 'from-blue-500/10 to-blue-600/20 border-blue-400/30'} p-5 rounded-lg border backdrop-blur-sm`}>
          <div className="text-current font-semibold mb-3 flex items-center gap-2">
            💰 <span>Income</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-white text-3xl font-bold cyberpunk-title">
              {incomeMetric?.value || 'N/A'}
            </div>
            <div className="text-white/60 text-lg font-medium">
              {incomeMetric?.unit || ''}
            </div>
          </div>
          <div className="flex items-center gap-2 text-current text-sm font-medium">
            {getTrendIcon(incomeMetric?.trend || 'stable')}
            <span className="capitalize">{incomeMetric?.trend || 'stable'}</span>
          </div>
        </div>
        
        {/* Focus Time Card */}
        <div className={`bg-gradient-to-br ${focusMetric ? getMetricColor(focusMetric.trend) : 'from-blue-500/10 to-blue-600/20 border-blue-400/30'} p-5 rounded-lg border backdrop-blur-sm`}>
          <div className="text-current font-semibold mb-3 flex items-center gap-2">
            ⏰ <span>Focus Time</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-white text-3xl font-bold cyberpunk-title">
              {focusMetric?.value || 'N/A'}
            </div>
            <div className="text-white/60 text-lg font-medium">
              {focusMetric?.unit || ''}
            </div>
          </div>
          <div className="flex items-center gap-2 text-current text-sm font-medium">
            {getTrendIcon(focusMetric?.trend || 'stable')}
            <span className="capitalize">{focusMetric?.trend || 'stable'}</span>
          </div>
        </div>
        
        {/* Energy Card */}
        <div className={`bg-gradient-to-br ${energyMetric ? getMetricColor(energyMetric.trend) : 'from-blue-500/10 to-blue-600/20 border-blue-400/30'} p-5 rounded-lg border backdrop-blur-sm`}>
          <div className="text-current font-semibold mb-3 flex items-center gap-2">
            🌱 <span>Energy</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-white text-3xl font-bold cyberpunk-title">
              {energyMetric?.value || 'N/A'}
            </div>
            <div className="text-white/60 text-lg font-medium">
              {energyMetric?.unit || ''}
            </div>
          </div>
          <div className="flex items-center gap-2 text-current text-sm font-medium">
            {getTrendIcon(energyMetric?.trend || 'stable')}
            <span className="capitalize">{energyMetric?.trend || 'stable'}</span>
          </div>
        </div>
        
        {/* Well-being Card */}
        <div className={`bg-gradient-to-br ${wellbeingMetric ? getMetricColor(wellbeingMetric.trend) : 'from-blue-500/10 to-blue-600/20 border-blue-400/30'} p-5 rounded-lg border backdrop-blur-sm`}>
          <div className="text-current font-semibold mb-3 flex items-center gap-2">
            🧘 <span>Well-being</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-white text-3xl font-bold cyberpunk-title">
              {wellbeingMetric?.value || 'N/A'}
            </div>
            <div className="text-white/60 text-lg font-medium">
              {wellbeingMetric?.unit || ''}
            </div>
          </div>
          <div className="flex items-center gap-2 text-current text-sm font-medium">
            {getTrendIcon(wellbeingMetric?.trend || 'stable')}
            <span className="capitalize">{wellbeingMetric?.trend || 'stable'}</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}

