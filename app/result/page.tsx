'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
    Focus,
    ArrowLeft,
    RotateCcw,
    Crosshair,
    Activity,
    AlertTriangle,
    CheckCircle2,
    TrendingUp,
    Info,
    ShieldAlert,
    Target,
} from 'lucide-react';

/* ── Config ────────────────────────────────────────────── */

const VERDICT = {
    clear: {
        title: 'CLEARED',
        subtitle: 'No significant anomalies detected in feature space.',
        icon: CheckCircle2,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        barCls: 'bg-emerald-500',
        badgeText: 'text-emerald-400',
        badgeBorder: 'border-emerald-500/30',
    },
    flagged: {
        title: 'ANOMALY DETECTED',
        subtitle: 'Suspicious patterns flagged. Manual review recommended.',
        icon: ShieldAlert,
        color: 'text-red-400',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        barCls: 'bg-red-500',
        badgeText: 'text-red-400',
        badgeBorder: 'border-red-500/30',
    },
} as const;

function getRiskDrivers(probability: number, riskLevel: string): { label: string; severity: 'high' | 'medium' | 'low' }[] {
    if (riskLevel === 'HIGH') {
        return [
            { label: 'Claim amount disproportionate to policy premium', severity: 'high' },
            { label: 'Income-to-claim ratio outside normal range', severity: 'high' },
            { label: 'Pattern matches known soft-fraud profiles', severity: 'medium' },
            { label: 'Filing frequency exceeds baseline for demographic', severity: 'medium' },
        ];
    }
    if (riskLevel === 'MEDIUM') {
        return [
            { label: 'Income-to-claim ratio slightly elevated', severity: 'medium' },
            { label: 'Geographic zone has above-average fraud rate', severity: 'medium' },
            { label: 'Minor inconsistencies in filing metadata', severity: 'low' },
        ];
    }
    if (probability > 0.15) {
        return [
            { label: 'Slight deviation in claim-to-premium ratio', severity: 'low' },
            { label: 'Filing day shows minor statistical anomaly', severity: 'low' },
        ];
    }
    return [
        { label: 'All features within expected ranges', severity: 'low' },
        { label: 'No anomalous patterns detected', severity: 'low' },
    ];
}

const SEVERITY_COLORS = {
    high: 'bg-red-500',
    medium: 'bg-amber-500',
    low: 'bg-gray-600',
} as const;

/* ── Result Content ────────────────────────────────────── */

function ResultContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const prediction = searchParams.get('prediction');
    const probability = parseFloat(searchParams.get('probability') || '0');
    const fraudRisk = searchParams.get('fraud_risk') === 'true';
    const riskLevel = searchParams.get('risk_level') || 'LOW';

    if (!prediction) {
        router.push('/predict');
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
                <p className="text-sm text-gray-500 font-mono">Redirecting...</p>
            </div>
        );
    }

    const v = fraudRisk ? VERDICT.flagged : VERDICT.clear;
    const VerdictIcon = v.icon;
    const probPercent = (probability * 100).toFixed(1);
    const drivers = getRiskDrivers(probability, riskLevel);

    return (
        <main className="min-h-screen flex flex-col bg-[#0a0a0f] text-gray-100">

            {/* ── Navbar ───────────────────────────────────────── */}
            <nav className="sticky top-0 z-50 border-b border-violet-500/20 bg-[#0a0a0f]/90 backdrop-blur-md">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
                    <div className="flex items-center gap-2">
                        <Focus className="w-5 h-5 text-violet-400" strokeWidth={2} />
                        <span className="font-bold text-[15px] tracking-tight text-white font-mono">RISKLENS</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-violet-400 hover:text-white hover:bg-violet-500/10 font-mono text-xs tracking-wider"
                        onClick={() => router.push('/predict')}
                    >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" strokeWidth={2} />
                        NEW SCAN
                    </Button>
                </div>
            </nav>

            {/* ── Page Header ──────────────────────────────────── */}
            <div className="border-b border-violet-500/20">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" strokeWidth={2} />
                        <span className="text-xs font-mono tracking-[0.3em] text-violet-400/80 uppercase">Analysis Complete</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white font-mono">SCAN RESULTS</h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto w-full px-6 py-8 space-y-0">

                {/* ── Verdict Banner ──────────────────────────────── */}
                <div className={`border ${v.border} p-6 flex items-start gap-4 relative overflow-hidden`}>
                    <div className={`absolute top-0 left-0 w-1 h-full ${v.barCls}`} />
                    <div className={`w-12 h-12 ${v.bg} border ${v.border} flex items-center justify-center shrink-0`}>
                        <VerdictIcon className={`w-6 h-6 ${v.color}`} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h2 className={`text-xl font-bold font-mono tracking-wider ${v.color}`}>{v.title}</h2>
                            <span className={`text-xs font-mono tracking-widest px-2.5 py-1 border ${v.badgeBorder} ${v.badgeText}`}>
                                {riskLevel} RISK
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 font-mono">{v.subtitle}</p>
                    </div>
                </div>

                {/* ── Probability Scale ──────────────────────────── */}
                <div className="border border-violet-500/20 border-t-0 p-8 space-y-5">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-violet-400" strokeWidth={2} />
                        <span className="text-xs font-mono tracking-[0.2em] text-violet-400 uppercase">Probability Scale</span>
                    </div>

                    {/* Score */}
                    <div className="text-center py-6">
                        <span className="text-6xl font-bold text-white font-mono">{probPercent}</span>
                        <span className="text-3xl font-bold text-violet-400 font-mono">%</span>
                        <p className="text-xs text-gray-500 mt-3 font-mono tracking-wider">FRAUD PROBABILITY</p>
                    </div>

                    {/* Bar */}
                    <div className="relative max-w-lg mx-auto">
                        <div className="h-2.5 bg-gray-800 overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ${probability >= 0.7 ? 'bg-red-500' :
                                    probability >= 0.4 ? 'bg-amber-500' : 'bg-emerald-500'
                                    }`}
                                style={{ width: `${Math.max(Number(probPercent), 2)}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-mono">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
                    </div>

                    {/* Threshold note */}
                    <div className="flex items-start gap-2 pt-2 max-w-lg mx-auto">
                        <Info className="w-3.5 h-3.5 text-gray-600 mt-0.5 shrink-0" strokeWidth={2} />
                        <p className="text-[11px] text-gray-600 leading-relaxed font-mono">
                            Tuned threshold: <span className="text-violet-400 font-medium">22%</span>. Claims exceeding
                            this value are automatically flagged for review.
                        </p>
                    </div>
                </div>

                {/* ── Action ──────────────────────────────────────── */}
                <div className="flex justify-center pt-8 pb-6">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white px-10 h-12 font-mono text-sm tracking-widest rounded-none border border-violet-500"
                        onClick={() => router.push('/predict')}
                    >
                        <RotateCcw className="w-4 h-4 mr-2" strokeWidth={2} />
                        INITIATE NEW SCAN
                    </Button>
                </div>
            </div>
        </main>
    );
}

/* ── Export ─────────────────────────────────────────────── */

export default function ResultPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
                <p className="text-sm text-gray-500 font-mono animate-pulse">Loading results...</p>
            </div>
        }>
            <ResultContent />
        </Suspense>
    );
}
