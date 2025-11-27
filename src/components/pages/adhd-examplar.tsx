import { Figure } from '@/components/content/figure';
import { H1, H2, H3, H4 } from '@/components/content/heading';
import { Citation, MarginNote, useReferences } from '@/components/content/reference';
import { ComparisonTable, ExpandableTable, Table } from '@/components/content/table';
import { Panel } from '@/components/layout/full-bleed';
import TabsLayout from '@/components/layout/tabs-layout';
import { AlertCircle, BookOpen, TrendingUp, Users } from 'lucide-react';
import { useEffect } from 'react';

// Reference data
const adhdReferences = [
    {
        id: 'faraone2021',
        authors: 'Faraone, S. V., Banaschewski, T., Coghill, D., et al.',
        year: 2021,
        title: 'The World Federation of ADHD International Consensus Statement: 208 Evidence-based conclusions about the disorder',
        journal: 'Neuroscience & Biobehavioral Reviews',
        volume: '128',
        pages: '789-818',
        doi: '10.1016/j.neubiorev.2021.01.022'
    },
    {
        id: 'sibley2017',
        authors: 'Sibley, M. H., Swanson, J. M., Arnold, L. E., et al.',
        year: 2017,
        title: 'Defining ADHD symptom persistence in adulthood: Optimizing sensitivity and specificity',
        journal: 'Journal of Child Psychology and Psychiatry',
        volume: '58',
        pages: '655-662',
        doi: '10.1111/jcpp.12620'
    },
    {
        id: 'danielson2018',
        authors: 'Danielson, M. L., Bitsko, R. H., Ghandour, R. M., et al.',
        year: 2018,
        title: 'Prevalence of parent-reported ADHD diagnosis and associated treatment among U.S. children and adolescents',
        journal: 'Journal of Clinical Child & Adolescent Psychology',
        volume: '47',
        pages: '199-212',
        doi: '10.1080/15374416.2017.1417860'
    },
    {
        id: 'polanczyk2007',
        authors: 'Polanczyk, G., de Lima, M. S., Horta, B. L., et al.',
        year: 2007,
        title: 'The worldwide prevalence of ADHD: A systematic review and metaregression analysis',
        journal: 'American Journal of Psychiatry',
        volume: '164',
        pages: '942-948',
        doi: '10.1176/ajp.2007.164.6.942'
    },
    {
        id: 'mowlem2019',
        authors: 'Mowlem, F. D., Rosenqvist, M. A., Martin, J., et al.',
        year: 2019,
        title: 'Sex differences in predicting ADHD clinical diagnosis and pharmacological treatment',
        journal: 'European Child & Adolescent Psychiatry',
        volume: '28',
        pages: '481-489',
        doi: '10.1007/s00787-018-1211-3'
    },
    {
        id: 'young2020',
        authors: 'Young, S., Adamo, N., Ásgeirsdóttir, B. B., et al.',
        year: 2020,
        title: 'Females with ADHD: An expert consensus statement taking a lifespan approach',
        journal: 'BMC Psychiatry',
        volume: '20',
        pages: '404',
        doi: '10.1186/s12888-020-02707-9'
    },
    {
        id: 'apa2013',
        authors: 'American Psychiatric Association',
        year: 2013,
        title: 'Diagnostic and statistical manual of mental disorders (5th ed.)',
        journal: 'American Psychiatric Publishing',
        volume: '',
        pages: '',
        doi: '10.1176/appi.books.9780890425596'
    },
    {
        id: 'faraone2015',
        authors: 'Faraone, S. V., Asherson, P., Banaschewski, T., et al.',
        year: 2015,
        title: 'Attention-deficit/hyperactivity disorder',
        journal: 'Nature Reviews Disease Primers',
        volume: '1',
        pages: '15020',
        doi: '10.1038/nrdp.2015.20'
    },
    {
        id: 'faraone2005',
        authors: 'Faraone, S. V., Perlis, R. H., Doyle, A. E., et al.',
        year: 2005,
        title: 'Molecular genetics of attention-deficit/hyperactivity disorder',
        journal: 'Biological Psychiatry',
        volume: '57',
        pages: '1313-1323',
        doi: '10.1016/j.biopsych.2004.11.024'
    },
    {
        id: 'wolraich2019',
        authors: 'Wolraich, M. L., Hagan, J. F., Allan, C., et al.',
        year: 2019,
        title: 'Clinical practice guideline for the diagnosis, evaluation, and treatment of ADHD in children and adolescents',
        journal: 'Pediatrics',
        volume: '144',
        pages: 'e20192528',
        doi: '10.1542/peds.2019-2528'
    },
    {
        id: 'cortese2018',
        authors: 'Cortese, S., Adamo, N., Del Giovane, C., et al.',
        year: 2018,
        title: 'Comparative efficacy and tolerability of medications for ADHD in children, adolescents, and adults',
        journal: 'The Lancet Psychiatry',
        volume: '5',
        pages: '727-738',
        doi: '10.1016/S2215-0366(18)30269-4'
    },
    {
        id: 'cortese2020',
        authors: 'Cortese, S., Song, M., Farhat, L. C., et al.',
        year: 2020,
        title: 'Incidence, prevalence, and global burden of ADHD from 1990 to 2019 across 204 countries',
        journal: 'Molecular Psychiatry',
        volume: '',
        pages: '',
        doi: '10.1038/s41380-020-00998-0'
    }
];

