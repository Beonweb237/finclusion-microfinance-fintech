import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Shield } from 'lucide-react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                 */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ------------------------------------------------------------------ */
/*  Data constants                                                    */
/* ------------------------------------------------------------------ */

const values = [
  {
    icon: Users,
    title: 'People First',
    description:
      'Every decision we make starts with the question: how does this help our users? We design for real people with real needs.',
    stat: '50,000+',
    statLabel: 'Active users',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Impact',
    description:
      "We're not just building a business — we're building an ecosystem where financial access creates economic opportunity.",
    stat: '2.5B FCFA',
    statLabel: 'In loans disbursed',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description:
      'We believe trust is earned through transparency. Every rate, every fee, every policy is clear and upfront.',
    stat: '6',
    statLabel: 'Countries served',
  },
];

const timeline = [
  {
    year: '2019',
    title: 'Founded in Dakar',
    description:
      'Finclusion was born from a simple observation: millions of Africans were excluded from the formal financial system. We started with a microloan pilot in Senegal.',
  },
  {
    year: '2020',
    title: 'First 1,000 Users',
    description:
      'Within our first year, 1,000 users trusted us with their financial needs. We expanded to Ivory Coast and launched our savings product.',
  },
  {
    year: '2021',
    title: 'Series A Funding',
    description:
      'Raised $5M in Series A funding from leading African and European investors. Expanded to Ghana and Nigeria. Launched transfers.',
  },
  {
    year: '2022',
    title: '50,000 Users Milestone',
    description:
      'Reached 50,000 active users across 6 countries. Launched microinsurance. Partnered with Pan-African Insurance Group.',
  },
  {
    year: '2023',
    title: '1 Billion FCFA Disbursed',
    description:
      'Crossed 1 billion FCFA in total loans disbursed. Introduced AI-powered credit scoring. Expanded to Kenya and Uganda.',
  },
  {
    year: '2024',
    title: 'Full Product Suite',
    description:
      'Launched the complete Finclusion platform — loans, savings, transfers, and insurance — all in one app. Began European diaspora corridor.',
  },
  {
    year: '2025',
    title: '2.5 Billion FCFA & Counting',
    description:
      'Today we serve over 50,000 users with a team of 120 people across 8 offices. And we\'re just getting started.',
  },
];

const team = [
  {
    name: 'Amadou Diallo',
    role: 'CEO & Co-Founder',
    bio: 'Former investment banker with 15 years\' experience in African finance. Driven by a vision of inclusive banking.',
  },
  {
    name: 'Marie-Claire Ndiaye',
    role: 'CTO & Co-Founder',
    bio: 'Software engineer and data scientist. Built the AI credit scoring system from scratch.',
  },
  {
    name: 'Kwame Asante',
    role: 'Head of Operations',
    bio: 'Operations expert with experience scaling startups across West Africa. Ensures seamless service delivery.',
  },
  {
    name: 'Aicha Toure',
    role: 'Head of Product',
    bio: 'User experience designer turned product leader. Obsessed with making finance simple for everyone.',
  },
  {
    name: 'James Ochieng',
    role: 'Chief Risk Officer',
    bio: '15 years in microfinance risk management. Keeps our users and our business safe.',
  },
  {
    name: 'Fatima Al-Hassan',
    role: 'Head of Partnerships',
    bio: 'Builds the relationships that power our transfer corridors and insurance offerings.',
  },
];

const investors = ['Bank of America', 'Goldman Sachs', 'Citi'];
const partners = ['Microsoft', 'Visa', 'McKinsey & Company'];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
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

