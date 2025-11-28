"use client";
import ShellLayout from "@/components/layout/shell";
import ADHDThroughTheYear from './ADHD_through_the_years/tab';
import GenderDifferences from './gender_differences/tab';
import PrevalenceOfADHDInTheUSA from './prevalence_of_ADHD_in_the_USA/tab';

const tabs = [
    { id: 'ADHD_through_the_years', label: 'ADHD Through the Years', component: ADHDThroughTheYear },
    { id: 'gender_differences', label: 'Gender Differences', component: GenderDifferences },
    { id: 'prevalence_of_ADHD_in_the_USA', label: 'Prevalence of ADHD in the USA', component: PrevalenceOfADHDInTheUSA },
]


const Page = () => {

    return (
        <ShellLayout nodeName="Epidemiology" subnodeName="Prevalence" tabs={tabs} />
    )
}

export default Page;