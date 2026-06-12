import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Loans from './pages/Loans';
import Savings from './pages/Savings';
import Transfers from './pages/Transfers';
import Insurance from './pages/Insurance';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Impact from './pages/Impact';
import Press from './pages/Press';
import Security from './pages/Security';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/transfers" element={<Transfers />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/press" element={<Press />} />
        <Route path="/security" element={<Security />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}
