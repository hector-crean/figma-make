import { BentoBoxGrid, BentoBoxItem } from '../content/bento-box';
import { ReferencesProvider } from '../content/reference';
import { ContentWithSidebar } from '../layout/content-with-sidebar';

function ADHDSymptomsContent() {
  const sections = [
    { id: 'core-symptoms', title: 'Core Symptoms' },
    { id: 'assessment', title: 'Clinical Assessment' },
  ];

  return (
    <ContentWithSidebar sections={sections}>
      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <section id="core-symptoms" className="mb-12">
          <h2 className="text-slate-900 mb-4">Core Symptoms of ADHD</h2>

          <p className="text-slate-700 mb-6">
            ADHD symptoms fall into two main categories: inattention and hyperactivity-impulsivity.
            Explore each symptom domain below for detailed information.
          </p>

          <BentoBoxGrid>
            <BentoBoxItem
              title="Difficulty Sustaining Attention"
              description="Problems maintaining focus on tasks"
              size="medium"
              color="bg-gradient-to-br from-blue-50 to-cyan-50"
            >
              <div className="space-y-3">
                <p>
                  Individuals with ADHD often struggle to maintain attention during lengthy tasks,
                  lectures, or conversations. This isn't simply a matter of lack of interest, but
                  a core deficit in sustained attention mechanisms.
                </p>
                <p className="text-slate-900">Clinical Manifestations:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Difficulty completing work or schoolwork</li>
                  <li>• Making careless mistakes due to attention lapses</li>
                  <li>• Appearing not to listen during conversations</li>
                  <li>• Struggling with tasks requiring sustained mental effort</li>
                </ul>
                <p className="text-slate-900 mt-3">Neurobiological Basis:</p>
                <p>
                  Deficits in the default mode network and frontoparietal attention network
                  contribute to difficulties in sustaining attention and filtering distractions.
                </p>
              </div>
            </BentoBoxItem>

            <BentoBoxItem
              title="Impaired Organization"
              description="Difficulty organizing tasks and activities"
              size="small"
              color="bg-gradient-to-br from-purple-50 to-pink-50"
            >
              <div className="space-y-3">
                <p>
                  Organizational difficulties are a hallmark of ADHD, reflecting executive
                  function deficits that impact daily life functioning.
                </p>
                <ul className="space-y-1 ml-4">
                  <li>• Messy workspace or living areas</li>
                  <li>• Missing deadlines and appointments</li>
                  <li>• Poor time management</li>
                  <li>• Difficulty planning multi-step tasks</li>
                  <li>• Losing important items frequently</li>
                </ul>
              </div>
            </BentoBoxItem>

            <BentoBoxItem
              title="Hyperactivity & Restlessness"
              description="Excessive motor activity and inner restlessness"
              size="medium"
              color="bg-gradient-to-br from-green-50 to-emerald-50"
            >
              <div className="space-y-3">
                <p>
                  Hyperactivity manifests differently across development. In children, it may
                  present as constant running or climbing, while adults often experience inner
                  restlessness and an inability to relax.
                </p>
                <p className="text-slate-900">In Children:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Fidgeting and squirming in seat</li>
                  <li>• Running or climbing excessively</li>
                  <li>• Inability to play quietly</li>
                  <li>• Talking excessively</li>
                </ul>
                <p className="text-slate-900 mt-3">In Adults:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Feeling internally restless</li>
                  <li>• Needing to keep busy constantly</li>
                  <li>• Difficulty relaxing during leisure time</li>
                  <li>• Feeling driven by a motor</li>
                </ul>
              </div>
            </BentoBoxItem>

            <BentoBoxItem
              title="Impulsivity"
              description="Acting without thinking about consequences"
              size="small"
              color="bg-gradient-to-br from-orange-50 to-red-50"
            >
              <div className="space-y-3">
                <p>
                  Impulsivity involves difficulty inhibiting inappropriate responses and
                  represents a core deficit in behavioral inhibition.
                </p>
                <ul className="space-y-1 ml-4">
                  <li>• Interrupting others frequently</li>
                  <li>• Blurting out answers</li>
                  <li>• Difficulty waiting turn</li>
                  <li>• Making hasty decisions</li>
                  <li>• Risk-taking behaviors</li>
                </ul>
              </div>
            </BentoBoxItem>

            <BentoBoxItem
              title="Distractibility"
              description="Easily sidetracked by irrelevant stimuli"
              size="medium"
              color="bg-gradient-to-br from-indigo-50 to-blue-50"
            >
              <div className="space-y-3">
                <p>
                  Individuals with ADHD show heightened sensitivity to external and internal
                  distractions, making it difficult to filter out irrelevant information.
                </p>
                <p className="text-slate-900">External Distractions:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Environmental sounds and movements</li>
                  <li>• Visual stimuli in the periphery</li>
                  <li>• Others' conversations</li>
                </ul>
                <p className="text-slate-900 mt-3">Internal Distractions:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Mind wandering and daydreaming</li>
                  <li>• Racing thoughts</li>
                  <li>• Shifting between unrelated topics</li>
                </ul>
              </div>
            </BentoBoxItem>

            <BentoBoxItem
              title="Working Memory Deficits"
              description="Difficulty holding and manipulating information"
              size="small"
              color="bg-gradient-to-br from-rose-50 to-pink-50"
            >
              <div className="space-y-3">
                <p>
                  Working memory impairments affect the ability to hold information in mind
                  while performing mental operations.
                </p>
                <ul className="space-y-1 ml-4">
                  <li>• Forgetting instructions quickly</li>
                  <li>• Difficulty with mental math</li>
                  <li>• Losing track during multi-step tasks</li>
                  <li>• Trouble following complex directions</li>
                </ul>
              </div>
            </BentoBoxItem>
          </BentoBoxGrid>
        </section>

        <section id="assessment" className="mb-12">
          <h3 className="text-slate-900 mb-4">Clinical Assessment</h3>

          <p className="text-slate-700 mb-4">
            A comprehensive ADHD assessment involves multiple components including clinical interviews,
            behavioral observations, rating scales, and consideration of differential diagnoses.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h4 className="text-slate-900 mb-3">Diagnostic Criteria (DSM-5)</h4>
            <div className="space-y-3 text-slate-700">
              <p>For a diagnosis of ADHD, the following criteria must be met:</p>
              <ol className="space-y-2 ml-4">
                <li className="flex gap-2">
                  <span className="flex-shrink-0">1.</span>
                  <span>Six or more symptoms of inattention and/or hyperactivity-impulsivity present for at least 6 months</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0">2.</span>
                  <span>Several symptoms present before age 12</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0">3.</span>
                  <span>Symptoms present in two or more settings (e.g., home, school, work)</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0">4.</span>
                  <span>Clear evidence of interference with functioning</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0">5.</span>
                  <span>Symptoms not better explained by another mental disorder</span>
                </li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </ContentWithSidebar>
  );
}

export function ADHDSymptoms() {
  return (
    <ReferencesProvider>
      <ADHDSymptomsContent />
    </ReferencesProvider>
  );
}
