
import React, { useState } from 'react';
import { View, ExtensionIdea } from '../types';
import Simulator from './Simulator';
import CodeExplorer from './CodeExplorer';

interface Props {
  idea: ExtensionIdea;
  view: View;
  onViewChange: (view: View) => void;
}

const ProjectDashboard: React.FC<Props> = ({ idea, view, onViewChange }) => {
  return (
    <div className="h-full flex flex-col">
      {view === 'builder' && (
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="bg-white rounded-[3rem] border-4 border-slate-900 p-12 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] mb-12">
            <div className="flex flex-col md:flex-row items-center gap-10 mb-12 text-center md:text-left">
              <div className="p-8 rounded-[2rem] bg-rose-50 border-4 border-rose-100 rotate-[-3deg]">
                {React.cloneElement(idea.icon as React.ReactElement, { className: "w-16 h-16 text-rose-500" })}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  <h2 className="text-4xl font-black text-slate-900">{idea.title}</h2>
                  <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-600 rounded-full text-[10px] font-black uppercase tracking-widest">In Design</span>
                </div>
                <p className="text-xl text-slate-500 font-medium">{idea.tagline}</p>
              </div>
              <div className="shrink-0">
                <button 
                  onClick={() => onViewChange('simulator')}
                  className="px-8 py-4 bg-rose-500 text-white rounded-2xl font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-2 active:shadow-none"
                >
                  Start Playtesting!
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-10">
                <section>
                  <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Core Philosophy</h3>
                  <p className="text-lg text-slate-700 font-medium leading-relaxed">
                    {idea.differentiation}
                  </p>
                </section>
                <section>
                  <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Tech Heartbeat</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { title: "Manifest V3", desc: "The latest engine for smooth flying." },
                      { title: "Shadow DOM", desc: "Keeping our styles safe in a tiny bubble." },
                      { title: "Privacy First", desc: "Your secrets stay only on your computer." }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-lg shadow-sm">✨</div>
                        <div>
                          <p className="font-black text-slate-800 text-sm">{item.title}</p>
                          <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="bg-fuchsia-50/50 rounded-[2rem] p-10 border-4 border-fuchsia-100 border-dashed">
                <h3 className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] mb-8">Adventure Progress</h3>
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute left-6 top-10 bottom-0 w-1 bg-fuchsia-100 -translate-x-1/2" />
                    <div className="space-y-10">
                      {[
                        { step: "🎨", title: "Visual Magic", status: "Done!", color: "emerald" },
                        { step: "🧠", title: "Brain Setup", status: "Cooking...", color: "rose" },
                        { step: "📦", title: "Gift Wrapping", status: "Next up!", color: "slate" }
                      ].map((s, i) => (
                        <div key={i} className="relative flex gap-6 items-start">
                          <div className={`w-12 h-12 rounded-2xl bg-white border-2 border-${s.color === 'rose' ? 'rose' : s.color === 'emerald' ? 'emerald' : 'slate'}-200 flex items-center justify-center text-xl shadow-sm z-10`}>
                            {s.step}
                          </div>
                          <div>
                            <p className="font-black text-slate-800">{s.title}</p>
                            <p className={`text-xs font-bold text-${s.color}-500 uppercase tracking-wider`}>{s.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: "🛡️", title: "Safety Audit", desc: "Approved by the Cookie Council", bg: "rose" },
               { icon: "⚡", title: "Fast Zoom", desc: "Runs on tiny sugar crystals", bg: "fuchsia" },
               { icon: "🛠️", title: "Mod Kit", desc: "Easy to change and customize", bg: "violet" }
             ].map((card, i) => (
               <div key={i} className="bg-white p-8 rounded-[2rem] border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col items-center text-center group hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] transition-all">
                  <div className={`w-14 h-14 bg-${card.bg}-50 text-2xl rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <h4 className="font-black text-slate-800 mb-2">{card.title}</h4>
                  <p className="text-sm text-slate-500 font-medium">{card.desc}</p>
               </div>
             ))}
          </div>
        </div>
      )}

      {view === 'simulator' && <Simulator idea={idea} />}
      {view === 'code' && <CodeExplorer idea={idea} />}
    </div>
  );
};

export default ProjectDashboard;
