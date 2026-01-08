
import React, { useState } from 'react';
import { ExtensionIdea, FileContent } from '../types';

interface Props {
  idea: ExtensionIdea;
}

const CodeExplorer: React.FC<Props> = ({ idea }) => {
  const [selectedFile, setSelectedFile] = useState(0);

  const getFiles = (idea: ExtensionIdea): FileContent[] => {
    return [
      {
        path: 'manifest.json',
        language: 'json',
        content: `{
  "manifest_version": 3,
  "name": "${idea.title}",
  "version": "1.0.0",
  "description": "${idea.tagline}",
  "permissions": [
    "storage",
    "contextMenus",
    "activeTab"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icons/icon128.png"
  },
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["content.css"]
    }
  ],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}`
      },
      {
        path: 'background.js',
        language: 'javascript',
        content: `// Service worker for ${idea.title} ✨
chrome.runtime.onInstalled.addListener(() => {
  console.log('${idea.title} extension is ready to sparkle!');
  
  // Create context menu for right-click magic
  chrome.contextMenus.create({
    id: "explainSelection",
    title: "✨ Ask ${idea.title}",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "explainSelection") {
    chrome.tabs.sendMessage(tab.id, {
      type: "SHOW_INSIGHT",
      text: info.selectionText
    });
  }
});`
      },
      {
        path: 'content.js',
        language: 'javascript',
        content: `// Content script: The magic bridge!
let sidebar = null;

document.addEventListener('mouseup', () => {
  const selection = window.getSelection().toString().trim();
  if (selection.length > 5) {
    showFloatingBubble(selection);
  }
});

function showFloatingBubble(text) {
  // Bubbling logic here...
  console.log('Detected magic words:', text);
}`
      }
    ];
  };

  const files = getFiles(idea);

  return (
    <div className="flex-1 flex overflow-hidden bg-rose-50/50 p-6">
      <div className="flex-1 flex overflow-hidden rounded-[2.5rem] border-4 border-slate-900 shadow-[16px_16px_0_0_#000]">
        {/* File Sidebar */}
        <div className="w-72 bg-slate-900 flex flex-col">
          <div className="p-6 border-b border-slate-800">
            <h5 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em]">Project Vault</h5>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            {files.map((file, idx) => (
              <button
                key={file.path}
                onClick={() => setSelectedFile(idx)}
                className={`w-full text-left px-8 py-3 text-sm font-bold flex items-center gap-4 transition-all ${selectedFile === idx ? 'bg-rose-500 text-white translate-x-1' : 'text-slate-400 hover:text-rose-200'}`}
              >
                <span className="text-lg">{idx === 0 ? '📄' : '✨'}</span>
                {file.path}
              </button>
            ))}
          </div>
          <div className="p-6 bg-slate-800/30 border-t border-slate-800">
             <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs hover:bg-rose-50 transition-colors shadow-[4px_4px_0_0_#f43f5e]">
               Download .ZIP 🎁
             </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 bg-slate-950 flex flex-col overflow-hidden">
          <div className="p-4 bg-slate-900/50 flex items-center justify-between border-b border-slate-800/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{files[selectedFile].path}</span>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(files[selectedFile].content)}
              className="text-[10px] font-black text-white px-4 py-2 bg-rose-500 rounded-xl hover:bg-rose-600 transition shadow-[3px_3px_0_0_#000]"
            >
              Copy Script
            </button>
          </div>
          <div className="flex-1 p-8 overflow-auto font-mono text-sm leading-relaxed text-rose-100/80">
            <pre>
              <code className="block">{files[selectedFile].content}</code>
            </pre>
          </div>
          
          <div className="p-6 bg-rose-500/10 border-t border-rose-500/20 text-rose-200 text-xs font-bold leading-relaxed">
             <p className="flex items-center gap-2">
               <span className="text-lg">🎀</span>
               Quick Install: Go to chrome://extensions, enable Developer Mode, and "Load Unpacked" the folder with these files!
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExplorer;
