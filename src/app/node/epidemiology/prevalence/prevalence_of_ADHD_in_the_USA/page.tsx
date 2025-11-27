"use client";
import { Figure } from '@/components/content/figure';
import { H1 } from '@/components/content/heading';
import {
    useReferences
} from '@/components/content/reference';
import { StatCard } from '@/components/content/stats-card';
import { useEffect } from 'react';
import { SymptomPersistenceChart } from './symptom-persistence-chart';







// Reference data for this page
const prevalenceReferences = [
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
        id: 'staley2024',
        authors: 'Staley, B. S., Robinson, L. R., Claussen, A. H., et al.',
        year: 2024,
        title: 'Attention-Deficit/Hyperactivity Disorder Diagnosis, Treatment, and Telehealth Use in Adults - National Center for Health Statistics Rapid Surveys System, United States, October-November 2023',
        journal: 'MMWR Morb Mortal Wkly Rep',
        volume: '73',
        pages: '890-895',
        doi: '10.15585/mmwr.mm7340a1'
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
        id: 'lapalme2017',
        authors: 'Lapalme, M., Déry, M., Dubé, M., Lemieux, A.',
        year: 2017,
        title: 'Developmental Course of ADHD Symptoms Based on Multirater Report in Girls and Boys With or Without a Disruptive Behavior Disorder',
        journal: 'J Emot Behav Disord',
        volume: '26',
        pages: '106-118',
        doi: '10.1177/1063426617712500'
    },
    {
        id: 'sibley2017',
        authors: 'Sibley, M. H., Swanson, J. M., Arnold, L. E., et al.',
        year: 2017,
        title: 'Defining ADHD symptom persistence in adulthood: optimizing sensitivity and specificity',
        journal: 'J Child Psychol Psychiatry',
        volume: '58',
        pages: '655-662',
        doi: '10.1111/jcpp.12620'
    }
];

function PrevalenceOfADHDInUSAContent() {
    const { addReference } = useReferences();

    // Add all references when component mounts
    useEffect(() => {
        prevalenceReferences.forEach(ref => addReference(ref));
    }, [addReference]);

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <H1 id="prevalence-usa">Prevalence of ADHD in the USA</H1>

            {/* Main Infographic Figure */}
            <Figure
                number="1"
                caption={
                    <>
                        ADHD prevalence in the United States. Approximately{' '}
                        <strong>15.5 million (~6.0%) adults</strong> and{' '}
                        <strong>6.5 million (~10.5%) children and adolescents</strong>{' '}
                        in the United States are estimated to have ADHD. ADHD manifests in childhood, and approximately{' '}
                        <strong>60%</strong> of individuals diagnosed in childhood continue to experience symptoms into adulthood.
                    </>
                } credit="Danielson et al., 2018; Staley et al., 2024; Øie et al., 2018; Lapalme et al., 2017; Sibley et al., 2017"
                variant="spotlight"
                size="large"
            >
                <div className="grid md:grid-cols-2 gap-6">
                    <StatCard
                        title="Adults"
                        population="15.5 million"
                        percentage="~6.0%"
                        color="blue"
                    />
                    <StatCard
                        title="Children & Adolescents"
                        population="6.5 million"
                        percentage="~10.5%"
                        color="purple"
                    />
                    <div className="col-span-2">
                        <SymptomPersistenceChart />
                    </div>
                </div>



            </Figure>



            {/* References List */}
        </div>
    );
}

// Main component
export default function Page() {
    return (
        <PrevalenceOfADHDInUSAContent />
    );
}
