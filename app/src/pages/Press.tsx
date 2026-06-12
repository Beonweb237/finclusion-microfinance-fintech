import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image,
  FileText,
  Download,
  ArrowRight,
} from 'lucide-react';

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

const quickStats = [
  { value: '2019', label: 'Founded' },
  { value: '50,000+', label: 'Users' },
  { value: '6', label: 'Countries' },
  { value: '120', label: 'Team' },
];

const categories = ['All', 'Funding', 'Product', 'Partnership', 'Impact'] as const;

type Category = (typeof categories)[number];

const pressReleases = [
  {
    id: 1,
    category: 'Funding' as Category,
    date: 'March 15, 2025',
    title: 'Finclusion Raises $12M Series B to Expand Across East Africa',
    excerpt:
      'The round was led by Partech Africa with participation from existing investors...',
  },
  {
    id: 2,
    category: 'Product' as Category,
    date: 'January 10, 2025',
    title: 'Finclusion Launches Microinsurance in Partnership with Pan-African Insurance Group',
    excerpt:
      'New health and life coverage options start from just 500 FCFA per month...',
  },
  {
    id: 3,
    category: 'Partnership' as Category,
    date: 'November 22, 2024',
    title: 'Finclusion Partners with Orange Money to Expand Mobile Money Transfers',
    excerpt:
      'The partnership enables instant transfers to Orange Money wallets across 8 countries...',
  },
  {
    id: 4,
    category: 'Impact' as Category,
    date: 'September 5, 2024',
    title: 'Finclusion Surpasses 2.5 Billion FCFA in Loans Disbursed',
    excerpt:
      'Milestone reached across 6 countries with a 98% repayment rate...',
  },
  {
    id: 5,
    category: 'Product' as Category,
    date: 'July 18, 2024',
    title: 'AI-Powered Credit Scoring Reduces Loan Approval Time to Under 5 Minutes',
    excerpt:
      'New machine learning model enables faster, fairer lending decisions...',
  },
];

const mediaCoverage = [
  {
    outlet: 'TechCrunch',
    headline: 'Finclusion wants to be the N26 of Francophone Africa',
    excerpt:
      'The Dakar-based fintech is bringing mobile-first banking to West Africa...',
  },
  {
    outlet: 'Bloomberg',
    headline: 'African Fintechs Attract Record Investment in 2024',
    excerpt:
      'Finclusion featured as one of the leading microfinance platforms...',
  },
  {
    outlet: 'Jeune Afrique',
    headline: 'Les fintechs qui transforment la finance en Afrique',
    excerpt:
      'Finclusion revolutionne l\'acces au credit pour les populations non-bancarisees...',
  },
  {
    outlet: 'Disrupt Africa',
    headline: 'Finclusion raises $12M to scale across East Africa',
    excerpt:
      'The Series B round marks one of the largest fintech investments in the region...',
  },
  {
    outlet: 'Financial Times',
    headline: 'Mobile banking gains traction in rural Africa',
    excerpt:
      "Finclusion's agent network model brings services to previously unreachable communities...",
  },
  {
    outlet: 'Le Monde',
    headline: "L'inclusion financiere, levier de developpement en Afrique",
    excerpt:
      'Comment les fintechs comme Finclusion changent la donne pour les petits entrepreneurs...',
  },
];

const brandAssets = [
  {
    icon: Image,
    title: 'Logo Kit',
    description:
      'Full logo in PNG, SVG, and EPS formats. Color, black, and white variants.',
    fileInfo: 'ZIP, 2.4 MB',
  },
  {
    icon: Image,
    title: 'Photography',
    description:
      'High-resolution photos of users, team, and offices. Editorial use only.',
    fileInfo: 'ZIP, 48 MB',
  },
  {
    icon: FileText,
    title: 'Brand Guidelines',
    description:
      'Official brand guidelines including colors, typography, and usage rules.',
    fileInfo: 'PDF, 3.1 MB',
  },
  {
    icon: Download,
    title: 'Fact Sheet',
    description:
      'One-page fact sheet with key company statistics and milestones.',
    fileInfo: 'PDF, 1.2 MB',
  },
];

/* ------------------------------------------------------------------ */
/*  Main page                                                         */
/* ------------------------------------------------------------------ */

