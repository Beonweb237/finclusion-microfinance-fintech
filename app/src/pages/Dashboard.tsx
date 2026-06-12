import { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  Receipt,
  Banknote,
  PiggyBank,
  Send,
  Shield,
  Settings,
  Headphones,
  Search,
  Bell,
  LogOut,
  TrendingUp,
  TrendingDown,
  ArrowDownLeft,
  ArrowUpRight,
  Percent,
  Minus,
  CreditCard,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Building2,
  BanknoteIcon,
  X,
  User,
  Lock,
  BellRing,
  Globe,
  SmartphoneIcon,
  Fingerprint,
  Monitor,
  Trash2,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

type TabId = 'overview' | 'transactions' | 'loans' | 'savings' | 'transfers' | 'settings' | 'support';
type SettingsTab = 'profile' | 'security' | 'notifications' | 'language';

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const balanceChartData = [
  { month: 'Sep', balance: 820000 },
  { month: 'Oct', balance: 910000 },
  { month: 'Nov', balance: 980000 },
  { month: 'Dec', balance: 1050000 },
  { month: 'Jan', balance: 1120000 },
  { month: 'Feb', balance: 1180000 },
  { month: 'Mar', balance: 1245000 },
];

const pieData = [
  { name: 'Loans', value: 142500, color: '#10B981' },
  { name: 'Savings', value: 450000, color: '#3B82F6' },
  { name: 'Transfers', value: 653000, color: '#F59E0B' },
];

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: string;
  amount: number;
  direction: 'in' | 'out';
  status: string;
  icon: LucideIcon;
  iconBg: string;
}

const transactions: Transaction[] = [
  { id: '1', date: 'Mar 15, 2025', description: 'Loan Disbursement', type: 'Loan', amount: 250000, direction: 'in', status: 'Completed', icon: ArrowDownLeft, iconBg: '#D1FAE5' },
  { id: '2', date: 'Mar 10, 2025', description: 'Loan Repayment', type: 'Loan', amount: 28500, direction: 'out', status: 'Completed', icon: ArrowUpRight, iconBg: '#FEE2E2' },
  { id: '3', date: 'Mar 8, 2025', description: 'Savings Deposit', type: 'Savings', amount: 10000, direction: 'in', status: 'Completed', icon: PiggyBank, iconBg: '#DBEAFE' },
  { id: '4', date: 'Mar 5, 2025', description: 'Transfer to Ablavi K.', type: 'Transfer', amount: 50000, direction: 'out', status: 'Completed', icon: Send, iconBg: '#FEF3C7' },
  { id: '5', date: 'Mar 1, 2025', description: 'Interest — Premium Plan', type: 'Savings', amount: 1875, direction: 'in', status: 'Completed', icon: Percent, iconBg: '#D1FAE5' },
  { id: '6', date: 'Feb 25, 2025', description: 'Loan Repayment', type: 'Loan', amount: 28500, direction: 'out', status: 'Completed', icon: ArrowUpRight, iconBg: '#FEE2E2' },
  { id: '7', date: 'Feb 22, 2025', description: 'Transfer from Kofi M.', type: 'Transfer', amount: 75000, direction: 'in', status: 'Completed', icon: ArrowDownLeft, iconBg: '#DBEAFE' },
  { id: '8', date: 'Feb 18, 2025', description: 'Savings Withdrawal', type: 'Savings', amount: 20000, direction: 'out', status: 'Completed', icon: Minus, iconBg: '#FEE2E2' },
  { id: '9', date: 'Feb 15, 2025', description: 'Insurance Premium', type: 'Insurance', amount: 15000, direction: 'out', status: 'Completed', icon: Shield, iconBg: '#F3E8FF' },
  { id: '10', date: 'Feb 10, 2025', description: 'Savings Deposit', type: 'Savings', amount: 50000, direction: 'in', status: 'Completed', icon: PiggyBank, iconBg: '#DBEAFE' },
];

const paymentSchedule = [
  { id: 1, dueDate: 'Jan 25, 2025', amount: 28500, status: 'Paid' },
  { id: 2, dueDate: 'Feb 25, 2025', amount: 28500, status: 'Paid' },
  { id: 3, dueDate: 'Mar 25, 2025', amount: 28500, status: 'Upcoming' },
  { id: 4, dueDate: 'Apr 25, 2025', amount: 28500, status: 'Pending' },
  { id: 5, dueDate: 'May 25, 2025', amount: 28500, status: 'Pending' },
  { id: 6, dueDate: 'Jun 25, 2025', amount: 28500, status: 'Pending' },
];

const savingsGoals = [
  { id: 1, name: 'Emergency Fund', target: 500000, current: 300000 },
  { id: 2, name: 'New Business Equipment', target: 200000, current: 150000 },
  { id: 3, name: 'Children Education', target: 300000, current: 120000 },
];

