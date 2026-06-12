import { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import {
  Clock,
  FileCheck,
  TrendingUp,
  RefreshCcw,
  Check,
  Quote,
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

/* ──────────────────────── Reusable FadeInUp ──────────────────────── */
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

/* ──────────────────────── Slider Component ──────────────────────── */
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
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1 appearance-none bg-transparent cursor-pointer relative z-10"
          style={{
            // @ts-ignore
            '::-webkit-slider-thumb': {
              appearance: 'none',
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#10B981',
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              marginTop: -10,
            },
          }}
        />
        <div className="absolute top-1/2 left-0 right-0 h-1 -mt-0.5 rounded-full bg-[#E5E7EB]" />
        <div
          className="absolute top-1/2 left-0 h-1 -mt-0.5 rounded-full bg-[#10B981]"
          style={{ width: `${percent}%` }}
        />
        <div
          className="absolute top-1/2 w-6 h-6 -mt-3 rounded-full bg-[#10B981] border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] pointer-events-none"
          style={{ left: `calc(${percent}% - 12px)` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[0.875rem] text-[#9CA3AF]">{formatValue(min)}</span>
        <span className="text-[0.875rem] text-[#9CA3AF]">{formatValue(max)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-6 -mt-7 appearance-none bg-transparent cursor-pointer relative z-20 opacity-0"
        aria-label={label}
      />
    </div>
  );
}

/* ──────────────────────── Loan Features Data ──────────────────────── */
const featureCards = [
  {
    icon: Clock,
    title: 'Fast Approval',
    desc: 'Get a decision in under 5 minutes. Funds disbursed within 24 hours of approval.',
  },
  {
    icon: FileCheck,
    title: 'No Paperwork',
    desc: 'Apply entirely from your phone. Just your ID and phone number — no bank statements or collateral.',
  },
  {
    icon: TrendingUp,
    title: 'Build Credit',
    desc: 'Every on-time repayment improves your credit score, unlocking larger loans and better rates.',
  },
  {
    icon: RefreshCcw,
    title: 'Flexible Repayment',
    desc: 'Choose repayment terms from 1 to 12 months. Repay early with no penalties.',
  },
];

/* ──────────────────────── Timeline Steps ──────────────────────── */
const timelineSteps = [
  {
    title: 'Create Your Account',
    desc: 'Download the app or sign up on the web. Verify your identity with a selfie and your ID document. Takes 2 minutes.',
  },
  {
    title: 'Choose Your Loan',
    desc: 'Select your desired amount and repayment period using our transparent calculator. See exactly what you\'ll pay before applying.',
  },
  {
    title: 'Get Approved',
    desc: 'Our AI evaluates your application in real-time. Most decisions arrive within 5 minutes. No paperwork, no waiting.',
  },
  {
    title: 'Receive & Repay',
    desc: 'Funds are sent directly to your mobile wallet or bank account. Repay weekly or monthly via mobile money, bank transfer, or cash at our agent network.',
  },
];

/* ──────────────────────── Eligibility Data ──────────────────────── */
const eligibilityWho = [
  'African residents aged 18–65',
  'In possession of a valid national ID',
  'Active mobile phone number',
  'Regular source of income (formal or informal)',
];

const eligibilityNeed = [
  'National ID card or passport',
  'Smartphone with camera (for selfie verification)',
  'Active mobile money or bank account',
  'Proof of income (for loans above 100,000 FCFA)',
];

/* ──────────────────────── Comparison Table Data ──────────────────────── */
const comparisonHeaders = ['Feature', 'Finclusion', 'Traditional Banks', 'Other MFIs'];
const comparisonRows = [
  ['Application Time', '5 minutes', '1–2 weeks', '2–3 days'],
  ['Collateral Required', 'None', 'Yes', 'Sometimes'],
  ['Processing Fee', '0 FCFA', '2,000–10,000 FCFA', '500–2,000 FCFA'],
  ['Hidden Fees', 'None', 'Common', 'Sometimes'],
  ['Early Repayment', 'Free', 'Penalty applies', 'Penalty applies'],
];

/* ──────────────────────── Testimonials ──────────────────────── */
const loanTestimonials = [
  {
    quote: "I got my loan approved during my lunch break. By evening, the money was in my account. I've since expanded my boutique and hired two assistants.",
    name: 'Amina D.',
    role: 'Shop Owner, Lagos',
  },
  {
    quote: "As a freelancer, traditional banks never gave me a chance. Finclusion looked at my actual income and approved me in minutes.",
    name: 'Kofi M.',
    role: 'Graphic Designer, Accra',
  },
  {
    quote: "The transparent pricing is what won me over. I knew exactly what I'd pay before I even applied. No tricks, no hidden costs.",
    name: 'Grace N.',
    role: 'Caterer, Nairobi',
  },
];

/* ═══════════════════════════ MAIN COMPONENT ═══════════════════════════ */
export default function Loans() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [duration, setDuration] = useState(3);
  const [countupKey, setCountupKey] = useState(0);
  const [prevMonthly, setPrevMonthly] = useState(17500);

  const interestRate = 0.05; // 5% per month
  const monthlyInterest = loanAmount * interestRate;
  const totalInterest = monthlyInterest * duration;
  const totalRepayment = loanAmount + totalInterest;
  const monthlyPayment = Math.round(totalRepayment / duration);

  useEffect(() => {
    setPrevMonthly(monthlyPayment);
    setCountupKey((k) => k + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, duration]);

  const formatAmount = (v: number) =>
    v.toLocaleString() + ' FCFA';
  const formatDuration = (v: number) =>
    v + ' month' + (v > 1 ? 's' : '');

  return (
    <div className="font-['Outfit',sans-serif]">
      {/* ══════ SECTION 1: Hero Simulator ══════ */}
      <section
        className="relative pt-[120px] pb-20 px-6 lg:px-20"
        style={{
          background:
            'radial-gradient(ellipse at 100% 0%, rgba(16,185,129,0.04) 0%, transparent 50%), white',
        }}
      >
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Headline + Sliders */}
          <div>
            <FadeInUp delay={0.2}>
              <h1
                className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#111827] leading-[1.1] tracking-[-0.02em]"
              >
                Get the Funds You Need, When You Need Them
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <p className="text-[1.125rem] text-[#4B5563] max-w-[480px] mt-4 leading-relaxed">
                Use our calculator to see exactly what you&apos;ll pay. No hidden
                fees, no surprises. Borrow from 5,000 to 500,000 FCFA.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.4}>
              <div className="mt-10 max-w-md">
                <Slider
                  label="Loan Amount"
                  min={5000}
                  max={500000}
                  step={5000}
                  value={loanAmount}
                  onChange={setLoanAmount}
                  formatValue={formatAmount}
                />
                <Slider
                  label="Repayment Period"
                  min={1}
                  max={12}
                  step={1}
                  value={duration}
                  onChange={setDuration}
                  formatValue={formatDuration}
                />
              </div>
            </FadeInUp>
          </div>

          {/* Right: Result Card */}
          <FadeInUp delay={0.3}>
            <div
              className="bg-[#111827] rounded-[24px] p-10 lg:p-12 shadow-[0_24px_64px_rgba(0,0,0,0.15)] max-w-md mx-auto lg:mx-0 lg:ml-auto"
            >
              <p className="text-[0.875rem] font-medium text-[#9CA3AF] uppercase tracking-[0.03em] text-center">
                Your estimated monthly payment
              </p>
              <div className="text-center mt-4">
                <span className="text-[3rem] lg:text-[3.5rem] font-bold text-[#10B981]">
                  <CountUp
                    key={countupKey}
                    start={prevMonthly}
                    end={monthlyPayment}
                    duration={0.3}
                    separator=","
                  />
                  {' FCFA'}
                </span>
              </div>
              <div className="flex justify-between mt-6 pt-6 border-t border-white/10">
                <div>
                  <p className="text-[0.875rem] text-[#9CA3AF]">Total repayment</p>
                  <p className="text-white font-semibold text-[1.125rem]">
                    {totalRepayment.toLocaleString()} FCFA
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[0.875rem] text-[#9CA3AF]">Interest rate</p>
                  <p className="text-white font-semibold text-[1.125rem]">
                    5% per month
                  </p>
                </div>
              </div>
              <button className="w-full mt-8 py-5 rounded-2xl bg-[#10B981] text-white text-[1.125rem] font-semibold hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
                Apply for This Loan
              </button>
              <p className="text-[0.75rem] text-[#9CA3AF] text-center mt-3">
                No commitment. Checking your rate won&apos;t affect your credit
                score.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ══════ SECTION 2: Loan Features ══════ */}
      <section className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em]">
              Why Our Loans Work for You
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {featureCards.map((card, i) => (
              <FadeInUp key={card.title} delay={i * 0.1}>
                <div className="bg-[#F3F4F6] rounded-2xl p-8 text-center hover:bg-[#E5E7EB] transition-colors duration-200 ease-out h-full">
                  <card.icon className="w-8 h-8 text-[#10B981] mx-auto" />
                  <h4 className="text-[1.25rem] font-semibold text-[#111827] mt-4 leading-[1.3]">
                    {card.title}
                  </h4>
                  <p className="text-[#4B5563] text-[0.875rem] mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SECTION 3: How It Works (Vertical Timeline) ══════ */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <div className="max-w-[800px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              Your Loan Journey
            </h2>
          </FadeInUp>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 lg:left-10 top-0 bottom-0 w-[2px] bg-[#E5E7EB]" />

            {timelineSteps.map((step, i) => (
              <div
                key={step.title}
                className="relative flex gap-6 lg:gap-10 mb-10 last:mb-0"
              >
                {/* Node */}
                <FadeInUp delay={i * 0.2}>
                  <div className="w-10 h-10 lg:w-10 lg:h-10 rounded-full bg-[#10B981] flex items-center justify-center text-white font-bold text-[0.875rem] shrink-0 relative z-10">
                    {i + 1}
                  </div>
                </FadeInUp>
                {/* Content */}
                <FadeInUp delay={i * 0.2 + 0.1}>
                  <div className="pb-2">
                    <h4 className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] leading-[1.3]">
                      {step.title}
                    </h4>
                    <p className="text-[#4B5563] text-[0.875rem] lg:text-[1rem] mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </FadeInUp>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SECTION 4: Eligibility ══════ */}
      <section className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              Are You Eligible?
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[960px] mx-auto">
            {/* Card 1 */}
            <FadeInUp delay={0}>
              <div className="bg-white rounded-2xl p-10 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold text-[#111827] leading-[1.2] mb-6">
                  Who Can Apply
                </h3>
                <ul className="space-y-4">
                  {eligibilityWho.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-[#4B5563] text-[1rem] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>
            {/* Card 2 */}
            <FadeInUp delay={0.15}>
              <div className="bg-white rounded-2xl p-10 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold text-[#111827] leading-[1.2] mb-6">
                  What You Need
                </h3>
                <ul className="space-y-4">
                  {eligibilityNeed.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                      <span className="text-[#4B5563] text-[1rem] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ══════ SECTION 5: Interest Rates & Transparency ══════ */}
      <section className="bg-[#111827] rounded-3xl mx-4 sm:mx-6 my-12 py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-white text-center leading-[1.15] tracking-[-0.01em] mb-10">
              Transparent Pricing, No Surprises
            </h2>
          </FadeInUp>

          {/* Sample Loan Breakdown */}
          <FadeInUp delay={0.2}>
            <div className="max-w-[600px] mx-auto bg-white/5 rounded-2xl p-8 lg:p-10 mb-10">
              <p className="text-[#9CA3AF] text-[0.875rem] mb-6">
                Example: 50,000 FCFA loan over 3 months
              </p>
              {[
                ['Loan amount', '50,000 FCFA'],
                ['Monthly interest (5%)', '2,500 FCFA'],
                ['Total interest (3 months)', '7,500 FCFA'],
                ['Processing fee', '0 FCFA'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between py-3 border-b border-white/[0.08]"
                >
                  <span className="text-[#9CA3AF] text-[1rem]">{label}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
              <div className="flex justify-between py-4 mt-1">
                <span className="text-[#10B981] font-semibold text-[1.125rem]">
                  Total to repay
                </span>
                <span className="text-[#10B981] font-bold text-[1.25rem]">
                  57,500 FCFA
                </span>
              </div>
            </div>
          </FadeInUp>

          {/* Comparison Table */}
          <FadeInUp delay={0.3}>
            <div className="max-w-[800px] mx-auto overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    {comparisonHeaders.map((h) => (
                      <th
                        key={h}
                        className="py-3 px-4 text-[#10B981] font-semibold text-[0.875rem] border-b border-white/[0.08]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, ri) => (
                    <tr
                      key={ri}
                      className={
                        ri % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                      }
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={
                            'py-3 px-4 text-[0.875rem] border-b border-white/[0.08] ' +
                            (ci === 1
                              ? 'text-[#10B981] font-semibold'
                              : 'text-white')
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <p className="text-[#9CA3AF] text-center max-w-[560px] mx-auto mt-8 leading-relaxed">
              We believe in complete transparency. The amount you see in our
              calculator is exactly what you&apos;ll pay. No hidden fees, no
              surprises.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ══════ SECTION 6: Testimonials ══════ */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              Borrowers Who Succeeded
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {loanTestimonials.map((t, i) => (
              <FadeInUp key={t.name} delay={i * 0.1}>
                <div className="bg-[#F3F4F6] rounded-2xl p-8 h-full">
                  <Quote className="w-6 h-6 text-[#10B981] mb-3" />
                  <p className="text-[#111827] text-[1rem] italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                    <p className="font-semibold text-[#111827] text-[0.875rem]">
                      {t.name}
                    </p>
                    <p className="text-[#4B5563] text-[0.875rem]">{t.role}</p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SECTION 7: CTA ══════ */}
      <section className="bg-[#10B981] py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto text-center">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-bold text-white leading-[1.15] tracking-[-0.01em]">
              Ready to Get Started?
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.15}>
            <p className="text-[1.125rem] text-white/90 max-w-[560px] mx-auto mt-4 leading-relaxed">
              Join 50,000+ Africans who trust Finclusion for their financial
              needs. Apply in minutes, get funded in hours.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <button className="mt-8 px-8 py-4 rounded-2xl bg-white text-[#10B981] font-semibold text-[1rem] hover:scale-[1.03] transition-transform duration-200 ease-out">
              Apply for a Loan Now
            </button>
          </FadeInUp>
          <FadeInUp delay={0.45}>
            <p className="text-[0.875rem] text-white/80 mt-4">
              No impact on credit score. Free to apply.
            </p>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
