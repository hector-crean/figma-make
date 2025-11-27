import { createContext, useContext, useState, ReactNode, useRef, useEffect } from 'react';
import { X, ExternalLink, BookOpen } from 'lucide-react';

interface Reference {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal?: string;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
}

interface ReferencesContextType {
  references: Reference[];
  addReference: (ref: Reference) => void;
  citationStyle: 'numbered' | 'author-year' | 'superscript';
  setCitationStyle: (style: 'numbered' | 'author-year' | 'superscript') => void;
  showMarginNotes: boolean;
  setShowMarginNotes: (show: boolean) => void;
}

const ReferencesContext = createContext<ReferencesContextType | undefined>(undefined);

interface ReferencesProviderProps {
  children: ReactNode;
  defaultCitationStyle?: 'numbered' | 'author-year' | 'superscript';
  defaultShowMarginNotes?: boolean;
}

export function ReferencesProvider({ 
  children, 
  defaultCitationStyle = 'numbered',
  defaultShowMarginNotes = true 
}: ReferencesProviderProps) {
  const [references, setReferences] = useState<Reference[]>([]);
  const [citationStyle, setCitationStyle] = useState(defaultCitationStyle);
  const [showMarginNotes, setShowMarginNotes] = useState(defaultShowMarginNotes);

  const addReference = (ref: Reference) => {
    setReferences(prev => {
      if (prev.find(r => r.id === ref.id)) return prev;
      return [...prev, ref];
    });
  };

  return (
    <ReferencesContext.Provider value={{ 
      references, 
      addReference, 
      citationStyle, 
      setCitationStyle,
      showMarginNotes,
      setShowMarginNotes
    }}>
      {children}
    </ReferencesContext.Provider>
  );
}

export function useReferences() {
  const context = useContext(ReferencesContext);
  if (!context) {
    throw new Error('useReferences must be used within ReferencesProvider');
  }
  return context;
}

// Citation component with tooltip and popup
interface CitationProps {
  refId: string;
  showTooltip?: boolean;
  pages?: string; // Optional specific pages cited
}

