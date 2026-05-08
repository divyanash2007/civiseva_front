import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin, Paperclip, Send, Clock, CheckCircle, PenTool, FileText, User, Bell, LogOut, ChevronDown } from 'lucide-react';

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState('new'); // 'new', 'previous'

  return (
    <div className="relative z-10 flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 liquid-glass border-r border-white/10 flex flex-col h-full bg-black/60 backdrop-blur-xl">
        <div className="p-6 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <span className="text-black font-bold text-xl leading-none" style={{ fontFamily: "'Instrument Serif', serif" }}>C</span>
          </div>
          <span className="text-2xl tracking-tight text-white font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>CiviSeva<sup className="text-xs">®</sup></span>
        </div>
        
        <div className="px-4 pb-2 mt-4">
          <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-2 px-2">Menu</p>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <button 
            onClick={() => setActiveTab('new')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'new' ? 'bg-white/10 text-white shadow-[inset_4px_0_0_0_#ffffff]' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
          >
            <PenTool className="w-5 h-5" />
            <span className="text-sm font-medium">Draft New Complaint</span>
          </button>
          <button 
            onClick={() => setActiveTab('previous')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'previous' ? 'bg-white/10 text-white shadow-[inset_4px_0_0_0_#ffffff]' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium">My Records</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/10 mt-auto">
          <Link to="/" className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Exit Portal</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-20 flex-shrink-0 border-b border-white/10 liquid-glass bg-black/20 flex items-center justify-between px-8">
          <h2 className="text-2xl text-white font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
            {activeTab === 'new' ? 'Submit New Request' : 'Your Complaint History'}
          </h2>
          <div className="flex items-center space-x-6">
            <button className="relative text-muted-foreground hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 border-l border-white/10 pl-6">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white hidden md:block">Citizen User</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'new' ? (
              <div className="liquid-glass rounded-3xl p-8 bg-black/40 border border-white/10">
                <h2 className="text-2xl text-foreground mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>Log an Issue</h2>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-foreground font-medium">Location Coordinates</label>
                      <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">AI Auto-Categorization Active</span>
                    </div>
                    <div className="relative">
                      <input type="text" placeholder="Auto-detecting..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-foreground focus:outline-none focus:border-white/30" readOnly />
                      <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                      <button type="button" className="absolute right-2 top-2 px-3 py-1.5 bg-white/10 rounded-lg text-xs text-foreground hover:bg-white/20 transition-colors">Detect</button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-foreground font-medium">Detailed Description</label>
                    <textarea 
                      rows={4} 
                      placeholder="Describe the issue in detail..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button type="button" className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 border-dashed rounded-xl hover:bg-white/10 transition-colors group">
                      <div className="p-3 bg-white/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <Camera className="w-6 h-6 text-foreground" />
                      </div>
                      <span className="text-sm text-foreground font-medium">Take Photo</span>
                      <span className="text-xs text-muted-foreground mt-1">Capture live evidence</span>
                    </button>

                    <button type="button" className="flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 border-dashed rounded-xl hover:bg-white/10 transition-colors group">
                      <div className="p-3 bg-white/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        <Paperclip className="w-6 h-6 text-foreground" />
                      </div>
                      <span className="text-sm text-foreground font-medium">Attach File</span>
                      <span className="text-xs text-muted-foreground mt-1">Upload images or documents</span>
                    </button>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      <span className="font-medium">Submit Request</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="liquid-glass rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/40 border border-white/10 hover:bg-white/5 transition-colors">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20">Road & Infrastructure</span>
                      <span className="text-muted-foreground text-xs">ID: #REQ-8821</span>
                    </div>
                    <h3 className="text-lg text-foreground font-medium mb-1">Deep pothole near City Center Mall</h3>
                    <p className="text-sm text-muted-foreground flex items-center space-x-1"><MapPin className="w-3 h-3"/> <span>Sector 14, Main Avenue</span></p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 mb-2">
                      <Clock className="w-3 h-3"/> <span>Working</span>
                    </span>
                    <span className="text-xs text-muted-foreground">Updated 2 days ago</span>
                  </div>
                </div>

                <div className="liquid-glass rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/40 border border-white/10 hover:bg-white/5 transition-colors">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20">Garbage & Sanitation</span>
                      <span className="text-muted-foreground text-xs">ID: #REQ-7402</span>
                    </div>
                    <h3 className="text-lg text-foreground font-medium mb-1">Overflowing dumpster</h3>
                    <p className="text-sm text-muted-foreground flex items-center space-x-1"><MapPin className="w-3 h-3"/> <span>Park Street, Block B</span></p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 mb-2">
                      <CheckCircle className="w-3 h-3"/> <span>Resolved</span>
                    </span>
                    <span className="text-xs text-muted-foreground">Updated 1 week ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
