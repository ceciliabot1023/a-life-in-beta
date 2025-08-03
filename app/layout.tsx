import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'A Life in Beta - Personal Experiment Lab',
  description: 'Documenting life experiments, metrics, and discoveries in real-time',
  keywords: 'life experiments, personal development, metrics, beta testing life',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'A Life in Beta',
    description: 'Personal experiment lab documenting life in beta mode',
    type: 'website',
  },
}

import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
