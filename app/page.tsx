import Link from 'next/link'
import { Navigation } from '@/components/layout/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative particle-bg" style={{backgroundImage: 'url(/images/lab-background.jpg)'}}>
      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none" />
      
      <Navigation />
      <main className="min-h-screen flex items-end justify-end p-4 md:p-8 lg:p-12">
        <div className="glass-panel-enhanced max-w-sm md:max-w-lg lg:max-w-xl w-full transform transition-all duration-700 hover:scale-[1.02]">
          <div className="p-5 md:p-6 lg:p-8">
            <h1 className="cyberpunk-title-glow text-4xl font-bold text-white mb-4 text-shadow-lg">
              A Life in <span className="text-neon-cyan cyber-glow">Beta</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/90 mb-5 md:mb-6 lg:mb-8 leading-relaxed">
              Welcome to my ongoing experiment in living. This is where I document 
              the journey of treating life as a laboratory for continuous improvement, 
              discovery, and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link 
                href="/lab" 
                className="cyber-button-primary px-5 md:px-6 lg:px-8 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-red focus:ring-offset-2 focus:ring-offset-transparent text-center"
                aria-label="Enter the Lab - View current experiments and findings"
              >
                Enter the Lab
              </Link>
              <Link 
                href="/protocol" 
                className="glass-button px-5 md:px-6 lg:px-8 py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent text-center"
                aria-label="Read the Protocol - Learn about the methodology and principles"
              >
                Read the Protocol
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
