import { ReactNode, HTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

// Semantic heading components with proper hierarchy
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  id?: string;
  icon?: LucideIcon;
  badge?: string;
  variant?: 'default' | 'section' | 'accent' | 'subtle';
}

// H1 - Page title (should only be one per page)
export function H1({ children, id, icon: Icon, badge, variant = 'default', className = '', ...props }: HeadingProps) {
  const variants = {
    default: 'text-slate-900 border-b-2 border-blue-600 pb-3',
    section: 'text-slate-900',
    accent: 'text-blue-600',
    subtle: 'text-slate-700',
  };

  return (
    <h1 
      id={id} 
      className={`flex items-center gap-3 scroll-mt-24 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={32} className="text-blue-600 flex-shrink-0" />}
      <span className="flex-1">{children}</span>
      {badge && (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
          {badge}
        </span>
      )}
    </h1>
  );
}

// H2 - Major sections (TOC level 1)
export function H2({ children, id, icon: Icon, badge, variant = 'default', className = '', ...props }: HeadingProps) {
  const variants = {
    default: 'text-slate-900 border-l-4 border-blue-600 pl-4',
    section: 'text-slate-900',
    accent: 'text-blue-600',
    subtle: 'text-slate-700',
  };

  return (
    <h2 
      id={id} 
      className={`flex items-center gap-3 scroll-mt-24 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={24} className="text-blue-600 flex-shrink-0" />}
      <span className="flex-1">{children}</span>
      {badge && (
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
          {badge}
        </span>
      )}
    </h2>
  );
}

// H3 - Subsections (TOC level 2)
export function H3({ children, id, icon: Icon, badge, variant = 'default', className = '', ...props }: HeadingProps) {
  const variants = {
    default: 'text-slate-900',
    section: 'text-slate-900 border-l-2 border-slate-300 pl-3',
    accent: 'text-blue-600',
    subtle: 'text-slate-700',
  };

  return (
    <h3 
      id={id} 
      className={`flex items-center gap-2 scroll-mt-24 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={20} className="text-slate-600 flex-shrink-0" />}
      <span className="flex-1">{children}</span>
      {badge && (
        <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">
          {badge}
        </span>
      )}
    </h3>
  );
}

// H4 - Sub-subsections (typically not in TOC)
export function H4({ children, id, icon: Icon, className = '', ...props }: HeadingProps) {
  return (
    <h4 
      id={id} 
      className={`text-slate-900 flex items-center gap-2 scroll-mt-24 ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} className="text-slate-600 flex-shrink-0" />}
      <span>{children}</span>
    </h4>
  );
}

// H5 - Minor headings within content
export function H5({ children, id, className = '', ...props }: HeadingProps) {
  return (
    <h5 
      id={id} 
      className={`text-slate-900 scroll-mt-24 ${className}`}
      {...props}
    >
      {children}
    </h5>
  );
}

// H6 - Smallest semantic heading
export function H6({ children, id, className = '', ...props }: HeadingProps) {
  return (
    <h6 
      id={id} 
      className={`text-slate-700 scroll-mt-24 ${className}`}
      {...props}
    >
      {children}
    </h6>
  );
}

// Non-semantic heading-styled text components
// Use these when you need heading-like styling but not semantic hierarchy

interface TextStyleProps {
  children: ReactNode;
  className?: string;
}

export function DisplayText({ children, className = '' }: TextStyleProps) {
  return (
    <div className={`text-4xl text-slate-900 ${className}`}>
      {children}
    </div>
  );
}

export function HeadingXL({ children, className = '' }: TextStyleProps) {
  return (
    <div className={`text-2xl text-slate-900 ${className}`}>
      {children}
    </div>
  );
}

export function HeadingLG({ children, className = '' }: TextStyleProps) {
  return (
    <div className={`text-xl text-slate-900 ${className}`}>
      {children}
    </div>
  );
}

export function HeadingMD({ children, className = '' }: TextStyleProps) {
  return (
    <div className={`text-lg text-slate-900 ${className}`}>
      {children}
    </div>
  );
}

export function HeadingSM({ children, className = '' }: TextStyleProps) {
  return (
    <div className={`text-base text-slate-900 ${className}`}>
      {children}
    </div>
  );
}

// Section component with automatic heading
interface SectionProps {
  id: string;
  title: string;
  level?: 2 | 3 | 4;
  icon?: LucideIcon;
  badge?: string;
  variant?: 'default' | 'section' | 'accent' | 'subtle';
  children: ReactNode;
  className?: string;
}

export function Section({ 
  id, 
  title, 
  level = 2, 
  icon, 
  badge, 
  variant = 'default',
  children, 
  className = '' 
}: SectionProps) {
  const HeadingComponent = level === 2 ? H2 : level === 3 ? H3 : H4;
  
  const spacing = {
    2: 'mb-12',
    3: 'mb-8',
    4: 'mb-6',
  };

  return (
    <section id={id} className={`${spacing[level]} ${className}`}>
      <HeadingComponent 
        id={id} 
        icon={icon} 
        badge={badge}
        variant={variant}
        className="mb-4"
      >
        {title}
      </HeadingComponent>
      {children}
    </section>
  );
}

// Utility function to extract headings for TOC
export function extractHeadings(containerRef: HTMLElement | null): Array<{
  id: string;
  text: string;
  level: number;
}> {
  if (!containerRef) return [];
  
  const headings = containerRef.querySelectorAll('h2, h3');
  return Array.from(headings).map(heading => ({
    id: heading.id,
    text: heading.textContent || '',
    level: parseInt(heading.tagName.charAt(1)),
  }));
}