export default function Press() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');

  const filteredReleases =
    activeFilter === 'All'
      ? pressReleases
      : pressReleases.filter((r) => r.category === activeFilter);

  return (
    <div className="font-['Outfit',sans-serif]">
      {/* ============================================================ */}
      {/* SECTION 1 — Hero                                             */}
      {/* ============================================================ */}
      <section className="pt-[120px] pb-16 px-6 lg:px-20 bg-white">
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
              PRESS & MEDIA
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#111827] leading-[1.1] tracking-[-0.02em] mt-4"
            >
              Resources for Journalists
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-[1.125rem] text-[#4B5563] leading-[1.6] mt-4"
            >
              Find the latest news, download brand assets, and connect with our communications team.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-8 mt-8"
            >
              {quickStats.map((s) => (
                <div key={s.label} className="text-center">
                  <span className="text-[1.25rem] font-semibold text-[#10B981]">
                    {s.value}
                  </span>
                  <p className="text-[0.75rem] text-[#4B5563] mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/press-hero.jpg"
              alt="Press and media workspace"
              className="rounded-[24px] w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Press Releases (filterable)                      */}
      {/* ============================================================ */}
      <section className="py-20 px-6 lg:px-20 bg-[#F9FAFB]">
        <div className="max-w-[800px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center tracking-[-0.01em] mb-8"
          >
            Press Releases
          </motion.h2>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={
                  'px-5 py-2 rounded-full text-[0.875rem] font-medium transition-all duration-200 ease-out ' +
                  (activeFilter === cat
                    ? 'bg-[#10B981] text-white'
                    : 'bg-white text-[#4B5563] hover:bg-[#E5E7EB]')
                }
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Release List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {filteredReleases.map((release, i) => (
                <motion.article
                  key={release.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 hover:bg-[#F9FAFB] transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[0.75rem] font-medium bg-[#D1FAE5] text-[#059669] px-3 py-1 rounded-lg">
                      {release.category}
                    </span>
                    <span className="text-[0.75rem] text-[#9CA3AF]">
                      {release.date}
                    </span>
                  </div>
                  <h4 className="text-[1.25rem] font-semibold text-[#111827] mt-3 hover:text-[#10B981] transition-colors cursor-pointer">
                    {release.title}
                  </h4>
                  <p className="text-[0.875rem] text-[#4B5563] leading-[1.5] mt-2 line-clamp-2">
                    {release.excerpt}
                  </p>
                  <button className="text-[0.875rem] font-medium text-[#10B981] mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all duration-200">
                    Read More <ArrowRight size={14} />
                  </button>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Media Coverage                                   */}
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
            In the News
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaCoverage.map((item, i) => (
              <motion.div
                key={item.outlet}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#F3F4F6] rounded-2xl p-6"
              >
                {/* Outlet logo placeholder */}
                <div className="h-7 flex items-center justify-center grayscale opacity-60">
                  <span className="text-[1rem] font-bold text-[#4B5563]">
                    {item.outlet}
                  </span>
                </div>
                <p className="text-[1rem] font-semibold text-[#111827] mt-4 leading-[1.4]">
                  {item.headline}
                </p>
                <p className="text-[0.875rem] text-[#4B5563] leading-[1.5] mt-2 line-clamp-2">
                  {item.excerpt}
                </p>
                <button className="text-[0.875rem] font-medium text-[#10B981] mt-3 inline-flex items-center gap-1 hover:gap-2 transition-all duration-200">
                  Read Article <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Brand Assets                                     */}
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
            Brand Assets
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[1.125rem] text-[#4B5563] text-center mt-3 mb-10"
          >
            Download official Finclusion logos, photography, and brand guidelines for media use.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {brandAssets.map((asset, i) => (
              <motion.div
                key={asset.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 flex gap-5"
              >
                <div className="w-[56px] h-[56px] rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0">
                  <asset.icon size={28} className="text-[#10B981]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[1.25rem] font-semibold text-[#111827]">
                    {asset.title}
                  </h4>
                  <p className="text-[0.875rem] text-[#4B5563] leading-[1.5] mt-1">
                    {asset.description}
                  </p>
                  <p className="text-[0.75rem] text-[#9CA3AF] mt-2">
                    {asset.fileInfo}
                  </p>
                  <button className="mt-3 px-4 py-2 rounded-2xl border border-[#E5E7EB] text-[#111827] text-[0.875rem] font-medium hover:border-[#10B981] hover:text-[#10B981] transition-all duration-200 ease-out">
                    Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — Press Contact                                    */}
      {/* ============================================================ */}
      <section className="px-6 lg:px-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-[1280px] mx-auto bg-[#111827] rounded-[24px] py-16 px-8 lg:px-16 text-center"
        >
          <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-white tracking-[-0.01em]">
            Press Inquiries
          </h2>
          <a
            href="mailto:press@finclusion.africa"
            className="text-[1.5rem] lg:text-[2rem] font-semibold text-[#10B981] mt-4 inline-block hover:underline"
          >
            press@finclusion.africa
          </a>
          <p className="text-[1rem] text-[#9CA3AF] mt-2">
            Fatima Al-Hassan, Head of Communications
          </p>
          <p className="text-[0.875rem] text-[#4B5563] mt-1">
            We respond to all press inquiries within 4 business hours.
          </p>

          <div className="max-w-[400px] mx-auto h-px bg-white/10 my-6" />

          <p className="text-[0.875rem] text-[#9CA3AF]">
            For urgent press inquiries:
          </p>
          <p className="text-[0.875rem] text-white font-semibold mt-1">
            +221 33 123 4599
          </p>
        </motion.div>
      </section>
    </div>
  );
}
