import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import CountUp from 'react-countup';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                 */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ------------------------------------------------------------------ */
/*  Data constants                                                    */
/* ------------------------------------------------------------------ */

const stats = [
  { value: 50000, suffix: '+', prefix: '', label: 'Active Users', description: 'Across 6 African countries' },
  { value: 2.5, suffix: 'B FCFA', prefix: '', label: 'In Loans Disbursed', description: 'Supporting entrepreneurs and families' },
  { value: 12000, suffix: '+', prefix: '', label: 'Small Businesses Funded', description: 'Creating jobs in local communities' },
  { value: 98, suffix: '%', prefix: '', label: 'Repayment Rate', description: 'Proof of responsible lending' },
  { value: 45, suffix: '%', prefix: '', label: 'Women Borrowers', description: 'Empowering female entrepreneurs' },
  { value: 6, suffix: '', prefix: '', label: 'Countries Served', description: 'With plans for 10+ by 2027' },
];

const stories = [
  {
    image: '/impact-story-1.jpg',
    name: 'Aminata Sow',
    location: 'Dakar, Senegal',
    challenge:
      'Aminata had been running a small tailoring business from her home for 5 years. She dreamed of opening a proper shop but couldn\'t get a loan from traditional banks — she had no collateral and no formal banking history.',
    solution:
      'Through Finclusion, Aminata accessed a 250,000 FCFA microloan with no collateral required. She used the funds to rent a small shop and buy additional sewing equipment.',
    result:
      'Today, Aminata employs 4 people and serves over 200 customers per month. Her monthly revenue has tripled, and she\'s on track to repay her loan 2 months early.',
    quote:
      'Finclusion didn\'t just give me money — they gave me a chance to prove myself.',
  },
  {
    image: '/impact-story-2.jpg',
    name: 'Youth Financial Literacy Program',
    location: 'Accra, Ghana',
    challenge:
      'In underserved communities across Accra, young people lack access to basic financial education. Without understanding savings, credit, and budgeting, many fall into debt traps.',
    solution:
      'Finclusion partnered with local NGOs to deliver free financial literacy workshops to 2,000+ young people, combining in-person training with our mobile savings tools.',
    result:
      'Program participants have saved an average of 15,000 FCFA each and show a 40% improvement in financial decision-making. 300+ have opened their first formal savings account.',
    quote: null,
  },
  {
    image: '/impact-story-3.jpg',
    name: 'Rural Banking Access',
    location: 'Northern Nigeria',
    challenge:
      'In rural Northern Nigeria, the nearest bank branch is often a 3-hour journey. Farmers and traders struggle to access credit, save securely, or send money to family.',
    solution:
      'Finclusion deployed a network of 50+ mobile banking agents in partnership with local cooperatives, bringing financial services within walking distance of 10,000+ people.',
    result:
      'In just 6 months, rural users have saved 150M FCFA collectively and accessed 80M FCFA in microloans. Local businesses report 25% revenue growth on average.',
    quote: null,
  },
];

const productBars = [
  { label: 'Loans', value: '1.5B FCFA', percent: 85, color: 'bg-[#10B981]' },
  { label: 'Savings', value: '600M FCFA', percent: 50, color: 'bg-[#059669]' },
  { label: 'Transfers', value: '300M FCFA', percent: 30, color: 'bg-[#D1FAE5]' },
  { label: 'Insurance', value: '100M FCFA', percent: 15, color: 'bg-[#9CA3AF]' },
];

const countryTable = [
  { country: 'Senegal', users: '15,000', loans: '800M FCFA', agents: '120', defaultRate: '1.2%' },
  { country: 'Ivory Coast', users: '12,000', loans: '650M FCFA', agents: '95', defaultRate: '1.5%' },
  { country: 'Ghana', users: '10,000', loans: '500M FCFA', agents: '80', defaultRate: '1.8%' },
  { country: 'Nigeria', users: '8,000', loans: '350M FCFA', agents: '65', defaultRate: '2.1%' },
  { country: 'Kenya', users: '3,000', loans: '120M FCFA', agents: '30', defaultRate: '1.9%' },
  { country: 'Uganda', users: '2,000', loans: '80M FCFA', agents: '20', defaultRate: '2.3%' },
];

const highlights = [
  'Complete financial statements audited by PwC',
  'Detailed impact metrics by country and product',
  'ESG commitments and progress tracking',
];

/* ------------------------------------------------------------------ */
/*  Hook: Intersection Observer for triggering animations             */
/* ------------------------------------------------------------------ */

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

/* ------------------------------------------------------------------ */
/*  ImpactCounter sub-component                                       */
/* ------------------------------------------------------------------ */

