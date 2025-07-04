import './components/CodeHighlighter.css';

export { default as CodeEditor } from './components/CodeEditor';
export { default as CodeHighlighter } from './components/CodeHighlighter';
export { Prism, ensureLanguagesLoaded } from './prism-languages';

export type { CodeHighlighterProps } from './components/CodeHighlighter';

// Default export keeps the primary editor experience
export { default } from './components/CodeEditor'; 