import { Navigation } from '@/components/layout/Navigation'

export default function ProtocolPage() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed particle-bg" style={{backgroundImage: 'url(/images/lab-background.jpg)'}}>
      <Navigation />
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="cyberpunk-title text-4xl font-bold text-white mb-4 text-shadow-lg">
              The <span className="text-neon-red cyber-glow">Protocol</span>
            </h1>
            <p className="text-white/80 text-lg">
              The Blueprint for Life in Beta
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* The Alchemist Panel - Left Column */}
            <div className="glass-panel">
              <div className="p-8">
                <h2 className="cyberpunk-title text-3xl font-bold text-white mb-6 text-center">
                  The <span className="text-neon-cyan">Alchemist</span>
                </h2>
                
                <div className="space-y-6 text-white/90 leading-relaxed">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-400 mb-3">Welcome to My Life in Beta</h3>
                    <p className="mb-4">
                      For years, I treated my life like a final product that needed to be perfect. The problem was, I was working off someone else&apos;s blueprint. This is the story of how I stopped trying to ship a flawless version 1.0 and learned to embrace my life in a perpetual, evolving beta.
                    </p>
                    <p className="mb-4">
                      My career has been a series of experiments—each one a different build, a new hypothesis.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-red-400 pl-6 bg-red-500/10 p-4 rounded-r-lg">
                    <h4 className="text-lg font-semibold text-red-400 mb-2">Life_v1: The Scientist</h4>
                    <p className="text-sm">
                      On paper, this build was perfect. A prestigious path at the Chinese Academy of Sciences. But the code wouldn&apos;t compile. My internal debugger kept throwing the same error: <em>This isn&apos;t you.</em>
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-orange-400 pl-6 bg-orange-500/10 p-4 rounded-r-lg">
                    <h4 className="text-lg font-semibold text-orange-400 mb-2">Life_v2: The World-Changer</h4>
                    <p className="text-sm">
                      I pivoted, pushing a new feature set: &quot;global impact&quot; at the World Resources Institute and the World Bank. The mission was inspiring, but the system architecture was too slow. I was a fast processor trapped on a dial-up connection, watching my energy drain away in bureaucratic lag.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-400 pl-6 bg-purple-500/10 p-4 rounded-r-lg">
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">Life_v3: The Tech Builder</h4>
                    <p className="text-sm">
                      At TikTok, I hit peak performance. The specs were incredible&mdash;great title, thrilling work, a masterclass in scale. But running on someone else&apos;s operating system, no matter how fast, led to a critical system error: a deep sense of meaninglessness.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-cyan-400 pl-6 bg-cyan-500/10 p-4 rounded-r-lg">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">Life_v4: The Current Build</h4>
                    <p className="text-sm mb-3">
                      That error was the best thing that could have happened. It forced me to stop shipping features and finally read my own source code. In the quiet space of that pause, I wasn&apos;t just debugging; I was rediscovering the core programming that had been there all along.
                    </p>
                    <p className="text-sm">
                      This version&mdash;Life_v4&mdash;I&apos;m currently building, is a coach, an indie app developer, and a solopreneur. It&apos;s the most authentic, agile, and joyful build yet. It&apos;s designed not for perfection, but for learning, connection, and continuous growth. And it&apos;s open-source.
                    </p>
                  </div>
                  
                  <div className="bg-white/10 p-6 rounded-lg border border-cyan-400/30">
                    <p className="text-center italic">
                      &quot;What if my life wasn&apos;t a product to be perfected, but a process to be explored? What if every &apos;failure&apos; was just data?&quot;
                    </p>
                  </div>
                  
                  <p className="text-center">
                    This space is the living changelog of that journey. It&apos;s where I document the experiments, reflect on the data, and share the tools I&apos;m building along the way.
                  </p>
                  
                  <p className="text-center font-semibold text-cyan-400">
                    If you&apos;re also tired of chasing a flawless final version and are ready to embrace your own beautiful, messy, and powerful life in beta&mdash;you&apos;re in the right place. Let&apos;s connect and build what&apos;s next, together.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Multiple Panels */}
            <div className="space-y-6">
              {/* Guiding Principles Panel */}
              <div className="glass-panel">
                <div className="p-6">
                  <h2 className="cyberpunk-title text-2xl font-bold text-white mb-6">
                    Guiding <span className="text-neon-cyan">Principles</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-lg border border-cyan-400/30">
                      <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                        🎯 The Quest: 3 Ex
                      </h3>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• <strong>Explore</strong> the unknown territories of possibility</li>
                        <li>• <strong>Experience</strong> the profound moments that define us</li>
                        <li>• <strong>Excel</strong> beyond conventional templates</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-lg border border-orange-400/30">
                      <h3 className="text-lg font-semibold text-orange-400 mb-3">
                        🔄 The Method: 3 R
                      </h3>
                      <ul className="text-white/80 text-sm space-y-1">
                        <li>• <strong>Relax</strong> to restore creative energy</li>
                        <li>• <strong>Reflect</strong> to refine understanding</li>
                        <li>• <strong>Revive</strong> to reimagine what's possible</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mission Panel */}
              <div className="glass-panel">
                <div className="p-6">
                  <h2 className="cyberpunk-title text-2xl font-bold text-white mb-4">
                    🎯 <span className="text-neon-red">Mission</span>
                  </h2>
                  <p className="text-white/90 leading-relaxed">
                    To build a public laboratory for intentional life redesign. This space documents the transformation journey, connects with fellow experimenters, and creates a blueprint for sovereign living.
                  </p>
                </div>
              </div>
              
              {/* Core Hypothesis Panel */}
              <div className="glass-panel">
                <div className="p-6">
                  <h2 className="cyberpunk-title text-2xl font-bold text-white mb-4">
                    🧪 Core <span className="text-neon-cyan">Hypothesis</span>
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Research Question:</h3>
                      <p className="text-white/90 text-sm">
                        Can one escape the 9-to-5 grind (or China&apos;s &quot;996&quot; culture) for sovereign freedom while maintaining financial stability?
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-400 mb-2">Hypothesis:</h3>
                      <p className="text-white/90 text-sm">
                        Yes. Through a designed &quot;free life flow&quot; and &quot;free work flow&quot; system, working one hyper-focused day (24 hours) per week can generate above-average monthly income while creating a measurably healthier, happier existence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Success Metrics Panel */}
              <div className="glass-panel">
                <div className="p-6">
                  <h2 className="cyberpunk-title text-2xl font-bold text-white mb-4">
                    📊 Success <span className="text-neon-red">Metrics</span>
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-green-500/20 p-3 rounded border border-green-400/30">
                      <span className="text-green-400 font-semibold">💰 Wealth</span>
                      <span className="text-white/90 text-sm">Monthly income ≥ 3x average for base city</span>
                    </div>
                    <div className="flex items-center justify-between bg-blue-500/20 p-3 rounded border border-blue-400/30">
                      <span className="text-blue-400 font-semibold">⏰ Time</span>
                      <span className="text-white/90 text-sm">Weekly professional screen time ≤ 24 hours</span>
                    </div>
                    <div className="flex items-center justify-between bg-pink-500/20 p-3 rounded border border-pink-400/30">
                      <span className="text-pink-400 font-semibold">🌱 Well-being</span>
                      <span className="text-white/90 text-sm">Positive health trends via iOS Health data</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Experiment Areas Panel */}
              <div className="glass-panel">
                <div className="p-6">
                  <h2 className="cyberpunk-title text-2xl font-bold text-white mb-4">
                    🔬 Current <span className="text-neon-cyan">Experiments</span>
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-purple-500/20 p-4 rounded border border-purple-400/30">
                      <h3 className="text-purple-400 font-semibold mb-2">1. Digital Nomad Viability</h3>
                      <p className="text-white/80 text-sm">
                        Is location-independent living wise and sustainable for a solo female entrepreneur?
                      </p>
                    </div>
                    <div className="bg-cyan-500/20 p-4 rounded border border-cyan-400/30">
                      <h3 className="text-cyan-400 font-semibold mb-2">2. Career Pivot Success</h3>
                      <p className="text-white/80 text-sm">
                        Can a product manager with zero development experience become a profitable indie app developer?
                      </p>
                    </div>
                    <div className="bg-orange-500/20 p-4 rounded border border-orange-400/30">
                      <h3 className="text-orange-400 font-semibold mb-2">3. Coaching Transformation</h3>
                      <p className="text-white/80 text-sm">
                        Can someone analytical and problem-solving oriented master intuitive, people-centered life coaching?
                      </p>
                    </div>
                    <div className="bg-green-500/20 p-4 rounded border border-green-400/30">
                      <h3 className="text-green-400 font-semibold mb-2">4. Investment Strategy</h3>
                      <p className="text-white/80 text-sm">
                        Can above-average returns be achieved in Chinese stock markets without complex trading strategies?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}