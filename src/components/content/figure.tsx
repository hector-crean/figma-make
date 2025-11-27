import { Download, Maximize2, X } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface FigureProps {
  number: string;
  caption: ReactNode;
  credit?: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  variant?: 'default' | 'elevated' | 'bordered' | 'minimal' | 'spotlight';
  allowZoom?: boolean;
  allowDownload?: boolean;
}

export function Figure({
  number,
  caption,
  credit,
  children,
  size = 'medium',
  variant = 'default',
  allowZoom = false,
  allowDownload = false
}: FigureProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'max-w-full',
  };

  const variantStyles = {
    default: {
      container: 'bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow',
      padding: 'p-6',
    },
    elevated: {
      container: 'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300',
      padding: 'p-8',
    },
    bordered: {
      container: 'bg-slate-50 rounded-lg border-2 border-slate-300 overflow-hidden',
      padding: 'p-6',
    },
    minimal: {
      container: 'bg-transparent',
      padding: 'p-0',
    },
    spotlight: {
      container: 'bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow',
      padding: 'p-8',
    },
  };

  const style = variantStyles[variant];

  const figureContent = (
    <figure className={`${sizeClasses[size]} mx-auto my-10 group`}>
      <div className={style.container}>
        <div className={style.padding}>
          {/* Action buttons */}
          {(allowZoom || allowDownload) && (
            <div className="flex gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
              {allowZoom && (
                <button
                  onClick={() => setIsZoomed(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <Maximize2 size={14} />
                  <span>Expand</span>
                </button>
              )}
              {allowDownload && (
                <button
                  onClick={() => {/* Download logic */ }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <Download size={14} />
                  <span>Download</span>
                </button>
              )}
            </div>
          )}

          {/* Figure content */}
          <div className="relative">
            {children}
          </div>
        </div>
      </div>

      {/* Caption */}
      <figcaption className="mt-4 px-2">
        <div className="flex gap-3">
          <span className="flex-shrink-0 px-3 py-1 bg-blue-600 text-white text-sm rounded-md h-fit">
            Fig. {number}
          </span>
          <div className="flex-1">
            <div className="text-slate-700 leading-relaxed">
              {caption}
            </div>
            {credit && (
              <p className="text-slate-500 text-sm mt-2 italic">
                {credit}
              </p>
            )}
          </div>
        </div>
      </figcaption>
    </figure>
  );

  return (
    <>
      {figureContent}

      {/* Zoom modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 p-2 bg-white rounded-full hover:bg-slate-100 transition-colors"
          >
            <X size={24} className="text-slate-900" />
          </button>
          <div className="max-w-7xl max-h-[90vh] overflow-auto">
            {children}
          </div>
        </div>
      )}
    </>
  );
}

// Multi-panel figure component for comparisons
interface MultiPanelFigureProps {
  number: string;
  caption: ReactNode;
  credit?: string;
  panels: {
    label: string;
    content: ReactNode;
    description?: string;
  }[];
  layout?: 'horizontal' | 'vertical' | 'grid';
  variant?: 'default' | 'elevated' | 'spotlight';
}

export function MultiPanelFigure({
  number,
  caption,
  credit,
  panels,
  layout = 'horizontal',
  variant = 'default',
}: MultiPanelFigureProps) {
  const layoutClasses = {
    horizontal: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    vertical: 'flex flex-col gap-6',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  };

  const variantStyles = {
    default: 'bg-white rounded-xl border border-slate-200 shadow-sm',
    elevated: 'bg-white rounded-2xl shadow-lg',
    spotlight: 'bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 shadow-md',
  };

  return (
    <figure className="max-w-6xl mx-auto my-10">
      <div className={`${variantStyles[variant]} overflow-hidden p-8`}>
        <div className={layoutClasses[layout]}>
          {panels.map((panel, index) => (
            <div key={index} className="flex flex-col">
              {/* Panel label */}
              <div className="mb-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-900 text-white text-sm rounded-md">
                  {panel.label}
                </span>
              </div>

              {/* Panel content */}
              <div className="flex-1 bg-slate-50 rounded-lg p-4 border border-slate-200">
                {panel.content}
              </div>

              {/* Panel description */}
              {panel.description && (
                <p className="text-slate-600 text-sm mt-3">{panel.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <figcaption className="mt-4 px-2">
        <div className="flex gap-3">
          <span className="flex-shrink-0 px-3 py-1 bg-blue-600 text-white text-sm rounded-md h-fit">
            Fig. {number}
          </span>
          <div className="flex-1">
            <div className="text-slate-700 leading-relaxed">
              {caption}
            </div>
            {credit && (
              <p className="text-slate-500 text-sm mt-2 italic">
                {credit}
              </p>
            )}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

// Annotated figure component with callouts
interface AnnotatedFigureProps {
  number: string;
  caption: ReactNode;
  credit?: string;
  children: ReactNode;
  annotations: {
    id: string;
    label: string;
    title: string;
    description: string;
    color?: string;
  }[];
}

export function AnnotatedFigure({
  number,
  caption,
  credit,
  children,
  annotations,
}: AnnotatedFigureProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);

  return (
    <figure className="max-w-6xl mx-auto my-10">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Figure with annotations */}
          <div className="relative">
            {children}
          </div>

          {/* Annotation list */}
          <div className="space-y-3">
            <h4 className="text-slate-900 mb-4">Key Points</h4>
            {annotations.map((annotation) => (
              <div
                key={annotation.id}
                onMouseEnter={() => setActiveAnnotation(annotation.id)}
                onMouseLeave={() => setActiveAnnotation(null)}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${activeAnnotation === annotation.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${annotation.color || 'bg-blue-600'
                      }`}
                  >
                    {annotation.label}
                  </span>
                  <div>
                    <h5 className="text-slate-900 text-sm mb-1">{annotation.title}</h5>
                    <p className="text-slate-600 text-sm">{annotation.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Caption */}
      <figcaption className="mt-4 px-2">
        <div className="flex gap-3">
          <span className="flex-shrink-0 px-3 py-1 bg-blue-600 text-white text-sm rounded-md h-fit">
            Fig. {number}
          </span>
          <div className="flex-1">
            <div className="text-slate-700 leading-relaxed">
              {caption}
            </div>
            {credit && (
              <p className="text-slate-500 text-sm mt-2 italic">
                {credit}
              </p>
            )}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

// Timeline figure for showing progression
interface TimelineFigureProps {
  number: string;
  caption: ReactNode;
  credit?: string;
  stages: {
    age: string;
    title: string;
    description: string;
    icon?: ReactNode;
  }[];
}

export function TimelineFigure({
  number,
  caption,
  credit,
  stages,
}: TimelineFigureProps) {
  return (
    <figure className="max-w-5xl mx-auto my-10">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-lg overflow-hidden p-8">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-300 rounded-full hidden md:block" />

          {/* Stages */}
          <div className="space-y-8">
            {stages.map((stage, index) => (
              <div key={index} className="relative flex gap-6 items-start">
                {/* Icon/Number */}
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg z-10">
                  {stage.icon || <span className="text-xl">{index + 1}</span>}
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-xl p-6 shadow-md">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                      {stage.age}
                    </span>
                    <h5 className="text-slate-900">{stage.title}</h5>
                  </div>
                  <p className="text-slate-700">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Caption */}
      <figcaption className="mt-4 px-2">
        <div className="flex gap-3">
          <span className="flex-shrink-0 px-3 py-1 bg-blue-600 text-white text-sm rounded-md h-fit">
            Fig. {number}
          </span>
          <div className="flex-1">
            <div className="text-slate-700 leading-relaxed">
              {caption}
            </div>
            {credit && (
              <p className="text-slate-500 text-sm mt-2 italic">
                {credit}
              </p>
            )}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

// Comparison figure for before/after or side-by-side comparisons
interface ComparisonFigureProps {
  number: string;
  caption: ReactNode;
  credit?: string;
  leftPanel: {
    label: string;
    content: ReactNode;
  };
  rightPanel: {
    label: string;
    content: ReactNode;
  };
  differences?: {
    label: string;
    description: string;
  }[];
}

export function ComparisonFigure({
  number,
  caption,
  credit,
  leftPanel,
  rightPanel,
  differences,
}: ComparisonFigureProps) {
  return (
    <figure className="max-w-6xl mx-auto my-10">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 divide-x divide-slate-200">
          {/* Left panel */}
          <div className="p-8">
            <div className="mb-4">
              <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                {leftPanel.label}
              </span>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              {leftPanel.content}
            </div>
          </div>

          {/* Right panel */}
          <div className="p-8 bg-slate-50">
            <div className="mb-4">
              <span className="px-4 py-2 bg-green-600 text-white rounded-lg">
                {rightPanel.label}
              </span>
            </div>
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              {rightPanel.content}
            </div>
          </div>
        </div>

        {/* Key differences */}
        {differences && differences.length > 0 && (
          <div className="p-8 bg-gradient-to-r from-blue-50 to-green-50 border-t border-slate-200">
            <h5 className="text-slate-900 mb-4">Key Differences</h5>
            <div className="grid md:grid-cols-2 gap-4">
              {differences.map((diff, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-slate-900 text-sm">{diff.label}</p>
                    <p className="text-slate-600 text-sm">{diff.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      <figcaption className="mt-4 px-2">
        <div className="flex gap-3">
          <span className="flex-shrink-0 px-3 py-1 bg-blue-600 text-white text-sm rounded-md h-fit">
            Fig. {number}
          </span>
          <div className="flex-1">
            <div className="text-slate-700 leading-relaxed">
              {caption}
            </div>
            {credit && (
              <p className="text-slate-500 text-sm mt-2 italic">
                {credit}
              </p>
            )}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
