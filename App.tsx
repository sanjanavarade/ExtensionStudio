
import React, { useState, useEffect } from 'react';
import { View, ExtensionIdea } from './types';
import { ICONS } from './constants';
import IdeaSelection from './components/IdeaSelection';
import ProjectDashboard from './components/ProjectDashboard';

const PROPOSALS: ExtensionIdea[] = [
  {
    id: 'context-pilot',
    title: 'ContextPilot',
    tagline: 'Sparkle-Powered Research Helper',
    problem: 'Reading big boring articles is hard! Too many tabs make your head spin and your computer slow.',
    targetUsers: 'Curious learners and busy readers who love quick answers.',
    differentiation: 'Like having a tiny genius friend on every page. It explains hard words with cute summaries and magic context bubbles.',
    icon: <ICONS.Brain className="w-8 h-8 text-rose-500" />
  },
  {
    id: 'mindful-flow',
    title: 'MindfulFlow',
    tagline: 'Your Zen Browsing Buddy',
    problem: 'Infinite scrolling is a trap! It steals your time and makes you feel like a zombie.',
    targetUsers: 'Everyone who needs a gentle nudge to stay happy and productive.',
    // Fix: Escaped the single quote in "doesn't" to prevent early termination of the string literal
    differentiation: 'It doesn\'t "block" sites—it asks you with a soft smile: "What is your goal, friend?" and gives you breathing room with pretty overlays.',
    icon: <ICONS.Shield className="w-8 h-8 text-fuchsia-500" />
  },
  {
    id: 'snippet-vault',
    title: 'SnippetVault',
    tagline: 'The Secret Cloud Clipboard',
    problem: 'Sensitive stuff stays in your clipboard forever. That\'s spooky! Your privacy is super important.',
    targetUsers: 'Safety-first users who want their data to vanish like magic.',
    differentiation: 'A cozy little vault for your clips. They stay safe for 30 minutes, then poof! They disappear into thin air. No traces left behind.',
    icon: <ICONS.Layers className="w-8 h-8 text-violet-500" />
  }
];

const App: React.FC = () => {
  const [selectedIdea, setSelectedIdea] = useState<ExtensionIdea | null>(null);
  const [currentView, setCurrentView] = useState<View>('proposals');

  const handleSelect = (idea: ExtensionIdea) => {
    setSelectedIdea(idea);
    setCurrentView('builder');
  };

  return (
    <div className="min-h-screen bg-[#fff5f7] flex flex-col selection:bg-rose-200">
      {/* Decorative Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/40 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-200/40 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-rose-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setSelectedIdea(null); setCurrentView('proposals'); }}>
          <div className="bg-rose-500 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200 group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-0">
            <span className="text-white font-black text-2xl">✨</span>
          </div>
          <div className="flex flex-col -gap-1">
            <h1 className="text-xl font-black tracking-tight text-slate-800 leading-none">Studio<span className="text-rose-500">Cute</span></h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Builder App</span>
          </div>
        </div>
        
        {selectedIdea && (
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl">
            <button 
              onClick={() => setCurrentView('builder')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${currentView === 'builder' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-rose-400'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setCurrentView('simulator')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${currentView === 'simulator' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-rose-400'}`}
            >
              Live Play
            </button>
            <button 
              onClick={() => setCurrentView('code')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${currentView === 'code' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-rose-400'}`}
            >
              Get Code 🎀
            </button>
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Pro Engineer</span>
            <span className="text-xs font-bold text-rose-500">Cookie Baker</span>
          </div>
          <div className="w-10 h-10 rounded-2xl border-2 border-rose-200 p-0.5 overflow-hidden rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=Lucky&backgroundColor=ffdfbf" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-auto">
        {currentView === 'proposals' && (
          <IdeaSelection proposals={PROPOSALS} onSelect={handleSelect} />
        )}
        
        {selectedIdea && currentView !== 'proposals' && (
          <ProjectDashboard 
            idea={selectedIdea} 
            view={currentView} 
            onViewChange={setCurrentView}
          />
        )}
      </main>
    </div>
  );
};

export default App;
