import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin, Send, Clock, CheckCircle, PenTool, FileText, User, Bell, LogOut, Loader2, Image as ImageIcon } from 'lucide-react';
import { api, apiForm } from '../api';

interface Issue {
  id: string;
  description: string;
  image_path: string | null;
  latitude: number | null;
  longitude: number | null;
  authority: string;
  priority: number;
  status: string;
  authority_response: string | null;
  created_at: string;
}

const USER_ID = "citizen_123";

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState('new'); // 'new', 'previous'
  
  // Form State
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // History State
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  useEffect(() => {
    if (activeTab === 'previous') {
      fetchHistory();
    }
  }, [activeTab]);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await api.get(`/issues/user/${USER_ID}`);
      setIssues(response.data);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation({ lat: position.coords.latitude, lng: position.coords.longitude }),
        (error) => console.error("Error detecting location", error)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('user_id', USER_ID);
      formData.append('description', description);
      
      if (location) {
        formData.append('latitude', location.lat.toString());
        formData.append('longitude', location.lng.toString());
      }
      
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await apiForm.post('/issues/', formData);
      
      // Reset form
      setDescription('');
      setImageFile(null);
      setLocation(null);
      setActiveTab('previous');
    } catch (error) {
      console.error("Failed to submit issue:", error);
      alert("Failed to submit issue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

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

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'new' ? (
              <div className="liquid-glass rounded-3xl p-8 bg-black/40 border border-white/10">
                <h2 className="text-2xl text-foreground mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>Log an Issue</h2>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-foreground font-medium">Location Coordinates</label>
                      <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">AI Auto-Categorization Active</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : ''}
                        placeholder="Auto-detecting..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-foreground focus:outline-none focus:border-white/30" 
                        readOnly 
                      />
                      <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground" />
                      <button type="button" onClick={handleDetectLocation} className="absolute right-2 top-2 px-3 py-1.5 bg-white/10 rounded-lg text-xs text-foreground hover:bg-white/20 transition-colors">Detect</button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-foreground font-medium">Detailed Description</label>
                    <textarea 
                      rows={4} 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      placeholder="Describe the issue in detail..." 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-white/30 resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                    />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className={`flex flex-col items-center justify-center p-8 border border-dashed rounded-xl transition-colors group ${imageFile ? 'bg-white/10 border-white/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                      <div className="p-3 bg-white/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                        {imageFile ? <ImageIcon className="w-6 h-6 text-emerald-400" /> : <Camera className="w-6 h-6 text-foreground" />}
                      </div>
                      <span className="text-sm text-foreground font-medium">{imageFile ? 'Image Selected' : 'Take Photo'}</span>
                      <span className="text-xs text-muted-foreground mt-1">{imageFile ? imageFile.name : 'Capture live evidence'}</span>
                    </button>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button type="submit" disabled={isSubmitting || !description.trim()} className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <span className="font-medium">Submit Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                {isLoadingHistory ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                  </div>
                ) : issues.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">No complaints found.</div>
                ) : (
                  issues.map(issue => (
                    <div key={issue.id} className="liquid-glass rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black/40 border border-white/10 hover:bg-white/5 transition-colors">
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20">{issue.authority}</span>
                          <span className="text-muted-foreground text-xs">ID: {issue.id.substring(0,8)}</span>
                        </div>
                        <h3 className="text-lg text-foreground font-medium mb-1">{issue.description}</h3>
                        {(issue.latitude && issue.longitude) && (
                          <p className="text-sm text-muted-foreground flex items-center space-x-1"><MapPin className="w-3 h-3"/> <span>{issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)}</span></p>
                        )}
                        {issue.image_path && (
                          <img src={issue.image_path} alt="Issue" className="mt-3 w-32 h-20 object-cover rounded-lg border border-white/10" />
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full mb-2 border ${
                          issue.status === 'Resolved' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                          issue.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 
                          'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}>
                          {issue.status === 'Resolved' ? <CheckCircle className="w-3 h-3"/> : <Clock className="w-3 h-3"/>} 
                          <span>{issue.status}</span>
                        </span>
                        <span className="text-xs text-muted-foreground">{new Date(issue.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

