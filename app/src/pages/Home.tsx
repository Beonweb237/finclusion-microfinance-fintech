import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import {
  ArrowRight,
  Shield,
  Zap,
  Smartphone,
  Users,
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ───────────────────── Scroll-reveal hook ───────────────────── */
function useReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
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

/* ────────────────────── Section 1: Hero ────────────────────── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 0% 0%, rgba(16,185,129,0.06) 0%, transparent 60%)',
        }}
      />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-[120px] pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[56%_44%] gap-12 items-center">
          {/* Text Column */}
          <div className="order-1">
            <h1 className="text-[2.5rem] lg:text-[4rem] font-bold leading-[1.1] tracking-[-0.02em]">
              <span
                className="block text-[#111827]"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                  transition:
                    'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                }}
              >
                Unlock Your Potential
              </span>
              <span
                className="block text-[#10B981]"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                  transition:
                    'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
                }}
              >
                with Finclusion
              </span>
            </h1>
            <p
              className="text-[1rem] lg:text-[1.125rem] text-[#4B5563] max-w-[480px] mt-6 leading-relaxed"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                transition:
                  'opacity 0.5s ease-out 0.5s, transform 0.5s ease-out 0.5s',
              }}
            >
              Access microloans, savings, and financial services designed for your
              success. Join thousands of Africans building their financial future.
            </p>
            <div
              className="flex flex-wrap gap-4 mt-8"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                transition:
                  'opacity 0.4s ease-out 0.65s, transform 0.4s ease-out 0.65s',
              }}
            >
              <button className="px-7 py-4 rounded-2xl bg-[#10B981] text-white text-[1rem] font-semibold hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
                Get Started
              </button>
              <button className="px-7 py-4 rounded-2xl border border-[#E5E7EB] text-[#111827] text-[1rem] font-medium hover:border-[#10B981] hover:text-[#10B981] transition-all duration-200 ease-out">
                Learn More
              </button>
            </div>
            {/* Social Proof */}
            <div
              className="flex items-center gap-3 mt-8"
              style={{
                opacity: loaded ? 1 : 0,
                transition: 'opacity 0.5s ease-out 0.8s',
              }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`/testimonial-${i}.jpg`}
                    alt=""
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 ml-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-[#10B981] text-[#10B981]"
                  />
                ))}
              </div>
              <span className="text-[0.875rem] text-[#4B5563]">
                Trusted by 50,000+ users across Africa
              </span>
            </div>
          </div>

          {/* Image Column */}
          <div
            className="order-2 flex justify-center lg:justify-end"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
            }}
          >
            <img
              src="/hero-person-phone.jpg"
              alt="Happy user with phone"
              className="rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] w-full max-w-[400px] lg:max-w-full object-cover"
              style={{ transform: 'rotate(-2deg)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── Section 2: 3-Step Process ──────────────────── */
function ProcessSection() {
  const steps = [
    {
      num: 1,
      img: '/process-step-1.jpg',
      title: 'Register Online',
      desc: 'Create your account in minutes. All you need is your phone number and a valid ID. No paperwork, no branch visits.',
    },
    {
      num: 2,
      img: '/process-step-2.jpg',
      title: 'Apply for a Loan',
      desc: 'Choose your loan amount and repayment period. Our system evaluates your application instantly using smart technology.',
    },
    {
      num: 3,
      img: '/process-step-3.jpg',
      title: 'Receive Funds',
      desc: 'Get money directly to your mobile wallet or bank account. Start building your future today.',
    },
  ];

  return (
    <section className="bg-[#F9FAFB] py-20 px-6 lg:px-12">
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-[0.875rem] font-semibold uppercase tracking-[0.05em] text-[#10B981]">
            HOW IT WORKS
          </p>
          <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] mt-3 leading-[1.15] tracking-[-0.01em]">
            Get Your Loan in 3 Easy Steps
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.15}>
              <div className="relative bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <div className="absolute -top-3 left-6 w-12 h-12 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[1.25rem] font-bold">
                  {step.num}
                </div>
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-[200px] object-cover rounded-xl mt-4 mb-5"
                />
                <h4 className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] mb-2">
                  {step.title}
                </h4>
                <p className="text-[0.875rem] lg:text-[1rem] text-[#4B5563] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
          {/* Arrow connectors (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-[33%] -translate-y-1/2 -translate-x-1/2 z-10">
            <ArrowRight className="text-[#10B981] w-6 h-6" />
          </div>
          <div className="hidden md:block absolute top-1/2 left-[66%] -translate-y-1/2 -translate-x-1/2 z-10">
            <ArrowRight className="text-[#10B981] w-6 h-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── Section 3: Products ──────────────────── */
function ProductsSection() {
  const products = [
    {
      img: '/product-loans.jpg',
      title: 'Microloans',
      desc: 'Access loans from 5,000 to 500,000 FCFA with flexible repayment terms. Perfect for entrepreneurs and small businesses.',
      link: '/loans',
    },
    {
      img: '/product-savings.jpg',
      title: 'Savings Plans',
      desc: 'Build your financial safety net with our goal-based savings accounts. Competitive interest rates, zero fees.',
      link: '/savings',
    },
    {
      img: '/product-transfers.jpg',
      title: 'Money Transfers',
      desc: 'Send and receive money across Africa instantly. Low fees, great exchange rates, multiple delivery options.',
      link: '/transfers',
    },
    {
      img: '/product-insurance.jpg',
      title: 'Microinsurance',
      desc: 'Protect what matters most. Affordable health, life, and asset coverage tailored to your needs.',
      link: '/insurance',
    },
  ];

  return (
    <section className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-[0.875rem] font-semibold uppercase tracking-[0.05em] text-[#10B981]">
            OUR PRODUCTS
          </p>
          <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] mt-3 leading-[1.15] tracking-[-0.01em]">
            Financial Solutions for Every Need
          </h2>
          <p className="text-[1rem] lg:text-[1.125rem] text-[#4B5563] max-w-[600px] mx-auto mt-3">
            From microloans to insurance, we provide accessible financial tools
            designed specifically for Africans.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="group rounded-2xl overflow-hidden bg-[#F3F4F6] hover:bg-[#E5E7EB] transition-colors duration-200 ease-out">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-[200px] object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <h4 className="text-[1.25rem] font-semibold text-[#111827] mb-2">
                    {p.title}
                  </h4>
                  <p className="text-[0.875rem] text-[#4B5563] leading-relaxed line-clamp-2 mb-4">
                    {p.desc}
                  </p>
                  <Link
                    to={p.link}
                    className="inline-flex items-center gap-1 text-[#10B981] font-medium text-[0.875rem] group-hover:gap-2 transition-all duration-200"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── Section 4: Trust Signal ──────────────────── */
function TrustSection() {
  const factors = [
    {
      icon: Shield,
      title: 'Secure & Regulated',
      desc: 'Licensed by central banks across Africa. Your money and data are protected by bank-level security.',
    },
    {
      icon: Zap,
      title: 'Instant Approval',
      desc: 'No waiting days for a decision. Our AI-powered system gives you an answer in under 5 minutes.',
    },
    {
      icon: Smartphone,
      title: '100% Mobile',
      desc: 'Apply, manage, and repay — all from your phone. No branch visits required.',
    },
    {
      icon: Users,
      title: 'Built for Africans',
      desc: 'Designed specifically for the African context. We understand your challenges because we live them too.',
    },
  ];

  return (
    <section className="bg-[#F3F4F6] py-20 px-6 lg:px-12">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-center">
          {/* Image */}
          <Reveal>
            <img
              src="/trust-person.jpg"
              alt="Trusted professional"
              className="rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.08)] w-full object-cover"
              style={{ transform: 'rotate(1deg)' }}
            />
          </Reveal>

          {/* Trust Factors */}
          <div>
            <Reveal>
              <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] leading-[1.15] tracking-[-0.01em] mb-8">
                Why Thousands Trust Finclusion
              </h2>
            </Reveal>
            <div className="space-y-6">
              {factors.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.1}>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#D1FAE5] flex items-center justify-center">
                      <f.icon size={20} className="text-[#10B981]" />
                    </div>
                    <div>
                      <h4 className="text-[1.25rem] font-semibold text-[#111827] mb-1">
                        {f.title}
                      </h4>
                      <p className="text-[0.875rem] text-[#4B5563] leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── Section 5: Testimonials ──────────────────── */
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'Finclusion changed my life. I got a loan to expand my shop, and now I employ three people in my community.',
      name: 'Amina D.',
      role: 'Shop Owner, Lagos',
      avatar: '/testimonial-1.jpg',
    },
    {
      quote:
        'The application was so simple. I had the money in my account within hours. No stress, no hidden fees.',
      name: 'Kofi M.',
      role: 'Tech Entrepreneur, Accra',
      avatar: '/testimonial-2.jpg',
    },
    {
      quote:
        'As a single mother, having access to savings and microinsurance gives me peace of mind for my children\'s future.',
      name: 'Grace N.',
      role: 'Teacher, Nairobi',
      avatar: '/testimonial-3.jpg',
    },
    {
      quote:
        'I\'ve used many financial apps, but Finclusion actually understands the African market. The customer service is exceptional.',
      name: 'Ibrahim S.',
      role: 'Business Consultant, Dakar',
      avatar: '/testimonial-4.jpg',
    },
    {
      quote:
        'The savings plan helped me buy my first car. Small contributions every week added up faster than I expected.',
      name: 'Esther W.',
      role: 'Nurse, Kampala',
      avatar: '/testimonial-1.jpg',
    },
    {
      quote:
        'I send money to my family in the village every month. The fees are so low compared to traditional transfer services.',
      name: 'Jean-Pierre T.',
      role: 'Engineer, Abidjan',
      avatar: '/testimonial-2.jpg',
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const scrollTo = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 376;
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = 376;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveDot(Math.min(newIndex, testimonials.length - 1));
  };

  return (
    <section className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-[0.875rem] font-semibold uppercase tracking-[0.05em] text-[#10B981]">
            TESTIMONIALS
          </p>
          <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] mt-3 leading-[1.15] tracking-[-0.01em]">
            What Our Users Say
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative">
            {/* Carousel */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="snap-start shrink-0 w-[320px] md:w-[360px] bg-[#F3F4F6] rounded-2xl p-8 flex flex-col"
                >
                  <Quote
                    size={20}
                    className="text-[#10B981] opacity-50 mb-3"
                  />
                  <p className="text-[1rem] text-[#111827] italic leading-relaxed flex-1">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[1rem] font-semibold text-[#111827]">
                        {t.name}
                      </p>
                      <p className="text-[0.875rem] text-[#4B5563]">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows (desktop) */}
            <button
              onClick={() => scrollTo('left')}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-[#F3F4F6] items-center justify-center hover:bg-[#10B981] hover:text-white text-[#111827] transition-all duration-200 shadow-sm z-10"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollTo('right')}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-[#F3F4F6] items-center justify-center hover:bg-[#10B981] hover:text-white text-[#111827] transition-all duration-200 shadow-sm z-10"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  el.scrollTo({
                    left: i * 376,
                    behavior: 'smooth',
                  });
                }}
                className={
                  'w-2 h-2 rounded-full transition-colors duration-200 ' +
                  (activeDot === i ? 'bg-[#10B981]' : 'bg-[#E5E7EB]')
                }
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────── Section 6: CTA Banner ──────────────────── */
function CTABanner() {
  return (
    <section className="px-4 sm:px-6 py-8">
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="bg-[#111827] rounded-3xl px-8 py-16 lg:px-16 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 items-center">
              <div>
                <h2 className="text-[2rem] lg:text-[3rem] font-bold text-white leading-[1.15] tracking-[-0.01em]">
                  Ready to Take the First Step?
                </h2>
                <p className="text-[1rem] lg:text-[1.125rem] text-[#9CA3AF] max-w-[480px] mt-4">
                  Join over 50,000 Africans who are already building their
                  financial future with Finclusion.
                </p>
                <button className="mt-8 px-8 py-4 rounded-2xl bg-[#10B981] text-white text-[1rem] font-semibold hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
                  Get Started Now
                </button>
              </div>
              <div className="hidden lg:flex justify-end">
                <img
                  src="/hero-person-pointing.jpg"
                  alt="Person pointing"
                  className="rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] max-h-[320px] object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────── Section 7: Partners Marquee ──────────────────── */
function PartnersSection() {
  const partners = [
    { name: 'Bank of America', abbr: 'BofA' },
    { name: 'Microsoft', abbr: 'MSFT' },
    { name: 'Visa', abbr: 'VISA' },
    { name: 'Goldman Sachs', abbr: 'GS' },
    { name: 'Citi', abbr: 'CITI' },
    { name: 'McKinsey', abbr: 'MCK' },
  ];

  const PartnerLogo = ({ abbr }: { name: string; abbr: string }) => (
    <div className="flex items-center justify-center h-16 px-10 grayscale hover:grayscale-0 transition-all duration-200 cursor-pointer">
      <span className="text-[1.25rem] font-bold text-[#111827] tracking-wide">
        {abbr}
      </span>
    </div>
  );

  return (
    <section className="bg-white py-12 px-6 lg:px-12">
      <div className="max-w-[1280px] mx-auto">
        <Reveal className="text-center mb-8">
          <p className="text-[0.875rem] font-semibold uppercase tracking-[0.05em] text-[#10B981]">
            TRUSTED BY LEADING INSTITUTIONS
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Marquee speed={40} gradient={false}>
            {partners.map((p) => (
              <PartnerLogo key={p.name} name={p.name} abbr={p.abbr} />
            ))}
            {partners.map((p) => (
              <PartnerLogo key={`dup-${p.name}`} name={p.name} abbr={p.abbr} />
            ))}
          </Marquee>
        </Reveal>
      </div>
    </section>
  );
}

/* ──────────────────── Section 8: FAQ ──────────────────── */
function FAQSection() {
  const faqs = [
    {
      q: 'How quickly can I get a loan?',
      a: 'Most applications are reviewed within 5 minutes. Once approved, funds are sent directly to your mobile money wallet or bank account within 24 hours.',
    },
    {
      q: 'What documents do I need?',
      a: 'Just a valid government-issued ID and your phone number. No bank statements, no collateral, no guarantor required for loans up to 100,000 FCFA.',
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely. We use bank-level 256-bit encryption and are licensed and regulated by financial authorities in every country we operate. Your data is never sold to third parties.',
    },
    {
      q: 'What are the interest rates?',
      a: 'Our rates range from 2.5% to 5% monthly depending on your loan amount and duration. We display the total cost upfront — no hidden fees, ever.',
    },
    {
      q: 'Can I repay early?',
      a: 'Yes, early repayment is always allowed and reduces your total interest. There are no prepayment penalties.',
    },
    {
      q: 'Which countries do you operate in?',
      a: 'We currently operate in Nigeria, Ghana, Kenya, Senegal, Ivory Coast, and Uganda. We\'re expanding to more African countries every quarter.',
    },
  ];

  return (
    <section className="bg-[#F9FAFB] py-20 px-6 lg:px-12">
      <div className="max-w-[800px] mx-auto">
        <Reveal className="text-center mb-12">
          <p className="text-[0.875rem] font-semibold uppercase tracking-[0.05em] text-[#10B981]">
            FAQ
          </p>
          <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] mt-3 leading-[1.15] tracking-[-0.01em]">
            Common Questions
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[#E5E7EB]">
                <AccordionTrigger className="text-[1rem] font-semibold text-[#111827] py-5 hover:no-underline text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[1rem] text-[#4B5563] pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────── Home Page ─────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <ProcessSection />
      <ProductsSection />
      <TrustSection />
      <TestimonialsSection />
      <CTABanner />
      <PartnersSection />
      <FAQSection />
    </>
  );
}