export function Citation({ refId, showTooltip = true, pages }: CitationProps) {
  const { references, citationStyle } = useReferences();
  const [showPopup, setShowPopup] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const ref = references.find(r => r.id === refId);
  const index = references.findIndex(r => r.id === refId) + 1;
  const citationRef = useRef<HTMLSpanElement>(null);

  if (!ref) return null;

  const scrollToReference = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(`ref-${refId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight the reference briefly
      element.classList.add('bg-yellow-100');
      setTimeout(() => {
        element.classList.remove('bg-yellow-100');
      }, 2000);
    }
  };

  const getCitationText = () => {
    if (citationStyle === 'author-year') {
      const authorLastName = ref.authors.split(',')[0].split(' et al')[0];
      return pages ? `${authorLastName}, ${ref.year}, p. ${pages}` : `${authorLastName}, ${ref.year}`;
    } else if (citationStyle === 'numbered') {
      return pages ? `${index}, p. ${pages}` : `${index}`;
    } else { // superscript
      return pages ? `${index}, p. ${pages}` : `${index}`;
    }
  };

  const citationDisplay = citationStyle === 'superscript' ? (
    <sup 
      ref={citationRef}
      className="text-blue-600 hover:text-blue-800 cursor-pointer mx-0.5 relative"
      onClick={(e) => {
        e.preventDefault();
        setShowPopup(true);
      }}
      onMouseEnter={() => showTooltip && setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      [{getCitationText()}]
    </sup>
  ) : (
    <span
      ref={citationRef}
      className="text-blue-600 hover:text-blue-800 cursor-pointer mx-1 relative"
      onClick={(e) => {
        e.preventDefault();
        setShowPopup(true);
      }}
      onMouseEnter={() => showTooltip && setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      ({getCitationText()})
    </span>
  );

  return (
    <>
      {citationDisplay}
      
      {/* Tooltip on hover */}
      {showTooltip && tooltipVisible && (
        <div className="fixed z-50 pointer-events-none">
          <div 
            className="absolute bg-slate-900 text-white text-xs rounded-lg shadow-xl p-3 max-w-xs"
            style={{
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '8px',
            }}
          >
            <p className="mb-1">
              <span>{ref.authors} ({ref.year})</span>
            </p>
            <p className="text-slate-300 italic">{ref.title}</p>
            <div 
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"
            />
          </div>
        </div>
      )}

      {/* Popup modal */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setShowPopup(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-blue-600" />
                <h4 className="text-slate-900">Reference {index}</h4>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-slate-600 text-sm mb-1">Authors</p>
                <p className="text-slate-900">{ref.authors}</p>
              </div>

              <div>
                <p className="text-slate-600 text-sm mb-1">Title</p>
                <p className="text-slate-900 italic">{ref.title}</p>
              </div>

              {ref.journal && (
                <div>
                  <p className="text-slate-600 text-sm mb-1">Journal</p>
                  <p className="text-slate-900">
                    {ref.journal}
                    {ref.volume && `, Volume ${ref.volume}`}
                    {ref.pages && `, Pages ${ref.pages}`}
                  </p>
                </div>
              )}

              <div>
                <p className="text-slate-600 text-sm mb-1">Year</p>
                <p className="text-slate-900">{ref.year}</p>
              </div>

              {(ref.doi || ref.url) && (
                <div className="pt-3 border-t border-slate-200">
                  {ref.doi && (
                    <a
                      href={`https://doi.org/${ref.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm mb-2"
                    >
                      <ExternalLink size={14} />
                      View on DOI
                    </a>
                  )}
                  {ref.url && !ref.doi && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <ExternalLink size={14} />
                      View source
                    </a>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-slate-200">
                <button
                  onClick={(e) => {
                    setShowPopup(false);
                    scrollToReference(e);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Go to full reference list
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Margin note component (appears in sidebar on desktop, inline on mobile)
interface MarginNoteProps {
  children: ReactNode;
  id?: string;
}

export function MarginNote({ children, id }: MarginNoteProps) {
  const { showMarginNotes } = useReferences();
  const [isVisible, setIsVisible] = useState(false);

  if (!showMarginNotes) {
    return (
      <>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mx-1 cursor-pointer"
        >
          <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
            i
          </span>
        </button>
        {isVisible && (
          <div className="my-2 p-4 bg-blue-50 border-l-4 border-blue-600 rounded text-sm text-slate-700">
            {children}
          </div>
        )}
      </>
    );
  }

  return (
    <span
      id={id}
      className="margin-note inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mx-1 cursor-help group relative"
      data-margin-content={JSON.stringify(children)}
    >
      <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
        i
      </span>
      {/* Mobile fallback tooltip */}
      <span className="lg:hidden absolute left-0 top-full mt-2 w-64 bg-blue-50 border-l-4 border-blue-600 rounded p-3 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {children}
      </span>
    </span>
  );
}

// References list component
export function ReferencesList() {
  const { references } = useReferences();

  if (references.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t-2 border-slate-200">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen size={24} className="text-slate-900" />
        <h2 className="text-slate-900">References</h2>
      </div>
      <ol className="space-y-4">
        {references.map((ref, index) => (
          <li
            key={ref.id}
            id={`ref-${ref.id}`}
            className="text-slate-700 text-sm flex gap-4 transition-colors duration-500 rounded p-2"
          >
            <span className="flex-shrink-0 w-8 h-8 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center">
              {index + 1}
            </span>
            <div className="flex-1">
              <p className="mb-1">
                <span>{ref.authors} ({ref.year}). </span>
                <span className="italic">{ref.title}. </span>
                {ref.journal && (
                  <span>
                    <span className="text-slate-900">{ref.journal}</span>
                    {ref.volume && <span>, <em>{ref.volume}</em></span>}
                    {ref.pages && `, ${ref.pages}`}.{' '}
                  </span>
                )}
              </p>
              {ref.doi && (
                <a
                  href={`https://doi.org/${ref.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs"
                >
                  <ExternalLink size={12} />
                  https://doi.org/{ref.doi}
                </a>
              )}
              {ref.url && !ref.doi && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs"
                >
                  <ExternalLink size={12} />
                  {ref.url}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Citation style selector component
export function CitationStyleSelector() {
  const { citationStyle, setCitationStyle } = useReferences();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-slate-600">Citation style:</span>
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => setCitationStyle('numbered')}
          className={`px-3 py-1 rounded transition-colors ${
            citationStyle === 'numbered'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Numbered [1]
        </button>
        <button
          onClick={() => setCitationStyle('author-year')}
          className={`px-3 py-1 rounded transition-colors ${
            citationStyle === 'author-year'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          (Author, Year)
        </button>
        <button
          onClick={() => setCitationStyle('superscript')}
          className={`px-3 py-1 rounded transition-colors ${
            citationStyle === 'superscript'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Superscript<sup>[1]</sup>
        </button>
      </div>
    </div>
  );
}
