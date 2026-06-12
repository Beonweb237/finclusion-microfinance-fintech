import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Headphones,
  Handshake,
  Newspaper,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

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

const contactOptions = [
  {
    icon: Headphones,
    title: 'Customer Support',
    description:
      'Have a question about your account, a transaction, or our products? Our support team is available 24/7.',
    channel: 'support@finclusion.africa / In-app chat',
  },
  {
    icon: Handshake,
    title: 'Partnerships',
    description:
      'Interested in partnering with Finclusion? We\'re always open to strategic collaborations.',
    channel: 'partnerships@finclusion.africa',
  },
  {
    icon: Newspaper,
    title: 'Press & Media',
    description:
      'For press inquiries, interview requests, and media assets.',
    channel: 'press@finclusion.africa',
  },
];

const subjectOptions = [
  'General Inquiry',
  'Account Support',
  'Loan Application',
  'Partnership',
  'Press Inquiry',
  'Bug Report',
  'Other',
];

const countryOptions = [
  'Senegal',
  'Ivory Coast',
  'Ghana',
  'Nigeria',
  'Kenya',
  'Uganda',
  'Other',
];

const offices = [
  {
    flag: '🇸🇳',
    city: 'Dakar, Senegal',
    address: 'Immeuble Finclusion, Almadies',
    phone: '+221 33 123 4567',
    hours: 'Mon–Fri: 8:30AM–5:30PM',
  },
  {
    flag: '🇨🇮',
    city: 'Abidjan, Ivory Coast',
    address: 'Plateau, Boulevard de la Republique',
    phone: '+225 20 123 4567',
    hours: 'Mon–Fri: 8:30AM–5:30PM',
  },
  {
    flag: '🇬🇭',
    city: 'Accra, Ghana',
    address: 'East Legon, Lagos Avenue',
    phone: '+233 30 123 4567',
    hours: 'Mon–Fri: 8:30AM–5:30PM',
  },
  {
    flag: '🇳🇬',
    city: 'Lagos, Nigeria',
    address: 'Victoria Island, Akin Adesola Street',
    phone: '+234 1 123 4567',
    hours: 'Mon–Fri: 8:30AM–5:30PM',
  },
  {
    flag: '🇰🇪',
    city: 'Nairobi, Kenya',
    address: 'Westlands, Waiyaki Way',
    phone: '+254 20 123 4567',
    hours: 'Mon–Fri: 8:30AM–5:30PM',
  },
  {
    flag: '🇺🇬',
    city: 'Kampala, Uganda',
    address: 'Kololo, Lumumba Avenue',
    phone: '+256 41 123 4567',
    hours: 'Mon–Fri: 8:30AM–5:30PM',
  },
];

const faqData = [
  {
    question: 'How do I reset my password?',
    answer: "Open the app, tap 'Forgot Password' on the login screen, enter your phone number, and follow the SMS verification steps.",
  },
  {
    question: 'How do I update my personal information?',
    answer: "Go to Profile → Settings → Personal Information. You can update your address, email, and phone number. For ID changes, contact support.",
  },
  {
    question: 'What should I do if a transfer fails?',
    answer: "First, check that your recipient's details are correct. If the issue persists, contact our 24/7 support team via in-app chat or email. Failed transfers are fully refunded within 48 hours.",
  },
  {
    question: 'How do I report fraud or suspicious activity?',
    answer: "Contact us immediately at security@finclusion.africa or call our emergency line. You can also freeze your account from the app under Settings → Security.",
  },
  {
    question: 'Can I change my loan repayment date?',
    answer: "Yes, you can request a repayment date change up to 3 days before your scheduled payment. Go to Loans → Repayment Settings. A small processing fee may apply.",
  },
  {
    question: 'How do I close my account?',
    answer: "Go to Profile → Settings → Close Account. You'll need to settle any outstanding loans first. Your remaining balance will be returned within 48 hours.",
  },
];

/* ------------------------------------------------------------------ */
/*  Custom Select component (native wrapper)                          */
/* ------------------------------------------------------------------ */

