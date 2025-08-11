'use client'

import { GlassPanel } from '@/components/ui/GlassPanel'
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react'
import client from '../../../tina/__generated__/client'

interface MetricData {
  category: string
  week: string
  value: string  // Changed to string as per new schema
  unit: string
  trend: string
}

export function StatusPanel() {
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await client.queries.metricsConnection()
        
        const metricsData = response.data.metricsConnection.edges?.map(edge => ({
          category: edge?.node?.category || '',
          week: edge?.node?.week || '',
          value: edge?.node?.value || '',  // Direct access, not nested
          unit: edge?.node?.unit || '',    // Direct access, not nested
          trend: edge?.node?.trend || ''   // Direct access, not nested
        })) || []
        
        // Get the most recent metric for each category
        const latestMetrics: MetricData[] = []
        const categories = ['income', 'focus-time', 'wellbeing', 'energy']
        
        categories.forEach(category => {
          const categoryMetrics = metricsData.filter(m => m.category === category)
          if (categoryMetrics.length > 0) {
            // Sort by week (assuming format: YYYY-MM-week-N) and get the latest
            const sortedMetrics = categoryMetrics.sort((a, b) => {
              const weekA = a.week.split('-week-')[1] || '0'
              const weekB = b.week.split('-week-')[1] || '0'
              return parseInt(weekB) - parseInt(weekA)
            })
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
  
  const getMetricByCategory = (category: string) => {
    return metrics.find(m => m.category === category)
  }
  
  const getMetricColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'green'
      case 'down': return 'red'
      case 'unstable': return 'yellow'
      default: return 'blue'
    }
  }
  
  const getTrendIcon = (trend: string) => {
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
        <div className={`bg-gradient-to-br from-${getMetricColor(incomeMetric?.trend || 'blue')}-500/10 to-${getMetricColor(incomeMetric?.trend || 'blue')}-600/20 p-5 rounded-lg border border-${getMetricColor(incomeMetric?.trend || 'blue')}-400/30 backdrop-blur-sm`}>
          <div className={`text-${getMetricColor(incomeMetric?.trend || 'blue')}-400 font-semibold mb-3 flex items-center gap-2`}>
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
          <div className={`flex items-center gap-2 text-${getMetricColor(incomeMetric?.trend || 'blue')}-400 text-sm font-medium`}>
            {getTrendIcon(incomeMetric?.trend || 'stable')}
            <span className="capitalize">{incomeMetric?.trend || 'stable'}</span>
          </div>
        </div>
        
        <div className={`bg-gradient-to-br from-${getMetricColor(focusMetric?.trend || 'blue')}-500/10 to-${getMetricColor(focusMetric?.trend || 'blue')}-600/20 p-5 rounded-lg border border-${getMetricColor(focusMetric?.trend || 'blue')}-400/30 backdrop-blur-sm`}>
          <div className={`text-${getMetricColor(focusMetric?.trend || 'blue')}-400 font-semibold mb-3 flex items-center gap-2`}>
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
          <div className={`flex items-center gap-2 text-${getMetricColor(focusMetric?.trend || 'blue')}-400 text-sm font-medium`}>
            {getTrendIcon(focusMetric?.trend || 'stable')}
            <span className="capitalize">{focusMetric?.trend || 'stable'}</span>
          </div>
        </div>
        
        <div className={`bg-gradient-to-br from-${getMetricColor(energyMetric?.trend || 'blue')}-500/10 to-${getMetricColor(energyMetric?.trend || 'blue')}-600/20 p-5 rounded-lg border border-${getMetricColor(energyMetric?.trend || 'blue')}-400/30 backdrop-blur-sm`}>
          <div className={`text-${getMetricColor(energyMetric?.trend || 'blue')}-400 font-semibold mb-3 flex items-center gap-2`}>
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
          <div className={`flex items-center gap-2 text-${getMetricColor(energyMetric?.trend || 'blue')}-400 text-sm font-medium`}>
            {getTrendIcon(energyMetric?.trend || 'stable')}
            <span className="capitalize">{energyMetric?.trend || 'stable'}</span>
          </div>
        </div>
        
        <div className={`bg-gradient-to-br from-${getMetricColor(wellbeingMetric?.trend || 'blue')}-500/10 to-${getMetricColor(wellbeingMetric?.trend || 'blue')}-600/20 p-5 rounded-lg border border-${getMetricColor(wellbeingMetric?.trend || 'blue')}-400/30 backdrop-blur-sm`}>
          <div className={`text-${getMetricColor(wellbeingMetric?.trend || 'blue')}-400 font-semibold mb-3 flex items-center gap-2`}>
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
          <div className={`flex items-center gap-2 text-${getMetricColor(wellbeingMetric?.trend || 'blue')}-400 text-sm font-medium`}>
            {getTrendIcon(wellbeingMetric?.trend || 'stable')}
            <span className="capitalize">{wellbeingMetric?.trend || 'stable'}</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}

