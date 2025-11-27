import { useEffect } from 'react';
import {
  Citation,
  CitationStyleSelector,
  MarginNote,
  ReferencesList,
  ReferencesProvider,
  useReferences
} from '../content/reference';
import { ContentWithSidebar } from '../layout/content-with-sidebar';

function ReferenceShowcaseContent() {
  const { addReference, showMarginNotes, setShowMarginNotes } = useReferences();

  useEffect(() => {
    // Add sample references
    addReference({
      id: 'faraone2021',
      authors: 'Faraone, S. V., Asherson, P., Banaschewski, T., et al.',
      year: 2021,
      title: 'The World Federation of ADHD International Consensus Statement: 208 Evidence-based conclusions about the disorder',
      journal: 'Neuroscience & Biobehavioral Reviews',
      volume: '128',
      pages: '789-818',
      doi: '10.1016/j.neubiorev.2021.01.022',
    });

    addReference({
      id: 'cortese2012',
      authors: 'Cortese, S., Kelly, C., Chabernaud, C., et al.',
      year: 2012,
      title: 'Toward systems neuroscience of ADHD: a meta-analysis of 55 fMRI studies',
      journal: 'American Journal of Psychiatry',
      volume: '169',
      pages: '1038-1055',
      doi: '10.1176/appi.ajp.2012.11101521',
    });

    addReference({
      id: 'shaw2007',
      authors: 'Shaw, P., Eckstrand, K., Sharp, W., et al.',
      year: 2007,
      title: 'Attention-deficit/hyperactivity disorder is characterized by a delay in cortical maturation',
      journal: 'Proceedings of the National Academy of Sciences',
      volume: '104',
      pages: '19649-19654',
      doi: '10.1073/pnas.0707741104',
    });

    addReference({
      id: 'volkow2009',
      authors: 'Volkow, N. D., Wang, G. J., Kollins, S. H., et al.',
      year: 2009,
      title: 'Evaluating dopamine reward pathway in ADHD: clinical implications',
      journal: 'JAMA',
      volume: '302',
      pages: '1084-1091',
      doi: '10.1001/jama.2009.1308',
    });

    addReference({
      id: 'posner2020',
      authors: 'Posner, J., Polanczyk, G. V., & Sonuga-Barke, E.',
      year: 2020,
      title: 'Attention-deficit hyperactivity disorder',
      journal: 'The Lancet',
      volume: '395',
      pages: '450-462',
      doi: '10.1016/S0140-6736(19)33004-1',
    });

    addReference({
      id: 'willcutt2012',
      authors: 'Willcutt, E. G.',
      year: 2012,
      title: 'The prevalence of DSM-IV attention-deficit/hyperactivity disorder: a meta-analytic review',
      journal: 'Neurotherapeutics',
      volume: '9',
      pages: '490-499',
      doi: '10.1007/s13311-012-0135-8',
    });
  }, [addReference]);

  const sections = [
    { id: 'citation-styles', title: 'Citation Styles' },
    { id: 'interactive-features', title: 'Interactive Features' },
    { id: 'margin-notes', title: 'Margin Notes' },
    { id: 'sample-text', title: 'Sample Academic Text' },
  ];

  return (
    <ContentWithSidebar sections={sections} showMarginNotes={showMarginNotes}>
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="mb-8">
          <h2 className="text-slate-900 mb-2">Reference & Citation System</h2>
          <p className="text-slate-600 mb-4">
            Explore different citation styles and interactive features for academic content.
          </p>

          {/* Style Selector */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <CitationStyleSelector />
            <button
              onClick={() => setShowMarginNotes(!showMarginNotes)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${showMarginNotes
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
            >
              {showMarginNotes ? 'Hide' : 'Show'} Margin Notes
            </button>
          </div>
        </div>

        <section id="citation-styles" className="mb-12">
          <h3 className="text-slate-900 mb-4">Citation Style Examples</h3>

          <p className="text-slate-700 mb-4">
            Use the selector above to switch between different citation styles. Each citation is:
          </p>

          <ul className="list-disc ml-6 mb-6 space-y-2 text-slate-700">
            <li><strong>Hoverable</strong> - Hover over any citation to see a quick preview tooltip</li>
            <li><strong>Clickable</strong> - Click to view full reference details in a popup</li>
            <li><strong>Linked</strong> - Use the popup to navigate to the full reference list</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r mb-6">
            <h4 className="text-slate-900 mb-3">Example with Citations</h4>
            <p className="text-slate-700">
              ADHD is one of the most common neurodevelopmental disorders<Citation refId="faraone2021" />,
              with a pooled prevalence estimate of approximately 5% in children<Citation refId="willcutt2012" />.
              Neuroimaging studies have revealed structural and functional brain differences<Citation refId="cortese2012" />,
              including delayed cortical maturation<Citation refId="shaw2007" pages="19651" /> and
              altered dopaminergic functioning<Citation refId="volkow2009" />.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <h5 className="text-slate-900 text-sm mb-2">Numbered Style</h5>
              <p className="text-slate-600 text-sm">
                Traditional numbered citations [1], [2] that appear in order of first citation.
              </p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <h5 className="text-slate-900 text-sm mb-2">Author-Year Style</h5>
              <p className="text-slate-600 text-sm">
                APA-style citations (Smith, 2021) with optional page numbers.
              </p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <h5 className="text-slate-900 text-sm mb-2">Superscript Style</h5>
              <p className="text-slate-600 text-sm">
                Compact superscript citations<sup>[1]</sup> commonly used in medical journals.
              </p>
            </div>
          </div>
        </section>

        <section id="interactive-features" className="mb-12">
          <h3 className="text-slate-900 mb-4">Interactive Features</h3>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h4 className="text-slate-900 mb-3">Hover Tooltips</h4>
              <p className="text-slate-700 mb-3">
                Hover over any citation to see a quick reference preview without leaving the text.
                Try it here<Citation refId="posner2020" />!
              </p>
              <p className="text-slate-600 text-sm">
                The tooltip shows the authors, year, and title, giving readers enough context to
                decide if they need to view the full reference.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-slate-900 mb-3">Click for Full Details</h4>
              <p className="text-slate-700 mb-3">
                Click any citation to open a detailed popup with complete bibliographic information,
                DOI links, and navigation options<Citation refId="cortese2012" />.
              </p>
              <p className="text-slate-600 text-sm">
                The popup includes direct links to the DOI or source URL, making it easy to access
                the original publication.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
              <h4 className="text-slate-900 mb-3">Specific Page Citations</h4>
              <p className="text-slate-700 mb-3">
                You can cite specific pages from a source when needed<Citation refId="shaw2007" pages="19650-19652" />,
                which is particularly useful for direct quotes or specific findings.
              </p>
            </div>
          </div>
        </section>

        <section id="margin-notes" className="mb-12">
          <h3 className="text-slate-900 mb-4">Margin Notes & Annotations</h3>

          <p className="text-slate-700 mb-4">
            Margin notes provide additional context or explanations without interrupting the main text flow.
            Enable "Show Margin Notes" above to see them appear in the right sidebar on desktop
            (or as inline tooltips on mobile).
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
            <h4 className="text-slate-900 mb-3">Example with Margin Notes</h4>
            <p className="text-slate-700 mb-3">
              The prefrontal cortex
              <MarginNote id="note-1">
                The prefrontal cortex is responsible for executive functions including planning,
                decision-making, and impulse control.
              </MarginNote>
              plays a crucial role in ADHD pathophysiology. Studies show reduced volume and
              delayed maturation
              <MarginNote id="note-2">
                Cortical maturation in the prefrontal cortex is delayed by approximately 2-3 years
                in children with ADHD compared to neurotypical peers.
              </MarginNote>
              in this region among individuals with ADHD.
            </p>
            <p className="text-slate-700">
              Dopaminergic dysfunction
              <MarginNote id="note-3">
                Dopamine is a neurotransmitter involved in reward, motivation, and attention regulation.
                ADHD medications primarily work by modulating dopamine levels.
              </MarginNote>
              is central to the disorder, with alterations observed in both receptor density and
              transporter expression<Citation refId="volkow2009" />.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <h5 className="text-slate-900 text-sm mb-2">Desktop Experience</h5>
              <p className="text-slate-600 text-sm">
                On large screens (XL+), margin notes appear in a dedicated sidebar to the right,
                mimicking traditional academic textbooks.
              </p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <h5 className="text-slate-900 text-sm mb-2">Mobile Experience</h5>
              <p className="text-slate-600 text-sm">
                On smaller screens, clicking the note icon reveals the annotation inline or as a tooltip,
                keeping the interface clean and readable.
              </p>
            </div>
          </div>
        </section>

        <section id="sample-text" className="mb-12">
          <h3 className="text-slate-900 mb-4">Sample Academic Text</h3>

          <div className="prose prose-slate max-w-none">
            <h4 className="text-slate-900 mb-3">Neurobiological Foundations of ADHD</h4>

            <p className="text-slate-700 mb-4">
              Attention-deficit/hyperactivity disorder (ADHD) is a complex neurodevelopmental
              condition with strong biological underpinnings<Citation refId="faraone2021" />.
              The disorder affects approximately 5-7% of children worldwide
              <MarginNote id="note-prevalence">
                Prevalence rates vary by region and diagnostic criteria, but meta-analyses
                consistently find rates between 5-7% globally.
              </MarginNote>
              and persists into adulthood in a substantial proportion of cases<Citation refId="posner2020" />.
            </p>

            <p className="text-slate-700 mb-4">
              Neuroimaging meta-analyses have identified consistent structural and functional
              brain alterations in ADHD<Citation refId="cortese2012" />. One of the most
              robust findings is delayed cortical maturation, particularly in the prefrontal
              cortex<Citation refId="shaw2007" pages="19649" />
              <MarginNote id="note-maturation">
                Shaw and colleagues (2007) found that cortical maturation follows the same
                trajectory in ADHD as in typical development, but is delayed by several years.
              </MarginNote>.
              This delay in brain development may explain why some children appear to "grow out of"
              ADHD symptoms as their brain catches up.
            </p>

            <p className="text-slate-700 mb-4">
              The dopamine hypothesis remains central to our understanding of ADHD
              neurobiology<Citation refId="volkow2009" />
              <MarginNote id="note-dopamine">
                The efficacy of stimulant medications, which increase dopamine availability,
                provides strong support for the dopamine hypothesis.
              </MarginNote>.
              Research has shown reduced dopamine receptor availability in key brain regions,
              particularly in reward-processing circuits. This finding helps explain both the
              attention deficits and motivational difficulties commonly observed in ADHD.
            </p>

            <p className="text-slate-700 mb-4">
              Beyond dopamine, multiple neurotransmitter systems are implicated, including
              norepinephrine and serotonin pathways. The heterogeneity of ADHD presentations
              and treatment responses likely reflects this complex neurobiological
              landscape<Citation refId="faraone2021" pages="805" />.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r my-6">
              <h5 className="text-slate-900 mb-2">Clinical Implications</h5>
              <p className="text-slate-700 text-sm">
                Understanding the neurobiological basis of ADHD has important clinical implications.
                It reinforces that ADHD is a legitimate medical condition
                <MarginNote id="note-clinical">
                  Educating patients and families about the biological basis of ADHD can reduce
                  stigma and increase treatment adherence.
                </MarginNote>,
                not a character flaw or parenting problem. This knowledge helps reduce stigma and
                guides evidence-based treatment approaches<Citation refId="posner2020" />.
              </p>
            </div>
          </div>
        </section>

        <ReferencesList />
      </div>
    </ContentWithSidebar>
  );
}

export function ReferenceShowcase() {
  return (
    <ReferencesProvider defaultCitationStyle="numbered" defaultShowMarginNotes={true}>
      <ReferenceShowcaseContent />
    </ReferencesProvider>
  );
}
