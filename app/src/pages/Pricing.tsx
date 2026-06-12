import { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Check } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

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
function PricingHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-white pt-[120px] pb-16 px-6 lg:px-20">
      <div className="max-w-[640px] mx-auto text-center">
        <p
          className="text-[0.875rem] font-semibold uppercase tracking-[0.05em] text-[#10B981] mb-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          COMPLETE TRANSPARENCY
        </p>
        <h1
          className="text-[2.5rem] lg:text-[4rem] font-bold text-[#111827] leading-[1.1] tracking-[-0.02em]"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s',
          }}
        >
          No Hidden Fees. Ever.
        </h1>
        <p
          className="text-[1.125rem] text-[#4B5563] leading-[1.6] mt-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.25s',
          }}
        >
          We believe you deserve to know exactly what you&apos;re paying for.
          Every fee, every charge, every rate — listed right here.
        </p>
        <div
          className="flex items-center justify-center gap-3 mt-8 text-[#10B981] font-medium"
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease 0.4s',
          }}
        >
          <ShieldCheck size={24} />
          <span>Licensed &amp; Regulated Across Africa</span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 2 — Product Pricing Tabs
   ═══════════════════════════════════════════ */

const loanInterestData = [
  ['5,000–25,000 FCFA', '5%', '4.5%', '4%', '3.5%'],
  ['25,001–100,000 FCFA', '4.5%', '4%', '3.5%', '3%'],
  ['100,001–500,000 FCFA', '4%', '3.5%', '3%', '2.5%'],
];

const loanFeesData = [
  ['Application fee', '0 FCFA'],
  ['Processing fee', '0 FCFA'],
  ['Late payment penalty', '2% of overdue amount'],
  ['Early repayment fee', '0 FCFA'],
  ['Account maintenance', '0 FCFA'],
];

const savingsRatesData = [
  ['Basic', '3%', 'None', 'Unlimited'],
  ['Premium', '5%', '10,000 FCFA', '2 free/month'],
  ['Goal-Locked', '7%', '50,000 FCFA', 'Locked until goal'],
];

const savingsFeesData = [
  ['Account opening', '0 FCFA'],
  ['Monthly maintenance', '0 FCFA'],
  ['Withdrawal (Basic)', '0 FCFA'],
  ['Extra withdrawals (Premium)', '200 FCFA each'],
  ['Early unlock (Goal-Locked)', '2% fee'],
];

const transfersData = [
  ['France', 'Senegal/Cote d\'Ivoire', '1.99 EUR', '2.99 EUR', '4.99 EUR'],
  ['France', 'Other WAEMU', '2.49 EUR', '3.49 EUR', '5.49 EUR'],
  ['USA', 'Nigeria', '$2.99', '$3.99', '$5.99'],
  ['UK', 'Ghana', '£1.99', '£2.49', '£3.99'],
  ['Intra-Africa', 'Any country', '1% of amount', '0.8%', '0.5%'],
];

const insuranceData = [
  ['Essential', '500 FCFA', '50,000 FCFA', '100,000 FCFA', 'No'],
  ['Family', '1,500 FCFA', '200,000 FCFA', '500,000 FCFA', 'Yes'],
  ['Premium', '3,000 FCFA', '1,000,000 FCFA', '2,000,000 FCFA', 'Yes + Assets'],
];

const insuranceClaimsData = [
  ['Policy activation', '0 FCFA'],
  ['Claims filing', '0 FCFA'],
  ['Claims processing time', '48 hours'],
  ['Claims approval rate', '98%'],
  ['Policy cancellation', 'Prorated refund'],
];

function HighlightCell({
  value,
  highlight,
}: {
  value: string;
  highlight: boolean;
}) {
  return (
    <TableCell
      className={
        highlight
          ? 'text-[#10B981] font-semibold'
          : 'text-[#111827]'
      }
    >
      {value}
    </TableCell>
  );
}

function LoansTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] mb-4">
          Interest Rates
        </h3>
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F3F4F6]">
                <TableHead className="text-[#111827] font-semibold">
                  Loan Amount
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  1 Month
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  3 Months
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  6 Months
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  12 Months
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanInterestData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-[#111827] font-medium">
                    {row[0]}
                  </TableCell>
                  <HighlightCell value={row[1]} highlight={false} />
                  <HighlightCell value={row[2]} highlight={false} />
                  <HighlightCell value={row[3]} highlight={false} />
                  <HighlightCell value={row[4]} highlight={true} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <h3 className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] mb-4">
          Additional Fees
        </h3>
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F3F4F6]">
                <TableHead className="text-[#111827] font-semibold">
                  Fee Type
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanFeesData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-[#111827]">{row[0]}</TableCell>
                  <TableCell
                    className={
                      row[1] === '0 FCFA'
                        ? 'text-[#10B981] font-semibold'
                        : 'text-[#111827]'
                    }
                  >
                    {row[1]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function SavingsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] mb-4">
          Interest Rates
        </h3>
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F3F4F6]">
                <TableHead className="text-[#111827] font-semibold">
                  Plan
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Annual Rate
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Min Balance
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Withdrawals
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savingsRatesData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-[#111827] font-medium">
                    {row[0]}
                  </TableCell>
                  <TableCell className="text-[#10B981] font-semibold">
                    {row[1]}
                  </TableCell>
                  <TableCell className="text-[#111827]">{row[2]}</TableCell>
                  <TableCell className="text-[#111827]">{row[3]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <h3 className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] mb-4">
          Fees
        </h3>
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F3F4F6]">
                <TableHead className="text-[#111827] font-semibold">
                  Fee Type
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savingsFeesData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-[#111827]">{row[0]}</TableCell>
                  <TableCell
                    className={
                      row[1] === '0 FCFA'
                        ? 'text-[#10B981] font-semibold'
                        : 'text-[#111827]'
                    }
                  >
                    {row[1]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function TransfersTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] mb-4">
          Transfer Fees by Corridor
        </h3>
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F3F4F6]">
                <TableHead className="text-[#111827] font-semibold">
                  Send From
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Send To
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Fee (up to 100)
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Fee (100–500)
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Fee (500+)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfersData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-[#111827] font-medium">
                    {row[0]}
                  </TableCell>
                  <TableCell className="text-[#111827]">{row[1]}</TableCell>
                  <TableCell className="text-[#111827]">{row[2]}</TableCell>
                  <TableCell className="text-[#111827]">{row[3]}</TableCell>
                  <TableCell className="text-[#10B981] font-semibold">
                    {row[4]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="bg-[#D1FAE5] rounded-2xl p-6 flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
          <Check size={14} className="text-white" />
        </div>
        <div>
          <p className="font-semibold text-[#111827]">
            Exchange Rate Policy
          </p>
          <p className="text-[#4B5563] text-[0.875rem] mt-1">
            We use the mid-market exchange rate with zero markup. The rate you
            see is the rate you get.
          </p>
        </div>
      </div>
    </div>
  );
}

function InsuranceTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] mb-4">
          Premium Plans
        </h3>
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F3F4F6]">
                <TableHead className="text-[#111827] font-semibold">
                  Plan
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Monthly Premium
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Hospitalization
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Accident
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Family Coverage
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insuranceData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-[#111827] font-medium">
                    {row[0]}
                  </TableCell>
                  <TableCell className="text-[#10B981] font-semibold">
                    {row[1]}
                  </TableCell>
                  <TableCell className="text-[#111827]">{row[2]}</TableCell>
                  <TableCell className="text-[#111827]">{row[3]}</TableCell>
                  <TableCell className="text-[#111827]">{row[4]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <h3 className="text-[1.25rem] lg:text-[1.5rem] font-semibold text-[#111827] mb-4">
          Claims &amp; Fees
        </h3>
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F3F4F6]">
                <TableHead className="text-[#111827] font-semibold">
                  Item
                </TableHead>
                <TableHead className="text-[#111827] font-semibold">
                  Fee/Detail
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insuranceClaimsData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-[#111827]">{row[0]}</TableCell>
                  <TableCell
                    className={
                      row[1] === '0 FCFA'
                        ? 'text-[#10B981] font-semibold'
                        : 'text-[#111827]'
                    }
                  >
                    {row[1]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function ProductPricingTabs() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <Tabs defaultValue="loans" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-10 bg-transparent h-auto">
              {['loans', 'savings', 'transfers', 'insurance'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="px-6 py-3 rounded-xl text-[1rem] font-medium capitalize border border-[#E5E7EB] bg-white text-[#4B5563] data-[state=active]:bg-[#10B981] data-[state=active]:text-white data-[state=active]:border-[#10B981] hover:bg-[#F3F4F6] transition-all duration-200"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <div
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            >
              <TabsContent value="loans">
                <LoansTab />
              </TabsContent>
              <TabsContent value="savings">
                <SavingsTab />
              </TabsContent>
              <TabsContent value="transfers">
                <TransfersTab />
              </TabsContent>
              <TabsContent value="insurance">
                <InsuranceTab />
              </TabsContent>
            </div>
          </Tabs>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 3 — Fee Schedule Summary
   ═══════════════════════════════════════════ */

const freeItems = [
  'Account opening',
  'Account maintenance',
  'Loan application',
  'Loan processing',
  'Mobile app usage',
  'In-app support',
];

function FeeScheduleSummary() {
  return (
    <section className="px-4 sm:px-6 py-20">
      <div className="max-w-[1280px] mx-auto bg-[#111827] rounded-3xl sm:rounded-[24px] px-8 sm:px-16 py-16">
        <ScrollReveal>
          <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-white text-center leading-[1.15] tracking-[-0.01em]">
            What We Don&apos;t Charge For
          </h2>
          <p className="text-[#9CA3AF] text-center mt-2 text-[1.125rem]">
            These fees are common in the industry. At Finclusion, they&apos;re
            always free.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {freeItems.map((item, i) => (
            <ScrollReveal key={item} delay={i * 0.1}>
              <div className="flex items-center gap-3">
                <Check
                  size={24}
                  className="text-[#10B981] shrink-0"
                  strokeWidth={2.5}
                />
                <span className="text-white font-semibold text-[1.25rem] lg:text-[1.5rem]">
                  {item}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 4 — Comparison
   ═══════════════════════════════════════════ */

const comparisonData = [
  ['Loan application time', '5 minutes', '1–2 weeks', '1–3 days'],
  ['Loan collateral', 'None', 'Required', 'Sometimes'],
  [
    'Savings account opening',
    'Free, instant',
    'Requires branch visit',
    'Usually free',
  ],
  [
    'Transfer fees (EUR→WAEMU)',
    '1.99–4.99 EUR',
    'N/A',
    '4.99–11 EUR',
  ],
  ['Insurance claim time', '48 hours', '2–4 weeks', '1–2 weeks'],
  ['Customer support', '24/7 in-app', 'Business hours', 'Business hours'],
  ['Account maintenance', 'Free', '1,000–5,000 FCFA/yr', 'Usually free'],
];

function ComparisonSection() {
  return (
    <section className="bg-white py-20 px-6 lg:px-20">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-10">
            How We Compare
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="rounded-2xl overflow-hidden border border-[#E5E7EB]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F3F4F6]">
                  <TableHead className="text-[#111827] font-semibold">
                    Feature
                  </TableHead>
                  <TableHead className="text-[#10B981] font-semibold">
                    Finclusion
                  </TableHead>
                  <TableHead className="text-[#111827] font-semibold">
                    Traditional Banks
                  </TableHead>
                  <TableHead className="text-[#111827] font-semibold">
                    Other Fintechs
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-[#111827] font-medium">
                      {row[0]}
                    </TableCell>
                    <TableCell className="text-[#10B981] font-semibold">
                      {row[1]}
                    </TableCell>
                    <TableCell className="text-[#4B5563]">{row[2]}</TableCell>
                    <TableCell className="text-[#4B5563]">{row[3]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Section 5 — FAQ
   ═══════════════════════════════════════════ */

const faqData = [
  {
    q: 'Are there really no hidden fees?',
    a: 'Yes, really. The price you see in our calculator is exactly what you pay. We make money through interest on loans and small spreads on transfers — never through hidden charges.',
  },
  {
    q: 'Why are your rates lower than banks?',
    a: "We're a digital-first platform with no physical branches to maintain. Our AI-powered systems reduce operational costs, and we pass those savings directly to you.",
  },
  {
    q: 'Do you charge for failed transactions?',
    a: "No. If a transfer or payment fails for any reason, you won't be charged. The full amount is returned to your account.",
  },
  {
    q: 'What happens if I miss a loan repayment?',
    a: 'We charge a one-time late fee of 2% on the overdue amount. We also work with you to restructure your repayment plan if you\'re facing difficulties.',
  },
  {
    q: 'Are savings interest rates guaranteed?',
    a: 'Interest rates are variable and may change based on market conditions. However, we guarantee the rate at the time you open your savings plan for the first 6 months.',
  },
  {
    q: 'Is there a fee to close my account?',
    a: 'No. You can close your account at any time with zero fees. Any remaining balance is returned to you within 48 hours.',
  },
];

function PricingFAQ() {
  return (
    <section className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
      <div className="max-w-[800px] mx-auto">
        <ScrollReveal>
          <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-10">
            Pricing Questions
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqData.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white rounded-2xl px-6 border border-[#E5E7EB] data-[state=open]:border-[#10B981]/30"
              >
                <AccordionTrigger className="text-[1rem] font-medium text-[#111827] hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#4B5563] text-[0.95rem] leading-[1.6] pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Page Export
   ═══════════════════════════════════════════ */

export default function Pricing() {
  return (
    <div>
      <PricingHero />
      <ProductPricingTabs />
      <FeeScheduleSummary />
      <ComparisonSection />
      <PricingFAQ />
    </div>
  );
}
