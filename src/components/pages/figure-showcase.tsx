import { Activity, Brain, Heart, Users } from 'lucide-react';
import {
  AnnotatedFigure,
  ComparisonFigure,
  Figure,
  MultiPanelFigure,
  TimelineFigure
} from '../content/figure';
import { ImageWithFallback } from '../figma/image-with-fallback';

export function FigureShowcase() {
  return (
    <div className="space-y-16">
      <div>
        <h2 className="text-slate-900 mb-2">Figure Component Showcase</h2>
        <p className="text-slate-600 mb-8">
          Explore different figure styles and layouts for presenting research and educational content.
        </p>
      </div>

      {/* Default Figure */}
      <div>
        <h3 className="text-slate-900 mb-6">Standard Figure Variants</h3>

        <Figure
          number="1A"
          caption="Default variant with subtle shadow and border. This style works well for most scientific figures and provides a clean, professional appearance."
          credit="Data from Smith et al., 2023"
          variant="default"
          size="large"
          allowZoom
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200"
            alt="Brain imaging example"
            className="w-full h-auto rounded-lg"
          />
        </Figure>

        <Figure
          number="1B"
          caption="Elevated variant with enhanced shadow depth for emphasis. Use this style when you want the figure to stand out more prominently on the page."
          credit="Conceptual illustration"
          variant="elevated"
          size="large"
          allowZoom
          allowDownload
        >
          <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-lg p-12 flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <Brain size={80} className="text-blue-600 mx-auto mb-4" />
              <p className="text-slate-700">Prefrontal Cortex Activity During Executive Tasks</p>
            </div>
          </div>
        </Figure>

        <Figure
          number="1C"
          caption="Spotlight variant with gradient background. Perfect for highlighting key findings or important visualizations that deserve special attention."
          credit="Meta-analysis results"
          variant="spotlight"
          size="medium"
        >
          <div className="bg-white rounded-lg p-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl text-blue-600 mb-2">73%</div>
                <p className="text-slate-700 text-sm">Heritability</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl text-purple-600 mb-2">5-7%</div>
                <p className="text-slate-700 text-sm">Prevalence</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl text-green-600 mb-2">65%</div>
                <p className="text-slate-700 text-sm">Persist to Adulthood</p>
              </div>
            </div>
          </div>
        </Figure>

        <Figure
          number="1D"
          caption="Minimal variant with no container styling. Ideal for figures that already have strong visual boundaries or when you want maximum focus on the content itself."
          variant="minimal"
          size="medium"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800"
            alt="Medical research"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </Figure>
      </div>

      {/* Multi-Panel Figure */}
      <div>
        <h3 className="text-slate-900 mb-6">Multi-Panel Figures</h3>

        <MultiPanelFigure
          number="2"
          caption="Multi-panel figure demonstrating different brain regions and their associated functions in ADHD. Panel A shows the prefrontal cortex, Panel B shows the basal ganglia, and Panel C shows the cerebellum. Each region shows distinct structural and functional differences in individuals with ADHD."
          credit="Adapted from neuroimaging meta-analyses"
          layout="horizontal"
          variant="elevated"
          panels={[
            {
              label: 'Panel A',
              content: (
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-lg min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <Brain size={60} className="text-blue-600 mx-auto mb-3" />
                    <p className="text-slate-700">Prefrontal Cortex</p>
                  </div>
                </div>
              ),
              description: 'Executive function and impulse control deficits'
            },
            {
              label: 'Panel B',
              content: (
                <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-8 rounded-lg min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <Activity size={60} className="text-purple-600 mx-auto mb-3" />
                    <p className="text-slate-700">Basal Ganglia</p>
                  </div>
                </div>
              ),
              description: 'Motor control and reward processing differences'
            },
          ]}
        />

        <MultiPanelFigure
          number="3"
          caption="Three-panel grid layout showing comorbidity patterns in ADHD across different conditions. This layout is ideal for comparing multiple related conditions or datasets."
          credit="Epidemiological data synthesis"
          layout="grid"
          variant="spotlight"
          panels={[
            {
              label: 'A',
              content: (
                <div className="p-6 min-h-[180px] flex flex-col items-center justify-center">
                  <div className="text-4xl text-blue-600 mb-2">50%</div>
                  <p className="text-slate-700 text-center">Anxiety Disorders</p>
                </div>
              ),
            },
            {
              label: 'B',
              content: (
                <div className="p-6 min-h-[180px] flex flex-col items-center justify-center">
                  <div className="text-4xl text-green-600 mb-2">33%</div>
                  <p className="text-slate-700 text-center">Depression</p>
                </div>
              ),
            },
            {
              label: 'C',
              content: (
                <div className="p-6 min-h-[180px] flex flex-col items-center justify-center">
                  <div className="text-4xl text-orange-600 mb-2">25%</div>
                  <p className="text-slate-700 text-center">Learning Disabilities</p>
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* Annotated Figure */}
      <div>
        <h3 className="text-slate-900 mb-6">Annotated Figures</h3>

        <AnnotatedFigure
          number="4"
          caption="Annotated brain diagram highlighting key regions implicated in ADHD. Hover over each annotation to see the corresponding region emphasized. This interactive format is particularly useful for educational content where multiple elements need explanation."
          credit="Neuroanatomical reference"
          annotations={[
            {
              id: '1',
              label: '1',
              title: 'Prefrontal Cortex',
              description: 'Responsible for executive functions, working memory, and impulse control. Shows reduced volume and delayed maturation in ADHD.',
              color: 'bg-blue-600',
            },
            {
              id: '2',
              label: '2',
              title: 'Anterior Cingulate Cortex',
              description: 'Involved in error detection and conflict monitoring. Reduced activation during attention tasks in ADHD.',
              color: 'bg-purple-600',
            },
            {
              id: '3',
              label: '3',
              title: 'Basal Ganglia',
              description: 'Critical for motor control and reward processing. Structural differences associated with ADHD symptoms.',
              color: 'bg-green-600',
            },
            {
              id: '4',
              label: '4',
              title: 'Cerebellum',
              description: 'Traditionally known for motor coordination, also supports attention and cognitive control. Smaller volume in ADHD.',
              color: 'bg-orange-600',
            },
          ]}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800"
            alt="Brain anatomy"
            className="w-full h-auto rounded-lg"
          />
        </AnnotatedFigure>
      </div>

      {/* Timeline Figure */}
      <div>
        <h3 className="text-slate-900 mb-6">Timeline Figures</h3>

        <TimelineFigure
          number="5"
          caption="Developmental trajectory of ADHD symptoms across the lifespan. This timeline format effectively shows progression and changes over time, making it ideal for developmental or longitudinal data."
          credit="Based on longitudinal cohort studies"
          stages={[
            {
              age: '3-5 years',
              title: 'Preschool Period',
              description: 'Excessive motor activity, impulsivity, and difficulty following rules become apparent. Symptoms often dismissed as typical childhood behavior.',
              icon: <Users size={24} />,
            },
            {
              age: '6-12 years',
              title: 'Elementary School',
              description: 'Academic difficulties emerge as structured learning begins. Inattention, disorganization, and difficulty completing homework become prominent.',
              icon: <Brain size={24} />,
            },
            {
              age: '13-17 years',
              title: 'Adolescence',
              description: 'Hyperactivity may decrease but inattention persists. Increased risk for academic failure, substance use, and social difficulties.',
              icon: <Activity size={24} />,
            },
            {
              age: '18+ years',
              title: 'Adulthood',
              description: 'Symptoms persist in 65% of cases. Challenges with work performance, time management, relationships, and emotional regulation continue.',
              icon: <Heart size={24} />,
            },
          ]}
        />
      </div>

      {/* Comparison Figure */}
      <div>
        <h3 className="text-slate-900 mb-6">Comparison Figures</h3>

        <ComparisonFigure
          number="6"
          caption="Side-by-side comparison of typical brain development versus ADHD brain development. The comparison format makes differences immediately apparent and is excellent for before/after or control vs. treatment comparisons."
          credit="Developmental neuroimaging studies"
          leftPanel={{
            label: 'Neurotypical Development',
            content: (
              <div className="space-y-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600"
                  alt="Typical brain development"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-slate-700 text-sm">Normal cortical maturation timeline</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-slate-700 text-sm">Typical frontal lobe development</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <p className="text-slate-700 text-sm">Age-appropriate brain volume</p>
                  </div>
                </div>
              </div>
            ),
          }}
          rightPanel={{
            label: 'ADHD Development',
            content: (
              <div className="space-y-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600"
                  alt="ADHD brain development"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <p className="text-slate-700 text-sm">Delayed cortical maturation (2-3 years)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <p className="text-slate-700 text-sm">Reduced prefrontal cortex volume</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <p className="text-slate-700 text-sm">3-5% smaller total brain volume</p>
                  </div>
                </div>
              </div>
            ),
          }}
          differences={[
            {
              label: 'Cortical Thickness',
              description: 'Peak cortical thickness achieved 2-3 years later in ADHD',
            },
            {
              label: 'Gray Matter Volume',
              description: 'Reduced in multiple brain regions, particularly basal ganglia',
            },
            {
              label: 'White Matter Integrity',
              description: 'Decreased connectivity in fronto-striatal pathways',
            },
            {
              label: 'Functional Connectivity',
              description: 'Altered default mode network and attention networks',
            },
          ]}
        />
      </div>

      {/* Data Visualization Figure */}
      <div>
        <h3 className="text-slate-900 mb-6">Data Visualization Figures</h3>

        <Figure
          number="7"
          caption="Chart visualization showing ADHD prevalence rates across different age groups and genders. Data visualizations benefit from the elevated variant to draw attention to important findings."
          credit="Population-based epidemiological data"
          variant="elevated"
          size="large"
        >
          <div className="bg-white p-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h5 className="text-slate-900 mb-4 text-center">Male Prevalence</h5>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Ages 4-11</span>
                      <span className="text-slate-900">12.9%</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '12.9%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Ages 12-17</span>
                      <span className="text-slate-900">13.6%</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '13.6%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Adults</span>
                      <span className="text-slate-900">5.4%</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '5.4%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-slate-900 mb-4 text-center">Female Prevalence</h5>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Ages 4-11</span>
                      <span className="text-slate-900">5.6%</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-600 rounded-full" style={{ width: '5.6%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Ages 12-17</span>
                      <span className="text-slate-900">5.8%</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-600 rounded-full" style={{ width: '5.8%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Adults</span>
                      <span className="text-slate-900">3.2%</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-pink-600 rounded-full" style={{ width: '3.2%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Figure>
      </div>
    </div>
  );
}
