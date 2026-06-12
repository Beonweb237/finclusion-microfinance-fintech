import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Loans', path: '/loans' },
  { label: 'Savings', path: '/savings' },
  { label: 'Transfers', path: '/transfers' },
  { label: 'Insurance', path: '/insurance' },
  { label: 'Pricing', path: '/pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-out ' +
        (scrolled
          ? 'bg-white/95 backdrop-blur-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-transparent')
      }
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[72px] px-6 lg:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
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
          <span className="text-[1.5rem] font-bold text-[#111827]">Finclusion</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={
                'text-[1rem] font-medium transition-colors duration-150 ease-out ' +
                (isActive(link.path)
                  ? 'text-[#10B981] border-b-2 border-[#10B981] pb-0.5'
                  : 'text-[#111827] hover:text-[#10B981]')
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="px-7 py-4 rounded-2xl border border-[#E5E7EB] text-[#111827] text-[1rem] font-medium hover:border-[#10B981] hover:text-[#10B981] transition-all duration-200 ease-out">
            Log In
          </button>
          <button className="px-7 py-4 rounded-2xl bg-[#10B981] text-white text-[1rem] font-semibold hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out">
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-[#111827]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-[12px] border-t border-[#E5E7EB] px-6 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={
                  'text-[1rem] font-medium py-2 transition-colors duration-150 ' +
                  (isActive(link.path) ? 'text-[#10B981]' : 'text-[#111827]')
                }
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-[#E5E7EB]" />
            <button className="w-full px-7 py-4 rounded-2xl border border-[#E5E7EB] text-[#111827] text-[1rem] font-medium">
              Log In
            </button>
            <button className="w-full px-7 py-4 rounded-2xl bg-[#10B981] text-white text-[1rem] font-semibold">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