const recentRecipients = [
  { id: 1, name: 'Ablavi K.', phone: '+228 90 12 34 56', lastAmount: 50000, avatar: 'AK' },
  { id: 2, name: 'Kofi M.', phone: '+233 20 98 76 54', lastAmount: 75000, avatar: 'KM' },
  { id: 3, name: 'Amadou D.', phone: '+221 77 55 33 11', lastAmount: 120000, avatar: 'AD' },
  { id: 4, name: 'Fatima N.', phone: '+223 66 44 22 88', lastAmount: 35000, avatar: 'FN' },
];

const faqItems = [
  { q: 'How do I apply for a loan?', a: 'Go to the Loans tab and click "Apply Now". You will need to provide your ID, proof of income, and a valid phone number. Approval typically takes 24-48 hours.' },
  { q: 'How long do transfers take?', a: 'Mobile Money transfers are instant. Bank transfers take 1-2 business days. Cash pickup is available within 30 minutes.' },
  { q: 'What are the savings interest rates?', a: 'Basic plan: 3% per annum. Premium plan: 5% per annum. VIP plan: 7% per annum. Interest is credited monthly.' },
  { q: 'How do I reset my password?', a: 'Go to Settings > Security and click "Change Password". You will receive an OTP via SMS to verify your identity.' },
  { q: 'Is my money insured?', a: 'Yes, all deposits are insured up to 5,000,000 FCFA through our partnership with NSIA Insurance.' },
  { q: 'How do I contact support?', a: 'Use the Support tab to chat with us live, email support@finclusion.com, or call +221 33 123 4567. Average response time is 15 minutes.' },
];

const supportTickets = [
  { id: 'TKT-2841', subject: 'Loan repayment question', date: 'Mar 12, 2025', status: 'Resolved' },
  { id: 'TKT-2893', subject: 'Transfer not received', date: 'Mar 8, 2025', status: 'Resolved' },
  { id: 'TKT-2941', subject: 'Update my phone number', date: 'Mar 1, 2025', status: 'Open' },
];

const activeDevices = [
  { id: 1, name: 'iPhone 15 Pro', location: 'Lome, Togo', lastActive: 'Now', current: true },
  { id: 2, name: 'MacBook Air', location: 'Lome, Togo', lastActive: '2 hours ago', current: false },
  { id: 3, name: 'Samsung Galaxy S24', location: 'Accra, Ghana', lastActive: '3 days ago', current: false },
];

/* ------------------------------------------------------------------ */
/*  SIDEBAR CONFIG                                                     */
/* ------------------------------------------------------------------ */

const navItems: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: Receipt },
  { id: 'loans', label: 'Loans', icon: Banknote },
  { id: 'savings', label: 'Savings', icon: PiggyBank },
  { id: 'transfers', label: 'Transfers', icon: Send },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'support', label: 'Support', icon: Headphones },
];

/* ------------------------------------------------------------------ */
/*  HELPER COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function SidebarItem({
  item,
  active,
  onClick,
}: {
  item: (typeof navItems)[number];
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      className={
        'w-full flex items-center gap-3 h-[44px] px-4 rounded-xl transition-colors duration-150 ' +
        (active
          ? 'bg-[#10B981] text-white'
          : 'text-[#F1F5F9] hover:bg-white/5')
      }
    >
      <Icon size={20} />
      <span className="text-[0.875rem] font-medium">{item.label}</span>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Completed: 'bg-[#D1FAE5] text-[#059669]',
    Paid: 'bg-[#D1FAE5] text-[#059669]',
    Upcoming: 'bg-[#DBEAFE] text-[#2563EB]',
    Pending: 'bg-[#F3F4F6] text-[#6B7280]',
    Open: 'bg-[#D1FAE5] text-[#059669]',
    Resolved: 'bg-[#F3F4F6] text-[#6B7280]',
  };
  return (
    <span
      className={
        'inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium ' +
        (map[status] || 'bg-[#F3F4F6] text-[#6B7280]')
      }
    >
      {status}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 flex-1 min-w-[180px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-xl bg-[#D1FAE5] flex items-center justify-center">
          <Icon size={18} className="text-[#10B981]" />
        </div>
      </div>
      <p className="text-[1.25rem] font-semibold text-[#111827]">{value}</p>
      <p className="text-xs text-[#6B7280] mt-1">{label}</p>
      {trend && (
        <div className={'flex items-center gap-1 mt-2 text-xs font-medium ' + (trendUp ? 'text-[#10B981]' : 'text-[#EF4444]')}>
          {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  OVERVIEW VIEW                                                      */
/* ------------------------------------------------------------------ */

