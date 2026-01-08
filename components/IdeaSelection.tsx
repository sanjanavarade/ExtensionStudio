
import React from 'react';
import { ExtensionIdea } from '../types';

interface Props {
  proposals: ExtensionIdea[];
  onSelect: (idea: ExtensionIdea) => void;
}

const IdeaSelection: React.FC<Props> = ({ proposals, onSelect }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-20">
        <div className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-xs font-black uppercase tracking-widest mb-6 animate-bounce">
          Pick Your Magic Tool!
        </div>
        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
          What should we <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-fuchsia-500">make today?</span>
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
          Choose a cozy blueprint and let's bring it to life with 
          sparkles, code, and a whole lot of heart!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {proposals.map((idea) => (
          <div 
            key={idea.id}
            className="group relative"
            onClick={() => onSelect(idea)}
          >
            {/* Background Layer (Shadow) */}
            <div className="absolute inset-0 bg-slate-900 rounded-[2.5rem] translate-y-3 translate-x-2 transition-transform group-hover:translate-y-4 group-hover:translate-x-3" />
            
            {/* Content Layer */}
            <div className="relative bg-white rounded-[2.5rem] border-4 border-slate-900 p-10 h-full flex flex-col cursor-pointer transition-transform group-hover:-translate-y-2 group-active:translate-y-1">
              <div className="mb-8 p-5 rounded-3xl bg-rose-50 w-fit group-hover:bg-rose-100 transition-colors group-hover:rotate-12 duration-300">
                {idea.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2 leading-tight">{idea.title}</h3>
              <p className="text-rose-500 font-bold mb-6 text-sm italic">{idea.tagline}</p>
              
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">The Mission</h4>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{idea.problem}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Friends For</h4>
                  <p className="text-sm text-slate-600 font-bold">{idea.targetUsers}</p>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t-4 border-dotted border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-slate-400">MANIFEST V3</span>
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white group-hover:bg-rose-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeaSelection;
