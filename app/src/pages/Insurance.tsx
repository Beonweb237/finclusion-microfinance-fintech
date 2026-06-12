import { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Building2,
  Car,
  Baby,
  Heart,
  Smartphone,
  Briefcase,
  Flower2,
  Accessibility,
  Check,
  X,
} from 'lucide-react';

/* ──────────────────────── Animation Hook ──────────────────────── */
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

/* ──────────────────────── FadeInUp ──────────────────────── */
function FadeInUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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

/* ──────────────────────── Coverage Tiers Data ──────────────────────── */
const insurancePlans = [
  {
    badge: 'Most Affordable',
    badgeBg: 'bg-[#9CA3AF]',
    price: '500',
    period: 'month',
    features: [
      { text: 'Hospitalization coverage up to 50,000 FCFA', included: true },
      { text: 'Accident coverage up to 100,000 FCFA', included: true },
      { text: '24/7 emergency hotline', included: true },
      { text: 'No family coverage', included: false },
    ],
    cta: 'Choose Essential',
    featured: false,
  },
  {
    badge: 'Most Popular',
    badgeBg: 'bg-[#10B981]',
    price: '1,500',
    period: 'month',
    features: [
      { text: 'Hospitalization up to 200,000 FCFA', included: true },
      { text: 'Accident coverage up to 500,000 FCFA', included: true },
      { text: 'Covers spouse + 3 children', included: true },
      { text: 'Maternity coverage', included: true },
    ],
    cta: 'Choose Family',
    featured: true,
  },
  {
    badge: 'Maximum Protection',
    badgeBg: 'bg-[#059669]',
    price: '3,000',
    period: 'month',
    features: [
      { text: 'Hospitalization up to 1,000,000 FCFA', included: true },
      { text: 'Accident + life coverage up to 2,000,000 FCFA', included: true },
      { text: 'Extended family coverage', included: true },
      { text: 'Asset protection (phone, bicycle, business equipment)', included: true },
    ],
    cta: 'Choose Premium',
    featured: false,
  },
];

/* ──────────────────────── Claims Steps ──────────────────────── */
const claimsSteps = [
  {
    num: '1',
    title: 'Report the Incident',
    desc: 'Call our 24/7 hotline or file through the app. Takes 2 minutes.',
  },
  {
    num: '2',
    title: 'Submit Documents',
    desc: 'Upload photos or documents directly from your phone. No physical forms.',
  },
  {
    num: '3',
    title: 'Get Paid',
    desc: 'Claims processed within 48 hours. Payment sent directly to your mobile wallet.',
  },
];

/* ──────────────────────── Coverage Grid Data (8 items) ──────────────────────── */
const coverageItems = [
  { icon: Building2, title: 'Hospitalization', desc: 'Covers inpatient stays, surgery, and treatment costs at partner hospitals.' },
  { icon: Car, title: 'Accidents', desc: 'Protection against unexpected accidents with fast payout processing.' },
  { icon: Baby, title: 'Maternity', desc: 'Prenatal care, delivery, and postnatal coverage for expectant mothers.' },
  { icon: Heart, title: 'Life', desc: 'Financial security for your loved ones in case of life events.' },
  { icon: Smartphone, title: 'Phone Theft', desc: 'Coverage for smartphone theft or damage, essential for modern life.' },
  { icon: Briefcase, title: 'Business Equipment', desc: 'Protect the tools you need to earn — from laptops to market stalls.' },
  { icon: Flower2, title: 'Funeral', desc: 'Dignified funeral coverage to ease the burden on your family.' },
  { icon: Accessibility, title: 'Disability', desc: 'Income protection if injury or illness prevents you from working.' },
];

/* ──────────────────────── Trust Factors ──────────────────────── */
const trustFactors = [
  {
    icon: ShieldCheck,
    title: 'Backed by Pan-African Insurance',
    desc: "Your coverage is underwritten by one of Africa's largest insurance groups with 30+ years of experience.",
  },
  {
    icon: Award,
    title: 'Licensed & Regulated',
    desc: 'Fully licensed by insurance regulators in every country of operation.',
  },
  {
    icon: Users,
    title: '50,000+ Active Policies',
    desc: 'Join thousands of Africans who trust us to protect their families and livelihoods.',
  },
];

/* ──────────────────────── Stats Data ──────────────────────── */
const statsData = [
  { value: '48h', label: 'Average claim processing time' },
  { value: '98%', label: 'Claims approval rate' },
  { value: '24/7', label: 'Emergency hotline' },
];

