import { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Lock,
  Fingerprint,
  EyeOff,
  Shield,
  Info,
  Check,
  Brain,
  Bell,
  Smartphone,
  UserCheck,
  Phone,
} from 'lucide-react';

/* ── intersection-observer fade-in-up hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function ScrollReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Section 1 — Hero
   ═══════════════════════════════════════════ */
function SecurityHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="px-4 sm:px-6 pt-[96px]">
      <div className="max-w-[1280px] mx-auto bg-[#111827] rounded-3xl sm:rounded-[24px] px-6 sm:px-20 py-[100px] text-center">
        {/* Icon */}
        <div
          className="w-[120px] h-[120px] rounded-full bg-[rgba(16,185,129,0.1)] flex items-center justify-center mx-auto"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <ShieldCheck size={64} className="text-[#10B981]" />
        </div>

        {/* Headline */}
        <h1
          className="text-[2.5rem] lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-[-0.02em] mt-6"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s',
          }}
        >
          Your Security Is Our Priority
        </h1>

        {/* Subtitle */}
        <p
          className="text-[1.125rem] text-[#9CA3AF] leading-[1.6] max-w-[560px] mx-auto mt-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s',
          }}
        >
          Bank-level security. Regulatory compliance across every country. Your
          data encrypted. Your money protected.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 2 — Security Pillars
   ═══════════════════════════════════════════ */

const pillars = [
  {
    icon: Lock,
    title: 'Encryption',
    description:
      'All data is encrypted using AES-256, the same standard used by major banks worldwide. Every connection uses TLS 1.3.',
  },
  {
    icon: Fingerprint,
    title: 'Identity Verification',
    description:
      'Multi-factor authentication with biometric verification, SMS codes, and device binding. Every login is verified.',
  },
  {
    icon: EyeOff,
    title: 'Privacy by Design',
    description:
      'We collect only the data we need. We never sell your information. You control what you share.',
  },
  {
    icon: Shield,
    title: 'Regulatory Compliance',
    description:
      'Licensed and regulated by financial authorities in every country. Regular third-party audits. Full transparency.',
  },
];

