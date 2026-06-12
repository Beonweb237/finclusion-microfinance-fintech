import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

const productLinks = [
  { label: 'Loans', path: '/loans' },
  { label: 'Savings', path: '/savings' },
  { label: 'Transfers', path: '/transfers' },
  { label: 'Insurance', path: '/insurance' },
  { label: 'Pricing', path: '/pricing' },
];

const companyLinks = [
  { label: 'About', path: '/about' },
  { label: 'Impact', path: '/impact' },
  { label: 'Careers', path: '/about' },
  { label: 'Press', path: '/press' },
  { label: 'Contact', path: '/contact' },
];

const legalLinks = [
  { label: 'Terms', path: '#' },
  { label: 'Privacy', path: '#' },
  { label: 'Security', path: '/security' },
  { label: 'Cookie Policy', path: '#' },
  { label: 'Licenses', path: '#' },
];

const socialIcons = [
  { Icon: Linkedin, label: 'LinkedIn' },
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Instagram, label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] rounded-t-2xl mx-4 sm:mx-6 mt-12">
      <div className="max-w-[1280px] mx-auto px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2L14 14H2L8 2Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[1.25rem] font-bold text-white">Finclusion</span>
            </div>
            <p className="text-[#9CA3AF] text-[0.875rem] mb-6">
              Financial inclusion for all Africans
            </p>
            <div className="flex items-center gap-4">
              {socialIcons.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-[#9CA3AF] hover:text-white transition-colors duration-200"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-white font-semibold text-[1rem] mb-4">Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[#9CA3AF] text-[0.875rem] hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold text-[1rem] mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[#9CA3AF] text-[0.875rem] hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-semibold text-[1rem] mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-[#9CA3AF] text-[0.875rem] hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#9CA3AF] text-[0.875rem]">
            &copy; 2026 Finclusion. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#9CA3AF] text-[0.875rem]">EN / FR</span>
            <Link to="#" className="text-[#9CA3AF] text-[0.875rem] hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="#" className="text-[#9CA3AF] text-[0.875rem] hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
