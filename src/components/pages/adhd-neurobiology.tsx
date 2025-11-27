import { Zap } from 'lucide-react';
import { useEffect } from 'react';
import { Figure } from '../content/figure';
import { HeroInfographic } from '../content/hero-infographic';
import { InteractiveBrain } from '../content/interactive-brain';
import { Citation, ReferencesList, ReferencesProvider, useReferences } from '../content/reference';
import { ImageWithFallback } from '../figma/image-with-fallback';
import { ContentWithSidebar } from '../layout/content-with-sidebar';

function ADHDNeurobiologyContent() {
  const { addReference } = useReferences();

  useEffect(() => {
    addReference({
      id: 'cortese2012',
      authors: 'Cortese, S., et al.',
      year: 2012,
      title: 'Toward systems neuroscience of ADHD: a meta-analysis of 55 fMRI studies',
      journal: 'American Journal of Psychiatry',
      volume: '169',
      pages: '1038-1055',
      doi: '10.1176/appi.ajp.2012.11101521',
    });

    addReference({
      id: 'shaw2007',
      authors: 'Shaw, P., et al.',
      year: 2007,
      title: 'Attention-deficit/hyperactivity disorder is characterized by a delay in cortical maturation',
      journal: 'Proceedings of the National Academy of Sciences',
      volume: '104',
      pages: '19649-19654',
      doi: '10.1073/pnas.0707741104',
    });

    addReference({
      id: 'volkow2009',
      authors: 'Volkow, N. D., et al.',
      year: 2009,
      title: 'Evaluating dopamine reward pathway in ADHD',
      journal: 'JAMA',
      volume: '302',
      pages: '1084-1091',
      doi: '10.1001/jama.2009.1308',
    });
  }, [addReference]);

  const sections = [
    { id: 'brain-structure', title: 'Brain Structure' },
    { id: 'neurotransmitters', title: 'Neurotransmitter Systems' },
    { id: 'brain-regions', title: 'Brain Regions' },
    { id: 'genetics', title: 'Genetic Factors' },
  ];

  return (
    <ContentWithSidebar sections={sections} showMarginNotes={true}>
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <section id="brain-structure" className="mb-12">
          <h2 className="text-slate-900 mb-4">Neurobiological Basis of ADHD</h2>

          <p className="text-slate-700 mb-6">
            ADHD is associated with structural and functional differences in multiple brain regions
            and networks. Neuroimaging studies have consistently identified alterations in brain
            development, connectivity, and neurotransmitter systems<Citation refId="cortese2012" />.
          </p>

          <Figure
            number="1"
            caption="Brain regions implicated in ADHD show reduced volume and altered activation patterns. 
            Meta-analyses of structural MRI studies reveal consistent findings of smaller total brain volume, 
            with particularly notable reductions in the prefrontal cortex, basal ganglia, and cerebellum."
            credit="Conceptual representation based on meta-analytic findings"
            size="large"
          >
            <div className="bg-slate-100 rounded p-8 flex items-center justify-center min-h-[300px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800"
                alt="Brain scan representation"
                className="w-full h-auto rounded"
              />
            </div>
          </Figure>

          <div className="mt-6 space-y-4">
            <h4 className="text-slate-900">Structural Brain Differences</h4>
            <p className="text-slate-700">
              Large-scale neuroimaging studies have identified several consistent structural
              differences in individuals with ADHD<Citation refId="shaw2007" />:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-slate-700 flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Total brain volume is approximately 3-5% smaller in children with ADHD</span>
              </li>
              <li className="text-slate-700 flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Prefrontal cortex shows delayed maturation by approximately 2-3 years</span>
              </li>
              <li className="text-slate-700 flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Basal ganglia structures (caudate, putamen) are reduced in volume</span>
              </li>
              <li className="text-slate-700 flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Cerebellum shows volumetric reductions, particularly in vermis regions</span>
              </li>
            </ul>
          </div>
        </section>

        <section id="neurotransmitters" className="mb-12">
          <h3 className="text-slate-900 mb-4">Neurotransmitter Systems</h3>

          <HeroInfographic
            icon={Zap}
            title="Dopamine Dysfunction"
            stat="↓ D2/D3"
            statLabel="receptor availability"
            color="orange"
          >
            <p>
              The dopamine hypothesis of ADHD proposes that dysregulation of dopaminergic
              neurotransmission, particularly in reward and motivation circuits, plays a
              central role in the pathophysiology of ADHD<Citation refId="volkow2009" />.
            </p>
          </HeroInfographic>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <h5 className="text-slate-900 mb-3">Dopamine System</h5>
              <p className="text-slate-700 text-sm mb-3">
                Dopamine plays crucial roles in attention, motivation, reward processing, and
                motor control—all functions impaired in ADHD.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-slate-700">Reduced dopamine receptor (D2/D3) availability in reward circuits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-slate-700">Altered dopamine transporter (DAT) expression</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-slate-700">Stimulant medications increase dopamine availability</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-5 border border-green-200">
              <h5 className="text-slate-900 mb-3">Norepinephrine System</h5>
              <p className="text-slate-700 text-sm mb-3">
                Norepinephrine modulates attention, arousal, and executive functions through
                prefrontal cortex projections.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-slate-700">Altered noradrenergic signaling in prefrontal cortex</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-slate-700">Non-stimulant medications (atomoxetine) target NET</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-slate-700">Important for sustained attention and working memory</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="brain-regions" className="mb-12">
          <h3 className="text-slate-900 mb-4">Interactive Brain Regions</h3>

          <p className="text-slate-700 mb-4">
            Multiple brain regions and networks are implicated in ADHD. Click on different regions
            below to explore their functions and relevance to ADHD:
          </p>

          <InteractiveBrain />
        </section>

        <section id="genetics" className="mb-12">
          <h3 className="text-slate-900 mb-4">Genetic Factors</h3>

          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200 mb-6">
            <h4 className="text-slate-900 mb-2">High Heritability</h4>
            <p className="text-slate-700">
              ADHD is among the most heritable psychiatric disorders, with heritability estimates
              ranging from 70-80%. Twin studies consistently demonstrate substantial genetic influence
              on ADHD risk.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="text-slate-900">Candidate Genes</h5>
            <p className="text-slate-700">
              While ADHD is polygenic (involving many genes of small effect), several candidate
              genes have been implicated:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded border border-slate-200 p-4">
                <p className="text-slate-900 text-sm mb-1">DRD4 (Dopamine Receptor D4)</p>
                <p className="text-slate-600 text-sm">Associated with novelty-seeking and attention regulation</p>
              </div>
              <div className="bg-white rounded border border-slate-200 p-4">
                <p className="text-slate-900 text-sm mb-1">DRD5 (Dopamine Receptor D5)</p>
                <p className="text-slate-600 text-sm">Implicated in cognitive control and working memory</p>
              </div>
              <div className="bg-white rounded border border-slate-200 p-4">
                <p className="text-slate-900 text-sm mb-1">DAT1 (Dopamine Transporter)</p>
                <p className="text-slate-600 text-sm">Regulates dopamine reuptake and availability</p>
              </div>
              <div className="bg-white rounded border border-slate-200 p-4">
                <p className="text-slate-900 text-sm mb-1">SNAP25 (Synaptosomal Protein)</p>
                <p className="text-slate-600 text-sm">Important for neurotransmitter release</p>
              </div>
            </div>
          </div>
        </section>

        <ReferencesList />
      </div>
    </ContentWithSidebar>
  );
}

export function ADHDNeurobiology() {
  return (
    <ReferencesProvider>
      <ADHDNeurobiologyContent />
    </ReferencesProvider>
  );
}