import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Platforms from './pages/Platforms';
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import History from './pages/History';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/history" element={<History />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
