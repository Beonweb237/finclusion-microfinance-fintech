import { useState, useEffect, useRef } from 'react';
import {
  TrendingDown,
  Clock,
  Eye,
  Headphones,
  ChevronRight,
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

/* ──────────────────────── Country Data ──────────────────────── */
const receivingCountries = [
  'Senegal', 'Ivory Coast', 'Mali', 'Burkina Faso', 'Togo', 'Benin',
  'Niger', 'Nigeria', 'Ghana', 'Cameroon', 'Kenya', 'Uganda',
];

const sendingCountries = [
  'France', 'UK', 'USA', 'Belgium', 'Germany', 'Spain', 'Italy', 'Canada',
];

/* ──────────────────────── Rate Checker State ──────────────────────── */
const exchangeRates: Record<string, number> = {
  'France-Senegal': 655.96,
  'France-Ivory Coast': 655.96,
  'USA-Nigeria': 1550,
  'UK-Ghana': 16.2,
};

const currencyMap: Record<string, string> = {
  France: 'EUR',
  'Ivory Coast': 'FCFA',
  Senegal: 'FCFA',
  Nigeria: 'NGN',
  Ghana: 'GHS',
  USA: 'USD',
  UK: 'GBP',
};

const feeMap: Record<string, number> = {
  'France-Senegal': 2.99,
  'France-Ivory Coast': 2.99,
  'USA-Nigeria': 3.99,
  'UK-Ghana': 2.49,
};

/* ──────────────────────── Transfer Steps ──────────────────────── */
const transferSteps = [
  { num: '1', title: 'Create Account', desc: 'Sign up in 2 minutes with your phone number and ID.' },
  { num: '2', title: 'Choose Destination', desc: 'Select the country and delivery method (mobile money, bank, or cash pickup).' },
  { num: '3', title: 'Enter Amount', desc: 'See the exchange rate and fees upfront. No surprises.' },
  { num: '4', title: 'Send', desc: 'Confirm and send. Your recipient gets notified instantly.' },
];

/* ──────────────────────── Trust Cards ──────────────────────── */
const trustCards = [
  { icon: TrendingDown, title: 'Lowest Fees', desc: 'Save up to 70% compared to traditional money transfer services.' },
  { icon: Clock, title: 'Instant Delivery', desc: 'Mobile money deliveries arrive in seconds. Bank transfers within 24 hours.' },
  { icon: Eye, title: 'Full Transparency', desc: 'See the exact exchange rate and fees before you send. No hidden costs.' },
  { icon: Headphones, title: 'Local Support', desc: 'Customer service in French, English, and local languages.' },
];

/* ──────────────────────── Comparison Table Data ──────────────────────── */
const comparisonHeaders = ['Corridor', 'Finclusion', 'Western Union', 'MoneyGram', 'WorldRemit'];
const comparisonRows = [
  ['France \u2192 Senegal (200 EUR)', '2.99 EUR', '9.90 EUR', '11.00 EUR', '4.99 EUR'],
  ['France \u2192 Ivory Coast (200 EUR)', '2.99 EUR', '9.90 EUR', '11.00 EUR', '4.99 EUR'],
  ['USA \u2192 Nigeria ($200)', '$3.99', '$12.50', '$14.99', '$6.99'],
  ['UK \u2192 Ghana (\u00a3200)', '\u00a32.49', '\u00a37.90', '\u00a39.99', '\u00a34.99'],
];

/* ═══════════════════════════ MAIN ═══════════════════════════ */
export default function Transfers() {
  const [sendFrom, setSendFrom] = useState('France');
  const [sendTo, setSendTo] = useState('Senegal');
  const [sendAmount, setSendAmount] = useState(200);

  const corridorKey = `${sendFrom}-${sendTo}`;
  const rate = exchangeRates[corridorKey] || 655.96;
  const fee = feeMap[corridorKey] || 2.99;
  const fromCurrency = currencyMap[sendFrom] || 'EUR';
  const toCurrency = currencyMap[sendTo] || 'FCFA';
  const receiveAmount = Math.round(sendAmount * rate);

  return (
    <div className="font-['Outfit',sans-serif]">
      {/* ══════ SECTION 1: Hero with Rate Checker ══════ */}
      <section className="relative pt-[120px] pb-20 px-6 lg:px-20 bg-white">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <FadeInUp delay={0.2}>
              <h1 className="text-[2.5rem] lg:text-[4rem] font-bold text-[#111827] leading-[1.1] tracking-[-0.02em]">
                Send Money Across Africa,{' '}
                <span className="text-[#10B981]">Instantly</span>
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.35}>
              <p className="text-[1.125rem] text-[#4B5563] max-w-[480px] mt-4 leading-relaxed">
                Low fees, great rates, and multiple delivery options. Send money
                to family, friends, or business partners in minutes.
              </p>
            </FadeInUp>

            {/* Quick Rate Checker */}
            <FadeInUp delay={0.5}>
              <div className="mt-8 bg-[#F3F4F6] rounded-2xl p-6 lg:p-8 max-w-md">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-[0.75rem] font-medium text-[#4B5563] block mb-1">
                      Send From
                    </label>
                    <select
                      value={sendFrom}
                      onChange={(e) => setSendFrom(e.target.value)}
                      className="w-full py-3 px-3 rounded-xl bg-white border border-[#E5E7EB] text-[#111827] text-[0.875rem] font-medium focus:border-[#10B981] focus:outline-none focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
                    >
                      {sendingCountries.slice(0, 3).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[0.75rem] font-medium text-[#4B5563] block mb-1">
                      Send To
                    </label>
                    <select
                      value={sendTo}
                      onChange={(e) => setSendTo(e.target.value)}
                      className="w-full py-3 px-3 rounded-xl bg-white border border-[#E5E7EB] text-[#111827] text-[0.875rem] font-medium focus:border-[#10B981] focus:outline-none focus:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]"
                    >
                      {receivingCountries.slice(0, 4).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-[0.75rem] font-medium text-[#4B5563] block mb-1">
                    You send
                  </label>
                  <div className="flex items-center bg-white rounded-xl border border-[#E5E7EB] px-4 py-3 focus-within:border-[#10B981] focus-within:shadow-[0_0_0_3px_rgba(16,185,129,0.15)]">
                    <input
                      type="number"
                      value={sendAmount}
                      onChange={(e) =>
                        setSendAmount(Number(e.target.value) || 0)
                      }
                      className="flex-1 bg-transparent text-[#111827] font-semibold text-[1rem] focus:outline-none"
                    />
                    <span className="text-[#4B5563] text-[0.875rem] font-medium ml-2">
                      {fromCurrency}
                    </span>
                  </div>
                </div>

                <p className="text-[0.875rem] text-[#10B981] font-medium mb-3">
                  1 {fromCurrency} = {rate.toLocaleString()} {toCurrency}
                </p>

                <div className="bg-white rounded-xl p-4 mb-3">
                  <p className="text-[0.75rem] text-[#4B5563]">They receive</p>
                  <p className="text-[1.5rem] font-bold text-[#111827]">
                    {receiveAmount.toLocaleString()} {toCurrency}
                  </p>
                  <p className="text-[0.875rem] text-[#4B5563] mt-1">
                    Fee: {fee} {fromCurrency}
                  </p>
                </div>

                <button className="w-full py-4 rounded-2xl bg-[#10B981] text-white font-semibold hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
                  Send Now
                </button>
              </div>
            </FadeInUp>
          </div>

          {/* Right: Hero Image */}
          <FadeInUp delay={0.4}>
            <img
              src="/product-transfers.jpg"
              alt="Person using transfer service"
              className="rounded-[24px] w-full object-cover shadow-lg"
              style={{ maxHeight: '550px' }}
            />
          </FadeInUp>
        </div>
      </section>

      {/* ══════ SECTION 2: Transfer Pricing ══════ */}
      <section className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              Simple, Transparent Pricing
            </h2>
          </FadeInUp>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { range: 'Up to 100 EUR', fee: '1.99 EUR' },
              { range: '100–500 EUR', fee: '2.99 EUR' },
              { range: '500+ EUR', fee: '4.99 EUR' },
            ].map((card, i) => (
              <FadeInUp key={card.range} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 text-center">
                  <p className="text-[#4B5563] text-[0.875rem] font-medium">
                    {card.range}
                  </p>
                  <p className="text-[2rem] font-bold text-[#10B981] mt-2">
                    {card.fee}
                  </p>
                  <p className="text-[#4B5563] text-[0.875rem] mt-2">
                    Delivery: Instant
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>

          {/* Comparison Table */}
          <FadeInUp delay={0.3}>
            <div className="overflow-x-auto">
              <table className="w-full text-left max-w-[900px] mx-auto">
                <thead>
                  <tr className="border-b border-[#E5E7EB]">
                    {comparisonHeaders.map((h) => (
                      <th
                        key={h}
                        className="py-3 px-4 text-[#10B981] font-semibold text-[0.875rem]"
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
                        ri % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'
                      }
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={
                            'py-3 px-4 text-[0.875rem] border-b border-[#E5E7EB] ' +
                            (ci === 1
                              ? 'text-[#10B981] font-semibold'
                              : 'text-[#111827]')
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
        </div>
      </section>

      {/* ══════ SECTION 3: Coverage Map ══════ */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              Coverage Across Africa &amp; Beyond
            </h2>
          </FadeInUp>

          {/* Stylized Map */}
          <FadeInUp delay={0.2}>
            <div className="max-w-[900px] mx-auto bg-[#F9FAFB] rounded-2xl p-6 lg:p-10 mb-10 overflow-hidden">
              <svg
                viewBox="0 0 800 400"
                className="w-full h-auto"
                aria-label="Map showing transfer corridors"
              >
                {/* Simplified Africa shape */}
                <path
                  d="M320,60 L360,55 L400,60 L440,70 L480,90 L500,120 L510,160 L505,200 L490,240 L460,280 L420,310 L380,330 L340,340 L300,330 L270,310 L250,280 L240,240 L245,200 L260,160 L280,120 L300,90 L320,60 Z"
                  fill="#D1FAE5"
                  stroke="#10B981"
                  strokeWidth="1.5"
                />
                {/* Highlighted receiving countries */}
                <circle cx="320" cy="100" r="8" fill="#10B981" />
                <text x="320" y="85" textAnchor="middle" className="text-[10px] font-semibold fill-[#111827]">Senegal</text>
                <circle cx="350" cy="140" r="8" fill="#10B981" />
                <text x="350" y="165" textAnchor="middle" className="text-[10px] font-semibold fill-[#111827]">Ivory Coast</text>
                <circle cx="400" cy="120" r="8" fill="#10B981" />
                <text x="400" y="105" textAnchor="middle" className="text-[10px] font-semibold fill-[#111827]">Nigeria</text>
                <circle cx="360" cy="180" r="8" fill="#10B981" />
                <text x="360" y="205" textAnchor="middle" className="text-[10px] font-semibold fill-[#111827]">Ghana</text>
                <circle cx="420" cy="200" r="8" fill="#10B981" />
                <text x="420" y="225" textAnchor="middle" className="text-[10px] font-semibold fill-[#111827]">Cameroon</text>
                <circle cx="460" cy="220" r="8" fill="#10B981" />
                <text x="460" y="245" textAnchor="middle" className="text-[10px] font-semibold fill-[#111827]">Kenya</text>
                {/* Sending countries */}
                <circle cx="120" cy="80" r="10" fill="#111827" />
                <text x="120" y="65" textAnchor="middle" className="text-[10px] font-semibold fill-[#111827]">France</text>
                <circle cx="100" cy="50" r="10" fill="#111827" />
                <text x="100" y="35" textAnchor="middle" className="text-[10px] font-semibold fill-[#111827]">UK</text>
                <circle cx="80" cy="100" r="10" fill="#111827" />
                <text x="80" y="125" textAnchor="middle" className="text-[10px] font-semibold fill-[#111827]">USA</text>
                {/* Dashed routes */}
                <line
                  x1="130" y1="85" x2="310" y2="100"
                  stroke="#10B981" strokeWidth="2" strokeDasharray="6,4"
                >
                  <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" />
                </line>
                <line
                  x1="110" y1="55" x2="340" y2="95"
                  stroke="#10B981" strokeWidth="2" strokeDasharray="6,4"
                >
                  <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2.5s" repeatCount="indefinite" />
                </line>
                <line
                  x1="90" y1="95" x2="390" y2="120"
                  stroke="#10B981" strokeWidth="2" strokeDasharray="6,4"
                >
                  <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                </line>
                {/* Legend */}
                <rect x="600" y="320" width="12" height="12" rx="6" fill="#10B981" />
                <text x="620" y="331" className="text-[11px] fill-[#4B5563]">Receiving</text>
                <rect x="600" y="340" width="12" height="12" rx="6" fill="#111827" />
                <text x="620" y="351" className="text-[11px] fill-[#4B5563]">Sending</text>
              </svg>
            </div>
          </FadeInUp>

          {/* Receiving Countries Grid */}
          <FadeInUp delay={0.3}>
            <p className="text-[0.875rem] font-semibold text-[#4B5563] mb-4 text-center">
              Send to
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-[700px] mx-auto mb-8">
              {receivingCountries.map((c) => (
                <div
                  key={c}
                  className="bg-[#F3F4F6] rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[0.5rem] font-bold">
                    {c.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[0.875rem] font-semibold text-[#111827]">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </FadeInUp>

          {/* Sending From */}
          <FadeInUp delay={0.4}>
            <p className="text-[0.875rem] font-semibold text-[#4B5563] mb-4 text-center">
              Send from
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-[700px] mx-auto">
              {sendingCountries.map((c) => (
                <div
                  key={c}
                  className="bg-[#F3F4F6] rounded-xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#111827] flex items-center justify-center text-white text-[0.5rem] font-bold">
                    {c.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[0.875rem] font-semibold text-[#111827]">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ══════ SECTION 4: How to Send (4 Steps) ══════ */}
      <section className="bg-[#F9FAFB] py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              Send Money in 4 Simple Steps
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {transferSteps.map((step, i) => (
              <FadeInUp key={step.title} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="w-12 h-12 rounded-full bg-[#10B981] flex items-center justify-center text-white font-bold text-[1rem] mx-auto">
                    {step.num}
                  </div>
                  <h4 className="text-[1.25rem] font-semibold text-[#111827] mt-4 leading-[1.3]">
                    {step.title}
                  </h4>
                  <p className="text-[#4B5563] text-[0.875rem] mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                  {i < 3 && (
                    <ChevronRight className="hidden lg:block absolute top-4 -right-3 w-6 h-6 text-[#10B981]" />
                  )}
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SECTION 5: Why Choose Us ══════ */}
      <section className="bg-white py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center leading-[1.15] tracking-[-0.01em] mb-12">
              The Smarter Way to Send Money
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustCards.map((card, i) => (
              <FadeInUp key={card.title} delay={i * 0.1}>
                <div className="bg-[#F3F4F6] rounded-2xl p-6 text-center hover:bg-[#E5E7EB] transition-colors duration-200 h-full">
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

      {/* ══════ SECTION 6: CTA ══════ */}
      <section className="bg-[#111827] rounded-3xl mx-4 sm:mx-6 my-12 py-20 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto text-center">
          <FadeInUp>
            <h2 className="text-[2rem] lg:text-[3rem] font-semibold text-white leading-[1.15] tracking-[-0.01em]">
              Send Your First Transfer Today
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.15}>
            <p className="text-[#9CA3AF] text-[1.125rem] max-w-[560px] mx-auto mt-4 leading-relaxed">
              Your first transfer is fee-free. Try us risk-free and see why
              thousands trust Finclusion.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <div className="mt-8 inline-block">
              <span className="block mb-2 px-3 py-1 rounded-lg bg-[#D1FAE5] text-[#059669] text-[0.75rem] font-semibold w-fit mx-auto">
                Get 1st Transfer Free
              </span>
              <button className="px-8 py-4 rounded-2xl bg-[#10B981] text-white font-semibold text-[1rem] hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
                Send Money Now
              </button>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
