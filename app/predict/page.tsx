'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { predictFraud } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import {
    Focus,
    ArrowLeft,
    Crosshair,
    Loader2,
    AlertCircle,
    User,
    FileText,
    Car,
    Terminal,
} from 'lucide-react';

/* ── Constants ─────────────────────────────────────────── */

const NUMERIC_FIELDS = [
    'age_of_driver', 'marital_status', 'annual_income', 'high_education',
    'safety_rating', 'address_change', 'zip_code',
    'past_num_of_claims', 'witness_present', 'liab_prct', 'police_report',
    'age_of_vehicle', 'vehicle_price', 'total_claim', 'injury_claim',
    'policy deductible', 'annual premium', 'days open', 'form defects'
];

const initialForm: Record<string, string> = {
    age_of_driver: '',
    gender: 'M',
    marital_status: '1',
    annual_income: '',
    high_education: '1',
    claim_day_of_week: 'Monday',
    safety_rating: '',
    address_change: '0',
    property_status: 'Own',
    zip_code: '',
    accident_site: 'Local',
    past_num_of_claims: '0',
    witness_present: '0',
    liab_prct: '',
    channel: 'Online',
    police_report: '0',
    age_of_vehicle: '',
    vehicle_category: 'Compact',
    vehicle_price: '',
    vehicle_color: 'white',
    total_claim: '',
    injury_claim: '0',
    'policy deductible': '500',
    'annual premium': '',
    'days open': '1',
    'form defects': '0',
};

/* ── Field Component ───────────────────────────────────── */

function Field({
    label,
    children,
    hint,
}: {
    label: string;
    children: React.ReactNode;
    hint?: string;
}) {
    return (
        <div className="space-y-1.5">
            <Label className="text-[11px] font-mono tracking-wider text-violet-400/70 uppercase">{label}</Label>
            {children}
            {hint && <p className="text-[10px] font-mono text-gray-600">{hint}</p>}
        </div>
    );
}

/* ── Page ──────────────────────────────────────────────── */

