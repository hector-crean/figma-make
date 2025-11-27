import { Activity, AlertCircle, Beaker, Brain, Users } from 'lucide-react';
import { DisplayText, H1, H2, H3, H4, H5, H6, HeadingLG, HeadingMD, HeadingSM, HeadingXL } from '../content/heading';
import { ContentWithSidebar } from '../layout/content-with-sidebar';

export function HeadingShowcase() {
  return (
    <ContentWithSidebar autoDetectHeadings={true}>
      <div className="bg-white rounded-lg border border-slate-200 p-8">

        {/* Page Title */}
        <H1 id="heading-hierarchy" icon={Brain} variant="default" className="mb-8">
          Typography & Heading Hierarchy
        </H1>

        <p className="text-slate-600 mb-8">
          A comprehensive guide to using semantic headings effectively while maintaining visual
          flexibility. This system balances accessibility, SEO, and design needs.
        </p>

        {/* Semantic Hierarchy */}
        <H2 id="semantic-hierarchy" icon={Beaker} variant="default">
          Semantic Heading Levels
        </H2>

        <p className="text-slate-700 mb-6">
          Semantic headings (h1-h6) create a document outline that screen readers and search engines
          can parse. They should be used in hierarchical order without skipping levels.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r mb-8">
          <h5 className="text-slate-900 mb-3">Heading Hierarchy Rules:</h5>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>One H1 per page</strong> - The main page title</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>Don't skip levels</strong> - Don't jump from h2 to h4</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>H2 for main sections</strong> - These appear in TOC</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>H3 for subsections</strong> - Also appear in TOC</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span><strong>H4-H6 for deeper nesting</strong> - Typically not in TOC</span>
            </li>
          </ul>
        </div>

        <H3 id="h2-examples" variant="section">
          H2 - Major Sections
        </H3>

        <p className="text-slate-700 mb-4">
          H2 headings define major sections of your content. They automatically appear in the
          table of contents and should clearly describe the section content.
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <H2 id="example-h2-default">
              Default H2 Style
            </H2>
            <p className="text-slate-600 text-sm mt-2">
              Standard H2 with left border accent - perfect for academic content
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <H2 id="example-h2-icon" icon={Brain}>
              H2 with Icon
            </H2>
            <p className="text-slate-600 text-sm mt-2">
              Adding icons helps with visual scanning and topic identification
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <H2 id="example-h2-badge" badge="New">
              H2 with Badge
            </H2>
            <p className="text-slate-600 text-sm mt-2">
              Badges draw attention to important or updated sections
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <H2 id="example-h2-accent" variant="accent">
              H2 Accent Variant
            </H2>
            <p className="text-slate-600 text-sm mt-2">
              Accent color for special emphasis
            </p>
          </div>
        </div>

        <H3 id="h3-examples" variant="section">
          H3 - Subsections
        </H3>

        <p className="text-slate-700 mb-4">
          H3 headings break down H2 sections into smaller topics. They nest under H2 in the TOC.
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <H3 id="example-h3-default">
              Default H3 Style
            </H3>
            <p className="text-slate-600 text-sm mt-2">
              Clean, readable subsection heading
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <H3 id="example-h3-section" variant="section">
              H3 Section Variant
            </H3>
            <p className="text-slate-600 text-sm mt-2">
              With left border for additional visual hierarchy
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <H3 id="example-h3-icon" icon={Activity}>
              H3 with Icon
            </H3>
            <p className="text-slate-600 text-sm mt-2">
              Icons provide quick visual context
            </p>
          </div>
        </div>

        <H3 id="h4-h6-examples" variant="section">
          H4, H5, H6 - Deep Nesting
        </H3>

        <p className="text-slate-700 mb-4">
          These headings are for deeper content structure. They typically don't appear in the TOC
          but maintain the document outline for accessibility.
        </p>

        <div className="space-y-6 mb-8 bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div>
            <H4 id="example-h4" icon={Users}>
              H4 - Sub-subsection Heading
            </H4>
            <p className="text-slate-600 text-sm mt-2">
              Used for detailed breakdowns within subsections
            </p>
          </div>

          <div className="ml-6">
            <H5 id="example-h5">
              H5 - Minor Heading
            </H5>
            <p className="text-slate-600 text-sm mt-2">
              For even more granular organization
            </p>
          </div>

          <div className="ml-12">
            <H6 id="example-h6">
              H6 - Smallest Semantic Heading
            </H6>
            <p className="text-slate-600 text-sm mt-2">
              Rarely needed, but available for complex documents
            </p>
          </div>
        </div>

        {/* Non-semantic Styling */}
        <H2 id="non-semantic-styling" icon={AlertCircle}>
          Non-Semantic Heading Styles
        </H2>

        <p className="text-slate-700 mb-6">
          Sometimes you need heading-like styling without semantic meaning. For example, in
          figures, cards, or UI elements where the heading doesn't contribute to document outline.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r mb-6">
          <h5 className="text-slate-900 mb-3">When to Use Non-Semantic Headings:</h5>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Within figure captions or table headers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Inside cards, modals, or dialog boxes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>For visual hierarchy that shouldn't affect document outline</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>When you've already used all 6 heading levels</span>
            </li>
          </ul>
        </div>

        <H3 id="display-text" variant="section">
          Display & Styled Text Components
        </H3>

        <div className="space-y-6 mb-8">
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <DisplayText className="mb-2">Display Text</DisplayText>
            <p className="text-slate-600 text-sm">
              Largest non-semantic text style - use for hero sections or major callouts
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <HeadingXL className="mb-2">Heading XL</HeadingXL>
            <p className="text-slate-600 text-sm">
              Equivalent to H1 sizing without semantic meaning
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <HeadingLG className="mb-2">Heading LG</HeadingLG>
            <p className="text-slate-600 text-sm">
              Equivalent to H2 sizing - use in cards or UI components
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <HeadingMD className="mb-2">Heading MD</HeadingMD>
            <p className="text-slate-600 text-sm">
              Equivalent to H3 sizing
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <HeadingSM className="mb-2">Heading SM</HeadingSM>
            <p className="text-slate-600 text-sm">
              Smallest styled heading - for minor labels
            </p>
          </div>
        </div>

        {/* Practical Examples */}
        <H2 id="practical-examples" icon={Beaker}>
          Practical Examples
        </H2>

        <H3 id="example-academic" variant="section">
          Example: Academic Article Structure
        </H3>

        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 mb-8">
          <div className="space-y-4 text-sm">
            <div className="border-l-4 border-blue-600 pl-3">
              <code className="text-slate-700">H1: "The Neurobiology of ADHD"</code>
              <p className="text-slate-600 mt-1">Page title - only one per page</p>
            </div>

            <div className="ml-4 border-l-4 border-blue-500 pl-3">
              <code className="text-slate-700">H2: "Introduction"</code>
              <p className="text-slate-600 mt-1">Major section - appears in TOC</p>
            </div>

            <div className="ml-4 border-l-4 border-blue-500 pl-3">
              <code className="text-slate-700">H2: "Brain Structure"</code>
            </div>

            <div className="ml-8 border-l-4 border-blue-400 pl-3">
              <code className="text-slate-700">H3: "Prefrontal Cortex"</code>
              <p className="text-slate-600 mt-1">Subsection - nested in TOC</p>
            </div>

            <div className="ml-12 border-l-4 border-blue-300 pl-3">
              <code className="text-slate-700">H4: "Executive Functions"</code>
              <p className="text-slate-600 mt-1">Sub-subsection - not in TOC</p>
            </div>

            <div className="ml-8 border-l-4 border-blue-400 pl-3">
              <code className="text-slate-700">H3: "Basal Ganglia"</code>
            </div>

            <div className="ml-4 border-l-4 border-blue-500 pl-3">
              <code className="text-slate-700">H2: "Neurotransmitters"</code>
            </div>

            <div className="ml-4 border-l-4 border-blue-500 pl-3">
              <code className="text-slate-700">H2: "Conclusion"</code>
            </div>
          </div>
        </div>

        <H3 id="example-figure" variant="section">
          Example: Figure with Non-Semantic Heading
        </H3>

        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
          <div className="bg-slate-100 rounded p-8 mb-3">
            <div className="text-center text-slate-500">
              [Figure Image Here]
            </div>
          </div>
          <figcaption>
            <div className="flex gap-3 items-start">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md flex-shrink-0">
                Fig. 1
              </span>
              <div>
                <HeadingMD className="mb-2">Brain Regions in ADHD</HeadingMD>
                <p className="text-slate-700 text-sm">
                  This uses HeadingMD instead of H3 because it's within a figure and shouldn't
                  appear in the document outline or TOC.
                </p>
              </div>
            </div>
          </figcaption>
        </div>

        <H3 id="example-card" variant="section">
          Example: Card Component Headings
        </H3>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <HeadingLG className="mb-3 text-blue-900">Symptom Domain</HeadingLG>
            <p className="text-slate-700 text-sm mb-4">
              Using HeadingLG instead of H2 because this card heading is presentational,
              not part of the main content hierarchy.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Inattention</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Hyperactivity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Impulsivity</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <HeadingLG className="mb-3 text-green-900">Treatment Options</HeadingLG>
            <p className="text-slate-700 text-sm mb-4">
              Cards in a grid shouldn't use semantic headings to avoid cluttering the
              document outline.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Medication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Therapy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Lifestyle changes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Best Practices */}
        <H2 id="best-practices">
          Best Practices & Guidelines
        </H2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border-l-4 border-green-600 rounded-r p-4">
            <h5 className="text-green-900 mb-3">✓ Do This</h5>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Use semantic headings (H1-H6) for main content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Maintain proper hierarchy (don't skip levels)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Add IDs to headings for linking/TOC</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Use styled text components in UI elements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Keep headings concise and descriptive</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 rounded-r p-4">
            <h5 className="text-red-900 mb-3">✗ Avoid This</h5>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Multiple H1s on one page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Skipping heading levels (H2 → H4)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Using headings only for styling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Semantic headings in repeating UI elements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Headings without IDs (breaks TOC/linking)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8">
          <DisplayText className="text-white mb-4">Quick Reference</DisplayText>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="mb-3">Semantic Headings:</h5>
              <ul className="space-y-2 opacity-90">
                <li><strong>H1:</strong> Page title (once per page)</li>
                <li><strong>H2:</strong> Main sections (in TOC)</li>
                <li><strong>H3:</strong> Subsections (in TOC)</li>
                <li><strong>H4-H6:</strong> Deep nesting</li>
              </ul>
            </div>
            <div>
              <h5 className="mb-3">Styled Text:</h5>
              <ul className="space-y-2 opacity-90">
                <li><strong>DisplayText:</strong> Hero/callouts</li>
                <li><strong>HeadingXL-SM:</strong> UI components</li>
                <li><strong>Use for:</strong> Figures, cards, modals</li>
                <li><strong>No TOC impact</strong></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </ContentWithSidebar>
  );
}