function NativeSelect({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[0.875rem] font-semibold text-[#111827]">
        {label}
        {required && <span className="text-[#EF4444] ml-0.5">*</span>}
      </span>
      <div className="relative mt-1.5">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-[#E5E7EB] bg-white px-[18px] py-[14px] text-[1rem] text-[#111827] focus:border-[#10B981] focus:outline-none focus:ring-[3px] focus:ring-[rgba(16,185,129,0.15)] transition-all"
        >
          <option value="" disabled>
            Select...
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
        />
      </div>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                         */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || !subject) return;
    setSubmitted(true);
  };

  return (
    <div className="font-['Outfit',sans-serif]">
      {/* ============================================================ */}
      {/* SECTION 1 — Hero                                             */}
      {/* ============================================================ */}
      <section className="pt-[120px] pb-16 px-6 lg:px-20 bg-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-[640px] mx-auto text-center"
        >
          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-[2.5rem] lg:text-[3.5rem] font-bold text-[#111827] leading-[1.1] tracking-[-0.02em]"
          >
            We&apos;re Here to Help
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[1.125rem] text-[#4B5563] leading-[1.6] mt-4"
          >
            Whether you have a question, need support, or want to explore a partnership, our team is ready to assist you.
          </motion.p>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Contact Options                                  */}
      {/* ============================================================ */}
      <section className="py-16 px-6 lg:px-20 bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactOptions.map((opt, i) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-8 text-center"
            >
              <div className="w-[56px] h-[56px] rounded-full bg-[#D1FAE5] flex items-center justify-center mx-auto">
                <opt.icon size={32} className="text-[#10B981]" />
              </div>
              <h3 className="text-[1.5rem] font-semibold text-[#111827] mt-4">
                {opt.title}
              </h3>
              <p className="text-[0.875rem] text-[#4B5563] leading-[1.5] mt-2">
                {opt.description}
              </p>
              <p className="text-[0.875rem] font-semibold text-[#10B981] mt-4">
                {opt.channel}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — Contact Form                                     */}
      {/* ============================================================ */}
      <section className="py-20 px-6 lg:px-20 bg-white">
        <div className="max-w-[720px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center tracking-[-0.01em] mb-10"
          >
            Send Us a Message
          </motion.h2>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <NativeSelect
                  label="How can we help?"
                  value={subject}
                  onChange={setSubject}
                  options={subjectOptions}
                  required
                />

                {/* Name */}
                <label className="block">
                  <span className="text-[0.875rem] font-semibold text-[#111827]">
                    Full Name<span className="text-[#EF4444] ml-0.5">*</span>
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="mt-1.5 w-full rounded-2xl border border-[#E5E7EB] bg-white px-[18px] py-[14px] text-[1rem] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#10B981] focus:outline-none focus:ring-[3px] focus:ring-[rgba(16,185,129,0.15)] transition-all"
                  />
                </label>

                {/* Email */}
                <label className="block">
                  <span className="text-[0.875rem] font-semibold text-[#111827]">
                    Email Address<span className="text-[#EF4444] ml-0.5">*</span>
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="mt-1.5 w-full rounded-2xl border border-[#E5E7EB] bg-white px-[18px] py-[14px] text-[1rem] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#10B981] focus:outline-none focus:ring-[3px] focus:ring-[rgba(16,185,129,0.15)] transition-all"
                  />
                </label>

                {/* Phone */}
                <label className="block">
                  <span className="text-[0.875rem] font-semibold text-[#111827]">
                    Phone Number (optional)
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+221 77 123 4567"
                    className="mt-1.5 w-full rounded-2xl border border-[#E5E7EB] bg-white px-[18px] py-[14px] text-[1rem] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#10B981] focus:outline-none focus:ring-[3px] focus:ring-[rgba(16,185,129,0.15)] transition-all"
                  />
                </label>

                <NativeSelect
                  label="Country"
                  value={country}
                  onChange={setCountry}
                  options={countryOptions}
                />

                {/* Message */}
                <label className="block">
                  <span className="text-[0.875rem] font-semibold text-[#111827]">
                    Message<span className="text-[#EF4444] ml-0.5">*</span>
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    required
                    className="mt-1.5 w-full rounded-2xl border border-[#E5E7EB] bg-white px-[18px] py-[14px] text-[1rem] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#10B981] focus:outline-none focus:ring-[3px] focus:ring-[rgba(16,185,129,0.15)] transition-all resize-none"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full px-7 py-4 rounded-2xl bg-[#10B981] text-white text-[1rem] font-semibold hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out mt-6"
                >
                  Send Message
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-[#D1FAE5] rounded-2xl p-8 text-center"
              >
                <CheckCircle size={48} className="text-[#10B981] mx-auto" />
                <h3 className="text-[1.5rem] font-semibold text-[#111827] mt-4">
                  Message Sent!
                </h3>
                <p className="text-[1rem] text-[#4B5563] mt-2">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — Office Locations                                 */}
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
            Our Offices
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6"
              >
                <span className="text-[1.5rem]">{office.flag}</span>
                <h4 className="text-[1.25rem] font-semibold text-[#111827] mt-2">
                  {office.city}
                </h4>
                <p className="text-[0.875rem] text-[#4B5563] mt-1">
                  {office.address}
                </p>
                <p className="text-[0.875rem] text-[#10B981] font-medium mt-1">
                  {office.phone}
                </p>
                <p className="text-[0.875rem] text-[#4B5563] mt-1">
                  {office.hours}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — FAQ                                              */}
      {/* ============================================================ */}
      <section className="py-20 px-6 lg:px-20 bg-white">
        <div className="max-w-[800px] mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-[2rem] lg:text-[3rem] font-semibold text-[#111827] text-center tracking-[-0.01em] mb-10"
          >
            Common Support Questions
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-[1rem] font-medium text-[#111827] hover:text-[#10B981]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[0.875rem] text-[#4B5563] leading-[1.6]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