export default function PredictPage() {
    const router = useRouter();
    const [form, setForm] = useState<Record<string, string>>(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | React.ReactNode>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSelect = (name: string, value: string) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = (data: Record<string, string | number>): string[] => {
        const errs: string[] = [];

        if (Number(data.age_of_driver) < 16 || Number(data.age_of_driver) > 100) {
            errs.push("Driver's age must be between 16 and 100.");
        }
        if (Number(data.annual_income) < 0) {
            errs.push("Annual income cannot be negative.");
        }
        if (Number(data.safety_rating) < 0 || Number(data.safety_rating) > 100) {
            errs.push("Safety rating must be between 0 and 100.");
        }
        if (Number(data.past_num_of_claims) < 0) {
            errs.push("Past number of claims cannot be negative.");
        }
        if (Number(data.liab_prct) < 0 || Number(data.liab_prct) > 100) {
            errs.push("Liability percentage must be between 0 and 100.");
        }
        if (Number(data.age_of_vehicle) < 0) {
            errs.push("Vehicle age cannot be negative.");
        }
        if (Number(data.vehicle_price) < 0) {
            errs.push("Vehicle price cannot be negative.");
        }
        if (Number(data.total_claim) < 0) {
            errs.push("Total claim amount cannot be negative.");
        }
        if (Number(data.injury_claim) < 0) {
            errs.push("Injury claim amount cannot be negative.");
        }
        if (Number(data['policy deductible']) < 0) {
            errs.push("Policy deductible cannot be negative.");
        }
        if (Number(data['annual premium']) < 0) {
            errs.push("Annual premium cannot be negative.");
        }
        if (Number(data['days open']) < 0) {
            errs.push("Days open cannot be negative.");
        }
        if (Number(data['form defects']) < 0) {
            errs.push("Form defects count cannot be negative.");
        }

        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const payload: Record<string, string | number> = {};
        for (const [key, val] of Object.entries(form)) {
            payload[key] = NUMERIC_FIELDS.includes(key) ? parseFloat(val) || 0 : val;
        }

        const validationErrors = validateForm(payload);
        if (validationErrors.length > 0) {
            setError(
                <ul className="list-disc pl-4 space-y-1">
                    {validationErrors.map((err, i) => (
                        <li key={i}>{err}</li>
                    ))}
                </ul>
            );
            setLoading(false);
            return;
        }

        try {
            const result = await predictFraud(payload);
            const params = new URLSearchParams({
                prediction: result.prediction,
                probability: String(result.probability),
                fraud_risk: String(result.fraud_risk),
                risk_level: result.risk_level,
            });
            router.push(`/result?${params.toString()}`);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const inputCls = "bg-[#12121a] border-violet-500/20 text-white font-mono text-sm placeholder:text-gray-600 rounded-none focus:border-violet-500 focus:ring-violet-500/20";
    const selectTriggerCls = "bg-[#12121a] border-violet-500/20 text-white font-mono text-sm rounded-none";

    return (
        <main className="min-h-screen flex flex-col bg-[#0a0a0f] text-gray-100">

            {/* ── Navbar ──────────────────────────────────────── */}
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
                        onClick={() => router.push('/')}
                    >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1.5" strokeWidth={2} />
                        EXIT
                    </Button>
                </div>
            </nav>

            {/* ── Page Header ─────────────────────────────────── */}
            <div className="border-b border-violet-500/20">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Terminal className="w-3.5 h-3.5 text-violet-400" strokeWidth={2} />
                        <span className="text-xs font-mono tracking-[0.3em] text-violet-400/80 uppercase">Data Entry Terminal</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white font-mono">CLAIM ANALYSIS INPUT</h1>
                    <p className="text-xs text-gray-500 mt-2 font-mono">
                        Populate all feature vectors below. The model evaluates each parameter for anomaly detection.
                    </p>
                </div>
            </div>

            {/* ── Form ────────────────────────────────────────── */}
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto w-full px-6 py-8 space-y-0">

                {/* Cluster 1: Claimant Profile */}
                <div className="border border-violet-500/20 mb-0">
                    <div className="border-b border-violet-500/20 px-6 py-3 flex items-center gap-2.5">
                        <User className="w-3.5 h-3.5 text-cyan-400" strokeWidth={2} />
                        <span className="text-xs font-mono tracking-[0.2em] text-gray-400 uppercase">Claimant Profile</span>
                    </div>
                    <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
                        <Field label="Age" hint="16–100">
                            <Input name="age_of_driver" type="number" value={form.age_of_driver} onChange={handleChange} min={18} max={100} required placeholder="35" className={inputCls} />
                        </Field>
                        <Field label="Gender">
                            <Select value={form.gender} onValueChange={(v) => handleSelect('gender', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="M">Male</SelectItem>
                                    <SelectItem value="F">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Marital Status">
                            <Select value={form.marital_status} onValueChange={(v) => handleSelect('marital_status', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Married</SelectItem>
                                    <SelectItem value="0">Single</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Annual Income" hint="Higher = lower risk">
                            <Input name="annual_income" type="number" value={form.annual_income} onChange={handleChange} required placeholder="55000" className={inputCls} />
                        </Field>
                        <Field label="Higher Education">
                            <Select value={form.high_education} onValueChange={(v) => handleSelect('high_education', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Yes</SelectItem>
                                    <SelectItem value="0">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Address Changed" hint="Risk flag">
                            <Select value={form.address_change} onValueChange={(v) => handleSelect('address_change', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">No</SelectItem>
                                    <SelectItem value="1">Yes</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Property Status">
                            <Select value={form.property_status} onValueChange={(v) => handleSelect('property_status', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Own">Own</SelectItem>
                                    <SelectItem value="Rent">Rent</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Zip Code">
                            <Input name="zip_code" type="number" value={form.zip_code} onChange={handleChange} required placeholder="50000" className={inputCls} />
                        </Field>
                    </div>
                </div>

                {/* Cluster 2: Incident Metadata */}
                <div className="border border-violet-500/20 border-t-0">
                    <div className="border-b border-violet-500/20 px-6 py-3 flex items-center gap-2.5">
                        <FileText className="w-3.5 h-3.5 text-cyan-400" strokeWidth={2} />
                        <span className="text-xs font-mono tracking-[0.2em] text-gray-400 uppercase">Incident Metadata</span>
                    </div>
                    <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
                        <Field label="Day of Week" hint="Weekend = higher fraud">
                            <Select value={form.claim_day_of_week} onValueChange={(v) => handleSelect('claim_day_of_week', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Safety Rating" hint="0–100">
                            <Input name="safety_rating" type="number" value={form.safety_rating} onChange={handleChange} min={0} max={100} required placeholder="70" className={inputCls} />
                        </Field>
                        <Field label="Accident Site">
                            <Select value={form.accident_site} onValueChange={(v) => handleSelect('accident_site', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Local">Local</SelectItem>
                                    <SelectItem value="Highway">Highway</SelectItem>
                                    <SelectItem value="Parking Lot">Parking Lot</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Past Claims" hint="Frequency = risk">
                            <Input name="past_num_of_claims" type="number" value={form.past_num_of_claims} onChange={handleChange} min={0} placeholder="0" className={inputCls} />
                        </Field>
                        <Field label="Witness Present">
                            <Select value={form.witness_present} onValueChange={(v) => handleSelect('witness_present', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">No</SelectItem>
                                    <SelectItem value="1">Yes</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Liability %" hint="0–100">
                            <Input name="liab_prct" type="number" value={form.liab_prct} onChange={handleChange} min={0} max={100} required placeholder="50" className={inputCls} />
                        </Field>
                        <Field label="Channel">
                            <Select value={form.channel} onValueChange={(v) => handleSelect('channel', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Phone">Phone</SelectItem>
                                    <SelectItem value="Online">Online</SelectItem>
                                    <SelectItem value="Broker">Broker</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Police Report" hint="Absence = risk">
                            <Select value={form.police_report} onValueChange={(v) => handleSelect('police_report', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">No</SelectItem>
                                    <SelectItem value="1">Yes</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                </div>

                {/* Cluster 3: Policy & Vehicle */}
                <div className="border border-violet-500/20 border-t-0">
                    <div className="border-b border-violet-500/20 px-6 py-3 flex items-center gap-2.5">
                        <Car className="w-3.5 h-3.5 text-cyan-400" strokeWidth={2} />
                        <span className="text-xs font-mono tracking-[0.2em] text-gray-400 uppercase">Policy & Vehicle Data</span>
                    </div>
                    <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-5">
                        <Field label="Vehicle Age (yrs)">
                            <Input name="age_of_vehicle" type="number" value={form.age_of_vehicle} onChange={handleChange} min={0} required placeholder="3" className={inputCls} />
                        </Field>
                        <Field label="Vehicle Category">
                            <Select value={form.vehicle_category} onValueChange={(v) => handleSelect('vehicle_category', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Compact">Compact</SelectItem>
                                    <SelectItem value="Large">Large</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Vehicle Price ($)" hint="High-value = soft fraud">
                            <Input name="vehicle_price" type="number" value={form.vehicle_price} onChange={handleChange} required placeholder="25000" className={inputCls} />
                        </Field>
                        <Field label="Vehicle Color">
                            <Select value={form.vehicle_color} onValueChange={(v) => handleSelect('vehicle_color', v)}>
                                <SelectTrigger className={selectTriggerCls}><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {['white', 'black', 'silver', 'red', 'blue', 'gray', 'other'].map(c => (
                                        <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field label="Total Claim ($)">
                            <Input name="total_claim" type="number" value={form.total_claim} onChange={handleChange} required placeholder="5000" className={inputCls} />
                        </Field>
                        <Field label="Injury Claim ($)">
                            <Input name="injury_claim" type="number" value={form.injury_claim} onChange={handleChange} placeholder="0" className={inputCls} />
                        </Field>
                        <Field label="Policy Deductible ($)">
                            <Input name="policy deductible" type="number" value={form['policy deductible']} onChange={handleChange} placeholder="500" className={inputCls} />
                        </Field>
                        <Field label="Annual Premium ($)" hint="Premium-to-claim ratio">
                            <Input name="annual premium" type="number" value={form['annual premium']} onChange={handleChange} required placeholder="1200" className={inputCls} />
                        </Field>
                        <Field label="Days Open" hint="Quick close = risk">
                            <Input name="days open" type="number" value={form['days open']} onChange={handleChange} min={0} placeholder="1" className={inputCls} />
                        </Field>
                        <Field label="Form Defects" hint="Paperwork errors">
                            <Input name="form defects" type="number" value={form['form defects']} onChange={handleChange} min={0} placeholder="0" className={inputCls} />
                        </Field>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="flex items-start gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-sm text-red-400 font-mono mt-6">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} />
                        <div>{error}</div>
                    </div>
                )}

                {/* Submit */}
                <div className="pt-6">
                    <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full h-14 bg-violet-600 hover:bg-violet-500 text-white font-mono text-sm tracking-widest rounded-none border border-violet-500 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                PROCESSING FEATURE VECTORS...
                            </>
                        ) : (
                            <>
                                <Crosshair className="w-4 h-4 mr-2" strokeWidth={2} />
                                EXECUTE FRAUD ANALYSIS
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </main>
    );
}
