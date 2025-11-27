import { ReactNode, CSSProperties } from 'react';

interface FullBleedProps {
  children: ReactNode;
  variant?: 'viewport' | 'content-area' | 'breakout' | 'sidebar-aware';
  backgroundColor?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
}

/**
 * Full-bleed component that breaks out of the content container
 * 
 * Variants:
 * - viewport: Full width of the browser viewport
 * - content-area: Full width of the content area (inside page padding)
 * - breakout: Moderately wider than normal content
 * - sidebar-aware: Extends to edges but respects sidebar space
 */
export function FullBleed({ 
  children, 
  variant = 'content-area',
  backgroundColor,
  padding = 'md',
  className = '',
  style = {}
}: FullBleedProps) {
  
  const paddingClasses = {
    none: '',
    sm: 'py-4 px-4',
    md: 'py-8 px-4 sm:px-6 lg:px-8',
    lg: 'py-12 px-4 sm:px-6 lg:px-8',
  };

  const variants = {
    // Breaks out to full viewport width
    viewport: 'w-screen relative left-1/2 right-1/2 -mx-[50vw]',
    
    // Breaks out to the content area (respecting page padding)
    'content-area': `
      relative 
      -mx-4 sm:-mx-6 lg:-mx-8
      w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)]
    `,
    
    // Moderate breakout - wider than content but not full width
    breakout: `
      relative 
      -mx-8 sm:-mx-12 lg:-mx-16
      w-[calc(100%+4rem)] sm:w-[calc(100%+6rem)] lg:w-[calc(100%+8rem)]
    `,
    
    // Extends to container edges but aware of sidebar
    'sidebar-aware': `
      relative
      -mx-4 sm:-mx-6 lg:-mx-8
      w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)]
    `,
  };

  return (
    <div
      className={`${variants[variant]} ${paddingClasses[padding]} ${className}`}
      style={{ backgroundColor, ...style }}
    >
      {children}
    </div>
  );
}

/**
 * Wrapper for content that should maintain max-width within a full-bleed section
 */
export function FullBleedContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
}

/**
 * Special full-bleed variant for figures with captions
 * The image goes full-width but caption stays in content area
 */
interface FullBleedFigureProps {
  image: ReactNode;
  caption?: ReactNode;
  figureNumber?: string;
  variant?: 'viewport' | 'content-area' | 'breakout';
  backgroundColor?: string;
}

export function FullBleedFigure({ 
  image, 
  caption, 
  figureNumber,
  variant = 'content-area',
  backgroundColor = '#f8fafc'
}: FullBleedFigureProps) {
  return (
    <figure className="my-8">
      <FullBleed variant={variant} backgroundColor={backgroundColor} padding="md">
        <FullBleedContent>
          {image}
        </FullBleedContent>
      </FullBleed>
      
      {(caption || figureNumber) && (
        <figcaption className="mt-4 px-2">
          <div className="flex gap-3">
            {figureNumber && (
              <span className="flex-shrink-0 px-3 py-1 bg-blue-600 text-white text-sm rounded-md h-fit">
                {figureNumber}
              </span>
            )}
            {caption && (
              <div className="flex-1 text-slate-700 leading-relaxed">
                {caption}
              </div>
            )}
          </div>
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Grid-based layout that supports full-bleed items
 * Uses CSS Grid to create named areas
 */
interface GridLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function GridLayout({ children, showSidebar = false }: GridLayoutProps) {
  return (
    <div 
      className={`
        grid 
        ${showSidebar ? 'lg:grid-cols-[1fr_minmax(0,65ch)_1fr]' : 'grid-cols-[1fr_minmax(0,65ch)_1fr]'}
        gap-0
      `}
      style={{
        gridTemplateAreas: showSidebar 
          ? '"sidebar content margin"'
          : '". content ."'
      }}
    >
      {children}
    </div>
  );
}

/**
 * Grid items for use within GridLayout
 */
export function GridContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div style={{ gridArea: 'content' }} className={className}>
      {children}
    </div>
  );
}

export function GridFullWidth({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div style={{ gridColumn: '1 / -1' }} className={className}>
      {children}
    </div>
  );
}

export function GridBreakout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div style={{ gridColumn: '2 / -1' }} className={className}>
      {children}
    </div>
  );
}

/**
 * Aspect ratio container for full-bleed media
 */
interface AspectRatioProps {
  children: ReactNode;
  ratio?: '16/9' | '4/3' | '1/1' | '21/9' | 'golden';
  className?: string;
}

export function AspectRatio({ children, ratio = '16/9', className = '' }: AspectRatioProps) {
  const ratios = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]',
    'golden': 'aspect-[1.618/1]',
  };

  return (
    <div className={`relative ${ratios[ratio]} ${className}`}>
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}

/**
 * Full-bleed section with inner content constraints
 * Useful for colored backgrounds that span full width
 */
interface SectionProps {
  children: ReactNode;
  backgroundColor?: string;
  backgroundImage?: string;
  fullBleed?: boolean;
  contained?: boolean; // Whether inner content should be constrained
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Section({ 
  children, 
  backgroundColor,
  backgroundImage,
  fullBleed = false,
  contained = true,
  padding = 'lg',
  className = ''
}: SectionProps) {
  const paddingClasses = {
    none: '',
    sm: 'py-6',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  };

  const content = contained ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  ) : children;

  if (fullBleed) {
    return (
      <FullBleed 
        variant="viewport" 
        backgroundColor={backgroundColor}
        padding="none"
        className={className}
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
      >
        <div className={paddingClasses[padding]}>
          {content}
        </div>
      </FullBleed>
    );
  }

  return (
    <div 
      className={`${paddingClasses[padding]} ${className}`}
      style={{ 
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined 
      }}
    >
      {content}
    </div>
  );
}

/**
 * Bleed to edges on mobile, contained on desktop
 */
export function MobileBleed({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`-mx-4 sm:mx-0 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Panel that can bleed or stay contained
 */
interface PanelProps {
  children: ReactNode;
  bleed?: boolean;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  className?: string;
}

export function Panel({ children, bleed = false, color = 'blue', className = '' }: PanelProps) {
  const colors = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    red: 'bg-red-50 border-red-200',
    gray: 'bg-slate-50 border-slate-200',
  };

  const content = (
    <div className={`${colors[color]} border rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );

  if (bleed) {
    return (
      <FullBleed variant="content-area" padding="none">
        <div className="px-4 sm:px-6 lg:px-8">
          {content}
        </div>
      </FullBleed>
    );
  }

  return content;
}