function SecurityPillars() {
  return (
    <section className="bg-white py-20 px-6 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
            How We Protect You
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={i * 0.1}>
                <div className="bg-[#F3F4F6] rounded-2xl p-8 h-full hover:bg-[#E5E7EB] transition-colors duration-200">
                  <div className="w-16 h-16 rounded-full bg-[#D1FAE5] flex items-center justify-center">
                    <Icon size={36} className="text-[#10B981]" />
                  </div>
                  <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold text-[#111827] leading-[1.2] mt-4">
                    {pillar.title}
                  </h3>
                  <p className="text-[#4B5563] leading-[1.6] mt-2">
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 3 — Certifications
   ═══════════════════════════════════════════ */

const certifications = [
  {
    image: '/security-cert-iso.png',
    title: 'ISO 27001:2022',
    description:
      'Certified Information Security Management System. Audited annually by Bureau Veritas.',
  },
  {
    image: '/security-cert-pci.png',
    title: 'PCI DSS Level 1',
    description:
      'The highest level of payment card industry security compliance. All card data is fully protected.',
  },
  {
    image: '/security-cert-soc.png',
    title: 'SOC 2 Type II',
    description:
      'Independent audit confirms our security controls are effective and consistently applied.',
  },
];

function Certifications() {
  return (
    <section className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
            Certified &amp; Regulated
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 0.15}>
              <div className="bg-white rounded-2xl p-8 text-center h-full">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-20 h-20 mx-auto object-contain grayscale"
                />
                <h4 className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] leading-[1.3] mt-4">
                  {cert.title}
                </h4>
                <p className="text-[#4B5563] text-[0.875rem] lg:text-[1rem] leading-[1.5] mt-2">
                  {cert.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 4 — Data Protection
   ═══════════════════════════════════════════ */

const collectedItems = [
  'Identity: Name, date of birth, national ID — required by law for financial services',
  'Contact: Phone number, email — for account access and notifications',
  'Financial: Transaction history, loan records — to provide and improve services',
  'Device: Phone model, OS version — for security and app optimization',
];

const rightsItems = [
  'Access: Request a copy of all data we hold about you',
  'Correction: Update or correct any inaccurate information',
  'Deletion: Request account deletion and data removal',
  'Portability: Export your data in a standard format',
  'Consent: Withdraw consent for optional data processing at any time',
];

function DataProtection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLeftVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRightVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-20 px-6 lg:px-20">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left — What We Collect */}
        <div
          ref={leftRef}
          style={{
            opacity: leftVisible ? 1 : 0,
            transform: leftVisible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold text-[#111827] leading-[1.2] mb-6">
            What Data We Collect
          </h3>
          <ul className="space-y-4">
            {collectedItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Info
                  size={20}
                  className="text-[#9CA3AF] shrink-0 mt-0.5"
                />
                <span className="text-[#4B5563] leading-[1.6]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Your Rights */}
        <div
          ref={rightRef}
          style={{
            opacity: rightVisible ? 1 : 0,
            transform: rightVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s',
          }}
        >
          <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold text-[#111827] leading-[1.2] mb-6">
            Your Data Rights
          </h3>
          <ul className="space-y-4">
            {rightsItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-[#10B981] shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <span className="text-[#4B5563] leading-[1.6]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 5 — Fraud Prevention
   ═══════════════════════════════════════════ */

const fraudFeatures = [
  {
    icon: Brain,
    title: 'AI-Powered Fraud Detection',
    description:
      'Our machine learning systems analyze every transaction in real-time, flagging suspicious activity before it affects you.',
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description:
      'Receive immediate notifications for every login, transaction, and account change. If it\'s not you, you\'ll know instantly.',
  },
  {
    icon: Smartphone,
    title: 'Device Binding',
    description:
      'Your account is linked to your devices. New device access requires additional verification.',
  },
  {
    icon: UserCheck,
    title: 'Biometric Verification',
    description:
      'Fingerprint and facial recognition add an extra layer of security for sensitive actions.',
  },
  {
    icon: Phone,
    title: '24/7 Security Hotline',
    description:
      'Our dedicated security team is available around the clock to assist with fraud concerns. +221 33 999 0000',
  },
];

function FraudPrevention() {
  return (
    <section className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
            Fighting Fraud, Protecting You
          </h2>
        </ScrollReveal>
        <div className="max-w-[800px] mx-auto space-y-6">
          {fraudFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-[#10B981]" />
                  </div>
                  <div>
                    <h4 className="text-[1.125rem] font-semibold text-[#111827]">
                      {feature.title}
                    </h4>
                    <p className="text-[#4B5563] leading-[1.6] mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 6 — Report an Issue
   ═══════════════════════════════════════════ */
function ReportIssue() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-[#10B981] py-20 px-6 lg:px-20">
      <div className="max-w-[1280px] mx-auto text-center">
        <h2
          className="text-[2rem] lg:text-[3rem] font-semibold text-white leading-[1.15] tracking-[-0.01em]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition:
              'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          See Something Suspicious?
        </h2>
        <p
          className="text-white text-[1.125rem] leading-[1.6] mt-3"
          style={{ opacity: 0.9 }}
        >
          Report security concerns immediately. Our team responds within 1 hour.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition:
              'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s',
          }}
        >
          <button className="px-7 py-4 rounded-2xl bg-white text-[#10B981] text-[1rem] font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
            Report an Issue
          </button>
          <span className="text-white font-medium text-[1rem]">
            Security Hotline: +221 33 999 0000
          </span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Page Export
   ═══════════════════════════════════════════ */

export default function Security() {
  return (
    <div>
      <SecurityHero />
      <SecurityPillars />
      <Certifications />
      <DataProtection />
      <FraudPrevention />
      <ReportIssue />
    </div>
  );
}
