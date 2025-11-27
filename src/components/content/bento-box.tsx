import { useState, ReactNode } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

interface BentoBoxItemProps {
  title: string;
  description: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export function BentoBoxItem({ 
  title, 
  description, 
  children, 
  size = 'medium',
  color = 'bg-gradient-to-br from-blue-50 to-indigo-50'
}: BentoBoxItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 md:col-span-2',
    large: 'col-span-1 md:col-span-2 lg:col-span-3',
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-start justify-between">
            <div>
              <h3 className="text-slate-900">{title}</h3>
              <p className="text-slate-600 text-sm mt-1">{description}</p>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
            >
              <Minimize2 size={20} className="text-slate-600" />
            </button>
          </div>
          <div className="px-6 py-6 text-slate-700">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} ${color} rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-slate-900">{title}</h4>
          <p className="text-slate-600 text-sm mt-1">{description}</p>
        </div>
        <button
          onClick={() => setIsExpanded(true)}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors flex-shrink-0"
        >
          <Maximize2 size={18} className="text-slate-600" />
        </button>
      </div>
      <div className="text-slate-700 text-sm line-clamp-4">
        {children}
      </div>
    </div>
  );
}

interface BentoBoxGridProps {
  children: ReactNode;
}

export function BentoBoxGrid({ children }: BentoBoxGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}
