import { H2, H3 } from '../content/heading';
import {
  AspectRatio,
  FullBleed,
  FullBleedContent,
  FullBleedFigure,
  MobileBleed,
  Panel,
  Section
} from '../layout/full-bleed';

export function FullBleedShowcase() {
  return (
    <div className="space-y-16">
      {/* Introduction */}
      <div>
        <H2 id="intro">Full-Bleed Layout Patterns</H2>
        <p className="text-slate-600 mt-4">
          Demonstrating various ways to break out of the content container for
          impactful figures, data visualizations, and visual sections.
        </p>
      </div>

      {/* Regular content for comparison */}
      <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-6">
        <p className="text-slate-700 text-center">
          ⬅️ This is <strong>regular content</strong> within the normal content width ➡️
        </p>
      </div>

      {/* Variant 1: Content Area Bleed */}
      <div>
        <H3 id="content-area">Content Area Bleed</H3>
        <p className="text-slate-600 mb-4">
          Extends to the edges of the content card, respecting page padding.
          <strong> Most common for figures and data visualizations.</strong>
        </p>

        <FullBleed variant="content-area" backgroundColor="#dbeafe" padding="md">
          <div className="text-center">
            <div className="inline-block bg-white rounded-lg p-8 shadow-lg">
              <div className="w-full max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-64 rounded-lg flex items-center justify-center text-white">
                  <div className="text-center">
                    <p className="text-2xl mb-2">Content Area Full-Bleed</p>
                    <p className="text-sm opacity-80">Respects content card edges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FullBleed>
      </div>

      {/* Variant 2: Viewport Bleed */}
      <div>
        <H3 id="viewport">Viewport Bleed</H3>
        <p className="text-slate-600 mb-4">
          Extends to the full browser width. <strong>Use sparingly for maximum impact.</strong>
        </p>

        <FullBleed variant="viewport" backgroundColor="#dcfce7" padding="lg">
          <FullBleedContent>
            <div className="text-center">
              <div className="inline-block bg-white rounded-lg p-8 shadow-lg">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-64 rounded-lg flex items-center justify-center text-white w-full max-w-4xl">
                  <div className="text-center">
                    <p className="text-2xl mb-2">Viewport Full-Bleed</p>
                    <p className="text-sm opacity-80">Full browser width</p>
                    <p className="text-sm opacity-80 mt-2">Content centered with FullBleedContent</p>
                  </div>
                </div>
              </div>
            </div>
          </FullBleedContent>
        </FullBleed>
      </div>

      {/* Variant 3: Breakout */}
      <div>
        <H3 id="breakout">Breakout Width</H3>
        <p className="text-slate-600 mb-4">
          Moderately wider than normal content. <strong>Good for emphasis without going full-width.</strong>
        </p>

        <FullBleed variant="breakout" backgroundColor="#fef3c7" padding="md">
          <div className="text-center">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 h-48 rounded-lg flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-2xl mb-2">Breakout Width</p>
                <p className="text-sm opacity-80">Wider but not full-width</p>
              </div>
            </div>
          </div>
        </FullBleed>
      </div>

      {/* Figure with Full-Bleed Image */}
      <div>
        <H3 id="figure">Full-Bleed Figure</H3>
        <p className="text-slate-600 mb-4">
          Image extends full-width while caption stays in content area.
        </p>

        <FullBleedFigure
          variant="content-area"
          backgroundColor="#f1f5f9"
          figureNumber="Fig. 1"
          image={
            <AspectRatio ratio="16/9">
              <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <p className="text-3xl mb-2">Full-Bleed Figure</p>
                  <p className="text-sm opacity-80">Image spans full width</p>
                </div>
              </div>
            </AspectRatio>
          }
          caption={
            <div>
              <p className="mb-2">
                <strong>Brain activation patterns during attention tasks.</strong> The image
                extends to the full content area width, creating maximum visual impact, while
                the caption remains within the readable content width.
              </p>
              <p className="text-sm text-slate-500 italic">
                Data from Smith et al., 2023
              </p>
            </div>
          }
        />
      </div>

      {/* Timeline or Data Visualization */}
      <div>
        <H3 id="timeline">Wide Timeline/Data Viz</H3>
        <p className="text-slate-600 mb-4">
          Perfect for timelines, wide charts, or data that needs horizontal space.
        </p>

        <FullBleed variant="content-area" backgroundColor="white" padding="md">
          <div className="border-2 border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-4 overflow-x-auto pb-4">
              {[
                { year: '1980s', color: 'bg-blue-500', event: 'ADHD Recognition' },
                { year: '1990s', color: 'bg-green-500', event: 'Stimulant Treatment' },
                { year: '2000s', color: 'bg-yellow-500', event: 'Neuroscience Research' },
                { year: '2010s', color: 'bg-orange-500', event: 'Brain Imaging' },
                { year: '2020s', color: 'bg-red-500', event: 'Personalized Medicine' },
              ].map((item, i) => (
                <div key={i} className="flex-shrink-0 text-center">
                  <div className={`${item.color} w-32 h-32 rounded-lg flex items-center justify-center text-white shadow-lg mb-3`}>
                    <p className="font-bold">{item.year}</p>
                  </div>
                  <p className="text-sm text-slate-700">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </FullBleed>
      </div>

      {/* Colored Background Section */}
      <div>
        <H3 id="section">Full-Width Colored Sections</H3>
        <p className="text-slate-600 mb-4">
          Create visual breaks with full-width background colors.
        </p>

        <Section
          fullBleed
          backgroundColor="#1e40af"
          padding="lg"
          className="text-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-white text-3xl mb-4">Key Takeaway</h4>
            <p className="text-lg opacity-90 mb-6">
              ADHD affects approximately 5-7% of children and 2.5% of adults worldwide,
              making it one of the most common neurodevelopmental disorders.
            </p>
            <div className="flex gap-8 justify-center text-sm">
              <div>
                <p className="text-4xl mb-1">5-7%</p>
                <p className="opacity-80">Children</p>
              </div>
              <div>
                <p className="text-4xl mb-1">2.5%</p>
                <p className="opacity-80">Adults</p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Panel Examples */}
      <div>
        <H3 id="panels">Panels - Regular vs Bleed</H3>
        <p className="text-slate-600 mb-6">
          Panels can stay contained or bleed to content edges.
        </p>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-slate-500 mb-2">Regular Panel:</p>
            <Panel color="blue">
              <h5 className="text-slate-900 mb-2">Regular Panel</h5>
              <p className="text-slate-700">
                This panel stays within the normal content width. Good for callouts
                and side notes that don't need extra emphasis.
              </p>
            </Panel>
          </div>

          <div>
            <p className="text-sm text-slate-500 mb-2">Bleed Panel:</p>
            <Panel color="green" bleed>
              <h5 className="text-slate-900 mb-2">Bleed Panel</h5>
              <p className="text-slate-700">
                This panel extends to the content area edges, creating more visual weight
                and drawing attention. Perfect for important warnings or key concepts.
              </p>
            </Panel>
          </div>
        </div>
      </div>

      {/* Mobile Bleed */}
      <div>
        <H3 id="mobile">Mobile-Only Bleed</H3>
        <p className="text-slate-600 mb-4">
          Content that bleeds on mobile but stays contained on desktop.
        </p>

        <MobileBleed>
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-white text-center">
            <p className="text-xl">Mobile Bleed Example</p>
            <p className="text-sm opacity-80 mt-2">
              Bleeds to edges on mobile, contained on desktop
            </p>
          </div>
        </MobileBleed>
      </div>

      {/* Aspect Ratio Examples */}
      <div>
        <H3 id="aspect-ratios">Aspect Ratios for Media</H3>
        <p className="text-slate-600 mb-4">
          Maintain consistent aspect ratios for images and videos.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500 mb-2">16:9 (Standard Video)</p>
            <AspectRatio ratio="16/9">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-full h-full flex items-center justify-center text-white rounded-lg">
                16:9
              </div>
            </AspectRatio>
          </div>

          <div>
            <p className="text-sm text-slate-500 mb-2">4:3 (Classic Photo)</p>
            <AspectRatio ratio="4/3">
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-full h-full flex items-center justify-center text-white rounded-lg">
                4:3
              </div>
            </AspectRatio>
          </div>

          <div>
            <p className="text-sm text-slate-500 mb-2">1:1 (Square)</p>
            <AspectRatio ratio="1/1">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-full h-full flex items-center justify-center text-white rounded-lg">
                1:1
              </div>
            </AspectRatio>
          </div>

          <div>
            <p className="text-sm text-slate-500 mb-2">21:9 (Ultrawide)</p>
            <AspectRatio ratio="21/9">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-full h-full flex items-center justify-center text-white rounded-lg">
                21:9
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div>
        <H2 id="best-practices">Best Practices</H2>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Panel color="green">
            <h5 className="text-green-900 mb-3">✓ Do This</h5>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Use full-bleed for data visualizations that need space</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Keep captions in readable width even if image is wide</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Use breakout width for moderate emphasis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Reserve viewport bleed for major visual moments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Test on mobile - some full-bleeds work better on desktop</span>
              </li>
            </ul>
          </Panel>

          <Panel color="red">
            <h5 className="text-red-900 mb-3">✗ Avoid This</h5>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Overusing full-bleed - it loses impact</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Making body text full viewport width (unreadable)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Breaking bleed without purpose</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Ignoring aspect ratios for media</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Forgetting to center content within viewport bleeds</span>
              </li>
            </ul>
          </Panel>
        </div>
      </div>

      {/* Usage Guide */}
      <Panel color="blue" bleed>
        <H3 id="usage">Quick Usage Guide</H3>
        <div className="grid md:grid-cols-3 gap-6 mt-4 text-sm">
          <div>
            <h5 className="text-slate-900 mb-2">Content Area Bleed</h5>
            <p className="text-slate-600 mb-2">Use for:</p>
            <ul className="space-y-1 text-slate-700">
              <li>• Wide data tables</li>
              <li>• Charts and graphs</li>
              <li>• Brain imaging figures</li>
              <li>• Timeline visualizations</li>
            </ul>
          </div>

          <div>
            <h5 className="text-slate-900 mb-2">Breakout Width</h5>
            <p className="text-slate-600 mb-2">Use for:</p>
            <ul className="space-y-1 text-slate-700">
              <li>• Emphasized quotes</li>
              <li>• Important callouts</li>
              <li>• Comparison panels</li>
              <li>• Code blocks</li>
            </ul>
          </div>

          <div>
            <h5 className="text-slate-900 mb-2">Viewport Bleed</h5>
            <p className="text-slate-600 mb-2">Use for:</p>
            <ul className="space-y-1 text-slate-700">
              <li>• Hero images</li>
              <li>• Full-width stats</li>
              <li>• Section dividers</li>
              <li>• Impact moments</li>
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
}
