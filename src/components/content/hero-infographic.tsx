import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface HeroInfographicProps {
  icon?: LucideIcon;
  title: string;
  stat?: string;
  statLabel?: string;
  children: ReactNode;
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'red';
}

export function HeroInfographic({ 
  icon: Icon, 
  title, 
  stat, 
  statLabel, 
  children,
  color = 'blue' 
}: HeroInfographicProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      icon: 'bg-blue-400/30',
      stat: 'text-blue-100',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-pink-600',
      icon: 'bg-purple-400/30',
      stat: 'text-purple-100',
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-emerald-600',
      icon: 'bg-green-400/30',
      stat: 'text-green-100',
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-500 to-red-600',
      icon: 'bg-orange-400/30',
      stat: 'text-orange-100',
    },
    red: {
      bg: 'bg-gradient-to-br from-red-500 to-rose-600',
      icon: 'bg-red-400/30',
      stat: 'text-red-100',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} rounded-xl p-8 text-white shadow-xl my-8`}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {Icon && (
          <div className={`${colors.icon} p-6 rounded-full flex-shrink-0`}>
            <Icon size={48} />
          </div>
        )}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-white mb-3">{title}</h3>
          {children}
        </div>
        {stat && (
          <div className="text-center md:text-right flex-shrink-0">
            <div className="text-5xl mb-2">{stat}</div>
            {statLabel && (
              <p className={`${colors.stat} text-sm`}>{statLabel}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
