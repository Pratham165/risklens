'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Focus,
  ArrowRight,
  Crosshair,
  Activity,
  Database,
  Clock,
  Target,
  Cpu,
  BarChart3,
  Zap,
  ChevronDown,
} from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0f] text-gray-100 overflow-hidden">

      {/* ── Navbar ────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-violet-500/20 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-2.5">
            <Focus className="w-5 h-5 text-violet-400" strokeWidth={2} />
            <span className="font-bold text-lg tracking-tight text-white font-mono">RISKLENS</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-violet-400 hover:text-white hover:bg-violet-500/10 font-mono text-xs tracking-wider"
            onClick={() => router.push('/predict')}
          >
            LAUNCH TERMINAL
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" strokeWidth={2} />
          </Button>
        </div>
      </nav>

      {/* ── Full-Screen Hero ───────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-14 relative">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        {/* Crosshair decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.06]">
          <div className="absolute top-0 left-1/2 w-px h-full bg-violet-500" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-violet-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-violet-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-violet-500/50" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-violet-500/30 bg-violet-500/5">
            <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono tracking-[0.3em] text-violet-400 uppercase">System Online — v1.0</span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-bold tracking-tighter text-white leading-[0.95] mb-6 font-mono">
            RISK<span className="text-transparent bg-clip-text bg-gradient-to-b from-violet-400 to-cyan-400">LENS</span>
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto">
            Enterprise-grade fraud detection engine. 26-dimensional feature analysis
            powered by ensemble machine learning. Sub-second inference.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-violet-600 hover:bg-violet-500 text-white px-10 h-14 font-mono text-sm tracking-widest rounded-none border border-violet-500"
              onClick={() => router.push('/predict')}
            >
              <Crosshair className="w-4 h-4 mr-2.5" strokeWidth={2} />
              INITIATE SCAN
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] font-mono text-gray-600 tracking-widest">SCROLL</span>
          <ChevronDown className="w-4 h-4 text-gray-600 animate-bounce" strokeWidth={2} />
        </div>
      </section>

      {/* ── Horizontal Stats Ticker ──────────────────────── */}
      <div className="border-y border-violet-500/20 bg-[#08080d]">
        <div className="max-w-7xl mx-auto grid grid-cols-4 divide-x divide-violet-500/20">
          {[
            { icon: Database, value: '12,002', label: 'TRAINING SAMPLES' },
            { icon: Target, value: '98%', label: 'FRAUD RECALL' },
            { icon: Zap, value: '<200ms', label: 'P95 LATENCY' },
            { icon: BarChart3, value: '26', label: 'RISK VECTORS' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="px-6 py-8 text-center">
              <Icon className="w-4 h-4 text-violet-400/60 mx-auto mb-3" strokeWidth={2} />
              <p className="text-2xl font-bold text-white font-mono mb-1">{value}</p>
              <p className="text-[9px] font-mono text-gray-500 tracking-[0.2em]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Vertical Pipeline Steps ────────────────────────── */}
      <section id="specs" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono tracking-[0.3em] text-violet-400 uppercase">How It Works</span>
            <h2 className="text-3xl font-bold tracking-tight text-white font-mono mt-3">DETECTION PIPELINE</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-violet-500/20" />

            <div className="space-y-0">
              {[
                {
                  step: '01',
                  icon: Crosshair,
                  title: 'FEATURE EXTRACTION',
                  desc: 'Submit claim data through the terminal interface. The engine instantly maps your input across 26 dimensional risk vectors.',
                },
                {
                  step: '02',
                  icon: Cpu,
                  title: 'ENSEMBLE INFERENCE',
                  desc: 'A 200-estimator Random Forest evaluates cross-feature correlations — income ratios, filing cadence, geographic anomalies.',
                },
                {
                  step: '03',
                  icon: Activity,
                  title: 'RISK QUANTIFICATION',
                  desc: 'Receive a calibrated fraud probability with confidence scoring. Flag or clear claims in milliseconds, not days.',
                },
              ].map(({ step, icon: Icon, title, desc }) => (
                <div key={step} className="flex gap-8 group">
                  {/* Step indicator */}
                  <div className="relative flex flex-col items-center shrink-0 w-16">
                    <div className="w-16 h-16 border border-violet-500/30 bg-[#0a0a0f] flex items-center justify-center z-10 group-hover:border-violet-400 transition-colors">
                      <Icon className="w-5 h-5 text-violet-400" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="border border-violet-500/20 p-8 flex-1 group-hover:bg-violet-500/5 transition-colors mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-mono text-violet-500/50 tracking-wider">{step}</span>
                      <h3 className="text-sm font-bold text-white font-mono tracking-wider">{title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-violet-500/20 relative">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(rgba(139,92,246,0.8) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <Crosshair className="w-8 h-8 text-violet-500/30 mx-auto mb-6" strokeWidth={1} />
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4 font-mono">
            READY TO ANALYZE?
          </h2>
          <p className="text-sm text-gray-500 mb-10 font-mono max-w-md mx-auto">
            Submit claim parameters and receive a precision fraud assessment in under one second.
          </p>
          <Button
            size="lg"
            className="bg-violet-600 hover:bg-violet-500 text-white px-12 h-14 font-mono text-sm tracking-widest rounded-none border border-violet-500"
            onClick={() => router.push('/predict')}
          >
            LAUNCH TERMINAL
          </Button>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-violet-500/20 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] text-gray-600 font-mono tracking-wider">
          <div className="flex items-center gap-1.5">
            <Focus className="w-3 h-3 text-violet-500/50" strokeWidth={2} />
            <span>RISKLENS</span>
          </div>
          <span>ML-POWERED FRAUD ANALYTICS ENGINE</span>
        </div>
      </footer>
    </main>
  );
}
