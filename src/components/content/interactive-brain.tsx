import { useState } from 'react';
import { X } from 'lucide-react';

interface BrainRegion {
  id: string;
  name: string;
  path: string;
  info: {
    title: string;
    description: string;
    functions: string[];
    adhdRelevance?: string;
  };
}

const brainRegions: BrainRegion[] = [
  {
    id: 'prefrontal-cortex',
    name: 'Prefrontal Cortex',
    path: 'M 150 80 Q 180 70 210 80 L 220 120 Q 180 110 150 120 Z',
    info: {
      title: 'Prefrontal Cortex',
      description: 'The executive control center of the brain, responsible for higher-order cognitive functions.',
      functions: [
        'Executive function and decision making',
        'Attention regulation and focus',
        'Working memory',
        'Impulse control and emotional regulation',
      ],
      adhdRelevance: 'Reduced activity and connectivity in the prefrontal cortex is consistently observed in ADHD, particularly affecting executive function and impulse control.',
    },
  },
  {
    id: 'basal-ganglia',
    name: 'Basal Ganglia',
    path: 'M 180 140 Q 200 135 220 140 Q 220 160 200 165 Q 180 160 180 140 Z',
    info: {
      title: 'Basal Ganglia',
      description: 'A group of subcortical nuclei involved in motor control and reward processing.',
      functions: [
        'Motor control and movement initiation',
        'Reward processing and motivation',
        'Habit formation',
        'Procedural learning',
      ],
      adhdRelevance: 'Structural differences in the basal ganglia, particularly the caudate nucleus, are associated with ADHD symptoms and response to dopaminergic medications.',
    },
  },
  {
    id: 'anterior-cingulate',
    name: 'Anterior Cingulate Cortex',
    path: 'M 185 110 Q 200 105 215 110 L 215 130 Q 200 125 185 130 Z',
    info: {
      title: 'Anterior Cingulate Cortex',
      description: 'A key region for error detection, conflict monitoring, and emotion regulation.',
      functions: [
        'Error detection and performance monitoring',
        'Conflict resolution',
        'Emotional regulation',
        'Attention allocation',
      ],
      adhdRelevance: 'Reduced activation during error detection and conflict tasks is commonly found in individuals with ADHD, contributing to difficulties in self-monitoring.',
    },
  },
  {
    id: 'cerebellum',
    name: 'Cerebellum',
    path: 'M 170 200 Q 200 195 230 200 Q 230 220 200 225 Q 170 220 170 200 Z',
    info: {
      title: 'Cerebellum',
      description: 'Traditionally associated with motor control, but also plays a role in cognitive functions.',
      functions: [
        'Motor coordination and timing',
        'Attention and processing speed',
        'Cognitive control',
        'Working memory support',
      ],
      adhdRelevance: 'Smaller cerebellar volume has been reported in ADHD, potentially contributing to timing deficits and attention problems.',
    },
  },
];

export function InteractiveBrain() {
  const [selectedRegion, setSelectedRegion] = useState<BrainRegion | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className="my-8">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="text-center mb-4">
          <h4 className="text-slate-900">Interactive Brain Regions in ADHD</h4>
          <p className="text-slate-600 text-sm mt-1">Click on different brain regions to learn more</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* SVG Brain */}
          <div className="flex-1 flex justify-center">
            <svg
              viewBox="0 0 400 280"
              className="w-full max-w-md"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            >
              {/* Brain outline */}
              <path
                d="M 150 60 Q 120 50 100 70 Q 80 90 85 120 Q 80 150 90 180 Q 100 200 130 210 Q 160 220 190 225 Q 220 220 250 210 Q 280 200 290 180 Q 300 150 295 120 Q 300 90 280 70 Q 260 50 230 60 Q 200 50 150 60 Z"
                fill="#e2e8f0"
                stroke="#94a3b8"
                strokeWidth="2"
              />

              {/* Brain regions */}
              {brainRegions.map((region) => (
                <path
                  key={region.id}
                  d={region.path}
                  fill={
                    selectedRegion?.id === region.id
                      ? '#3b82f6'
                      : hoveredRegion === region.id
                      ? '#60a5fa'
                      : '#cbd5e1'
                  }
                  stroke="#475569"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => setSelectedRegion(region)}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  style={{ 
                    opacity: selectedRegion && selectedRegion.id !== region.id ? 0.5 : 1 
                  }}
                />
              ))}

              {/* Labels */}
              {brainRegions.map((region, index) => (
                <text
                  key={`label-${region.id}`}
                  x={320}
                  y={80 + index * 40}
                  fontSize="11"
                  fill="#475569"
                  className="pointer-events-none text-xs"
                >
                  • {region.name}
                </text>
              ))}
            </svg>
          </div>

          {/* Info Panel */}
          <div className="flex-1 min-h-[300px]">
            {selectedRegion ? (
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-slate-900">{selectedRegion.info.title}</h4>
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className="p-1 hover:bg-blue-100 rounded transition-colors"
                  >
                    <X size={18} className="text-slate-600" />
                  </button>
                </div>
                
                <p className="text-slate-700 mb-4">{selectedRegion.info.description}</p>
                
                <div className="mb-4">
                  <p className="text-slate-900 text-sm mb-2">Key Functions:</p>
                  <ul className="space-y-1">
                    {selectedRegion.info.functions.map((func, index) => (
                      <li key={index} className="text-slate-700 text-sm flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedRegion.info.adhdRelevance && (
                  <div className="bg-white rounded p-3 border border-blue-200">
                    <p className="text-slate-900 text-sm mb-1">ADHD Relevance:</p>
                    <p className="text-slate-700 text-sm">{selectedRegion.info.adhdRelevance}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 h-full flex items-center justify-center">
                <p className="text-slate-500 text-center">
                  Select a brain region to view detailed information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
