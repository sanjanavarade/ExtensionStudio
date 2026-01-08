// Fix: Added React import to resolve "Cannot find namespace 'React'" error when using React.ReactNode in ExtensionIdea interface
import React from 'react';

export interface ExtensionIdea {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  targetUsers: string;
  differentiation: string;
  icon: React.ReactNode;
}

export type View = 'proposals' | 'builder' | 'simulator' | 'code';

export interface FileContent {
  path: string;
  content: string;
  language: string;
}