function ADHDExemplarContent() {
    const { addReference } = useReferences();

    // Add all references when component mounts
    useEffect(() => {
        adhdReferences.forEach(ref => addReference(ref));
    }, [addReference]);

    return (
        <div className="space-y-12">
            {/* Hero Section with Key Stats */}
            <div className="bg-blue-700 text-white rounded-xl p-8 lg:p-12 -mx-4 sm:mx-0">
                <div className="text-center">
                    <H1 id="adhd-comprehensive">Attention-Deficit/Hyperactivity Disorder</H1>
                    <p className="text-xl mt-4 mb-8 opacity-90">
                        A Comprehensive Guide to Understanding ADHD: Epidemiology, Neurobiology, and Clinical Presentation
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                            <p className="text-4xl mb-2">5-7%</p>
                            <p className="text-sm opacity-80">Children affected worldwide</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                            <p className="text-4xl mb-2">2.5%</p>
                            <p className="text-sm opacity-80">Adult prevalence</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                            <p className="text-4xl mb-2">60%</p>
                            <p className="text-sm opacity-80">Persist into adulthood</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Introduction */}
            <div>
                <H2 id="introduction">Introduction</H2>
                <p className="text-slate-700 leading-relaxed mt-4">
                    Attention-Deficit/Hyperactivity Disorder (ADHD) is a chronic neurodevelopmental disorder characterized by
                    persistent patterns of inattention, hyperactivity, and impulsivity that interfere with functioning or development.
                    <Citation refId="faraone2021" /> The disorder typically manifests in childhood, with symptoms often continuing
                    into adolescence and adulthood. <Citation refId="sibley2017" />
                </p>

                <Panel color="blue" className="mt-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                        <div>
                            <h4 className="text-blue-900 mb-2">Clinical Significance</h4>
                            <p className="text-slate-700 text-sm leading-relaxed">
                                ADHD is one of the most common neurodevelopmental disorders, affecting approximately 15.5 million (~6.0%)
                                adults and 6.5 million (~10.5%) children and adolescents in the United States alone.
                                <Citation refId="danielson2018" /> The disorder significantly impacts academic performance, occupational
                                functioning, and social relationships across the lifespan.
                            </p>
                        </div>
                    </div>
                </Panel>
            </div>

            {/* Epidemiology Section with Tabs */}
            <div>
                <H2 id="epidemiology">Epidemiology and Prevalence</H2>

                <TabsLayout
                    tabs={[
                        {
                            id: 'prevalence',
                            label: 'Prevalence Data',
                            icon: TrendingUp,
                            content: (
                                <div className="space-y-8">
                                    <H3 id="global-prevalence">Global Prevalence</H3>
                                    <p className="text-slate-700 leading-relaxed">
                                        Meta-analyses estimate the worldwide prevalence of ADHD to be approximately 5.29% in children and adolescents,
                                        <Citation refId="polanczyk2007" /> with regional variations reflecting differences in diagnostic practices,
                                        cultural factors, and assessment methodologies.
                                        <MarginNote id="note-regional">Regional differences in prevalence may reflect actual population differences, but also highlight variations in diagnostic criteria, cultural attitudes toward ADHD symptoms, and healthcare access.</MarginNote>
                                        <Citation refId="faraone2021" />
                                    </p>

                                    {/* Prevalence Table - Styled Background */}
                                    <div className="bg-slate-50 rounded-lg p-6 my-6">
                                        <Table
                                            caption="Table 1. ADHD Prevalence Rates by Age Group and Region"
                                            columns={[
                                                { key: 'region', header: 'Region' },
                                                { key: 'children', header: 'Children (ages 6-17)' },
                                                { key: 'adolescents', header: 'Adolescents (ages 13-18)' },
                                                { key: 'adults', header: 'Adults (18+)' },
                                                { key: 'study', header: 'Study' }
                                            ]}
                                            data={[
                                                { region: 'North America', children: '9.4%', adolescents: '7.8%', adults: '4.4%', study: 'Danielson et al., 2018' },
                                                { region: 'Europe', children: '5.0%', adolescents: '4.2%', adults: '3.4%', study: 'Polanczyk et al., 2014' },
                                                { region: 'Asia', children: '4.6%', adolescents: '3.8%', adults: '2.8%', study: 'Xu et al., 2018' },
                                                { region: 'South America', children: '7.8%', adolescents: '6.5%', adults: '3.9%', study: 'Rohde et al., 2019' },
                                                { region: 'Global Average', children: '5.9%', adolescents: '5.0%', adults: '3.4%', study: 'Faraone et al., 2021' }
                                            ]}
                                            variant="striped"
                                        />
                                    </div>

                                    {/* Age Distribution Chart */}
                                    <Figure
                                        number="1"
                                        caption="ADHD prevalence decreases with age, though a significant proportion of individuals maintain symptoms into adulthood. Data aggregated from multiple epidemiological studies (Faraone et al., 2021)."
                                    >
                                        <div className="bg-white rounded-lg p-6 border border-slate-200">
                                            <h4 className="text-slate-900 text-center mb-6">ADHD Prevalence by Age Group</h4>
                                            <div className="flex items-end justify-around h-64 border-b-2 border-l-2 border-slate-300 pb-4 pl-4">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-16 bg-blue-500 rounded-t" style={{ height: '80%' }}></div>
                                                    <p className="text-xs text-slate-600 text-center">6-12<br />years</p>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-16 bg-blue-500 rounded-t" style={{ height: '65%' }}></div>
                                                    <p className="text-xs text-slate-600 text-center">13-17<br />years</p>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-16 bg-blue-500 rounded-t" style={{ height: '45%' }}></div>
                                                    <p className="text-xs text-slate-600 text-center">18-29<br />years</p>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-16 bg-blue-500 rounded-t" style={{ height: '35%' }}></div>
                                                    <p className="text-xs text-slate-600 text-center">30-44<br />years</p>
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-16 bg-blue-500 rounded-t" style={{ height: '28%' }}></div>
                                                    <p className="text-xs text-slate-600 text-center">45+<br />years</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 text-center mt-4">Estimated prevalence (%)</p>
                                        </div>
                                    </Figure>

                                    {/* Gender Differences */}
                                    <H3 id="gender-differences">Gender Differences</H3>
                                    <p className="text-slate-700 leading-relaxed">
                                        ADHD diagnosis rates show significant gender disparities, with males being diagnosed 2-3 times more
                                        frequently than females in childhood. <Citation refId="mowlem2019" /> However, this gap narrows
                                        considerably in adulthood, suggesting potential underdiagnosis in females during childhood.
                                        <MarginNote id="note-gender">Girls with ADHD often present with less disruptive inattentive symptoms, leading to diagnostic delays. They may develop compensatory strategies that mask symptoms until academic or social demands increase.</MarginNote>
                                        <Citation refId="young2020" />
                                    </p>

                                    <ComparisonTable
                                        caption="Table 2. Gender-Based Symptom Presentation Differences"
                                        leftHeader="Males with ADHD"
                                        rightHeader="Females with ADHD"
                                        rows={[
                                            {
                                                label: 'Symptom Profile',
                                                left: 'Higher rates of hyperactive-impulsive symptoms',
                                                right: 'Higher rates of inattentive symptoms'
                                            },
                                            {
                                                label: 'Comorbidities',
                                                left: 'More externalizing behaviors (aggression, defiance)',
                                                right: 'More internalizing symptoms (anxiety, depression)'
                                            },
                                            {
                                                label: 'Diagnosis Timeline',
                                                left: 'Earlier diagnosis (average age 7)',
                                                right: 'Later diagnosis (average age 12)'
                                            },
                                            {
                                                label: 'Detection Pattern',
                                                left: 'Higher referral rates for clinical evaluation',
                                                right: 'Often identified in academic settings first'
                                            }
                                        ]}
                                    />
                                </div>
                            )
                        },
                        {
                            id: 'symptoms',
                            label: 'Symptom Patterns',
                            icon: AlertCircle,
                            content: (
                                <div className="space-y-8">
                                    <H3 id="core-symptoms">Core Symptom Domains</H3>
                                    <p className="text-slate-700 leading-relaxed">
                                        ADHD is characterized by two primary symptom domains: inattention and hyperactivity-impulsivity.
                                        According to DSM-5 criteria, <Citation refId="apa2013" /> individuals must exhibit at least six
                                        symptoms from one or both domains, persisting for at least six months to a degree that is inconsistent
                                        with developmental level.
                                    </p>

                                    {/* Expandable Symptom Table */}
                                    <ExpandableTable
                                        caption="Table 3. DSM-5 ADHD Symptom Criteria (Click rows for clinical examples)"
                                        columns={[
                                            { key: 'domain', header: 'Symptom Domain' },
                                            { key: 'criterion', header: 'DSM-5 Criterion' },
                                            { key: 'severity', header: 'Clinical Severity' }
                                        ]}
                                        data={[
                                            {
                                                main: {
                                                    domain: 'Inattention',
                                                    criterion: 'Fails to give close attention to details',
                                                    severity: 'Moderate to Severe'
                                                },
                                                expanded: (
                                                    <div className="p-4 bg-blue-50 text-sm">
                                                        <p className="mb-2"><strong>Clinical Example:</strong></p>
                                                        <p className="text-slate-700">Patient frequently makes careless errors in schoolwork or during work activities. May overlook or miss important details in instructions, leading to incomplete tasks.</p>
                                                    </div>
                                                )
                                            },
                                            {
                                                main: {
                                                    domain: 'Inattention',
                                                    criterion: 'Difficulty sustaining attention in tasks or play',
                                                    severity: 'Moderate to Severe'
                                                },
                                                expanded: (
                                                    <div className="p-4 bg-blue-50 text-sm">
                                                        <p className="mb-2"><strong>Clinical Example:</strong></p>
                                                        <p className="text-slate-700">Has trouble staying focused during lectures, conversations, or lengthy reading. Mind wanders even during direct conversation.</p>
                                                    </div>
                                                )
                                            },
                                            {
                                                main: {
                                                    domain: 'Inattention',
                                                    criterion: 'Does not seem to listen when spoken to directly',
                                                    severity: 'Moderate'
                                                },
                                                expanded: (
                                                    <div className="p-4 bg-blue-50 text-sm">
                                                        <p className="mb-2"><strong>Clinical Example:</strong></p>
                                                        <p className="text-slate-700">Appears to be "somewhere else" during conversations, even when there are no obvious distractions. Frequently asks for repetition of information just provided.</p>
                                                    </div>
                                                )
                                            },
                                            {
                                                main: {
                                                    domain: 'Hyperactivity',
                                                    criterion: 'Fidgets with hands or feet, squirms in seat',
                                                    severity: 'Mild to Moderate'
                                                },
                                                expanded: (
                                                    <div className="p-4 bg-blue-50 text-sm">
                                                        <p className="mb-2"><strong>Clinical Example:</strong></p>
                                                        <p className="text-slate-700">Constant movement of hands or feet, tapping, or shifting position. Difficulty remaining still during required activities like meetings or meals.</p>
                                                    </div>
                                                )
                                            },
                                            {
                                                main: {
                                                    domain: 'Hyperactivity',
                                                    criterion: 'Leaves seat when remaining seated is expected',
                                                    severity: 'Moderate to Severe'
                                                },
                                                expanded: (
                                                    <div className="p-4 bg-blue-50 text-sm">
                                                        <p className="mb-2"><strong>Clinical Example:</strong></p>
                                                        <p className="text-slate-700">Gets up during class, meetings, or other situations where staying seated is expected. In adults, may manifest as extreme restlessness.</p>
                                                    </div>
                                                )
                                            },
                                            {
                                                main: {
                                                    domain: 'Impulsivity',
                                                    criterion: 'Blurts out answers before questions completed',
                                                    severity: 'Moderate'
                                                },
                                                expanded: (
                                                    <div className="p-4 bg-blue-50 text-sm">
                                                        <p className="mb-2"><strong>Clinical Example:</strong></p>
                                                        <p className="text-slate-700">Cannot wait for turn in conversation. Completes others\' sentences. Provides answers in classroom before being called upon.</p>
                                                    </div>
                                                )
                                            }
                                        ]}
                                    />

                                    {/* Symptom Trajectory */}
                                    <H3 id="symptom-trajectory">Symptom Persistence Across Lifespan</H3>
                                    <Figure
                                        number="2"
                                        caption="Hyperactivity-impulsivity symptoms typically decrease with age, while inattention symptoms tend to persist into adulthood. Approximately 60% of childhood cases maintain clinically significant symptoms in adulthood (Sibley et al., 2017)."
                                    >
                                        <div className="bg-amber-50 rounded-lg p-8 border border-amber-200">
                                            <div className="bg-white rounded-lg p-8">
                                                <h4 className="text-slate-900 text-center mb-6">Symptom Severity Across Development</h4>
                                                <div className="relative h-64 border-l-2 border-b-2 border-slate-400">
                                                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 -rotate-90">
                                                        <p className="text-sm text-slate-600">Symptom Severity</p>
                                                    </div>
                                                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                                                        <p className="text-sm text-slate-600">Age (years)</p>
                                                    </div>

                                                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                                        <path d="M 0 30 L 30 25 L 60 35 L 100 40" fill="none" stroke="#156082" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                                                        <text x="5" y="25" fill="#156082" fontSize="12">Inattention</text>
                                                    </svg>

                                                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                                        <path d="M 0 50 L 30 60 L 60 75 L 100 85" fill="none" stroke="#8ED973" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                                                        <text x="5" y="55" fill="#8ED973" fontSize="12">Hyperactivity</text>
                                                    </svg>
                                                </div>
                                                <div className="flex justify-around mt-8 text-xs text-slate-600">
                                                    <span>Childhood (6-12)</span>
                                                    <span>Adolescence (13-17)</span>
                                                    <span>Young Adult (18-29)</span>
                                                    <span>Adulthood (30+)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Figure>
                                </div>
                            )
                        },
                        {
                            id: 'neurobiology',
                            label: 'Neurobiological Basis',
                            icon: Users,
                            content: (
                                <div className="space-y-8">
                                    <H3 id="neurobiological-basis">Neurobiological Underpinnings</H3>
                                    <p className="text-slate-700 leading-relaxed">
                                        ADHD has a strong neurobiological basis, with converging evidence from genetics, neuroimaging, and \n              neurochemistry studies. <Citation refId="faraone2015" /> The disorder is highly heritable, with \n              genetic factors accounting for approximately 74% of variance in ADHD symptoms.
                                        <MarginNote id="note-heritability">Heritability of 74% is one of the highest among psychiatric disorders, comparable to height. However, ADHD is polygenic, with many genes each contributing small effects.</MarginNote>
                                        <Citation refId="faraone2005" />
                                    </p>

                                    {/* Brain Region Figure Grid */}
                                    <Figure
                                        number="3"
                                        caption="Key brain regions implicated in ADHD pathophysiology. Structural and functional abnormalities have been consistently identified in these regions across multiple neuroimaging studies."
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                                                <div className="w-full aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center text-white">
                                                    <span>PFC</span>
                                                </div>
                                                <h4 className="text-slate-900 mb-2">Prefrontal Cortex</h4>
                                                <p className="text-sm text-slate-700">Reduced volume and activation. Affects executive function and attention regulation.</p>
                                            </div>

                                            <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                                                <div className="w-full aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-4 flex items-center justify-center text-white">
                                                    <span>BG</span>
                                                </div>
                                                <h4 className="text-slate-900 mb-2">Basal Ganglia</h4>
                                                <p className="text-sm text-slate-700">Altered dopamine signaling. Impacts motor control and reward processing.</p>
                                            </div>

                                            <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                                                <div className="w-full aspect-square bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center text-white">
                                                    <span>ACC</span>
                                                </div>
                                                <h4 className="text-slate-900 mb-2">Anterior Cingulate</h4>
                                                <p className="text-sm text-slate-700">Decreased connectivity. Affects error detection and conflict monitoring.</p>
                                            </div>
                                        </div>
                                    </Figure>

                                    {/* Neurotransmitter Table */}
                                    <Table
                                        caption="Table 4. Neurotransmitter Systems Implicated in ADHD"
                                        columns={[
                                            { key: 'neurotransmitter', header: 'Neurotransmitter' },
                                            { key: 'function', header: 'Primary Function' },
                                            { key: 'alteration', header: 'ADHD-Related Alteration' },
                                            { key: 'treatment', header: 'Treatment Target' }
                                        ]}
                                        data={[
                                            { neurotransmitter: 'Dopamine', function: 'Reward, motivation, attention', alteration: 'Reduced signaling in striatum', treatment: 'Yes (stimulants)' },
                                            { neurotransmitter: 'Norepinephrine', function: 'Arousal, alertness, attention', alteration: 'Dysregulated prefrontal release', treatment: 'Yes (atomoxetine)' },
                                            { neurotransmitter: 'Serotonin', function: 'Mood, impulse control', alteration: 'Altered receptor sensitivity', treatment: 'Indirect' },
                                            { neurotransmitter: 'Glutamate', function: 'Excitatory transmission, learning', alteration: 'Imbalanced in cortical circuits', treatment: 'Under investigation' },
                                            { neurotransmitter: 'GABA', function: 'Inhibitory control, calming', alteration: 'Reduced in certain regions', treatment: 'Under investigation' }
                                        ]}
                                        variant="clinical"
                                        sortable
                                    />
                                </div>
                            )
                        }
                    ]}
                    defaultTabId="prevalence"
                />
            </div>

            {/* Clinical Assessment Section */}
            <div>
                <H2 id="clinical-assessment">Clinical Assessment and Diagnosis</H2>

                <H3 id="diagnostic-process">Diagnostic Process</H3>
                <p className="text-slate-700 leading-relaxed">
                    ADHD diagnosis requires a comprehensive clinical evaluation that includes detailed developmental history,
                    symptom assessment across multiple settings, and consideration of alternative explanations.
                    <Citation refId="wolraich2019" /> The process typically involves multiple informants and standardized
                    rating scales.
                </p>

                {/* Assessment Tools Panel */}
                <Panel color="green" bleed className="mt-6">
                    <H4 id="assessment-tools">Commonly Used Assessment Tools</H4>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-lg p-4">
                            <h5 className="text-slate-900 mb-2">Rating Scales</h5>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>Conners Comprehensive Behavior Rating Scales</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>ADHD Rating Scale-5</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>Vanderbilt ADHD Diagnostic Rating Scale</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>Brown ADD Scale</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-lg p-4">
                            <h5 className="text-slate-900 mb-2">Diagnostic Interviews</h5>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>Diagnostic Interview Schedule for Children (DISC)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>Schedule for Affective Disorders (K-SADS)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    <span>Adult ADHD Clinical Diagnostic Scale (ACDS)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Panel>
            </div>

            {/* Treatment Overview Section */}
            <div>
                <H2 id="treatment">Treatment Approaches</H2>

                <H3 id="multimodal-treatment">Multimodal Treatment Framework</H3>
                <p className="text-slate-700 leading-relaxed">
                    Evidence-based treatment for ADHD typically involves a combination of pharmacological and psychosocial
                    interventions, tailored to individual needs and symptom severity. <Citation refId="cortese2018" /> The
                    multimodal treatment approach has shown superior outcomes compared to single-intervention strategies.
                </p>

                {/* Treatment Comparison - Styled Background */}
                <div className="bg-slate-100 rounded-lg p-8 mt-8">
                    <div className="bg-white rounded-lg p-8 shadow-lg">
                        <h4 className="text-slate-900 mb-6">Treatment Efficacy Comparison</h4>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="mb-4">
                                    <div className="inline-block p-4 bg-blue-100 rounded-full">
                                        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                        </svg>
                                    </div>
                                </div>
                                <h5 className="text-slate-900 mb-2">Medication</h5>
                                <p className="text-3xl text-blue-600 mb-1">70-80%</p>
                                <p className="text-sm text-slate-600">Response Rate</p>
                            </div>

                            <div className="text-center">
                                <div className="mb-4">
                                    <div className="inline-block p-4 bg-green-100 rounded-full">
                                        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                    </div>
                                </div>
                                <h5 className="text-slate-900 mb-2">Behavioral Therapy</h5>
                                <p className="text-3xl text-green-600 mb-1">50-60%</p>
                                <p className="text-sm text-slate-600">Response Rate</p>
                            </div>

                            <div className="text-center">
                                <div className="mb-4">
                                    <div className="inline-block p-4 bg-purple-100 rounded-full">
                                        <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <h5 className="text-slate-900 mb-2">Combined Treatment</h5>
                                <p className="text-3xl text-purple-600 mb-1">80-90%</p>
                                <p className="text-sm text-slate-600">Response Rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conclusion */}
            <div>
                <H2 id="conclusion">Summary and Future Directions</H2>
                <p className="text-slate-700 leading-relaxed">
                    ADHD represents a complex neurodevelopmental disorder with significant impacts across the lifespan.
                    Advances in neuroimaging, genetics, and clinical research continue to refine our understanding of
                    the disorder's etiology and inform evidence-based treatment approaches. <Citation refId="faraone2021" />
                    Future research directions include precision medicine approaches, novel pharmacological targets, and
                    digital therapeutics. <Citation refId="cortese2020" />
                </p>

                <Panel color="yellow" className="mt-6">
                    <div className="flex items-start gap-3">
                        <BookOpen className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
                        <div>
                            <h4 className="text-yellow-900 mb-2">Key Takeaways</h4>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">•</span>
                                    <span>ADHD affects 5-7% of children and 2.5% of adults worldwide</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">•</span>
                                    <span>Symptoms often persist into adulthood in approximately 60% of cases</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">•</span>
                                    <span>Neurobiological basis involves multiple brain regions and neurotransmitter systems</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-yellow-600 mt-1">•</span>
                                    <span>Multimodal treatment combining medication and behavioral interventions shows best outcomes</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Panel>
            </div>
        </div>
    );
}

// Main component wrapped in References Provider and ContentWithSidebar
export function ADHDExemplar() {
    return (
        <>
            <ADHDExemplarContent />
        </>
    );
}

