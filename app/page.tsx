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
} from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0f] text-gray-100">

      {/* ── Navbar ────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-violet-500/20 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-2.5">
            <Focus className="w-5 h-5 text-violet-400" strokeWidth={2} />
            <span className="font-bold text-lg tracking-tight text-white font-mono">RISKLENS</span>
            <span className="text-violet-500/40 mx-1">|</span>
            <span className="text-xs font-mono text-violet-400/60 tracking-widest uppercase">Analytics</span>
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

      {/* ── Hero Split ─────────────────────────────────────── */}
      <section className="flex-1">
        <div className="max-w-7xl mx-auto w-full px-6 py-16 grid lg:grid-cols-5 gap-0 items-stretch min-h-[80vh]">

          {/* Left Panel: 3 cols */}
          <div className="lg:col-span-3 flex flex-col justify-center border border-violet-500/20 p-10 relative overflow-hidden">
            {/* Grid overlay effect */}
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-violet-500 animate-pulse" />
                <span className="text-xs font-mono tracking-[0.3em] text-violet-400/80 uppercase">
                  Insurance Fraud Intelligence
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-6 font-mono">
                PRECISION<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  RISK SCORING
                </span>
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed mb-10 max-w-lg font-mono">
                RiskLens deploys ensemble ML models across 26 dimensional feature vectors
                to detect anomalous claim patterns. Trained on 12,000+ labeled cases
                with 98% fraud recall.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-500 text-white px-8 h-12 font-mono text-sm tracking-wider rounded-none border border-violet-500"
                  onClick={() => router.push('/predict')}
                >
                  <Crosshair className="w-4 h-4 mr-2" strokeWidth={2} />
                  INITIATE SCAN
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 border-violet-500/30 text-violet-400 hover:bg-violet-500/10 hover:text-white font-mono text-sm tracking-wider rounded-none"
                  onClick={() =>
                    document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  VIEW SPECS
                  <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel: 2 cols — System Telemetry */}
          <div className="lg:col-span-2 border border-violet-500/20 lg:border-l-0 flex flex-col">
            {/* Header */}
            <div className="border-b border-violet-500/20 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-cyan-400" strokeWidth={2} />
                <span className="text-xs font-mono tracking-[0.2em] text-gray-400 uppercase">System Telemetry</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 flex-1">
              {[
                { label: 'MODEL', value: 'RF-200', sub: 'Random Forest', icon: Cpu },
                { label: 'RECALL', value: '98.0%', sub: 'Fraud detection', icon: Target },
                { label: 'FEATURES', value: '26', sub: 'Risk vectors', icon: BarChart3 },
                { label: 'LATENCY', value: '<200ms', sub: 'p95 inference', icon: Zap },
              ].map(({ label, value, sub, icon: Icon }, i) => (
                <div
                  key={label}
                  className={`p-5 flex flex-col justify-center border-violet-500/20 ${i < 2 ? 'border-b' : ''} ${i % 2 === 0 ? 'border-r' : ''}`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Icon className="w-3 h-3 text-violet-400/60" strokeWidth={2} />
                    <span className="text-[9px] font-mono tracking-[0.2em] text-gray-500 uppercase">{label}</span>
                  </div>
                  <p className="text-2xl font-bold text-white font-mono">{value}</p>
                  <p className="text-[10px] text-gray-500 font-mono mt-1">{sub}</p>
                </div>
              ))}
            </div>

            {/* Uptime Bar */}
            <div className="border-t border-violet-500/20 px-5 py-3 flex items-center gap-3">
              <div className="flex-1 h-1 bg-gray-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500" style={{ width: '94%' }} />
              </div>
              <span className="text-[9px] text-gray-500 font-mono">94% UPTIME</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics Strip ──────────────────────────────────── */}
      <div className="border-y border-violet-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { icon: Database, value: '12,002', label: 'TRAINING SAMPLES' },
            { icon: Target, value: '98%', label: 'FRAUD RECALL' },
            { icon: Clock, value: '<1s', label: 'AVG RESPONSE' },
            { icon: BarChart3, value: '26', label: 'RISK VECTORS' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 border border-violet-500/30 flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-violet-400" strokeWidth={2} />
              </div>
              <div>
                <p className="text-lg font-bold text-white font-mono">{value}</p>
                <p className="text-[9px] font-mono text-gray-500 tracking-wider">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How It Works ───────────────────────────────────── */}
      <section id="specs" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-[1px] bg-violet-500" />
              <span className="text-xs font-mono tracking-[0.3em] text-violet-400 uppercase">Pipeline</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white font-mono">DETECTION PIPELINE</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-0">
            {[
              {
                step: '01',
                icon: Crosshair,
                title: 'FEATURE EXTRACTION',
                desc: 'Submit claim data. The engine instantly maps 26 dimensional risk vectors against learned fraud topologies.',
              },
              {
                step: '02',
                icon: Cpu,
                title: 'ENSEMBLE INFERENCE',
                desc: 'A 200-estimator Random Forest evaluates cross-feature correlations: income ratios, filing cadence, geographic anomalies.',
              },
              {
                step: '03',
                icon: Activity,
                title: 'RISK QUANTIFICATION',
                desc: 'Receive a calibrated fraud probability with key risk drivers. Flag or clear claims in milliseconds, not days.',
              },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <div
                key={step}
                className={`border border-violet-500/20 p-8 group hover:bg-violet-500/5 transition-colors ${i > 0 ? 'sm:border-l-0' : ''}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-xs text-violet-500/40">{step}</span>
                  <div className="w-8 h-8 border border-violet-500/30 flex items-center justify-center group-hover:border-violet-400 transition-colors">
                    <Icon className="w-4 h-4 text-violet-400" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white mb-3 font-mono tracking-wider">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-violet-500/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-4 font-mono">
            READY TO ANALYZE?
          </h2>
          <p className="text-sm text-gray-500 mb-8 font-mono">
            Submit claim parameters and receive a fraud assessment in under one second.
          </p>
          <Button
            size="lg"
            className="bg-violet-600 hover:bg-violet-500 text-white px-10 h-12 font-mono text-sm tracking-wider rounded-none border border-violet-500"
            onClick={() => router.push('/predict')}
          >
            <Crosshair className="w-4 h-4 mr-2" strokeWidth={2} />
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
