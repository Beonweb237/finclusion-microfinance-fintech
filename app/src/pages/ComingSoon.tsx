import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-green-light flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2L14 14H2L8 2Z"
              fill="#10B981"
              stroke="#10B981"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-[2rem] md:text-[3rem] font-bold text-[#111827] mb-4">{title}</h1>
        <p className="text-[#4B5563] text-[1.125rem] max-w-[400px] mx-auto mb-8">
          This page is coming soon. We are working hard to bring you the best experience.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#10B981] text-white text-[1rem] font-semibold hover:bg-[#059669] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