/* ═══════════════════════════ MAIN ═══════════════════════════ */
export default function Insurance() {
  return (
    <div className="font-['Outfit',sans-serif]">
      {/* ══════ SECTION 1: Hero ══════ */}
      <section className="relative pt-[120px] pb-20 px-6 lg:px-20 bg-white">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          <div>
            <FadeInUp delay={0.2}>
              <h1 className="text-[2.5rem] lg:text-[4rem] font-bold text-[#111827] leading-[1.1] tracking-[-0.02em]">
                Protect What Matters{' '}
                <span className="text-[#10B981]">Most</span>
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.35}>
              <p className="text-[1.125rem] text-[#4B5563] max-w-[480px] mt-4 leading-relaxed">
                Affordable microinsurance for health, life, and your assets.
                Coverage starts from just 500 FCFA per month. No paperwork,
                instant activation.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.5}>
              <button className="mt-8 px-7 py-4 rounded-2xl bg-[#10B981] text-white text-[1rem] font-semibold hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
                Get Covered
              </button>
            </FadeInUp>
          </div>
          <FadeInUp delay={0.4}>
            <img
              src="/product-insurance.jpg"
              alt="Family walking together, happy and secure"
              className="rounded-[24px] w-full object-cover shadow-lg"
              style={{ maxHeight: '500px' }}
            />
          </FadeInUp>
        </div>
      </section>

      {/* ══════ SECTION 2: Coverage Tiers ══════ */}
      <section className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              Choose Your Coverage
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {insurancePlans.map((plan, i) => (
              <FadeInUp
                key={plan.badge}
                delay={i * 0.1}
                className={plan.featured ? 'md:-mt-2' : ''}
              >
                <div
                  className={
                    'bg-[#F3F4F6] rounded-2xl p-8 h-full ' +
                    (plan.featured
                      ? 'border-2 border-[#10B981] shadow-[0_12px_40px_rgba(0,0,0,0.08)] relative'
                      : 'border border-transparent hover:bg-[#E5E7EB] transition-colors duration-200')
                  }
                  style={plan.featured ? { transform: 'translateY(-8px)' } : {}}
                >
                  <span
                    className={
                      'inline-block px-3 py-1 rounded-lg text-[0.75rem] font-semibold text-white mb-4 ' +
                      plan.badgeBg
                    }
                  >
                    {plan.badge}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[2.5rem] font-bold text-[#10B981]">
                      {plan.price}
                    </span>
                    <span className="text-[#4B5563] text-[0.875rem]">
                      FCFA/{plan.period}
                    </span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-3">
                        {f.included ? (
                          <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-[#9CA3AF] shrink-0 mt-0.5" />
                        )}
                        <span
                          className={
                            'text-[0.875rem] ' +
                            (f.included ? 'text-[#4B5563]' : 'text-[#9CA3AF]')
                          }
                        >
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={
                      'w-full mt-6 py-4 rounded-2xl font-semibold transition-all duration-200 ' +
                      (plan.featured
                        ? 'bg-[#10B981] text-white hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98]'
                        : 'border border-[#E5E7EB] text-[#111827] hover:border-[#10B981] hover:text-[#10B981]')
                    }
                  >
                    {plan.cta}
                  </button>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SECTION 3: How Claims Work (3 Steps) ══════ */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              Filing a Claim Is Simple
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {claimsSteps.map((step, i) => (
              <FadeInUp key={step.title} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#10B981] flex items-center justify-center text-white font-bold text-[1rem] mx-auto">
                    {step.num}
                  </div>
                  <h4 className="text-[1.25rem] font-semibold text-[#111827] mt-4 leading-[1.3]">
                    {step.title}
                  </h4>
                  <p className="text-[#4B5563] text-[0.875rem] mt-2 leading-relaxed max-w-[280px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
          {/* Arrow connectors (desktop only) */}
          <div className="hidden md:flex justify-center gap-4 mt-6">
            <div className="w-16 h-[2px] bg-[#10B981]" />
            <div className="w-16 h-[2px] bg-[#10B981]" />
          </div>
        </div>
      </section>

      {/* ══════ SECTION 4: What's Covered (8-item grid) ══════ */}
      <section className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              Comprehensive Coverage for Real Life
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {coverageItems.map((item, i) => (
              <FadeInUp key={item.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow duration-200 h-full">
                  <item.icon className="w-7 h-7 text-[#10B981]" />
                  <h4 className="text-[1.25rem] font-semibold text-[#111827] mt-4 leading-[1.3]">
                    {item.title}
                  </h4>
                  <p className="text-[#4B5563] text-[0.875rem] mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SECTION 5: Trust & Reliability ══════ */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Stats */}
          <FadeInUp>
            <div className="space-y-8">
              {statsData.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[3rem] font-bold text-[#10B981] leading-[1.1]">
                    {stat.value}
                  </p>
                  <p className="text-[#4B5563] text-[1rem] mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeInUp>

          {/* Right: Trust Factors */}
          <FadeInUp delay={0.15}>
            <div className="space-y-6">
              {trustFactors.map((tf) => (
                <div key={tf.title} className="flex items-start gap-4">
                  <tf.icon className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#111827] text-[1rem]">
                      {tf.title}
                    </h4>
                    <p className="text-[#4B5563] text-[0.875rem] mt-1 leading-relaxed">
                      {tf.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ══════ SECTION 6: CTA ══════ */}
      <section className="bg-[#10B981] py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto text-center">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-bold text-white leading-[1.15] tracking-[-0.01em]">
              Get Covered in Under 5 Minutes
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <button className="mt-8 px-8 py-4 rounded-2xl bg-white text-[#10B981] font-semibold text-[1rem] hover:scale-[1.03] transition-transform duration-200 ease-out">
              Activate My Coverage
            </button>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
