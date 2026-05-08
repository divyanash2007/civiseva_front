import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Flame, Trash2, Droplet, Zap, Route as RouteIcon, MoreHorizontal, CheckCircle, Clock, AlertTriangle, Search, Bell, User, LogOut, Loader2, RefreshCw } from 'lucide-react';
import { api } from '../api';

const mockProgressData = [
  { name: 'Mon', resolved: 10, new: 15 },
  { name: 'Tue', resolved: 18, new: 12 },
  { name: 'Wed', resolved: 25, new: 20 },
  { name: 'Thu', resolved: 30, new: 18 },
  { name: 'Fri', resolved: 45, new: 25 },
];

const categories = [
  { id: 'road', name: 'Roads', icon: RouteIcon, backendName: 'Road' },
  { id: 'water', name: 'Water', icon: Droplet, backendName: 'Water' },
  { id: 'electricity', name: 'Electricity', icon: Zap, backendName: 'Electricity' },
  { id: 'garbage', name: 'Garbage', icon: Trash2, backendName: 'Garbage' },
  { id: 'fire', name: 'Fire Dept', icon: Flame, backendName: 'Fire' },
  { id: 'general', name: 'General', icon: MoreHorizontal, backendName: 'General' },
];

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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('road');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchIssues();
  }, [activeTab]);

  const fetchIssues = async () => {
    const category = categories.find(c => c.id === activeTab);
    if (!category) return;
    
    setIsLoading(true);
    try {
      const response = await api.get(`/authorities/${category.backendName}/issues`);
      setIssues(response.data);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateIssueStatus = async (issueId: string, currentStatus: string) => {
    const category = categories.find(c => c.id === activeTab);
    if (!category) return;

    let newStatus = 'In Progress';
    if (currentStatus === 'Reported') newStatus = 'In Progress';
    else if (currentStatus === 'In Progress') newStatus = 'Resolved';
    else return; // already resolved

    setUpdatingId(issueId);
    try {
      await api.patch(`/authorities/${category.backendName}/issues/${issueId}`, {
        status: newStatus
      });
      // Update local state
      setIssues(issues.map(issue => 
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      ));
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const activeCategoryName = categories.find(c => c.id === activeTab)?.name;
  
  // Calculate stats
  const activeCount = issues.filter(i => i.status === 'Reported').length;
  const inProgressCount = issues.filter(i => i.status === 'In Progress').length;
  const resolvedCount = issues.filter(i => i.status === 'Resolved').length;
  const criticalCount = issues.filter(i => i.priority >= 4).length;

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
          <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider mb-2 px-2">Categories</p>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button 
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-white/10 text-white shadow-[inset_4px_0_0_0_#ffffff]' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10 mt-auto">
          <Link to="/" className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Exit Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-20 flex-shrink-0 border-b border-white/10 liquid-glass bg-black/20 flex items-center justify-between px-8">
          <h2 className="text-2xl text-white font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
            {activeCategoryName} Overview
          </h2>
          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block">
              <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input type="text" placeholder="Search requests..." className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/30" />
            </div>
            <button className="relative text-muted-foreground hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-white/10 pl-6">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white hidden md:block">Admin User</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="liquid-glass rounded-2xl p-6 border-l-4 border-l-white bg-black/40">
              <p className="text-muted-foreground text-sm mb-1">Total Active Requests</p>
              <h3 className="text-3xl text-foreground font-medium">{activeCount}</h3>
            </div>
            <div className="liquid-glass rounded-2xl p-6 border-l-4 border-l-yellow-400 bg-black/40">
              <p className="text-muted-foreground text-sm mb-1">In Progress (Working)</p>
              <h3 className="text-3xl text-foreground font-medium">{inProgressCount}</h3>
            </div>
            <div className="liquid-glass rounded-2xl p-6 border-l-4 border-l-green-400 bg-black/40">
              <p className="text-muted-foreground text-sm mb-1">Resolved</p>
              <h3 className="text-3xl text-foreground font-medium">{resolvedCount}</h3>
            </div>
            <div className="liquid-glass rounded-2xl p-6 border-l-4 border-l-red-400 bg-black/40">
              <p className="text-muted-foreground text-sm mb-1">Critical Priority</p>
              <h3 className="text-3xl text-foreground font-medium">{criticalCount}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 flex flex-col">
              <div className="liquid-glass rounded-2xl p-6 flex-1 bg-black/40">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>Recent Logs</h3>
                  <button onClick={fetchIssues} className="text-xs text-white hover:underline flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> Refresh
                  </button>
                </div>
                
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                    </div>
                  ) : issues.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No issues found for this category.</div>
                  ) : (
                    issues.map(issue => (
                      <div key={issue.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="mb-4 sm:mb-0">
                          <div className="flex items-center space-x-2 mb-1">
                            {issue.priority >= 4 ? (
                              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-red-500/20 text-red-400 border border-red-500/30">Prio {issue.priority}</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/10 text-muted-foreground border border-white/10">Prio {issue.priority}</span>
                            )}
                            <p className="text-foreground font-medium text-sm">{issue.description}</p>
                          </div>
                          <p className="text-muted-foreground text-xs flex items-center space-x-3 mt-1">
                            <span>ID: {issue.id.substring(0,8)}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                            <span>Reported: {new Date(issue.created_at).toLocaleDateString()}</span>
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          {issue.status === 'In Progress' && <span className="flex items-center space-x-1 text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"><Clock className="w-3 h-3"/> <span>Working</span></span>}
                          {issue.status === 'Reported' && <span className="flex items-center space-x-1 text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30"><AlertTriangle className="w-3 h-3"/> <span>Active</span></span>}
                          {issue.status === 'Resolved' && <span className="flex items-center space-x-1 text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30"><CheckCircle className="w-3 h-3"/> <span>Completed</span></span>}
                          
                          {issue.status !== 'Resolved' && (
                            <button 
                              onClick={() => updateIssueStatus(issue.id, issue.status)}
                              disabled={updatingId === issue.id}
                              className="text-xs px-3 py-1.5 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                              {updatingId === issue.id ? 'Updating...' : (issue.status === 'Reported' ? 'Start Work' : 'Mark Resolved')}
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="liquid-glass rounded-2xl p-6 flex flex-col bg-black/40">
              <h3 className="text-xl text-foreground mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>Progress Analytics</h3>
              <p className="text-muted-foreground text-xs mb-8">Resolution vs New Requests (Mock)</p>
              
              <div className="flex-1 min-h-[250px] w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockProgressData}>
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    />
                    <Bar dataKey="new" fill="rgba(255,255,255,0.2)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="resolved" fill="#ffffff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-sm font-medium text-foreground mb-2">Automated Insights</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Resolution rate has increased by 14% this week. Water department has the highest pending requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
