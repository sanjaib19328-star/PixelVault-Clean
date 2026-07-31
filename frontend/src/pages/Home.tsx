import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../layout/PageLayout';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import {
  Shield,
  FileSearch,
  Lock,
  Fingerprint,
  HardDrive,
  FileCode,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Zap,
} from 'lucide-react';

export const Home: React.FC = () => {
  const features = [
    {
      icon: <FileSearch className="h-6 w-6 text-[#00E5FF]" />,
      title: 'EXIF & Header Inspection',
      description: 'Parses camera hardware make, model, lens parameters, serial numbers, capture timestamps, and GPS tracking tags.',
    },
    {
      icon: <Lock className="h-6 w-6 text-[#C8FF00]" />,
      title: 'C2PA Credentials Verification',
      description: 'Detects Adobe/Open-Provenance C2PA JUMBF manifests, generator signatures, claim assertions, and certificate integrity.',
    },
    {
      icon: <Fingerprint className="h-6 w-6 text-[#FF5C35]" />,
      title: 'SHA-256 Cryptographic Hashing',
      description: 'Computes SHA-256 image file digests before and after processing to guarantee immutable provenance tracking.',
    },
    {
      icon: <HardDrive className="h-6 w-6 text-[#C8FF00]" />,
      title: 'Metadata Sanitisation Engine',
      description: 'Forensic-grade stripping of EXIF, GPS, XMP, IPTC, and C2PA credentials without altering visual image quality.',
    },
    {
      icon: <FileCode className="h-6 w-6 text-[#00E5FF]" />,
      title: 'Reproducible Audit Logs',
      description: 'Generates structured JSON forensic reports detailing detected header segments, risk scores, and hash changes.',
    },
  ];

  const steps = [
    { number: '01', title: 'Upload Image', desc: 'Drag & drop JPEG, PNG, or WEBP images up to 15MB.' },
    { number: '02', title: 'Forensic Inspection', desc: 'SHA-256 hash computed & EXIF/C2PA headers parsed.' },
    { number: '03', title: 'Risk Score & Dashboard', desc: 'Review 0–100 security rating, GPS markers & manifests.' },
    { number: '04', title: 'Sanitise & Export', desc: 'Strip metadata & download clean image + JSON audit report.' },
  ];

  return (
    <PageLayout>
      <div className="space-y-16 py-4 font-mono">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-[#1E293B] bg-[#0F172A]/90 p-8 sm:p-12 md:p-16 text-center shadow-[0_0_50px_rgba(8,11,18,0.8)]">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C8FF00]/30 bg-[#C8FF00]/10 px-4 py-1.5 text-xs text-[#C8FF00] shadow-[0_0_15px_rgba(200,255,0,0.15)]">
              <Shield className="h-4 w-4" />
              <span>ENTERPRISE-GRADE FORENSICS & PROVENANCE PLATFORM</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              DIGITAL IMAGE <span className="text-[#C8FF00]">FORENSICS</span> & PROVENANCE
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Detect sensitive camera EXIF, GPS tracking markers, and C2PA Content Credentials. Cryptographically hash, inspect, and strip header metadata to safeguard image privacy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/scan">
                <Button variant="primary" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                  LAUNCH FORENSIC SCANNER
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" icon={<Cpu className="h-5 w-5" />}>
                  HOW IT WORKS
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-xl font-bold tracking-wider text-white sm:text-2xl">
              CORE FORENSIC CAPABILITIES
            </h2>
            <p className="mt-1 text-xs text-slate-400">Standardized inspection & sanitization modules</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, idx) => (
              <Card key={idx} className="group transition-all duration-300 hover:border-[#00E5FF]/40 hover:scale-[1.02]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-[#1E293B] bg-[#080B12]">
                  {feat.icon}
                </div>
                <h3 className="mb-2 text-sm font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="space-y-8 rounded-2xl border border-[#1E293B] bg-[#0F172A]/50 p-8">
          <div className="text-center">
            <h2 className="text-xl font-bold tracking-wider text-white sm:text-2xl">
              4-STAGE FORENSIC PIPELINE
            </h2>
            <p className="mt-1 text-xs text-slate-400">Automated end-to-end provenance inspection & cleaning</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="relative rounded-xl border border-[#1E293B] bg-[#080B12] p-5">
                <span className="text-3xl font-black text-[#C8FF00]/40">{step.number}</span>
                <h4 className="mt-2 text-xs font-bold text-white uppercase">{step.title}</h4>
                <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Privacy Guarantees */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="flex items-start gap-4">
            <CheckCircle2 className="h-6 w-6 text-[#C8FF00] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase">Zero Storage Persistence</h4>
              <p className="text-[11px] text-slate-400 mt-1">Uploaded images exist strictly in ephemeral memory buffers and are purged automatically.</p>
            </div>
          </Card>
          <Card className="flex items-start gap-4">
            <Zap className="h-6 w-6 text-[#00E5FF] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase">Fast & Lossless</h4>
              <p className="text-[11px] text-slate-400 mt-1">Strips metadata segments in under 200ms while retaining original image resolution & pixels.</p>
            </div>
          </Card>
          <Card className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-[#FF5C35] shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-bold text-white uppercase">Audit Compliance</h4>
              <p className="text-[11px] text-slate-400 mt-1">Generates reproducible JSON audit logs with before/after SHA-256 verification digests.</p>
            </div>
          </Card>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border border-[#C8FF00]/30 bg-[#C8FF00]/5 p-8 text-center shadow-[0_0_30px_rgba(200,255,0,0.1)]">
          <h3 className="text-lg font-bold text-white sm:text-xl">READY TO INSPECT & SANITISE YOUR IMAGES?</h3>
          <p className="mt-1 text-xs text-slate-300 max-w-md mx-auto">Upload any image file to inspect EXIF headers, C2PA claims, and generate a clean output.</p>
          <div className="mt-6">
            <Link to="/scan">
              <Button variant="primary" size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                START FORENSIC SCAN NOW
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
