"use client";
import { Figure } from '@/components/content/figure';
import { H1, H2 } from '@/components/content/heading';
import {
    Citation,
    useReferences
} from '@/components/content/reference';
import { getReferences } from '@/data/references';
import { REF_IDS } from '@/data/references-utils';
import { useEffect } from 'react';
import { SymptomsOverTimeChart } from './symptoms-over-time-chart';

// Reference IDs used on this page
const pageReferenceIds = [
    REF_IDS.SIBLEY_2017,
    REF_IDS.OIE_2018,
    REF_IDS.LAPALME_2017,
    REF_IDS.BIEDERMAN_2000,
];

function ADHDThroughYearsContent() {
    const { addReference } = useReferences();

    // Add all references when component mounts
    useEffect(() => {
        const references = getReferences(pageReferenceIds);
        references.forEach(ref => addReference(ref));
    }, [addReference]);

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <H1 id="adhd-through-years">ADHD Through the Years</H1>

            {/* Subtitle */}
            <H2 id="adhd-children-adolescents-adults">ADHD in Children, Adolescents, and Adults</H2>

            {/* Main Figure with Chart */}
            <Figure
                number="1"
                caption={
                    <>
                        Symptoms Over Time*. Although ADHD is often seen as a childhood disorder, approximately{' '}
                        <strong>60%</strong> of individuals diagnosed with ADHD during childhood will maintain symptoms through adolescence and into adulthood. <Citation refId={REF_IDS.SIBLEY_2017} />{' '}
                        While symptoms of hyperactivity/impulsivity generally decrease with age, inattention tends to persist into adulthood. <Citation refId={REF_IDS.OIE_2018} /> <Citation refId={REF_IDS.LAPALME_2017} /> <Citation refId={REF_IDS.BIEDERMAN_2000} />
                    </>
                }
                variant="spotlight"
                size="large"
            >
                <SymptomsOverTimeChart />

            </Figure>


        </div>
    );
}

// Main component
export default function Page() {
    return (
        <ADHDThroughYearsContent />
    );
}