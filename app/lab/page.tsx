'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  ChevronLeft, 
  ChevronRight, 
  Coffee, 
  Instagram, 
  Music, 
  Radio
} from 'lucide-react'
import { StatusPanel } from '../components/sections/StatusPanel'
import { FindingsPanel } from '../components/sections/FindingsPanel'
import { Navigation } from '../components/layout/Navigation'
import client from '../../tina/__generated__/client'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import type { TinaApp, TinaMarkdownContent } from '../../types/tina'

export default function LabPage() {
  const [currentMockup, setCurrentMockup] = useState(0)
  const [apps, setApps] = useState<TinaApp[]>([])
  const [loading, setLoading] = useState(true)
  
  // Function to extract images from app body content
  const extractImagesFromBody = (body: TinaMarkdownContent) => {
    if (!body) return []
    
    const images: { id: number, title: string, image: string, description: string }[] = []
    
    // Function to recursively search for images in the body structure
    const findImages = (content: unknown) => {
      if (Array.isArray(content)) {
        content.forEach(findImages)
      } else if (content && typeof content === 'object') {
        const obj = content as Record<string, unknown>
        
        // Handle rich-text image objects
        if (obj.type === 'img' && obj.url) {
          images.push({
            id: images.length + 1,
            title: (obj.alt as string) || 'App Screenshot',
            image: obj.url as string,
            description: (obj.caption as string) || 'Application interface'
          })
        }
        
        // Handle paragraph with image content
        if (obj.type === 'p' && obj.children) {
          findImages(obj.children)
        }
        
        // Handle markdown image text content
        if (obj.type === 'text' && typeof obj.text === 'string') {
          const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
          let match
          while ((match = markdownImageRegex.exec(obj.text)) !== null) {
            images.push({
              id: images.length + 1,
              title: match[1] || 'App Screenshot',
              image: match[2],
              description: match[1] || 'Application interface'
            })
          }
        }
        
        // Handle direct image nodes
        if (obj.type === 'image' || obj.type === 'mdxJsxFlowElement') {
          if (obj.url || obj.src) {
            images.push({
              id: images.length + 1,
              title: (obj.alt as string) || 'App Screenshot',
              image: (obj.url || obj.src) as string,
              description: (obj.alt as string) || 'Application interface'
            })
          }
        }
        
        // Recursively search in children
        if (obj.children) {
          findImages(obj.children)
        }
      }
    }
    
    findImages(body)
    
    // If no images found through rich-text parsing, try to extract from raw markdown
    if (images.length === 0 && body) {
      const bodyString = JSON.stringify(body)
      const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
      let match
      while ((match = markdownImageRegex.exec(bodyString)) !== null) {
        images.push({
          id: images.length + 1,
          title: match[1] || 'App Screenshot',
          image: match[2],
          description: match[1] || 'Application interface'
        })
      }
    }
    
    return images
  }

  useEffect(() => {
    async function fetchApps() {
      try {
        const response = await client.queries.appsConnection()
        const appsData = response.data.appsConnection.edges?.map(edge => ({
          id: edge?.node?.id || '',
          title: edge?.node?.title || '',
          status: edge?.node?.status || '',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          description: edge?.node?.description as any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          body: edge?.node?.body as any
        })) || []
        
        setApps(appsData)
      } catch (error) {
        console.error('Error fetching apps:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchApps()
  }, [])

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative particle-bg" style={{backgroundImage: 'url(/images/lab-background.jpg)'}}>
      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none" />
      
      <Navigation />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="cyberpunk-title text-4xl md:text-6xl font-bold text-white mb-4">
              The <span className="text-neon-red cyber-glow">Lab</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Welcome to the command center. Here you&apos;ll find real-time experiment data, 
              research findings, and the products emerging from this ongoing life redesign.
            </p>
          </div>

          <div className="space-y-12">
            {/* Status Panel */}
            <StatusPanel />
            
            {/* Findings Panel */}
            <FindingsPanel />
            
            {/* Product/Service Incubator Section */}
            <div className="space-y-6">
              <h2 className="cyberpunk-title text-3xl font-bold text-white text-center mb-8">
                <span className="text-neon-red cyber-glow">Incubator</span>
              </h2>
              
              {loading ? (
                <div className="glass-panel">
                  <div className="p-6">
                    <div className="text-white">Loading apps...</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Indie App Section */}
                  <div className="space-y-6">
                    <h3 className="cyberpunk-title text-2xl font-bold text-white mb-4">
                      <span className="text-neon-cyan cyber-glow">Indie App</span>
                    </h3>
                    {apps.filter(app => 
                      app.title.toLowerCase().includes('app') || 
                      app.status === 'development' || 
                      app.title.toLowerCase().includes('vase')
                    ).map((app) => (
                      <div key={app.id} className="glass-panel">
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-6">
                            <div>
                              <h4 className="cyberpunk-title text-xl font-bold text-white">
                                {app.title}
                              </h4>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* App Description */}
                            <div className="space-y-4">
                              <h5 className="text-lg font-semibold text-cyan-400">The Concept</h5>
                              <div className="text-white/80 text-sm leading-relaxed whitespace-pre-line">
                                {app.description || 'No description available'}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <span className={`px-3 py-1 border rounded-full text-xs ${
                                  app.status === 'development' ? 'bg-blue-500/20 border-blue-400/30 text-blue-300' :
                                  app.status === 'concept' ? 'bg-purple-500/20 border-purple-400/30 text-purple-300' :
                                  app.status === 'testing' ? 'bg-yellow-500/20 border-yellow-400/30 text-yellow-300' :
                                  'bg-green-500/20 border-green-400/30 text-green-300'
                                }`}>
                                  {app.status}
                                </span>
                              </div>
                            </div>
                            
                            {/* Enhanced Mockup Gallery */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h5 className="text-lg font-semibold text-cyan-400">Preview</h5>
                                {(() => {
                                  const appImages = extractImagesFromBody(app.body)
                                  if (appImages.length === 0) return null
                                  
                                  return (
                                    <div className="flex gap-2">
                                      <button 
                                        onClick={() => setCurrentMockup(Math.max(0, currentMockup - 1))}
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded border border-white/20 transition-colors"
                                      >
                                        <ChevronLeft className="w-4 h-4 text-white" />
                                      </button>
                                      <button 
                                        onClick={() => setCurrentMockup(Math.min(appImages.length - 1, currentMockup + 1))}
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded border border-white/20 transition-colors"
                                      >
                                        <ChevronRight className="w-4 h-4 text-white" />
                                      </button>
                                    </div>
                                  )
                                })()}
                              </div>
                              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-2 sm:p-4 border border-white/10">
                                <div className="relative w-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded border border-cyan-400/30 overflow-hidden">
                                  <div className="relative w-full" style={{paddingBottom: '60%'}}>
                                    {(() => {
                                      const appImages = extractImagesFromBody(app.body)
                                      if (appImages.length === 0) {
                                        return (
                                          <div className="absolute inset-0 flex items-center justify-center text-center bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                                            <div className="p-4">
                                              <div className="text-2xl sm:text-4xl mb-2 sm:mb-3">📱</div>
                                              <div className="text-white font-medium text-sm sm:text-lg">App Preview</div>
                                              <div className="text-white/60 text-xs sm:text-sm mt-1">No images available</div>
                                            </div>
                                          </div>
                                        )
                                      }
                                        
                                      const currentImage = appImages[currentMockup] || appImages[0]
                                      return (
                                        <>
                                          <Image 
                                            src={currentImage.image} 
                                            alt={currentImage.title}
                                            fill
                                            className="object-contain bg-black/20 rounded"
                                            style={{
                                              maxHeight: '400px',
                                              objectPosition: 'center'
                                            }}
                                          />
                                          <div className="absolute inset-0 flex items-center justify-center text-center bg-gradient-to-br from-blue-500/20 to-purple-600/20" style={{display: 'none'}}>
                                            <div className="p-4">
                                              <div className="text-2xl sm:text-4xl mb-2 sm:mb-3">📱</div>
                                              <div className="text-white font-medium text-sm sm:text-lg">App Preview</div>
                                              <div className="text-white/60 text-xs sm:text-sm mt-1">Image not available</div>
                                            </div>
                                          </div>
                                          <div className="flex justify-center mt-3 gap-1">
                                            {appImages.map((_, imageIndex) => (
                                              <button
                                                key={imageIndex}
                                                onClick={() => setCurrentMockup(imageIndex)}
                                                className={`w-2 h-2 rounded-full transition-colors ${
                                                  imageIndex === currentMockup ? 'bg-cyan-400' : 'bg-white/30 hover:bg-white/50'
                                                }`}
                                              />
                                            ))}
                                          </div>
                                        </>
                                      )
                                    })()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                            
                          {/* Early Adopter CTA */}
                          <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-400/30 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <h6 className="text-white font-semibold mb-1">Early Adopter Special</h6>
                                <p className="text-white/70 text-sm">Be among the first to experience this innovation</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-neon-cyan mb-1 cyberpunk-title">50% OFF</div>
                                <div className="text-white font-bold text-sm">
                                  Join waitlist by sending an email to beuself@yeah.net
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                    
                  {/* Life Coaching Service Section */}
                  <div className="space-y-6">
                    <h3 className="cyberpunk-title text-2xl font-bold text-white mb-4">
                      <span className="text-neon-green cyber-glow">Life Coaching Service</span>
                    </h3>
                    {apps.filter(app => app.title.toLowerCase().includes('coaching') || app.title.toLowerCase().includes('life')).map((app) => (
                      <div key={app.id} className="glass-panel">
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-6">
                            <div>
                              <h4 className="cyberpunk-title text-xl font-bold text-white">
                                {app.title}
                              </h4>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <h5 className="text-lg font-semibold text-green-400">The Service</h5>
                            <div className="text-white/80 text-sm leading-relaxed prose prose-invert max-w-none">
                              <TinaMarkdown content={app.body} />
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className={`px-3 py-1 border rounded-full text-xs ${
                                app.status === 'development' ? 'bg-green-500/20 border-green-400/30 text-green-300' :
                                app.status === 'concept' ? 'bg-purple-500/20 border-purple-400/30 text-purple-300' :
                                app.status === 'testing' ? 'bg-yellow-500/20 border-yellow-400/30 text-yellow-300' :
                                'bg-green-500/20 border-green-400/30 text-green-300'
                              }`}>
                                {app.status}
                              </span>
                            </div>
                          </div>
                          
                          {/* Trial Offer Only */}
                          <div className="mt-6">
                            <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-600/10 border border-yellow-400/30 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h6 className="text-white font-semibold mb-1">Trial Offer</h6>
                                  <p className="text-white/70 text-sm">Experience the value with no commitment</p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-yellow-400 mb-1 cyberpunk-title">FIRST SESSION FREE</div>
                                  <div className="text-white font-bold text-sm">
                                    Book a session by sending an email to beuself@yeah.net
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-glass-bg backdrop-blur-md border-t border-glass-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              {/* Connect Section */}
              <div className="flex items-center space-x-4">
                <span className="text-white/60 text-sm font-medium hidden sm:block">Connect:</span>
                <div className="flex items-center space-x-3">
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/ceciliatiantian?igsh=MWw1bWJiam05ZW5wYg%3D%3D&utm_source=qr" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 text-purple-300 group-hover:text-purple-200 transition-colors" />
                  </a>
                  
                  {/* The RED (小红书) */}
                  <a 
                    href="https://www.xiaohongshu.com/user/profile/5cf10a260000000016016e1a?xsec_token=YBerQZdwF8o8-iCIc3-fxpHHO5rDDsVXyfcRfKTQjD5Eo=&xsec_source=app_share&xhsshare=CopyLink&appuid=5cf10a260000000016016e1a&apptime=1753761113&share_id=71083375b8dd494793de4a0cfb193928" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 hover:border-red-400/50 transition-all duration-300 group"
                    aria-label="The RED"
                  >
                    <Music className="w-4 h-4 text-red-300 group-hover:text-red-200 transition-colors" />
                  </a>
                  
                  {/* Bilibili */}
                  <a 
                    href="https://b23.tv/J4v3lxD" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-pink-600/20 border border-pink-400/30 hover:border-pink-400/50 transition-all duration-300 group"
                    aria-label="Bilibili"
                  >
                    <Radio className="w-4 h-4 text-pink-300 group-hover:text-pink-200 transition-colors" />
                  </a>
                  
                  {/* Podcast */}
                  <a 
                    href="https://podcasts.apple.com/cn/podcast/%E5%91%BC%E7%AC%91%E5%B1%B1%E5%BA%84/id1813341721" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 group"
                    aria-label="Podcast"
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="w-2 h-2 bg-cyan-300 rounded-full group-hover:bg-cyan-200 transition-colors animate-pulse"></div>
                    </div>
                  </a>
                </div>
              </div>
              
              {/* Support Section - Update to Ko-fi */}
              <a 
                href="https://ko-fi.com/ceciliatiantian" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 hover:border-yellow-400/50 rounded-lg transition-all duration-300 group hover:scale-105"
              >
                <Coffee className="w-4 h-4 text-yellow-300 group-hover:text-yellow-200 transition-colors" />
                <span className="text-yellow-300 group-hover:text-yellow-200 text-sm font-medium transition-colors">
                  <span className="hidden sm:inline">Support on Ko-fi</span>
                  <span className="sm:hidden">Support</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add bottom padding to prevent content from being hidden behind the fixed bar */}
      <div className="h-16"></div>
    </div>
  )
}