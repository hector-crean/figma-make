import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

export interface Section {
  id: string;
  title: string;
  level?: number;
  subsections?: { id: string; title: string }[];
}

interface ContentContextValue {
  sections: Section[];
  activeSection: string;
  marginNotes: Array<{ id: string; content: string; top: number }>;
  scrollToSection: (id: string) => void;
  registerContent: (ref: HTMLDivElement | null) => void;
  refreshContent: () => void; // Trigger content re-detection
  showTOC: boolean;
  showMarginNotes: boolean;
  showSkeletons: boolean;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within Content.Provider');
  }
  return context;
}

interface ContentProviderProps {
  sections?: Section[];
  showMarginNotes?: boolean;
  autoDetectHeadings?: boolean;
  children: ReactNode;
}

function ContentProvider({
  sections: providedSections,
  showMarginNotes = false,
  autoDetectHeadings = false,
  children,
}: ContentProviderProps) {
  const [activeSection, setActiveSection] = useState('');
  const [marginNotes, setMarginNotes] = useState<Array<{ id: string; content: string; top: number }>>([]);
  const [detectedSections, setDetectedSections] = useState<Section[]>([]);
  const [contentVersion, setContentVersion] = useState(0); // Track content changes
  const contentRef = useRef<HTMLDivElement | null>(null);
  const detectHeadingsRef = useRef<(() => void) | null>(null);

  // Reset active section when content changes
  useEffect(() => {
    setActiveSection('');
  }, [contentVersion]);

  const activeSections = providedSections || detectedSections;
  const showTOC = autoDetectHeadings || !!providedSections;
  const hasSections = activeSections && activeSections.length > 0;
  const showSkeletons = autoDetectHeadings && !hasSections && !providedSections;

  // Register content ref from child components
  const registerContent = (ref: HTMLDivElement | null) => {
    contentRef.current = ref;
    // Trigger detection when ref is registered/updated
    if (ref && autoDetectHeadings) {
      setContentVersion(v => v + 1);
    }
  };

  // Refresh content detection (can be called externally)
  const refreshContent = () => {
    setContentVersion(v => v + 1);
  };

  // Auto-detect headings if enabled
  useEffect(() => {
    if (!autoDetectHeadings) return;

    const detectHeadings = () => {
      if (!contentRef.current) return;
      const headings = contentRef.current.querySelectorAll('h2, h3');
      const detected: Section[] = [];
      let currentH2: Section | null = null;

      headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        const id = heading.id;
        const text = heading.textContent || '';

        if (level === 2) {
          currentH2 = { id, title: text, level: 2, subsections: [] };
          detected.push(currentH2);
        } else if (level === 3 && currentH2) {
          currentH2.subsections!.push({ id, title: text });
        }
      });

      setDetectedSections(detected);
    };

    // Store detect function for refreshContent
    detectHeadingsRef.current = detectHeadings;

    // Detect after content renders - delay to allow DOM to settle
    const timer = setTimeout(detectHeadings, 100);

    // Also observe for DOM changes
    const observer = new MutationObserver(() => {
      // Debounce mutation observer calls
      setTimeout(detectHeadings, 50);
    });

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['id'],
      });
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [autoDetectHeadings, contentVersion]); // Re-run when contentVersion changes

  // Track active section with IntersectionObserver
  useEffect(() => {
    if (!hasSections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    activeSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);

      section.subsections?.forEach((subsection) => {
        const subElement = document.getElementById(subsection.id);
        if (subElement) observer.observe(subElement);
      });
    });

    return () => observer.disconnect();
  }, [activeSections, hasSections]);

  // Collect margin notes
  useEffect(() => {
    if (!showMarginNotes || !contentRef.current) return;

    const collectMarginNotes = () => {
      if (!contentRef.current) return;
      const noteElements = contentRef.current.querySelectorAll('.margin-note');
      const notes: Array<{ id: string; content: string; top: number }> = [];

      noteElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const content = element.getAttribute('data-margin-content');

        if (content) {
          notes.push({
            id: element.id || `note-${index}`,
            content: content.replace(/^"|"$/g, ''),
            top: rect.top + scrollTop,
          });
        }
      });

      setMarginNotes(notes);
    };

    collectMarginNotes();
    window.addEventListener('resize', collectMarginNotes);

    const timer = setTimeout(collectMarginNotes, 100);

    return () => {
      window.removeEventListener('resize', collectMarginNotes);
      clearTimeout(timer);
    };
  }, [showMarginNotes, contentVersion]); // Re-run when content changes

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ContentContext.Provider
      value={{
        sections: activeSections,
        activeSection,
        marginNotes,
        scrollToSection,
        registerContent,
        refreshContent,
        showTOC,
        showMarginNotes,
        showSkeletons,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

// Content Sidebar component (Table of Contents - can be hoisted)
function ContentSidebar() {
  const { sections, activeSection, scrollToSection, showTOC, showSkeletons } = useContent();

  if (!showTOC) return null;

  return (
    <aside className="lg:w-64 flex-shrink-0">
      <div className="lg:sticky lg:top-24 bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-slate-900 mb-4">Contents</h3>
        <nav className="space-y-2">
          {showSkeletons ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : sections.length > 0 ? (
            sections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${activeSection === section.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                  {section.title}
                </button>
                {section.subsections && section.subsections.length > 0 && (
                  <div className="ml-3 mt-1 space-y-1 border-l-2 border-slate-200 pl-3">
                    {section.subsections.map((subsection) => (
                      <button
                        key={subsection.id}
                        onClick={() => scrollToSection(subsection.id)}
                        className={`w-full text-left text-sm py-1 flex items-center gap-1 transition-colors ${activeSection === subsection.id
                          ? 'text-blue-600'
                          : 'text-slate-500 hover:text-slate-700'
                          }`}
                      >
                        <ChevronRight size={12} />
                        {subsection.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm italic">No sections available</p>
          )}
        </nav>
      </div>
    </aside>
  );
}

// Content Margin Notes component (can be hoisted)
function ContentMarginNotes() {
  const { marginNotes, showMarginNotes } = useContent();

  if (!showMarginNotes) return null;

  return (
    <aside className="hidden xl:block xl:w-72 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        <div className="text-slate-500 text-sm mb-4">
          <p className="mb-2">Notes & Annotations</p>
          <div className="h-px bg-slate-200"></div>
        </div>
        {marginNotes.length > 0 ? (
          marginNotes.map((note, index) => (
            <div
              key={note.id}
              className="bg-blue-50 border-l-4 border-blue-600 rounded-r p-4 text-sm text-slate-700 shadow-sm"
              style={{
                marginTop: index === 0 ? '0' : '1.5rem'
              }}
            >
              <div className="flex items-start gap-2 mb-2">
                <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  {index + 1}
                </span>
                <span className="text-slate-500 text-xs">Note</span>
              </div>
              <p className="leading-relaxed">{note.content}</p>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-sm italic">No annotations in current view</p>
        )}
      </div>
    </aside>
  );
}

// Content Area component (registers content with context)
interface ContentAreaProps {
  children: ReactNode;
  className?: string;
  contentKey?: string | number; // Key to trigger re-detection when content changes
}

function ContentArea({ children, className = 'flex-1 min-w-0 max-w-4xl', contentKey }: ContentAreaProps) {
  const { registerContent, refreshContent } = useContent();
  const contentRef = useRef<HTMLDivElement>(null);
  const prevContentKeyRef = useRef<string | number | undefined>(contentKey);

  // Register content ref
  useEffect(() => {
    registerContent(contentRef.current);
  }, [registerContent]);

  // Trigger refresh when contentKey changes (e.g., when tab changes)
  useEffect(() => {
    if (contentKey !== undefined && contentKey !== prevContentKeyRef.current) {
      prevContentKeyRef.current = contentKey;
      // Small delay to ensure DOM has updated
      refreshContent();

      // const timer = setTimeout(() => {
      //   refreshContent();
      // }, 150);
      // return () => clearTimeout(timer);
    }
  }, [contentKey, refreshContent]);

  // Also observe children changes as fallback
  useEffect(() => {
    // const timer = setTimeout(() => {
    //   refreshContent();
    // }, 150);
    // return () => clearTimeout(timer);
    refreshContent();
  }, [children, refreshContent]);

  return (
    <div ref={contentRef} className={className}>
      {children}
    </div>
  );
}

// Main Content component (backwards compatible wrapper)
interface ContentProps {
  sections?: Section[];
  children: ReactNode;
  showMarginNotes?: boolean;
  autoDetectHeadings?: boolean;
}

function Content({
  sections,
  children,
  showMarginNotes = false,
  autoDetectHeadings = false
}: ContentProps) {
  // Backwards compatible wrapper - uses context internally
  return (
    <ContentProvider
      sections={sections}
      showMarginNotes={showMarginNotes}
      autoDetectHeadings={autoDetectHeadings}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <ContentSidebar />
        <ContentArea>{children}</ContentArea>
        <ContentMarginNotes />
      </div>
    </ContentProvider>
  );
}

// Compound component pattern - Radix style
Content.Provider = ContentProvider;
Content.Sidebar = ContentSidebar;
Content.MarginNotes = ContentMarginNotes;
Content.Area = ContentArea;

// Export as default compound component
export { Content };

// Backwards compatibility export
export const ContentWithSidebar = Content;

// Two-column layout without margin notes (standard academic layout)
interface TwoColumnLayoutProps {
  leftColumn: ReactNode;
  rightColumn: ReactNode;
}

export function TwoColumnLayout({ leftColumn, rightColumn }: TwoColumnLayoutProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div>{leftColumn}</div>
      <div>{rightColumn}</div>
    </div>
  );
}

// Wide content layout (no sidebar, for full-width content)
interface WideContentLayoutProps {
  children: ReactNode;
}

export function WideContentLayout({ children }: WideContentLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  );
}
