
import React, { useState, useRef, useEffect } from 'react';
import { ExtensionIdea } from '../types';
import { GoogleGenAI } from '@google/genai';

interface Props {
  idea: ExtensionIdea;
}

const Simulator: React.FC<Props> = ({ idea }) => {
  const [selectedText, setSelectedText] = useState('');
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      setSelectedText(selection.toString());
    } else {
      setSelectedText('');
    }
  };

  const getAIInsight = async () => {
    if (!selectedText) return;
    setLoading(true);
    setInsight(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a quick context, definition, or background info for this text found on a webpage: "${selectedText}". Keep it brief and helpful (max 100 words).`,
        config: {
          systemInstruction: `You are the back-end intelligence for a Chrome Extension called ${idea.title}. ${idea.differentiation} You provide helpful, contextual insights based on user selections. Make your tone friendly and supportive.`,
          temperature: 0.7,
        }
      });
      setInsight(response.text);
    } catch (err) {
      setInsight("Oh no! The magic failed. 😿 Check your internet and try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-rose-100/50 p-10 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-5xl h-full bg-white rounded-[3rem] shadow-[20px_20px_0px_0px_rgba(244,63,94,0.1)] flex flex-col overflow-hidden border-4 border-slate-900">
        {/* Browser Header */}
        <div className="bg-slate-50 border-b-4 border-slate-900 p-4 flex items-center gap-6">
          <div className="flex gap-2.5 ml-2">
            <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-slate-900" />
            <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-900" />
            <div className="w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900" />
          </div>
          <div className="flex-1 bg-white border-4 border-slate-900 rounded-2xl px-5 py-1.5 text-xs text-slate-400 font-bold flex items-center gap-3">
            <span className="text-rose-400">🔒</span>
            https://en.wikipedia.org/wiki/Quantum_Magic
          </div>
          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => setShowPopup(!showPopup)}
              className={`w-12 h-12 rounded-2xl border-4 border-slate-900 flex items-center justify-center transition-all ${showPopup ? 'bg-rose-500 -translate-y-1 shadow-[0_4px_0_0_#000]' : 'bg-white hover:bg-rose-50'}`}
              title={idea.title}
            >
              <div className={`scale-90 ${showPopup ? 'text-white' : ''}`}>{idea.icon}</div>
            </button>
            
            {/* Simulation Popup UI */}
            {showPopup && (
              <div className="absolute top-16 right-0 w-72 bg-white rounded-[2rem] shadow-[8px_8px_0_0_#000] border-4 border-slate-900 z-50 p-6 animate-in zoom-in-95">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="font-black text-slate-900 text-sm uppercase tracking-wider">{idea.title}</h5>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">Live</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-50 border-2 border-rose-100">
                    <span className="text-xs font-bold text-slate-600">Smart Glow</span>
                    <div className="w-10 h-5 bg-rose-500 rounded-full relative cursor-pointer border-2 border-slate-900">
                      <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border-2 border-slate-100">
                    <span className="text-xs font-bold text-slate-600">Ghostie Mode</span>
                    <div className="w-10 h-5 bg-slate-300 rounded-full relative cursor-pointer border-2 border-slate-900">
                      <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t-2 border-dotted border-slate-100 text-center">
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Recent Activity</p>
                   <p className="text-[10px] text-rose-400 mt-2 font-bold italic truncate">"Quantum Particles..."</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 flex relative">
          <div 
            className="flex-1 p-16 overflow-y-auto selection:bg-rose-200 selection:text-rose-900"
            onMouseUp={handleSelection}
            ref={contentRef}
          >
            <article className="max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-xl text-[10px] font-black uppercase tracking-widest mb-6">Article Explorer</span>
              <h1 className="text-5xl font-black text-slate-900 mb-8 leading-tight">Quantum computing</h1>
              <div className="space-y-6 text-xl text-slate-600 font-medium leading-relaxed">
                <p>
                  Quantum computing is a type of computation whose operations can harness the phenomena of quantum mechanics, such as <span className="underline decoration-rose-300 decoration-4 cursor-pointer hover:bg-rose-50 transition-colors">superposition</span>, interference, and entanglement. 
                </p>
                <p>
                  Devices that perform quantum computations are known as quantum computers. Though current quantum computers are too small to outperform usual (classical) computers for practical applications, they are believed to be capable of solving certain computational problems, such as <span className="underline decoration-rose-300 decoration-4 cursor-pointer hover:bg-rose-50 transition-colors">integer factorization</span>, substantially faster than classical computers.
                </p>
              </div>
            </article>

            {/* Selection Tooltip Trigger */}
            {selectedText && (
              <div className="fixed bg-white border-4 border-slate-900 shadow-[6px_6px_0_0_#000] px-6 py-3 rounded-[2rem] flex items-center gap-4 animate-in slide-in-from-bottom-4" 
                   style={{ left: '50%', bottom: '15%', transform: 'translateX(-50%)' }}>
                <span className="text-sm font-black text-slate-600 truncate max-w-[200px]">"{selectedText}"</span>
                <button 
                  onClick={getAIInsight}
                  className="bg-rose-500 text-white px-5 py-2 rounded-2xl text-xs font-black hover:bg-rose-600 transition flex items-center gap-2 border-2 border-slate-900"
                >
                  ✨ Analyze
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Simulator */}
          <div className={`w-80 border-l-4 border-slate-900 bg-rose-50/30 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col ${insight || loading ? 'translate-x-0' : 'translate-x-full absolute right-0'}`}>
            <div className="p-6 border-b-4 border-slate-900 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center">{idea.icon}</div>
                <span className="font-black text-sm text-slate-900 uppercase tracking-tight">AI Insights</span>
              </div>
              <button 
                onClick={() => { setInsight(null); setLoading(false); }}
                className="w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center hover:bg-rose-100 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {loading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-rose-200/40 rounded-full animate-pulse w-3/4" />
                  <div className="h-4 bg-rose-200/40 rounded-full animate-pulse w-full" />
                  <div className="h-4 bg-rose-200/40 rounded-full animate-pulse w-5/6" />
                  <div className="flex justify-center py-4">
                    <span className="text-2xl animate-spin">🪄</span>
                  </div>
                </div>
              ) : insight ? (
                <div className="animate-in fade-in slide-in-from-right-4">
                  <div className="mb-6">
                    <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">Context for</h4>
                    <p className="text-sm font-black text-rose-500 italic bg-white p-3 rounded-2xl border-2 border-rose-100 shadow-sm">
                      "{selectedText}"
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                      {insight}
                    </p>
                  </div>
                  
                  <div className="mt-10">
                    <h5 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Magic Actions</h5>
                    <div className="grid grid-cols-1 gap-2">
                      <button className="text-left text-xs font-bold p-3 rounded-xl hover:bg-white hover:shadow-sm border-2 border-transparent hover:border-rose-100 transition text-slate-600">🐣 Explain ELI5</button>
                      <button className="text-left text-xs font-bold p-3 rounded-xl hover:bg-white hover:shadow-sm border-2 border-transparent hover:border-rose-100 transition text-slate-600">📰 Find News</button>
                      <button className="text-left text-xs font-bold p-3 rounded-xl hover:bg-white hover:shadow-sm border-2 border-transparent hover:border-rose-100 transition text-slate-600">⚖️ Check Bias</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-40 grayscale">
                  <span className="text-5xl mb-4">✨</span>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Select text to begin</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t-2 border-dotted border-rose-200 bg-white/50 text-[9px] text-rose-400 font-black text-center uppercase tracking-widest">
              Private 🎀 Secure 🎀 Fast
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