function OverviewView() {
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const targetBalance = 1245000;

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * targetBalance);
      setAnimatedBalance(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
      {/* Left column */}
      <div className="space-y-6">
        {/* Balance Card */}
        <div className="bg-[#111827] rounded-[20px] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#10B981] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <p className="text-[0.875rem] font-medium text-[#9CA3AF] mb-1">Total Balance</p>
          <p className="text-[2.5rem] font-bold text-white">
            {animatedBalance.toLocaleString()} <span className="text-[1.25rem] font-medium">FCFA</span>
          </p>
          <div className="flex items-center gap-1.5 mt-2 mb-6">
            <TrendingUp size={16} className="text-[#10B981]" />
            <span className="text-[0.875rem] font-medium text-[#10B981]">+12% this month</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors">
              Add Money
            </button>
            <button className="px-5 py-2.5 rounded-xl border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Banknote} label="Active Loans" value="1" trend="On track" trendUp />
          <StatCard icon={PiggyBank} label="Total Savings" value="450,000 FCFA" trend="+5.2%" trendUp />
          <StatCard icon={CreditCard} label="Credit Score" value="720" trend="+15 pts" trendUp />
          <StatCard icon={Clock} label="Next Payment" value="Mar 25" trend="8 days left" trendUp />
        </div>

        {/* Chart Area */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-[1.125rem] font-semibold text-[#111827] mb-4">Balance History</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={balanceChartData}>
              <defs>
                <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                formatter={(value: number) => [`${value.toLocaleString()} FCFA`, 'Balance']}
              />
              <Area type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={2} fill="url(#balGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[1.125rem] font-semibold text-[#111827]">Recent Activity</h3>
            <button className="text-sm font-medium text-[#10B981] hover:text-[#059669] transition-colors">
              View All &rarr;
            </button>
          </div>
          <div className="space-y-0">
            {transactions.slice(0, 5).map((tx) => {
              const Icon = tx.icon;
              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-4 py-4 border-b border-[#F3F4F6] last:border-b-0"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: tx.iconBg }}
                  >
                    <Icon size={18} className={tx.direction === 'in' ? 'text-[#059669]' : 'text-[#EF4444]'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate">{tx.description}</p>
                    <p className="text-xs text-[#9CA3AF]">{tx.date}</p>
                  </div>
                  <p
                    className={
                      'text-sm font-semibold shrink-0 ' +
                      (tx.direction === 'in' ? 'text-[#059669]' : 'text-[#EF4444]')
                    }
                  >
                    {tx.direction === 'in' ? '+' : '-'}
                    {tx.amount.toLocaleString()} FCFA
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="space-y-6">
        {/* Account Health */}
        <div className="bg-white rounded-2xl p-6 flex flex-col items-center">
          <h4 className="text-sm font-semibold text-[#111827] mb-4">Account Health</h4>
          <div className="relative w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ value: 72 }, { value: 28 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={50}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#E5E7EB" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-[#111827]">720</span>
              <span className="text-[0.625rem] text-[#9CA3AF]">/ 1000</span>
            </div>
          </div>
          <p className="text-sm font-medium text-[#10B981] mt-2">Excellent</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-[#111827] mb-4">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Banknote, label: 'Apply Loan' },
              { icon: PiggyBank, label: 'Save Money' },
              { icon: Send, label: 'Send Money' },
              { icon: Shield, label: 'Insurance' },
            ].map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#F9FAFB] hover:bg-[#F3F4F6] transition-colors"
              >
                <action.icon size={20} className="text-[#10B981]" />
                <span className="text-xs font-medium text-[#111827]">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming Payment */}
        <div className="bg-white rounded-2xl p-6 border-l-[3px] border-[#10B981]">
          <h4 className="text-sm font-semibold text-[#111827] mb-2">Upcoming Payment</h4>
          <p className="text-xs text-[#6B7280] mb-1">Mar 25, 2025</p>
          <p className="text-xl font-bold text-[#111827] mb-1">28,500 FCFA</p>
          <p className="text-xs text-[#9CA3AF]">Loan #FL-2847</p>
          <button className="w-full mt-4 px-4 py-2.5 rounded-xl bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors">
            Pay Now
          </button>
        </div>

        {/* Spending Breakdown */}
        <div className="bg-white rounded-2xl p-6">
          <h4 className="text-sm font-semibold text-[#111827] mb-4">Spending Breakdown</h4>
          <div className="w-28 h-28 mx-auto mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={50} dataKey="value" strokeWidth={0}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-[#6B7280]">{item.name}</span>
                </div>
                <span className="text-xs font-medium text-[#111827]">{item.value.toLocaleString()} FCFA</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TRANSACTIONS VIEW                                                  */
/* ------------------------------------------------------------------ */

function TransactionsView() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch = tx.description.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'All' || tx.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [search, typeFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search size={16} className="text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none w-full"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          className="bg-[#F9FAFB] rounded-xl px-3 py-2 text-sm text-[#111827] outline-none border-none cursor-pointer"
        >
          {['All', 'Loan', 'Savings', 'Transfer', 'Insurance'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F3F4F6]">
                <th className="text-left text-xs font-semibold text-[#6B7280] px-6 py-4">Date</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-6 py-4">Description</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-6 py-4">Type</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-6 py-4">Amount</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((tx) => {
                const Icon = tx.icon;
                return (
                  <tr key={tx.id} className="border-b border-[#F3F4F6] last:border-b-0 hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4 text-sm text-[#6B7280] whitespace-nowrap">{tx.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: tx.iconBg }}>
                          <Icon size={14} className={tx.direction === 'in' ? 'text-[#059669]' : 'text-[#EF4444]'} />
                        </div>
                        <span className="text-sm font-medium text-[#111827]">{tx.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className={'px-6 py-4 text-sm font-semibold whitespace-nowrap ' + (tx.direction === 'in' ? 'text-[#059669]' : 'text-[#EF4444]')}>
                      {tx.direction === 'in' ? '+' : '-'}{tx.amount.toLocaleString()} FCFA
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {paginated.length === 0 && (
          <div className="py-12 text-center text-sm text-[#9CA3AF]">No transactions found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 rounded-xl border border-[#E5E7EB] text-sm text-[#111827] hover:border-[#10B981] hover:text-[#10B981] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={
                'w-9 h-9 rounded-xl text-sm font-medium transition-colors ' +
                (p === page
                  ? 'bg-[#10B981] text-white'
                  : 'border border-[#E5E7EB] text-[#111827] hover:border-[#10B981]')
              }
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-2 rounded-xl border border-[#E5E7EB] text-sm text-[#111827] hover:border-[#10B981] hover:text-[#10B981] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  LOANS VIEW                                                         */
/* ------------------------------------------------------------------ */

function LoansView() {
  return (
    <div className="space-y-6">
      {/* Active Loan Card */}
      <div className="bg-white rounded-2xl p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-[#9CA3AF] mb-1">Loan #FL-2847</p>
            <h3 className="text-[1.5rem] font-bold text-[#111827]">250,000 FCFA</h3>
          </div>
          <div className="px-3 py-1 rounded-lg bg-[#D1FAE5] text-[#059669] text-xs font-semibold">Active</div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#111827]">57% repaid</span>
            <span className="text-sm text-[#6B7280]">142,500 / 250,000 FCFA</span>
          </div>
          <Progress value={57} className="h-2 bg-[#E5E7EB]" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-xs text-[#9CA3AF] mb-1">Started</p>
            <p className="text-sm font-semibold text-[#111827]">Jan 15, 2025</p>
          </div>
          <div>
            <p className="text-xs text-[#9CA3AF] mb-1">Term</p>
            <p className="text-sm font-semibold text-[#111827]">12 months</p>
          </div>
          <div>
            <p className="text-xs text-[#9CA3AF] mb-1">Rate</p>
            <p className="text-sm font-semibold text-[#111827]">3.5%/month</p>
          </div>
          <div>
            <p className="text-xs text-[#9CA3AF] mb-1">Next Payment</p>
            <p className="text-sm font-semibold text-[#111827]">Mar 25, 2025</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-6 py-3 rounded-xl bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors">
            Make Payment
          </button>
          <button className="px-6 py-3 rounded-xl border border-[#E5E7EB] text-[#111827] text-sm font-semibold hover:border-[#10B981] hover:text-[#10B981] transition-colors">
            Repay Early
          </button>
        </div>
      </div>

      {/* Payment Schedule */}
      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-[1.125rem] font-semibold text-[#111827] mb-4">Payment Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F3F4F6]">
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3">#</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3">Due Date</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3">Amount</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentSchedule.map((pmt) => (
                <tr key={pmt.id} className="border-b border-[#F3F4F6] last:border-b-0">
                  <td className="px-4 py-3 text-sm text-[#111827]">{pmt.id}</td>
                  <td className="px-4 py-3 text-sm text-[#111827]">{pmt.dueDate}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#111827]">{pmt.amount.toLocaleString()} FCFA</td>
                  <td className="px-4 py-3">
                    {pmt.status === 'Paid' && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#059669]">
                        <CheckCircle2 size={14} /> Paid
                      </span>
                    )}
                    {pmt.status === 'Upcoming' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-[#DBEAFE] text-[#2563EB] text-xs font-medium">
                        Upcoming
                      </span>
                    )}
                    {pmt.status === 'Pending' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-[#F3F4F6] text-[#6B7280] text-xs font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply CTA */}
      <div className="bg-[#D1FAE5] rounded-2xl p-6">
        <h4 className="text-[1.25rem] font-semibold text-[#111827] mb-1">Need another loan?</h4>
        <p className="text-sm text-[#4B5563] mb-4">You&apos;re eligible for up to <strong>350,000 FCFA</strong></p>
        <button className="px-6 py-3 rounded-xl bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SAVINGS VIEW                                                       */
/* ------------------------------------------------------------------ */

function SavingsView() {
  const [depositAmount, setDepositAmount] = useState('');
  const presets = ['5,000', '10,000', '25,000', '50,000'];

  return (
    <div className="space-y-6">
      {/* Savings Summary */}
      <div className="bg-white rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <p className="text-xs text-[#9CA3AF] mb-1">Total Saved</p>
            <p className="text-[2rem] font-bold text-[#10B981]">450,000 FCFA</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs text-[#9CA3AF] mb-1">Interest Earned</p>
            <p className="text-[1.5rem] font-semibold text-[#059669]">+12,450 FCFA</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-xs text-[#9CA3AF] mb-1">Plan Type</p>
            <p className="text-[1.25rem] font-semibold text-[#111827]">Premium (5% p.a.)</p>
          </div>
        </div>
      </div>

      {/* Goal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {savingsGoals.map((goal) => {
          const pct = Math.round((goal.current / goal.target) * 100);
          return (
            <div key={goal.id} className="bg-white rounded-2xl p-6">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-sm font-semibold text-[#111827]">{goal.name}</h4>
                <span className="text-xs font-semibold text-[#10B981]">{pct}%</span>
              </div>
              <Progress value={pct} className="h-2 bg-[#E5E7EB] mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">{goal.current.toLocaleString()} FCFA</span>
                <span className="text-xs text-[#9CA3AF]">{goal.target.toLocaleString()} FCFA</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Deposit */}
      <div className="bg-white rounded-2xl p-6">
        <h4 className="text-[1.125rem] font-semibold text-[#111827] mb-4">Quick Deposit</h4>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-xl px-4 py-3 flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Enter amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none w-full"
            />
            <span className="text-xs text-[#9CA3AF]">FCFA</span>
          </div>
          <button className="px-6 py-3 rounded-xl bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors">
            Deposit
          </button>
          <button className="px-6 py-3 rounded-xl border border-[#E5E7EB] text-[#111827] text-sm font-semibold hover:border-[#10B981] hover:text-[#10B981] transition-colors">
            Withdraw
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setDepositAmount(p.replace(',', ''))}
              className="px-4 py-2 rounded-full bg-[#F9FAFB] text-sm text-[#111827] hover:bg-[#D1FAE5] hover:text-[#059669] transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Interest Chart */}
      <div className="bg-white rounded-2xl p-6">
        <h4 className="text-[1.125rem] font-semibold text-[#111827] mb-4">Interest Growth</h4>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={[
              { month: 'Sep', interest: 2100 },
              { month: 'Oct', interest: 3800 },
              { month: 'Nov', interest: 5600 },
              { month: 'Dec', interest: 7500 },
              { month: 'Jan', interest: 9500 },
              { month: 'Feb', interest: 11200 },
              { month: 'Mar', interest: 12450 },
            ]}
          >
            <defs>
              <linearGradient id="intGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB' }}
              formatter={(value: number) => [`${value.toLocaleString()} FCFA`, 'Interest']}
            />
            <Area type="monotone" dataKey="interest" stroke="#3B82F6" strokeWidth={2} fill="url(#intGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TRANSFERS VIEW                                                     */
/* ------------------------------------------------------------------ */

function TransfersView({ onSendComplete }: { onSendComplete: () => void }) {
  const [country, setCountry] = useState('+228');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'mobile' | 'bank' | 'cash'>('mobile');

  const numericAmount = parseInt(amount.replace(/\D/g, '')) || 0;
  const fee = numericAmount > 0 ? 299 : 0;
  const theyReceive = numericAmount - fee;

  const handleSend = () => {
    if (!phone || !numericAmount) return;
    onSendComplete();
    setPhone('');
    setAmount('');
  };

  return (
    <div className="space-y-6">
      {/* New Transfer Card */}
      <div className="bg-white rounded-2xl p-8 max-w-2xl">
        <h3 className="text-[1.25rem] font-semibold text-[#111827] mb-6">Send Money</h3>

        {/* Recipient */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-[#111827] mb-2">Recipient Phone</label>
          <div className="flex items-center gap-2">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="bg-[#F9FAFB] rounded-xl px-3 py-3.5 text-sm text-[#111827] outline-none"
            >
              <option value="+228">Togo (+228)</option>
              <option value="+233">Ghana (+233)</option>
              <option value="+221">Senegal (+221)</option>
              <option value="+223">Mali (+223)</option>
              <option value="+225">Côte d&apos;Ivoire (+225)</option>
            </select>
            <div className="flex-1 bg-[#F9FAFB] rounded-xl px-4 py-3.5">
              <input
                type="tel"
                placeholder="90 12 34 56"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-[#111827] mb-2">Amount</label>
          <div className="flex items-center gap-2 bg-[#F9FAFB] rounded-xl px-4 py-3.5">
            <input
              type="text"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none w-full"
            />
            <span className="text-xs text-[#9CA3AF] font-medium">FCFA</span>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-[#111827] mb-2">Delivery Method</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: 'mobile' as const, icon: Smartphone, label: 'Mobile Money' },
              { key: 'bank' as const, icon: Building2, label: 'Bank Account' },
              { key: 'cash' as const, icon: BanknoteIcon, label: 'Cash Pickup' },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMethod(m.key)}
                className={
                  'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ' +
                  (method === m.key
                    ? 'border-[#10B981] bg-[#D1FAE5]'
                    : 'border-[#E5E7EB] bg-white hover:border-[#10B981]/50')
                }
              >
                <m.icon size={22} className={method === m.key ? 'text-[#10B981]' : 'text-[#9CA3AF]'} />
                <span className={method === m.key ? 'text-xs font-medium text-[#059669]' : 'text-xs text-[#6B7280]'}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fee Preview */}
        {numericAmount > 0 && (
          <div className="bg-[#F9FAFB] rounded-xl p-4 mb-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">Fee</span>
              <span className="text-sm font-medium text-[#111827]">{fee.toLocaleString()} FCFA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6B7280]">They receive</span>
              <span className="text-lg font-bold text-[#10B981]">{theyReceive.toLocaleString()} FCFA</span>
            </div>
          </div>
        )}

        <button
          onClick={handleSend}
          className="w-full px-6 py-3.5 rounded-xl bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] active:scale-[0.98] transition-all"
        >
          Send Transfer
        </button>
      </div>

      {/* Recent Recipients */}
      <div className="bg-white rounded-2xl p-6">
        <h4 className="text-[1.125rem] font-semibold text-[#111827] mb-4">Recent Recipients</h4>
        <div className="space-y-0">
          {recentRecipients.map((recipient) => (
            <div
              key={recipient.id}
              className="flex items-center gap-4 py-4 border-b border-[#F3F4F6] last:border-b-0"
            >
              <div className="w-10 h-10 rounded-full bg-[#D1FAE5] flex items-center justify-center text-sm font-bold text-[#059669]">
                {recipient.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#111827]">{recipient.name}</p>
                <p className="text-xs text-[#9CA3AF]">{recipient.phone}</p>
              </div>
              <div className="text-right mr-4">
                <p className="text-sm font-medium text-[#111827]">{recipient.lastAmount.toLocaleString()} FCFA</p>
              </div>
              <button className="px-4 py-2 rounded-xl text-xs font-medium text-[#10B981] hover:bg-[#D1FAE5] transition-colors">
                Send Again
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SETTINGS VIEW                                                      */
/* ------------------------------------------------------------------ */

function SettingsView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [twoFA, setTwoFA] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const settingsTabs: { id: SettingsTab; label: string; icon: LucideIcon }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: BellRing },
    { id: 'language', label: 'Language', icon: Globe },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
      {/* Sub-nav */}
      <div className="bg-white rounded-2xl p-3 h-fit">
        {settingsTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                'w-full flex items-center gap-3 h-[44px] px-4 rounded-xl transition-colors duration-150 ' +
                (activeTab === tab.id
                  ? 'bg-[#10B981] text-white'
                  : 'text-[#6B7280] hover:bg-[#F9FAFB]')
              }
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-8 space-y-6">
            <h3 className="text-[1.25rem] font-semibold text-[#111827]">Profile Information</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#10B981] flex items-center justify-center text-xl font-bold text-white">
                AK
              </div>
              <div>
                <p className="text-sm font-medium text-[#111827]">Ami Koffi</p>
                <p className="text-xs text-[#9CA3AF]">ami.koffi@email.com</p>
              </div>
              <button className="ml-auto px-4 py-2 rounded-xl text-xs font-medium text-[#10B981] hover:bg-[#D1FAE5] transition-colors">
                Change Photo
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#111827] mb-2">Full Name</label>
                <input type="text" defaultValue="Ami Koffi" className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] outline-none focus:ring-2 focus:ring-[#10B981]/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#111827] mb-2">Email</label>
                <input type="email" defaultValue="ami.koffi@email.com" className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] outline-none focus:ring-2 focus:ring-[#10B981]/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#111827] mb-2">Phone</label>
                <input type="tel" defaultValue="+228 90 12 34 56" className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] outline-none focus:ring-2 focus:ring-[#10B981]/20" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#111827] mb-2">Address</label>
                <input type="text" defaultValue="Lome, Togo" className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] outline-none focus:ring-2 focus:ring-[#10B981]/20" />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <CheckCircle2 size={16} className="text-[#10B981]" />
              <span className="text-sm text-[#059669]">ID Verified</span>
            </div>
            <button className="px-6 py-3 rounded-xl bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors">
              Save Changes
            </button>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Change Password */}
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-[1.25rem] font-semibold text-[#111827] mb-4">Change Password</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-2">Current Password</label>
                  <input type="password" placeholder="Enter current password" className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#10B981]/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-2">New Password</label>
                  <input type="password" placeholder="Enter new password" className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#10B981]/20" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111827] mb-2">Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#10B981]/20" />
                </div>
                <button className="px-6 py-3 rounded-xl bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors">
                  Update Password
                </button>
              </div>
            </div>

            {/* Security Toggles */}
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-[1.25rem] font-semibold text-[#111827] mb-4">Authentication</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-[#F3F4F6]">
                  <div className="flex items-center gap-3">
                    <SmartphoneIcon size={18} className="text-[#6B7280]" />
                    <div>
                      <p className="text-sm font-medium text-[#111827]">Two-Factor Authentication</p>
                      <p className="text-xs text-[#9CA3AF]">Secure your account with SMS OTP</p>
                    </div>
                  </div>
                  <Switch checked={twoFA} onCheckedChange={setTwoFA} />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <Fingerprint size={18} className="text-[#6B7280]" />
                    <div>
                      <p className="text-sm font-medium text-[#111827]">Biometric Authentication</p>
                      <p className="text-xs text-[#9CA3AF]">Use fingerprint or face ID</p>
                    </div>
                  </div>
                  <Switch checked={biometric} onCheckedChange={setBiometric} />
                </div>
              </div>
            </div>

            {/* Active Devices */}
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-[1.25rem] font-semibold text-[#111827] mb-4">Active Devices</h3>
              <div className="space-y-3">
                {activeDevices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-b-0">
                    <div className="flex items-center gap-3">
                      <Monitor size={18} className="text-[#6B7280]" />
                      <div>
                        <p className="text-sm font-medium text-[#111827]">
                          {device.name}
                          {device.current && <span className="ml-2 text-xs text-[#10B981] font-medium">(Current)</span>}
                        </p>
                        <p className="text-xs text-[#9CA3AF]">{device.location} &middot; {device.lastActive}</p>
                      </div>
                    </div>
                    {!device.current && (
                      <button className="p-2 rounded-lg hover:bg-[#FEE2E2] text-[#EF4444] transition-colors">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-[1.25rem] font-semibold text-[#111827] mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { label: 'Push Notifications', desc: 'Receive push notifications on your device', checked: pushNotif, setter: setPushNotif },
                { label: 'Email Alerts', desc: 'Get important updates via email', checked: emailNotif, setter: setEmailNotif },
                { label: 'SMS Alerts', desc: 'Receive SMS for transactions and security', checked: smsNotif, setter: setSmsNotif },
                { label: 'Marketing Emails', desc: 'Promotional offers and product updates', checked: marketing, setter: setMarketing },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-[#111827]">{item.label}</p>
                    <p className="text-xs text-[#9CA3AF]">{item.desc}</p>
                  </div>
                  <Switch checked={item.checked} onCheckedChange={item.setter} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'language' && (
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-[1.25rem] font-semibold text-[#111827] mb-4">Language & Region</h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-medium text-[#111827] mb-2">Language</label>
                <select className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] outline-none">
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#111827] mb-2">Region</label>
                <select className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] outline-none">
                  <option value="tg">Togo</option>
                  <option value="gh">Ghana</option>
                  <option value="sn">Senegal</option>
                  <option value="ci">Côte d&apos;Ivoire</option>
                  <option value="ml">Mali</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#111827] mb-2">Currency</label>
                <select className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] outline-none" defaultValue="xof">
                  <option value="xof">FCFA (XOF)</option>
                  <option value="ghs">Ghana Cedi (GHS)</option>
                </select>
              </div>
              <button className="mt-4 px-6 py-3 rounded-xl bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors">
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SUPPORT VIEW                                                       */
/* ------------------------------------------------------------------ */

function SupportView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredFaq = faqItems.filter((f) =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = () => {
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;
    setShowSuccess(true);
    setTicketSubject('');
    setTicketMessage('');
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Search FAQ */}
      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-[1.25rem] font-semibold text-[#111827] mb-4">How can we help?</h3>
        <div className="flex items-center gap-3 bg-[#F9FAFB] rounded-xl px-4 py-3.5 mb-4">
          <Search size={18} className="text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['Loans', 'Transfers', 'Savings', 'Account', 'Security'].map((topic) => (
            <button
              key={topic}
              onClick={() => setSearchQuery(topic)}
              className="px-3 py-1.5 rounded-full bg-[#F9FAFB] text-xs text-[#6B7280] hover:bg-[#D1FAE5] hover:text-[#059669] transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-[1.125rem] font-semibold text-[#111827] mb-4">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {filteredFaq.map((item, i) => (
            <div key={i} className="border border-[#E5E7EB] rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#F9FAFB] transition-colors"
              >
                <span className="text-sm font-medium text-[#111827]">{item.q}</span>
                <ChevronDown
                  size={16}
                  className={
                    'text-[#9CA3AF] transition-transform duration-200 ' + (openFaq === i ? 'rotate-180' : '')
                  }
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-[#6B7280] leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
          {filteredFaq.length === 0 && (
            <p className="text-sm text-[#9CA3AF] text-center py-8">No results found. Try a different search.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Options */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-[1.125rem] font-semibold text-[#111827] mb-4">Contact Us</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors">
              <MessageCircle size={18} />
              Chat with us
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-[#E5E7EB] text-[#111827] text-sm font-semibold hover:border-[#10B981] hover:text-[#10B981] transition-colors">
              <Mail size={18} />
              Email support
            </button>
            <div className="flex items-center justify-center gap-2 py-3 text-sm text-[#6B7280]">
              <Phone size={16} />
              <span>+221 33 123 4567</span>
            </div>
          </div>
          <p className="text-xs text-[#9CA3AF] text-center mt-3">Average response: 15 minutes</p>
        </div>

        {/* Support Ticket Form */}
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-[1.125rem] font-semibold text-[#111827] mb-4">Submit a Ticket</h3>
          {showSuccess ? (
            <div className="py-8 text-center">
              <CheckCircle2 size={40} className="text-[#10B981] mx-auto mb-3" />
              <p className="text-sm font-medium text-[#111827]">Ticket submitted successfully!</p>
              <p className="text-xs text-[#9CA3AF] mt-1">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#111827] mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="What is your issue about?"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#10B981]/20"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#111827] mb-2">Message</label>
                <textarea
                  placeholder="Describe your issue in detail..."
                  rows={4}
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full bg-[#F9FAFB] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#10B981]/20 resize-none"
                />
              </div>
              <button
                onClick={handleSubmitTicket}
                className="w-full px-4 py-3 rounded-xl bg-[#10B981] text-white text-sm font-semibold hover:bg-[#059669] transition-colors"
              >
                Submit Ticket
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-[1.125rem] font-semibold text-[#111827] mb-4">Your Tickets</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#F3F4F6]">
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3">ID</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3">Subject</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-[#6B7280] px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {supportTickets.map((tkt) => (
                <tr key={tkt.id} className="border-b border-[#F3F4F6] last:border-b-0">
                  <td className="px-4 py-3 text-sm text-[#9CA3AF]">{tkt.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#111827]">{tkt.subject}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280]">{tkt.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={tkt.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN DASHBOARD COMPONENT                                           */
/* ------------------------------------------------------------------ */

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabTitles: Record<TabId, string> = {
    overview: 'Overview',
    transactions: 'Transactions',
    loans: 'Loans',
    savings: 'Savings',
    transfers: 'Transfers',
    settings: 'Settings',
    support: 'Support',
  };

  const renderView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView />;
      case 'transactions':
        return <TransactionsView />;
      case 'loans':
        return <LoansView />;
      case 'savings':
        return <SavingsView />;
      case 'transfers':
        return <TransfersView onSendComplete={() => setActiveTab('overview')} />;
      case 'settings':
        return <SettingsView />;
      case 'support':
        return <SupportView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex h-[calc(100dvh-72px)] bg-[#F9FAFB]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] bg-[#0F172A] h-full shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 14H2L8 2Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[1.25rem] font-bold text-[#F1F5F9]">Finclusion</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </nav>

        {/* User Card */}
        <div className="px-4 pb-6">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
            <div className="w-9 h-9 rounded-full bg-[#10B981] flex items-center justify-center text-sm font-bold text-white shrink-0">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.875rem] font-semibold text-[#F1F5F9] truncate">Ami Koffi</p>
              <p className="text-[0.75rem] text-[#94A3B8]">Premium Member</p>
            </div>
            <button className="text-[#94A3B8] hover:text-white transition-colors shrink-0">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between h-16 bg-white border-b border-[#E5E7EB] px-6 lg:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 text-[#111827]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <LayoutDashboard size={22} />}
            </button>
            <h2 className="text-[1.25rem] font-semibold text-[#111827]">{tabTitles[activeTab]}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-[#9CA3AF] hover:text-[#111827] transition-colors">
              <Search size={20} />
            </button>
            <button className="relative p-2 text-[#9CA3AF] hover:text-[#111827] transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#10B981] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#10B981] flex items-center justify-center text-sm font-bold text-white cursor-pointer">
              AK
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-[1200px] mx-auto">
            {renderView()}
          </div>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[260px] bg-[#0F172A] flex flex-col">
            <div className="flex items-center gap-3 px-6 pt-6 pb-4">
              <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L14 14H2L8 2Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[1.25rem] font-bold text-[#F1F5F9]">Finclusion</span>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <SidebarItem
                  key={item.id}
                  item={item}
                  active={activeTab === item.id}
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                />
              ))}
            </nav>
            <div className="px-4 pb-6">
              <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                <div className="w-9 h-9 rounded-full bg-[#10B981] flex items-center justify-center text-sm font-bold text-white">
                  AK
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.875rem] font-semibold text-[#F1F5F9] truncate">Ami Koffi</p>
                  <p className="text-[0.75rem] text-[#94A3B8]">Premium Member</p>
                </div>
                <button className="text-[#94A3B8] hover:text-white transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#E5E7EB] flex items-center justify-around md:hidden z-[150]">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={
                'flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ' +
                (activeTab === item.id ? 'text-[#10B981]' : 'text-[#9CA3AF]')
              }
            >
              <Icon size={20} />
              <span className="text-[0.625rem] font-medium">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-[#9CA3AF]"
        >
          <HelpCircle size={20} />
          <span className="text-[0.625rem] font-medium">More</span>
        </button>
      </nav>

      {/* Mobile bottom nav spacer */}
      <div className="h-16 md:hidden shrink-0" />
    </div>
  );
}