function ImpactCounter({
  value,
  suffix,
  prefix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  prefix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, 0.3);

  return (
    <span ref={ref} className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#10B981] tracking-[-0.02em]">
      {inView ? (
        <CountUp
          start={0}
          end={value}
          duration={2}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator=""
        />
      ) : (
        `0${suffix}`
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  AnimatedBar sub-component                                         */
/* ------------------------------------------------------------------ */

function AnimatedBar({
  label,
  value,
  percent,
  color,
  delay,
}: {
  label: string;
  value: string;
  percent: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.3);

  return (
    <div ref={ref} className="flex items-center gap-4">
      <span className="text-[0.875rem] font-medium text-[#111827] w-[100px] shrink-0">
        {label}
      </span>
      <div className="flex-1 h-3 bg-[#E5E7EB] rounded-lg overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className={`h-full rounded-lg ${color}`}
        />
      </div>
      <span className="text-[0.875rem] font-medium text-[#4B5563] w-[100px] text-right shrink-0">
        {value}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                         */
/* ------------------------------------------------------------------ */

export default function Impact() {
  return (
    <div className="font-['Outfit',sans-serif]">
      {/* ============================================================ */}
      {/* SECTION 1 — Hero (full-bleed)                                */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="/impact-hero.jpg"
            alt="Aerial view of African marketplace"
            className="w-full h-full object-cover"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 py-[160px] px-6 lg:px-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-[0.875rem] font-semibold uppercase tracking-[0.05em] text-[#10B981]"
            >
              OUR IMPACT
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[2.5rem] lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-[-0.02em] mt-4"
            >
              More Than Finance. We&apos;re Building Futures.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[1.125rem] text-white opacity-85 leading-[1.6] mt-4 max-w-[600px] mx-auto"
            >
              Every loan, every savings account, every transfer is a step toward economic empowerment for individuals, families, and communities across Africa.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Impact Dashboard                                 */}
      {/* ============================================================ */}
      <section className="py-20 px-6 lg:px-20 bg-[#111827]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center py-8"
              >
                <ImpactCounter
                  value={s.value}
                  suffix={s.suffix}
                  prefix={s.prefix}
                  decimals={s.value < 100 ? (s.suffix === 'B FCFA' ? 1 : 0) : 0}
                />
                <p className="text-[0.875rem] font-medium text-[#9CA3AF] uppercase tracking-[0.03em] mt-2">
                  {s.label}
                </p>
                <p className="text-[0.875rem] text-[#4B5563] mt-1">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Beneficiary Stories                              */}
      {/* ============================================================ */}
      <section className="py-20 px-6 lg:px-20 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center tracking-[-0.01em] mb-12"
          >
            Stories of Change
          </motion.h2>

          <div className="space-y-10">
            {stories.map((story, i) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`bg-[#F3F4F6] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-5 ${
                  i % 2 !== 0 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`lg:col-span-2 h-[250px] lg:h-auto ${
                    i % 2 !== 0 ? 'lg:col-start-4' : ''
                  }`}
                >
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div
                  className={`lg:col-span-3 p-8 lg:p-10 ${
                    i % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  <span className="text-[0.875rem] font-semibold text-[#10B981]">
                    {story.location}
                  </span>
                  <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold text-[#111827] mt-2">
                    {story.name}
                  </h3>

                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-[#9CA3AF]">
                        Challenge
                      </span>
                      <p className="text-[0.875rem] lg:text-[1rem] text-[#4B5563] leading-[1.6] mt-1">
                        {story.challenge}
                      </p>
                    </div>
                    <div>
                      <span className="text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-[#9CA3AF]">
                        Solution
                      </span>
                      <p className="text-[0.875rem] lg:text-[1rem] text-[#4B5563] leading-[1.6] mt-1">
                        {story.solution}
                      </p>
                    </div>
                    <div>
                      <span className="text-[0.75rem] font-semibold uppercase tracking-[0.05em] text-[#9CA3AF]">
                        Result
                      </span>
                      <p className="text-[0.875rem] lg:text-[1rem] text-[#4B5563] leading-[1.6] mt-1">
                        {story.result}
                      </p>
                    </div>
                  </div>

                  {story.quote && (
                    <p className="text-[1rem] italic text-[#10B981] mt-6 border-l-4 border-[#10B981] pl-4">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Impact Breakdown                                  */}
      {/* ============================================================ */}
      <section className="py-20 px-6 lg:px-20 bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center tracking-[-0.01em] mb-12"
          >
            Impact Breakdown
          </motion.h2>

          {/* Product Bars */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 lg:p-10 space-y-5"
          >
            <h3 className="text-[1.25rem] font-semibold text-[#111827] mb-6">
              By Product
            </h3>
            {productBars.map((bar, i) => (
              <AnimatedBar
                key={bar.label}
                label={bar.label}
                value={bar.value}
                percent={bar.percent}
                color={bar.color}
                delay={i * 0.2}
              />
            ))}
          </motion.div>

          {/* Country Table */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 lg:p-10 mt-8 overflow-x-auto"
          >
            <h3 className="text-[1.25rem] font-semibold text-[#111827] mb-6">
              By Country
            </h3>
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left text-[0.875rem] font-semibold text-[#9CA3AF] uppercase tracking-[0.03em] pb-3 pr-4">
                    Country
                  </th>
                  <th className="text-right text-[0.875rem] font-semibold text-[#9CA3AF] uppercase tracking-[0.03em] pb-3 px-4">
                    Users
                  </th>
                  <th className="text-right text-[0.875rem] font-semibold text-[#9CA3AF] uppercase tracking-[0.03em] pb-3 px-4">
                    Loans Disbursed
                  </th>
                  <th className="text-right text-[0.875rem] font-semibold text-[#9CA3AF] uppercase tracking-[0.03em] pb-3 px-4">
                    Agents
                  </th>
                  <th className="text-right text-[0.875rem] font-semibold text-[#9CA3AF] uppercase tracking-[0.03em] pb-3 pl-4">
                    Default Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {countryTable.map((row, i) => (
                  <motion.tr
                    key={row.country}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="border-b border-[#E5E7EB] last:border-b-0"
                  >
                    <td className="text-[0.875rem] lg:text-[1rem] font-medium text-[#111827] py-4 pr-4">
                      {row.country}
                    </td>
                    <td className="text-[0.875rem] lg:text-[1rem] text-[#4B5563] text-right py-4 px-4">
                      {row.users}
                    </td>
                    <td className="text-[0.875rem] lg:text-[1rem] text-[#4B5563] text-right py-4 px-4">
                      {row.loans}
                    </td>
                    <td className="text-[0.875rem] lg:text-[1rem] text-[#4B5563] text-right py-4 px-4">
                      {row.agents}
                    </td>
                    <td className="text-[0.875rem] lg:text-[1rem] text-[#4B5563] text-right py-4 pl-4">
                      {row.defaultRate}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Annual Report                                    */}
      {/* ============================================================ */}
      <section className="py-20 px-6 lg:px-20 bg-white">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Report Preview Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#111827] rounded-2xl aspect-[3/4] flex flex-col items-center justify-center p-8 shadow-[0_16px_48px_rgba(0,0,0,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#10B981]" />
              <div className="w-12 h-12 rounded-full bg-[#10B981] flex items-center justify-center mb-6">
                <TrendingUp size={24} className="text-white" />
              </div>
              <h3 className="text-[1.5rem] font-semibold text-white text-center leading-[1.3]">
                Finclusion Annual Impact Report 2025
              </h3>
              <p className="text-[0.875rem] text-[#9CA3AF] mt-4 text-center">
                Comprehensive overview of our impact, financials, and ESG commitments
              </p>
            </div>
          </motion.div>

          {/* Report Details */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <span className="text-[0.875rem] font-semibold uppercase tracking-[0.05em] text-[#10B981]">
              ANNUAL REPORT 2025
            </span>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] tracking-[-0.01em] mt-2">
              Transparency in Everything We Do
            </h2>
            <p className="text-[1.125rem] text-[#4B5563] leading-[1.6] mt-4">
              Our annual impact report details every aspect of our operations — from loan disbursements to carbon footprint, from gender equity metrics to community investment. We believe in holding ourselves accountable.
            </p>
            <ul className="mt-6 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#10B981] shrink-0 mt-0.5" />
                  <span className="text-[1rem] text-[#111827]">{h}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mt-8">
              <button className="px-7 py-4 rounded-2xl bg-[#10B981] text-white text-[1rem] font-semibold hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
                Download Report (PDF)
              </button>
              <span className="text-[0.875rem] text-[#4B5563]">(2.4 MB)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — Get Involved CTA                                 */}
      {/* ============================================================ */}
      <section className="py-20 px-6 lg:px-20 bg-[#10B981]">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-[2rem] lg:text-[3rem] font-semibold text-white tracking-[-0.01em]"
            >
              Be Part of the Change
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[1.125rem] text-white opacity-90 mt-4 max-w-[560px] mx-auto"
            >
              Whether you&apos;re looking for financial services, considering an investment, or exploring a partnership — we&apos;d love to hear from you.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <Link
                to="/loans"
                className="px-7 py-4 rounded-2xl bg-white text-[#10B981] text-[1rem] font-semibold hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out"
              >
                Apply for a Loan
              </Link>
              <Link
                to="/contact"
                className="px-7 py-4 rounded-2xl border border-white text-white text-[1rem] font-medium hover:bg-white/10 transition-all duration-200 ease-out"
              >
                Partner With Us
              </Link>
              <Link
                to="/contact"
                className="px-7 py-4 rounded-2xl border border-white text-white text-[1rem] font-medium hover:bg-white/10 transition-all duration-200 ease-out"
              >
                Invest
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
