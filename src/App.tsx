
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SmoothScroll from './SmoothScroll';
import Landing from './pages/Landing';
import AdminDashboard from './pages/AdminDashboard';
import CitizenDashboard from './pages/CitizenDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-background flex flex-col font-body">
        <SmoothScroll />
        
        {/* Background Video persists across all routes */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
            type="video/mp4"
          />
        </video>

        {/* Route Configuration */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/citizen" element={<CitizenDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