function StatCounter({ value, suffix = '', prefix = '' }: { value: string; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, 0.3);

  // Parse numeric part from value string
  const numericMatch = value.replace(/[^0-9.]/g, '');
  const numeric = numericMatch ? parseFloat(numericMatch) : 0;
  const isDecimal = value.includes('.');
  const decimals = isDecimal ? 1 : 0;

  return (
    <span ref={ref} className="text-[2rem] font-bold text-[#10B981]">
      {inView ? (
        <CountUp
          start={0}
          end={numeric}
          duration={1.5}
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
/*  Main page                                                         */
/* ------------------------------------------------------------------ */

export default function About() {
  return (
    <div className="font-['Outfit',sans-serif]">
      {/* ============================================================ */}
      {/* SECTION 1 — Hero                                             */}
      {/* ============================================================ */}
      <section className="pt-[120px] pb-20 px-6 lg:px-20 bg-white">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              OUR STORY
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#111827] leading-[1.1] tracking-[-0.02em] mt-4"
            >
              Building Financial Inclusion, One Person at a Time
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-[1.125rem] text-[#4B5563] leading-[1.6] mt-4 max-w-[480px]"
            >
              Founded in 2019, Finclusion is on a mission to bring accessible, affordable financial services to every African. We believe that financial inclusion is the foundation of economic empowerment.
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/about-team.jpg"
              alt="Finclusion team collaborating in modern office"
              className="rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Mission & Values                                 */}
      {/* ============================================================ */}
      <section className="py-20 px-6 lg:px-20 bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center tracking-[-0.01em]"
          >
            What Drives Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-10 text-center"
              >
                <div className="w-[72px] h-[72px] rounded-full bg-[#D1FAE5] flex items-center justify-center mx-auto">
                  <v.icon size={40} className="text-[#10B981]" />
                </div>
                <h3 className="text-[1.5rem] lg:text-[2rem] font-semibold text-[#111827] mt-5">
                  {v.title}
                </h3>
                <p className="text-[1rem] text-[#4B5563] leading-[1.6] mt-3">
                  {v.description}
                </p>
                <div className="mt-6">
                  <StatCounter value={v.stat} />
                  <p className="text-[0.875rem] text-[#4B5563] font-medium mt-1">
                    {v.statLabel}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Timeline                                         */}
      {/* ============================================================ */}
      <section className="py-20 px-6 lg:px-20 bg-white">
        <div className="max-w-[800px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center tracking-[-0.01em] mb-12"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#E5E7EB] md:-translate-x-px" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  i % 2 === 0
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#10B981] border-2 border-white shadow-sm z-10 -translate-x-1/2 mt-1.5" />

                {/* Content */}
                <div
                  className={`pl-12 md:pl-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}
                >
                  <span className="text-[0.875rem] font-semibold uppercase text-[#10B981]">
                    {item.year}
                  </span>
                  <h4 className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] mt-1">
                    {item.title}
                  </h4>
                  <p className="text-[0.875rem] lg:text-[1rem] text-[#4B5563] leading-[1.5] mt-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Team                                             */}
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
            Meet the Team
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-square rounded-2xl bg-[#E5E7EB] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] flex items-center justify-center">
                    <Users size={48} className="text-[#059669] opacity-40" />
                  </div>
                </div>
                <h4 className="text-[1.25rem] font-semibold text-[#111827] mt-4">
                  {member.name}
                </h4>
                <p className="text-[0.875rem] font-semibold text-[#10B981]">
                  {member.role}
                </p>
                <p className="text-[0.875rem] text-[#4B5563] leading-[1.5] mt-2 line-clamp-2">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Partners & Backers                               */}
      {/* ============================================================ */}
      <section className="py-20 px-6 lg:px-20 bg-white">
        <div className="max-w-[1280px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] tracking-[-0.01em]"
          >
            Backed by the Best
          </motion.h2>

          {/* Investors */}
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] mt-10"
          >
            Our Investors
          </motion.h4>
          <div className="flex flex-wrap justify-center gap-10 mt-6">
            {investors.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-12 px-8 flex items-center justify-center bg-[#F3F4F6] rounded-2xl grayscale hover:grayscale-0 transition-all duration-200"
              >
                <span className="text-[0.875rem] font-semibold text-[#4B5563]">{name}</span>
              </motion.div>
            ))}
          </div>

          {/* Partners */}
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] mt-12"
          >
            Our Partners
          </motion.h4>
          <div className="flex flex-wrap justify-center gap-10 mt-6">
            {partners.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="h-12 px-8 flex items-center justify-center bg-[#F3F4F6] rounded-2xl grayscale hover:grayscale-0 transition-all duration-200"
              >
                <span className="text-[0.875rem] font-semibold text-[#4B5563]">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — Join Us CTA                                      */}
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
              Join Our Mission
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[1.125rem] text-white opacity-90 mt-4 max-w-[560px] mx-auto"
            >
              We&apos;re always looking for passionate people who want to make a difference.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <button className="px-7 py-4 rounded-2xl bg-white text-[#10B981] text-[1rem] font-semibold hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
                View Open Positions
              </button>
              <Link
                to="/contact"
                className="px-7 py-4 rounded-2xl border border-white text-white text-[1rem] font-medium hover:bg-white/10 transition-all duration-200 ease-out"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
