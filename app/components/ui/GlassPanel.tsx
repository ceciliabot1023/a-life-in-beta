import { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface GlassPanelProps {
  children: ReactNode
  className?: string
}

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div className={cn(
      "glass-panel",
      className
    )}>
      {children}
    </div>
  )
}