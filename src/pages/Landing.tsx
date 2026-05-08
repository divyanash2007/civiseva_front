import React from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPin, Layers, FileText, Activity, Mail, Building } from 'lucide-react';

const mockData = [
  { name: 'Mon', issues: 12 },
  { name: 'Tue', issues: 19 },
  { name: 'Wed', issues: 15 },
  { name: 'Thu', issues: 22 },
  { name: 'Fri', issues: 30 },
  { name: 'Sat', issues: 28 },
  { name: 'Sun', issues: 35 },
];

export default function Landing() {
  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(id) as HTMLElement;
    if (!target) return;
    
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(target, { offset: 0 });
    } else {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="relative z-50 flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div
          className="text-3xl tracking-tight text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          CiviSeva<sup className="text-xs">®</sup>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <a href="#home" onClick={handleScroll('#home')} className="liquid-glass glow-hover rounded-full px-5 py-2 text-sm text-foreground transition-all hover:scale-[1.03]">Home</a>
          <a href="#vision" onClick={handleScroll('#vision')} className="liquid-glass glow-hover rounded-full px-5 py-2 text-sm text-muted-foreground hover:text-foreground transition-all hover:scale-[1.03]">Vision</a>
          <a href="#performance" onClick={handleScroll('#performance')} className="liquid-glass glow-hover rounded-full px-5 py-2 text-sm text-muted-foreground hover:text-foreground transition-all hover:scale-[1.03]">Performance</a>
          <a href="#reach-us" onClick={handleScroll('#reach-us')} className="liquid-glass glow-hover rounded-full px-5 py-2 text-sm text-muted-foreground hover:text-foreground transition-all hover:scale-[1.03]">Reach Us</a>
        </div>

        <Link 
          to="/admin"
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer"
        >
          Auth. Login
        </Link>
      </nav>

      {/* Hero Section */}
      <main id="home" className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 min-h-screen -mt-24">
        <h1
          className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Let's Improve and Rise Together
        </h1>

        <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed mx-auto">
          A platform designed to bridge the gap between citizens and the administration by making it easier to report and resolve infrastructure issues in your community.
        </p>

        <Link 
          to="/citizen"
          className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] transition-transform cursor-pointer"
        >
          Citizen Portal
        </Link>
      </main>

      {/* Vision Section */}
      <section id="vision" className="relative z-10 px-6 py-24 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-normal text-foreground mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Our Vision for a <em className="not-italic text-muted-foreground">Smarter, Transparent City</em>
        </h2>
        <div className="liquid-glass rounded-3xl p-8 md:p-12 text-left">
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            We envision an urban ecosystem where every citizen is an active, empowered participant in maintaining their community. CiviSeva aims to eliminate the bureaucratic friction between local authorities and residents by providing a transparent, geo-enabled platform for reporting civic anomalies.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We believe that real-time awareness leads to real-time action, transforming everyday infrastructure challenges into data-driven solutions for a safer, cleaner environment.
          </p>
        </div>
      </section>

      {/* Performance Section */}
      <section id="performance" className="relative z-10 px-6 py-24 max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-6xl font-normal text-foreground text-center mb-16" style={{ fontFamily: "'Instrument Serif', serif" }}>
          System Capabilities & <em className="not-italic text-muted-foreground">Real-Time Impact</em>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="liquid-glass rounded-3xl p-8 md:p-10 flex flex-col justify-center">
            <p className="text-lg text-foreground mb-8 leading-relaxed">
              CiviSeva isn't just about filing complaints; it's about tracking results. Our platform is built on a high-performance architecture designed to ensure no issue gets lost in the system.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-white/5 border border-white/10 mt-1">
                  <MapPin className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium text-lg mb-1">Precision Geo-Tagging</h4>
                  <p className="text-muted-foreground">Pinpoint accuracy for every reported hazard, ensuring repair teams know exactly where to go.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-white/5 border border-white/10 mt-1">
                  <Layers className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium text-lg mb-1">Smart Categorization</h4>
                  <p className="text-muted-foreground">Automated sorting routes your specific issue directly to the relevant municipal department.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-white/5 border border-white/10 mt-1">
                  <FileText className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium text-lg mb-1">Transparent Resolution Ledger</h4>
                  <p className="text-muted-foreground">Track the lifecycle of your report with live status updates—from "Flagged" to "In Progress" to "Resolved."</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-white/5 border border-white/10 mt-1">
                  <Activity className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium text-lg mb-1">Data-Driven Heatmaps</h4>
                  <p className="text-muted-foreground">Aggregating community reports to help city planners identify high-risk zones and allocate repair budgets more efficiently.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="liquid-glass rounded-3xl p-8 md:p-10 flex flex-col">
            <h3 className="text-2xl text-foreground mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>Issues Resolved This Week</h3>
            <p className="text-muted-foreground mb-8 text-sm">Real-time mock data representation of community impact.</p>
            <div className="flex-1 min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="issues" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#glow)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Reach Us Section */}
      <section id="reach-us" className="relative z-10 px-6 py-24 max-w-5xl mx-auto w-full mb-20">
        <div className="liquid-glass rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-normal text-foreground mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Connect with the <em className="not-italic text-muted-foreground">CiviSeva Team</em>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Whether you are a citizen needing support, a developer wanting to contribute, or a local municipality looking to integrate our system, we want to hear from you. Let's build better infrastructure, together.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <Mail className="w-8 h-8 text-foreground mb-4 opacity-80" />
              <h4 className="text-foreground font-medium mb-1">Support</h4>
              <p className="text-sm text-muted-foreground">support@civiseva.org</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <Building className="w-8 h-8 text-foreground mb-4 opacity-80" />
              <h4 className="text-foreground font-medium mb-1">Municipal Partnerships</h4>
              <p className="text-sm text-muted-foreground">admin@civiseva.org</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
              <MapPin className="w-8 h-8 text-foreground mb-4 opacity-80" />
              <h4 className="text-foreground font-medium mb-1">Headquarters</h4>
              <p className="text-sm text-muted-foreground">Jalandhar, Punjab</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
