"use client";
import ShellLayout from "@/components/layout/shell";
import { Tab } from "@/components/navigation/tab-navigation";
import EtiologyOfADHDTab from "./tab";

const tabs: Tab[] = [
    { id: 'etiology', label: 'Etiology', component: EtiologyOfADHDTab },
]

const Page = () => {
    return (
        <ShellLayout nodeName="Epidemiology" subnodeName="Etiology of ADHD" tabs={tabs} />
    )
}

export default Page;