import { useState, useEffect, useRef } from 'react';
import {
  Shield,
  GraduationCap,
  Briefcase,
  Home,
  Plane,
  Heart,
  ShieldCheck,
  Lock,
  EyeOff,
  Smartphone,
  Clock,
  Zap,
  Check,
} from 'lucide-react';
import CountUp from 'react-countup';

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

/* ──────────────────────── Slider ──────────────────────── */
function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  formatValue: (v: number) => string;
}) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[0.875rem] font-semibold text-[#111827]">
          {label}
        </label>
        <span className="text-[2rem] font-bold text-[#10B981]">
          {formatValue(value)}
        </span>
      </div>
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 -mt-0.5 rounded-full bg-[#E5E7EB]" />
        <div
          className="absolute top-1/2 left-0 h-1 -mt-0.5 rounded-full bg-[#10B981]"
          style={{ width: `${percent}%` }}
        />
        <div
          className="absolute top-1/2 w-6 h-6 -mt-3 rounded-full bg-[#10B981] border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] pointer-events-none"
          style={{ left: `calc(${percent}% - 12px)` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-6 -mt-5 appearance-none bg-transparent cursor-pointer relative z-20 opacity-0 block"
          aria-label={label}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[0.875rem] text-[#9CA3AF]">{formatValue(min)}</span>
        <span className="text-[0.875rem] text-[#9CA3AF]">{formatValue(max)}</span>
      </div>
    </div>
  );
}

/* ──────────────────────── Plan Types ──────────────────────── */
type PlanType = 'basic' | 'premium' | 'goal-locked';

const planRates: Record<PlanType, number> = {
  basic: 0.03,
  premium: 0.05,
  'goal-locked': 0.07,
};

const planLabels: Record<PlanType, string> = {
  basic: 'Basic (3% p.a.)',
  premium: 'Premium (5% p.a.)',
  'goal-locked': 'Goal-Locked (7% p.a.)',
};

/* ──────────────────────── Savings Plans Data ──────────────────────── */
const savingsPlans = [
  {
    badge: 'Most Flexible',
    badgeBg: 'bg-[#9CA3AF]',
    rate: '3%',
    features: [
      'No minimum balance',
      'Withdraw anytime',
      'Monthly interest payments',
      'Free account maintenance',
    ],
    bestFor: 'Ideal for emergency funds and short-term savings',
    cta: 'Choose Basic',
    featured: false,
    planType: 'basic' as PlanType,
  },
  {
    badge: 'Most Popular',
    badgeBg: 'bg-[#10B981]',
    rate: '5%',
    features: [
      'Minimum balance 10,000 FCFA',
      '2 free withdrawals per month',
      'Quarterly interest bonus',
      'Priority customer support',
    ],
    bestFor: 'Perfect for medium-term goals like education or travel',
    cta: 'Choose Premium',
    featured: true,
    planType: 'premium' as PlanType,
  },
  {
    badge: 'Highest Returns',
    badgeBg: 'bg-[#059669]',
    rate: '7%',
    features: [
      'Minimum balance 50,000 FCFA',
      'Funds locked until goal date',
      'Highest interest rate',
      'Personal savings coach',
    ],
    bestFor: 'Best for long-term goals like home purchase or business capital',
    cta: 'Choose Goal-Locked',
    featured: false,
    planType: 'goal-locked' as PlanType,
  },
];

/* ──────────────────────── Goal Cards Data ──────────────────────── */
const goalCards = [
  { icon: Shield, title: 'Emergency Fund', desc: 'Set aside funds for unexpected expenses. Be prepared for any situation.' },
  { icon: GraduationCap, title: 'Education', desc: 'Save for school fees, courses, and educational materials for your future.' },
  { icon: Briefcase, title: 'Business Capital', desc: 'Build capital to start or expand your business ventures.' },
  { icon: Home, title: 'Home', desc: 'Save towards rent, a down payment, or home improvements.' },
  { icon: Plane, title: 'Travel', desc: 'Plan your dream trip. Save gradually and travel stress-free.' },
  { icon: Heart, title: 'Family', desc: 'Secure your family\'s future with dedicated savings goals.' },
];

/* ──────────────────────── Security & Access Data ──────────────────────── */
const securityItems = [
  { icon: ShieldCheck, title: 'Bank-Level Encryption', desc: '256-bit SSL encryption protects every transaction.' },
  { icon: Lock, title: 'Regulated & Licensed', desc: 'Licensed by financial authorities in every operating country.' },
  { icon: EyeOff, title: 'Privacy First', desc: 'Your data is never sold or shared with third parties.' },
];

const accessItems = [
  { icon: Smartphone, title: 'Mobile First', desc: 'Manage your savings from any smartphone. No branch visits.' },
  { icon: Clock, title: '24/7 Availability', desc: 'Check balances, make transfers, and track goals anytime.' },
  { icon: Zap, title: 'Instant Withdrawals', desc: 'Withdraw to your mobile wallet or bank account in seconds.' },
];

/* ═══════════════════════════ MAIN ═══════════════════════════ */
export default function Savings() {
  const [contribution, setContribution] = useState(10000);
  const [duration, setDuration] = useState(12);
  const [planType, setPlanType] = useState<PlanType>('premium');
  const [countupKey, setCountupKey] = useState(0);
  const [prevTotal, setPrevTotal] = useState(126800);

  const rate = planRates[planType];
  const totalContribution = contribution * duration;
  // Simple interest: principal * rate * (duration/12)
  const interestEarned = Math.round(totalContribution * rate * (duration / 12));
  const projectedTotal = totalContribution + interestEarned;

  useEffect(() => {
    setPrevTotal(projectedTotal);
    setCountupKey((k) => k + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contribution, duration, planType]);

  const formatAmount = (v: number) => v.toLocaleString() + ' FCFA';
  const formatDuration = (v: number) => v + ' months';

  return (
    <div className="font-['Outfit',sans-serif]">
      {/* ══════ SECTION 1: Hero ══════ */}
      <section className="relative pt-[120px] pb-20 px-6 lg:px-20 bg-white">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          <div>
            <FadeInUp delay={0.2}>
              <h1 className="text-[2.5rem] lg:text-[4rem] font-bold text-[#111827] leading-[1.1] tracking-[-0.02em]">
                Save Smarter,{' '}
                <span className="text-[#10B981]">Grow Faster</span>
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.35}>
              <p className="text-[1.125rem] text-[#4B5563] max-w-[480px] mt-4 leading-relaxed">
                Earn competitive interest on your savings. Set goals, track
                progress, and watch your money work for you.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.5}>
              <div className="flex flex-wrap gap-4 mt-8">
                <button className="px-7 py-4 rounded-2xl bg-[#10B981] text-white text-[1rem] font-semibold hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
                  Start Saving
                </button>
                <a
                  href="#calculator"
                  className="px-7 py-4 rounded-2xl border border-[#E5E7EB] text-[#111827] text-[1rem] font-medium hover:border-[#10B981] hover:text-[#10B981] transition-all duration-200 ease-out"
                >
                  See Rates
                </a>
              </div>
            </FadeInUp>
          </div>
          <FadeInUp delay={0.4}>
            <img
              src="/product-savings.jpg"
              alt="Happy couple reviewing finances"
              className="rounded-[24px] w-full object-cover rotate-[-1deg] shadow-lg"
              style={{ maxHeight: '500px' }}
            />
          </FadeInUp>
        </div>
      </section>

      {/* ══════ SECTION 2: Savings Calculator ══════ */}
      <section id="calculator" className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] leading-[1.15] tracking-[-0.01em] mb-10">
              See How Much You Could Earn
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Sliders + Plan Selector */}
            <FadeInUp delay={0.2}>
              <div>
                <Slider
                  label="Monthly Contribution"
                  min={1000}
                  max={100000}
                  step={1000}
                  value={contribution}
                  onChange={setContribution}
                  formatValue={formatAmount}
                />
                <Slider
                  label="Saving Duration"
                  min={3}
                  max={24}
                  step={3}
                  value={duration}
                  onChange={setDuration}
                  formatValue={formatDuration}
                />

                {/* Plan Type Selector */}
                <div className="mt-8">
                  <label className="text-[0.875rem] font-semibold text-[#111827] block mb-3">
                    Plan Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(Object.keys(planLabels) as PlanType[]).map((pt) => (
                      <button
                        key={pt}
                        onClick={() => setPlanType(pt)}
                        className={
                          'py-3 px-3 rounded-2xl text-[0.875rem] font-medium transition-all duration-200 border ' +
                          (planType === pt
                            ? 'border-[#10B981] bg-[#D1FAE5] text-[#059669]'
                            : 'border-[#E5E7EB] bg-white text-[#111827] hover:border-[#10B981]')
                        }
                      >
                        {planLabels[pt]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Right: Result Card */}
            <FadeInUp delay={0.3}>
              <div className="bg-[#111827] rounded-[24px] p-10 lg:p-12">
                <p className="text-[0.875rem] font-medium text-[#9CA3AF] uppercase tracking-[0.03em]">
                  Projected total after {duration} months
                </p>
                <div className="mt-4">
                  <span className="text-[3rem] font-bold text-[#10B981]">
                    <CountUp
                      key={countupKey}
                      start={prevTotal}
                      end={projectedTotal}
                      duration={0.3}
                      separator=","
                    />
                    {' FCFA'}
                  </span>
                </div>
                <div className="mt-6 space-y-3 pt-6 border-t border-white/10">
                  <div className="flex justify-between">
                    <span className="text-[#9CA3AF] text-[0.875rem]">
                      Total contributions
                    </span>
                    <span className="text-white font-semibold">
                      {totalContribution.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9CA3AF] text-[0.875rem]">
                      Interest earned
                    </span>
                    <span className="text-white font-semibold">
                      {interestEarned.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#9CA3AF] text-[0.875rem]">
                      Interest rate
                    </span>
                    <span className="text-white font-semibold">
                      {Math.round(rate * 100)}% per year
                    </span>
                  </div>
                </div>
                <button className="w-full mt-8 py-4 rounded-2xl bg-[#10B981] text-white font-semibold hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
                  Open a Savings Account
                </button>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ══════ SECTION 3: Savings Plans Comparison ══════ */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              Choose Your Savings Plan
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {savingsPlans.map((plan, i) => (
              <FadeInUp
                key={plan.planType}
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
                  <div className="text-[2.5rem] font-bold text-[#10B981]">
                    {plan.rate}
                  </div>
                  <p className="text-[#4B5563] text-[0.875rem]">per year</p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="text-[#4B5563] text-[0.875rem]">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#4B5563] text-[0.875rem] mt-6 italic">
                    {plan.bestFor}
                  </p>
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

      {/* ══════ SECTION 4: Goal-Based Savings ══════ */}
      <section className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              Save for What Matters
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {goalCards.map((goal, i) => (
              <FadeInUp key={goal.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition-shadow duration-200">
                  <div className="w-14 h-14 rounded-full bg-[#D1FAE5] flex items-center justify-center mx-auto">
                    <goal.icon className="w-7 h-7 text-[#10B981]" />
                  </div>
                  <h4 className="text-[1.25rem] font-semibold text-[#111827] mt-4 leading-[1.3]">
                    {goal.title}
                  </h4>
                  <p className="text-[#4B5563] text-[0.875rem] mt-2 leading-relaxed">
                    {goal.desc}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SECTION 5: Security & Access ══════ */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Security */}
          <FadeInUp>
            <div>
              <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold text-[#111827] leading-[1.2] mb-6">
                Your Savings Are Protected
              </h3>
              <div className="space-y-6">
                {securityItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <item.icon className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[#111827] text-[1rem]">
                        {item.title}
                      </h4>
                      <p className="text-[#4B5563] text-[0.875rem] mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Right: Access */}
          <FadeInUp delay={0.15}>
            <div>
              <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold text-[#111827] leading-[1.2] mb-6">
                Access Your Money Anytime
              </h3>
              <div className="space-y-6">
                {accessItems.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <item.icon className="w-6 h-6 text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-[#111827] text-[1rem]">
                        {item.title}
                      </h4>
                      <p className="text-[#4B5563] text-[0.875rem] mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ══════ SECTION 6: CTA ══════ */}
      <section className="bg-[#10B981] py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto text-center">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-bold text-white leading-[1.15] tracking-[-0.01em]">
              Start Building Your Future Today
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <button className="mt-8 px-8 py-4 rounded-2xl bg-white text-[#10B981] font-semibold text-[1rem] hover:scale-[1.03] transition-transform duration-200 ease-out">
              Open Your Savings Account
            </button>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
