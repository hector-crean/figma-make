import { Brain, TrendingUp, Users } from 'lucide-react';
import { useEffect } from 'react';
import { AccordionGroup, AccordionItem } from '../content/accordion';
import { HeroInfographic } from '../content/hero-infographic';
import { Citation, ReferencesList, ReferencesProvider, useReferences } from '../content/reference';
import { ContentWithSidebar } from '../layout/content-with-sidebar';

function ADHDOverviewContent() {
  const { addReference } = useReferences();

  useEffect(() => {
    // Add references for this page
    addReference({
      id: 'faraone2021',
      authors: 'Faraone, S. V., et al.',
      year: 2021,
      title: 'The World Federation of ADHD International Consensus Statement: 208 Evidence-based conclusions about the disorder',
      journal: 'Neuroscience & Biobehavioral Reviews',
      volume: '128',
      pages: '789-818',
      doi: '10.1016/j.neubiorev.2021.01.022',
    });

    addReference({
      id: 'posner2020',
      authors: 'Posner, J., et al.',
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
    { id: 'introduction', title: 'Introduction' },
    { id: 'definition', title: 'Definition & Classification' },
    { id: 'epidemiology', title: 'Epidemiology' },
    { id: 'key-features', title: 'Key Features' },
  ];

  return (
    <ContentWithSidebar sections={sections}>
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <section id="introduction" className="mb-12">
          <h2 className="text-slate-900 mb-4">Attention-Deficit/Hyperactivity Disorder (ADHD)</h2>

          <HeroInfographic
            icon={Brain}
            title="Neurodevelopmental Disorder"
            stat="5-7%"
            statLabel="of children worldwide"
            color="blue"
          >
            <p>
              ADHD is one of the most common neurodevelopmental disorders, characterized by persistent
              patterns of inattention and/or hyperactivity-impulsivity that interfere with functioning
              or development.
            </p>
          </HeroInfographic>

          <p className="text-slate-700 mb-4">
            Attention-Deficit/Hyperactivity Disorder (ADHD) is a neurodevelopmental disorder
            characterized by developmentally inappropriate levels of inattention, hyperactivity,
            and impulsivity<Citation refId="faraone2021" />. These symptoms typically emerge in
            childhood and can persist into adolescence and adulthood, significantly impacting
            academic, occupational, and social functioning<Citation refId="posner2020" />.
          </p>

          <p className="text-slate-700">
            The disorder represents a complex interplay of genetic, neurobiological, and
            environmental factors that affect brain development and function, particularly in
            regions responsible for executive function, attention regulation, and impulse control.
          </p>
        </section>

        <section id="definition" className="mb-12">
          <h3 className="text-slate-900 mb-4">Definition & Classification</h3>

          <p className="text-slate-700 mb-6">
            According to the DSM-5, ADHD is classified into three presentations based on the
            predominant symptom pattern:
          </p>

          <AccordionGroup>
            <AccordionItem title="Predominantly Inattentive Presentation" defaultOpen>
              <p className="mb-3">
                This presentation is characterized primarily by symptoms of inattention, with fewer
                hyperactive-impulsive symptoms. Individuals may:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Have difficulty sustaining attention in tasks or play activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Often seem not to listen when spoken to directly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Frequently lose items necessary for tasks or activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Be easily distracted by extraneous stimuli</span>
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Predominantly Hyperactive-Impulsive Presentation">
              <p className="mb-3">
                This presentation is characterized primarily by hyperactive and impulsive behaviors,
                with fewer inattentive symptoms. Individuals may:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Fidget with hands or feet or squirm in seat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Be unable to remain seated in situations where it is expected</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Talk excessively and have difficulty waiting their turn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Interrupt or intrude on others</span>
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem title="Combined Presentation">
              <p className="mb-3">
                This is the most common presentation, where individuals meet criteria for both
                inattention and hyperactivity-impulsivity. This presentation involves:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Six or more symptoms of inattention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Six or more symptoms of hyperactivity-impulsivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Symptoms that significantly interfere with multiple life domains</span>
                </li>
              </ul>
            </AccordionItem>
          </AccordionGroup>
        </section>

        <section id="epidemiology" className="mb-12">
          <h3 className="text-slate-900 mb-4">Epidemiology</h3>

          <HeroInfographic
            icon={Users}
            title="Global Prevalence"
            stat="5.3%"
            statLabel="pooled prevalence estimate"
            color="purple"
          >
            <p>
              Meta-analytic studies estimate ADHD prevalence at approximately 5% in children
              and 2.5% in adults worldwide<Citation refId="willcutt2012" />.
            </p>
          </HeroInfographic>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h5 className="text-slate-900 mb-2">Gender Distribution</h5>
              <p className="text-slate-700 text-sm">
                ADHD is more commonly diagnosed in males, with a ratio of approximately 2:1 in
                community samples and higher ratios in clinical settings.
              </p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h5 className="text-slate-900 mb-2">Age of Onset</h5>
              <p className="text-slate-700 text-sm">
                Symptoms typically appear before age 12, though diagnosis may occur later,
                particularly for individuals with predominantly inattentive presentation.
              </p>
            </div>
          </div>
        </section>

        <section id="key-features" className="mb-12">
          <h3 className="text-slate-900 mb-4">Key Features</h3>

          <HeroInfographic
            icon={TrendingUp}
            title="Persistence into Adulthood"
            stat="65%"
            statLabel="of cases persist"
            color="green"
          >
            <p>
              While often considered a childhood disorder, approximately 65% of individuals
              diagnosed with ADHD in childhood continue to experience significant symptoms
              into adulthood.
            </p>
          </HeroInfographic>

          <div className="mt-6 space-y-4">
            <p className="text-slate-700">
              ADHD is associated with significant functional impairments across the lifespan, including:
            </p>

            <ul className="space-y-2 ml-4">
              <li className="text-slate-700 flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Academic underachievement and higher school dropout rates</span>
              </li>
              <li className="text-slate-700 flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Occupational difficulties and unemployment</span>
              </li>
              <li className="text-slate-700 flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Interpersonal relationship challenges</span>
              </li>
              <li className="text-slate-700 flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Increased risk of accidents and injuries</span>
              </li>
              <li className="text-slate-700 flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Higher rates of comorbid psychiatric conditions</span>
              </li>
            </ul>
          </div>
        </section>

        <ReferencesList />
      </div>
    </ContentWithSidebar>
  );
}

export function ADHDOverview() {
  return (
    <ReferencesProvider>
      <ADHDOverviewContent />
    </ReferencesProvider>
  );
}
