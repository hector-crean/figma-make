import { useEffect } from 'react';
import { Citation, ReferencesProvider, useReferences } from '../content/reference';
import {
  BulletList,
  Column,
  ComparisonTable,
  ExpandableTable,
  ResponsiveTable,
  Table
} from '../content/table';

function TableShowcaseContent() {
  const { addReference } = useReferences();

  useEffect(() => {
    addReference({
      id: 'med-switch-2023',
      authors: 'Johnson, A., et al.',
      year: 2023,
      title: 'Medication switching patterns in ADHD: A retrospective analysis',
      journal: 'Journal of Clinical Psychiatry',
      volume: '84',
      pages: '123-134',
      doi: '10.1234/jcp.2023.123',
    });

    addReference({
      id: 'adhd-complications-2022',
      authors: 'Smith, B., & Williams, C.',
      year: 2022,
      title: 'Treatment-related complications in ADHD across the lifespan',
      journal: 'ADHD Research Journal',
      volume: '12',
      pages: '45-58',
      doi: '10.1234/adhd.2022.45',
    });
  }, [addReference]);

  // Data for the main clinical table (matching the Figma design)
  const clinicalData = [
    {
      category: 'Rate of switching',
      childrenAdolescents: 'Children (58%) and adolescents (66%)',
      adults: 'Adults (57%)',
    },
    {
      category: 'Most common reasons for switching',
      childrenAdolescents: (
        <BulletList
          items={[
            'Inadequate/suboptimal management of symptoms (60%)',
            'Patient attitude/dislike of medicine (30%)',
            'ADHD/treatment-related complications (25%)',
          ]}
        />
      ),
      adults: (
        <BulletList
          items={[
            'Suboptimal management of symptoms (56%)',
            'Treatment-related complications (25%)',
            'Patient dislike of medicine (25%)',
            'Poor adherence (10%)',
            'Misuse of medication/addiction (7%)',
            'Inconvenient dosing (7%)',
          ]}
        />
      ),
    },
    {
      category: 'Most common complications',
      childrenAdolescents: (
        <BulletList
          items={[
            'Anxiety/panic attacks (20%)',
            'Emotional impulsivity/mood lability (20%)',
            'Insomnia and sleep disturbances (20%)',
          ]}
        />
      ),
      adults: (
        <BulletList
          items={[
            'Anxiety/panic attacks (13%)',
            'Hypertension (13%)',
          ]}
        />
      ),
    },
  ];

  const clinicalColumns: Column[] = [
    {
      key: 'category',
      header: '',
      width: '200px',
      render: (value) => <div className="text-slate-900">{value}</div>,
    },
    {
      key: 'childrenAdolescents',
      header: 'Children and Adolescents',
      render: (value) => <div className="text-slate-700">{value}</div>,
    },
    {
      key: 'adults',
      header: 'Adults',
      render: (value) => <div className="text-slate-700">{value}</div>,
    },
  ];

  // Sample data for other table types
  const prevalenceData = [
    { ageGroup: '4-11 years', male: '12.9%', female: '5.6%', combined: '9.4%' },
    { ageGroup: '12-17 years', male: '13.6%', female: '5.8%', combined: '9.9%' },
    { ageGroup: '18+ years', male: '5.4%', female: '3.2%', combined: '4.4%' },
  ];

  const prevalenceColumns: Column[] = [
    { key: 'ageGroup', header: 'Age Group', width: '150px' },
    { key: 'male', header: 'Male', sortable: true, align: 'center' },
    { key: 'female', header: 'Female', sortable: true, align: 'center' },
    { key: 'combined', header: 'Combined', sortable: true, align: 'center' },
  ];

  // Medication comparison data
  const medicationData = [
    {
      medication: 'Methylphenidate',
      class: 'Stimulant',
      onsetTime: '30-60 min',
      duration: '3-6 hours',
      effectiveness: '75-85%',
    },
    {
      medication: 'Amphetamine',
      class: 'Stimulant',
      onsetTime: '30-45 min',
      duration: '4-6 hours',
      effectiveness: '70-80%',
    },
    {
      medication: 'Atomoxetine',
      class: 'Non-stimulant',
      onsetTime: '2-4 weeks',
      duration: '24 hours',
      effectiveness: '50-60%',
    },
    {
      medication: 'Guanfacine XR',
      class: 'Non-stimulant',
      onsetTime: '1-2 weeks',
      duration: '24 hours',
      effectiveness: '45-55%',
    },
  ];

  const medicationColumns: Column[] = [
    { key: 'medication', header: 'Medication', width: '180px' },
    {
      key: 'class',
      header: 'Class',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-sm ${value === 'Stimulant'
            ? 'bg-orange-100 text-orange-700'
            : 'bg-purple-100 text-purple-700'
          }`}>
          {value}
        </span>
      ),
    },
    { key: 'onsetTime', header: 'Onset Time', align: 'center' },
    { key: 'duration', header: 'Duration', align: 'center' },
    { key: 'effectiveness', header: 'Effectiveness Rate', align: 'center' },
  ];

  // Expandable table data
  const symptomData = [
    {
      main: {
        domain: 'Inattention',
        prevalence: '80-95%',
        severity: 'High',
      },
      expanded: (
        <div className="space-y-3">
          <h5 className="text-slate-900">Specific Symptoms:</h5>
          <BulletList
            items={[
              'Difficulty sustaining attention in tasks or play activities',
              'Often does not seem to listen when spoken to directly',
              'Fails to finish schoolwork, chores, or duties',
              'Difficulty organizing tasks and activities',
              'Avoids tasks requiring sustained mental effort',
              'Loses things necessary for tasks',
              'Easily distracted by extraneous stimuli',
              'Forgetful in daily activities',
            ]}
          />
          <p className="text-slate-600 text-sm mt-3">
            <strong>Clinical Note:</strong> Inattention symptoms often persist into adulthood
            even when hyperactivity decreases.
          </p>
        </div>
      ),
    },
    {
      main: {
        domain: 'Hyperactivity',
        prevalence: '60-75%',
        severity: 'Moderate-High',
      },
      expanded: (
        <div className="space-y-3">
          <h5 className="text-slate-900">Specific Symptoms:</h5>
          <BulletList
            items={[
              'Fidgets with hands or feet or squirms in seat',
              'Leaves seat in situations when remaining seated is expected',
              'Runs about or climbs excessively (restlessness in adults)',
              'Unable to play or engage in leisure activities quietly',
              'Often "on the go" or acts as if "driven by a motor"',
              'Talks excessively',
            ]}
          />
          <p className="text-slate-600 text-sm mt-3">
            <strong>Clinical Note:</strong> Hyperactivity symptoms typically decrease with age
            but may manifest as inner restlessness in adults.
          </p>
        </div>
      ),
    },
    {
      main: {
        domain: 'Impulsivity',
        prevalence: '65-80%',
        severity: 'Moderate-High',
      },
      expanded: (
        <div className="space-y-3">
          <h5 className="text-slate-900">Specific Symptoms:</h5>
          <BulletList
            items={[
              'Blurts out answers before questions have been completed',
              'Has difficulty waiting their turn',
              'Interrupts or intrudes on others',
              'Makes important decisions without consideration of consequences',
              'Difficulty delaying gratification',
            ]}
          />
          <p className="text-slate-600 text-sm mt-3">
            <strong>Clinical Note:</strong> Impulsivity can lead to significant social and
            occupational difficulties across the lifespan.
          </p>
        </div>
      ),
    },
  ];

  const symptomColumns: Column[] = [
    { key: 'domain', header: 'Symptom Domain', width: '200px' },
    { key: 'prevalence', header: 'Prevalence in ADHD', align: 'center' },
    {
      key: 'severity',
      header: 'Typical Severity',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-sm ${value.includes('High')
            ? 'bg-red-100 text-red-700'
            : 'bg-yellow-100 text-yellow-700'
          }`}>
          {value}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-slate-900 mb-2">Table Component Showcase</h2>
        <p className="text-slate-600 mb-8">
          Explore different table styles and features for presenting clinical and research data.
        </p>
      </div>

      {/* Clinical Table - Matching Figma Design */}
      <section>
        <h3 className="text-slate-900 mb-6">Clinical Data Table (Medical Style)</h3>
        <p className="text-slate-600 mb-4">
          A professional table styled for clinical data presentation, matching your Figma design.
        </p>

        <Table
          columns={clinicalColumns}
          data={clinicalData}
          variant="clinical"
          tableNumber="1"
          caption="ADHD medication switching patterns and complications in children, adolescents, and adults. Data shows substantial rates of medication switching across all age groups, with symptom management being the primary reason."
          credit="Data from Johnson et al., 2023 and Smith & Williams, 2022"
          headerColor="bg-gradient-to-r from-blue-600 to-blue-700"
          zebra={true}
          hoverable={true}
        />

        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-slate-700 text-sm">
            <strong>Clinical Implications:</strong> The high rates of medication switching
            underscore the importance of close monitoring and individualized treatment
            approaches<Citation refId="med-switch-2023" />. Treatment-related complications
            should be carefully assessed and managed<Citation refId="adhd-complications-2022" />.
          </p>
        </div>
      </section>

      {/* Sortable Table */}
      <section>
        <h3 className="text-slate-900 mb-6">Sortable Data Table</h3>
        <p className="text-slate-600 mb-4">
          Click column headers to sort data. Perfect for epidemiological data.
        </p>

        <Table
          columns={prevalenceColumns}
          data={prevalenceData}
          variant="default"
          sortable={true}
          tableNumber="2"
          caption="ADHD prevalence rates by age group and gender. Males consistently show higher prevalence rates across all age groups, with the highest rates observed in adolescents."
          credit="Meta-analytic data from population studies"
        />
      </section>

      {/* Compact Table */}
      <section>
        <h3 className="text-slate-900 mb-6">Medication Comparison Table</h3>
        <p className="text-slate-600 mb-4">
          Compact table with custom cell rendering for medication comparisons.
        </p>

        <Table
          columns={medicationColumns}
          data={medicationData}
          variant="compact"
          tableNumber="3"
          caption="Comparison of first-line ADHD medications showing key pharmacological properties and effectiveness rates. Stimulants generally show higher effectiveness rates but may not be suitable for all patients."
          zebra={true}
          hoverable={true}
        />
      </section>

      {/* Expandable Table */}
      <section>
        <h3 className="text-slate-900 mb-6">Expandable Rows Table</h3>
        <p className="text-slate-600 mb-4">
          Click any row to expand and view detailed information. Ideal for complex data
          that needs progressive disclosure.
        </p>

        <ExpandableTable
          columns={symptomColumns}
          data={symptomData}
          tableNumber="4"
          caption="Core ADHD symptom domains with expandable details. Click each row to view the complete list of symptoms within each domain and clinical notes."
        />
      </section>

      {/* Comparison Table */}
      <section>
        <h3 className="text-slate-900 mb-6">Side-by-Side Comparison Table</h3>
        <p className="text-slate-600 mb-4">
          Specialized comparison format with highlighted cells to draw attention to key differences.
        </p>

        <ComparisonTable
          leftHeader="Stimulant Medications"
          rightHeader="Non-Stimulant Medications"
          tableNumber="5"
          caption="Comparison of stimulant versus non-stimulant ADHD medications across key clinical parameters. Highlighting indicates statistically significant differences."
          rows={[
            {
              label: 'Onset of Action',
              left: '30-60 minutes',
              right: '1-4 weeks',
              highlight: 'left',
            },
            {
              label: 'Effectiveness Rate',
              left: '70-85%',
              right: '45-60%',
              highlight: 'left',
            },
            {
              label: 'DEA Schedule',
              left: 'Schedule II (controlled)',
              right: 'Not scheduled',
              highlight: 'right',
            },
            {
              label: 'Abuse Potential',
              left: 'Moderate to high',
              right: 'Minimal',
              highlight: 'right',
            },
            {
              label: 'Common Side Effects',
              left: (
                <BulletList
                  items={[
                    'Decreased appetite',
                    'Insomnia',
                    'Increased heart rate',
                    'Anxiety',
                  ]}
                />
              ),
              right: (
                <BulletList
                  items={[
                    'Fatigue/drowsiness',
                    'GI upset',
                    'Dizziness',
                    'Mood changes',
                  ]}
                />
              ),
            },
            {
              label: 'Duration of Action',
              left: '3-12 hours (formulation dependent)',
              right: '24 hours',
              highlight: 'right',
            },
            {
              label: 'First-line Therapy',
              left: 'Yes',
              right: 'Second or third-line',
              highlight: 'left',
            },
          ]}
        />
      </section>

      {/* Responsive Table */}
      <section>
        <h3 className="text-slate-900 mb-6">Responsive Table (Mobile-Friendly)</h3>
        <p className="text-slate-600 mb-4">
          This table displays as a standard table on desktop but transforms into cards on
          mobile devices. Try resizing your browser window!
        </p>

        <ResponsiveTable
          columns={medicationColumns}
          data={medicationData}
          tableNumber="6"
          caption="Responsive medication comparison that adapts to screen size. On mobile devices, each row becomes a card for better readability."
          breakpoint="md"
        />
      </section>

      {/* Bordered Table */}
      <section>
        <h3 className="text-slate-900 mb-6">Bordered Table Style</h3>
        <p className="text-slate-600 mb-4">
          Strong borders between all cells for maximum visual separation.
        </p>

        <Table
          columns={prevalenceColumns}
          data={prevalenceData}
          variant="bordered"
          tableNumber="7"
          caption="Prevalence data with bordered style for enhanced cell definition."
        />
      </section>

      {/* Striped Table */}
      <section>
        <h3 className="text-slate-900 mb-6">Striped Table Style</h3>
        <p className="text-slate-600 mb-4">
          Alternating row colors with a colored stripe pattern for easier row tracking.
        </p>

        <Table
          columns={medicationColumns}
          data={medicationData}
          variant="striped"
          tableNumber="8"
          caption="Medication data with striped rows for improved readability."
          stickyHeader={false}
        />
      </section>

      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <h4 className="text-slate-900 mb-3">Table Best Practices</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="text-slate-900 mb-2">When to Use Each Type:</h5>
            <BulletList
              items={[
                'Clinical tables: Professional medical data',
                'Sortable: Large datasets needing exploration',
                'Expandable: Complex data with details',
                'Comparison: Side-by-side analysis',
                'Responsive: Mobile-first content',
              ]}
            />
          </div>
          <div>
            <h5 className="text-slate-900 mb-2">Design Tips:</h5>
            <BulletList
              items={[
                'Keep headers concise and clear',
                'Use consistent alignment (numbers right, text left)',
                'Add zebra striping for tables >5 rows',
                'Include table numbers and captions',
                'Consider mobile experience early',
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableShowcase() {
  return (
    <ReferencesProvider>
      <TableShowcaseContent />
    </ReferencesProvider>
  );
}
