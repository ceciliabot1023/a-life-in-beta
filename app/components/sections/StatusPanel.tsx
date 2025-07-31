'use client'

import { GlassPanel } from '@/components/ui/GlassPanel'
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react'
import client from '../../../tina/__generated__/client'

interface MetricData {
  category: string
  week: string
  data: {
    value: number
    unit: string
    trend: string
  }
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
          data: {
            value: edge?.node?.data?.value ?? 0,
            unit: edge?.node?.data?.unit ?? '',
            trend: edge?.node?.data?.trend ?? ''
          }
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
        <div className={`bg-gradient-to-br from-${getMetricColor(incomeMetric?.data.trend || 'blue')}-500/10 to-${getMetricColor(incomeMetric?.data.trend || 'blue')}-600/20 p-5 rounded-lg border border-${getMetricColor(incomeMetric?.data.trend || 'blue')}-400/30 backdrop-blur-sm`}>
          <div className={`text-${getMetricColor(incomeMetric?.data.trend || 'blue')}-400 font-semibold mb-3 flex items-center gap-2`}>
            💰 <span>Income</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-white text-3xl font-bold cyberpunk-title">
              {incomeMetric?.data.value || 'N/A'}
            </div>
            <div className="text-white/60 text-lg font-medium">
              {incomeMetric?.data.unit || ''}
            </div>
          </div>
          <div className={`flex items-center gap-2 text-${getMetricColor(incomeMetric?.data.trend || 'blue')}-400 text-sm font-medium`}>
            {getTrendIcon(incomeMetric?.data.trend || 'stable')}
            <span className="capitalize">{incomeMetric?.data.trend || 'stable'}</span>
          </div>
        </div>
        
        <div className={`bg-gradient-to-br from-${getMetricColor(focusMetric?.data.trend || 'blue')}-500/10 to-${getMetricColor(focusMetric?.data.trend || 'blue')}-600/20 p-5 rounded-lg border border-${getMetricColor(focusMetric?.data.trend || 'blue')}-400/30 backdrop-blur-sm`}>
          <div className={`text-${getMetricColor(focusMetric?.data.trend || 'blue')}-400 font-semibold mb-3 flex items-center gap-2`}>
            ⏰ <span>Focus Time</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-white text-3xl font-bold cyberpunk-title">
              {focusMetric?.data.value || 'N/A'}
            </div>
            <div className="text-white/60 text-lg font-medium">
              {focusMetric?.data.unit || ''}
            </div>
          </div>
          <div className={`flex items-center gap-2 text-${getMetricColor(focusMetric?.data.trend || 'blue')}-400 text-sm font-medium`}>
            {getTrendIcon(focusMetric?.data.trend || 'stable')}
            <span className="capitalize">{focusMetric?.data.trend || 'stable'}</span>
          </div>
        </div>
        
        <div className={`bg-gradient-to-br from-${getMetricColor(energyMetric?.data.trend || 'blue')}-500/10 to-${getMetricColor(energyMetric?.data.trend || 'blue')}-600/20 p-5 rounded-lg border border-${getMetricColor(energyMetric?.data.trend || 'blue')}-400/30 backdrop-blur-sm`}>
          <div className={`text-${getMetricColor(energyMetric?.data.trend || 'blue')}-400 font-semibold mb-3 flex items-center gap-2`}>
            🌱 <span>Energy</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-white text-3xl font-bold cyberpunk-title">
              {energyMetric?.data.value || 'N/A'}
            </div>
            <div className="text-white/60 text-lg font-medium">
              {energyMetric?.data.unit || ''}
            </div>
          </div>
          <div className={`flex items-center gap-2 text-${getMetricColor(energyMetric?.data.trend || 'blue')}-400 text-sm font-medium`}>
            {getTrendIcon(energyMetric?.data.trend || 'stable')}
            <span className="capitalize">{energyMetric?.data.trend || 'stable'}</span>
          </div>
        </div>
        
        <div className={`bg-gradient-to-br from-${getMetricColor(wellbeingMetric?.data.trend || 'blue')}-500/10 to-${getMetricColor(wellbeingMetric?.data.trend || 'blue')}-600/20 p-5 rounded-lg border border-${getMetricColor(wellbeingMetric?.data.trend || 'blue')}-400/30 backdrop-blur-sm`}>
          <div className={`text-${getMetricColor(wellbeingMetric?.data.trend || 'blue')}-400 font-semibold mb-3 flex items-center gap-2`}>
            🧘 <span>Well-being</span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-white text-3xl font-bold cyberpunk-title">
              {wellbeingMetric?.data.value || 'N/A'}
            </div>
            <div className="text-white/60 text-lg font-medium">
              {wellbeingMetric?.data.unit || ''}
            </div>
          </div>
          <div className={`flex items-center gap-2 text-${getMetricColor(wellbeingMetric?.data.trend || 'blue')}-400 text-sm font-medium`}>
            {getTrendIcon(wellbeingMetric?.data.trend || 'stable')}
            <span className="capitalize">{wellbeingMetric?.data.trend || 'stable'}</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}

