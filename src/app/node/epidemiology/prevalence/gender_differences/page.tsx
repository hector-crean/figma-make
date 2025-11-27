"use client";
import { Figure } from '@/components/content/figure';
import { H1 } from '@/components/content/heading';
import {
    Citation,
    useReferences
} from '@/components/content/reference';
import { useEffect } from 'react';
import { GenderGapChart } from './gender-gap-chart';

// Reference data for this page
const genderDifferencesReferences = [
    {
        id: 'mowlem2019',
        authors: 'Mowlem, F. D., Rosenqvist, M. A., Martin, J., Lichtenstein, P., Asherson, P., Larsson, H.',
        year: 2019,
        title: 'Sex differences in predicting ADHD clinical diagnosis and pharmacological treatment',
        journal: 'Eur Child Adolesc Psychiatry',
        volume: '28',
        pages: '481-489',
        doi: '10.1007/s00787-018-1211-3'
    },
    {
        id: 'dalsgaard2020',
        authors: 'Dalsgaard, S., McGrath, J., Østergaard, S. D., et al.',
        year: 2020,
        title: 'Association of Mental Disorder in Childhood and Adolescence With Subsequent Educational Achievement',
        journal: 'JAMA Psychiatry',
        volume: '77',
        pages: '797-805',
        doi: '10.1001/jamapsychiatry.2020.0217'
    },
    {
        id: 'cortese2016',
        authors: 'Cortese, S., Faraone, S. V., Bernardi, S., Wang, S., Blanco, C.',
        year: 2016,
        title: 'Gender differences in adult attention-deficit/hyperactivity disorder: results from the National Epidemiologic Survey on Alcohol and Related Conditions (NESARC)',
        journal: 'J Clin Psychiatry',
        volume: '77',
        pages: 'e421-e428',
        doi: '10.4088/JCP.14m09630'
    },
    {
        id: 'oie2018',
        authors: 'Øie, M., Hovik, K. T., Andersen, P. N., Czajkowski, N. O., Skogli, E. W.',
        year: 2018,
        title: 'Gender Differences in the Relationship Between Changes in ADHD Symptoms, Executive Functions, and Self- and Parent-Report Depression Symptoms in Boys and Girls With ADHD: A 2-Year Follow-Up Study',
        journal: 'J Atten Disord',
        volume: '22',
        pages: '446-459',
        doi: '10.1177/1087054716664407'
    },
    {
        id: 'tung2016',
        authors: 'Tung, I., Li, J. J., Meza, J. I., et al.',
        year: 2016,
        title: 'Patterns of Comorbidity Among Girls With ADHD: A Meta-analysis',
        journal: 'Pediatrics',
        volume: '138',
        pages: 'e20160430',
        doi: '10.1542/peds.2016-0430'
    },
    {
        id: 'young2020',
        authors: 'Young, S., Adamo, N., Ásgeirsdóttir, B. B., et al.',
        year: 2020,
        title: 'Females with ADHD: An expert consensus statement taking a lifespan approach providing guidance for the identification and treatment of attention-deficit/ hyperactivity disorder in girls and women',
        journal: 'BMC Psychiatry',
        volume: '20',
        pages: '404',
        doi: '10.1186/s12888-020-02707-9'
    },
    {
        id: 'solberg2018',
        authors: 'Solberg, B. S., Halmøy, A., Engeland, A., Igland, J., Haavik, J., Klungsøyr, K.',
        year: 2018,
        title: 'Gender differences in psychiatric comorbidity: a population-based study of 40 000 adults with attention deficit hyperactivity disorder',
        journal: 'Acta Psychiatr Scand',
        volume: '137',
        pages: '176-186',
        doi: '10.1111/acps.12845'
    },
    {
        id: 'babinski2024',
        authors: 'Babinski, D. E.',
        year: 2024,
        title: 'Sex Differences in ADHD: Review and Priorities for Future Research',
        journal: 'Curr Psychiatry Rep',
        volume: '26',
        pages: '151-156',
        doi: '10.1007/s11920-024-01492-6'
    }
];

function GenderDifferencesContent() {
    const { addReference } = useReferences();

    // Add all references when component mounts
    useEffect(() => {
        genderDifferencesReferences.forEach(ref => addReference(ref));
    }, [addReference]);

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <H1 id="gender-differences">Gender Differences</H1>

            {/* Main Infographic Figure */}
            <Figure
                number="1"
                caption={
                    <>
                        Gender differences in ADHD symptoms and diagnosis rates. ADHD symptoms often vary by sex, leading to a 2:1 higher childhood diagnosis rate in boys. <Citation refId="mowlem2019" /> <Citation refId="dalsgaard2020" /> Boys typically exhibit <strong>externalized behaviors</strong>, like hyperactivity <Citation refId="dalsgaard2020" /> <Citation refId="cortese2016" /> <Citation refId="oie2018" />, while girls show more <strong>internalized symptoms</strong>, such as inattention or anxiety <Citation refId="tung2016" /> <Citation refId="young2020" /> <Citation refId="solberg2018" />. ADHD diagnosis rates are similar in males and females during adulthood but are 3 to 16 times greater in males during childhood <Citation refId="babinski2024" />.
                    </>
                }
                credit="Mowlem et al., 2019; Dalsgaard et al., 2020; Cortese et al., 2016; Øie et al., 2018; Tung et al., 2016; Young et al., 2020; Solberg et al., 2018; Babinski, 2024"
                variant="spotlight"
                size="large"
            >
                <GenderGapChart />
            </Figure>

        </div>
    );
}

// Main component
export default function Page() {
    return (
        <GenderDifferencesContent />
    );
}
