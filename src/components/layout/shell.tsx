"use client";
import { CarouselTabs, Tab } from '@/components/navigation/tab-navigation';
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useState } from 'react';
import { ReferencesList, ReferencesProvider } from '../content/reference';

interface ShellLayoutProps {
    tabs: Tab[];
}


const NotFound = () => {
    return (
        <div>
            <h1>Not Found</h1>
        </div>
    )
}

const ShellLayout = ({ tabs }: ShellLayoutProps) => {
    const [currentTabId, setCurrentTabId] = useState<string>(tabs[0]?.id || '');


    const Tab = tabs.find(p => p.id === currentTabId)?.component || NotFound;


    const handleTabChange = (tabId: string) => {
        setCurrentTabId(tabId);
    };

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #cfe2ff, #b8dfe6)' }}>
            {/* Fixed Header Section */}
            <div className="sticky top-0 z-50">
                <header className="bg-blue-100 px-4 py-4 sm:px-6 lg:px-8 shadow-sm">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button className="p-1.5 hover:bg-blue-200 rounded-full transition-colors">
                                    <ArrowLeft size={24} className="text-slate-700" />
                                </button>
                                <div>
                                    <h1 className="text-slate-900 text-2xl">ADHD</h1>
                                    <p className="text-slate-600 text-sm">Mental Health Pathologies</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </header>



                {/* Tab Navigation */}
                <nav className="bg-blue-100 px-4 sm:px-6 lg:px-8 pt-2 pb-0">
                    <div className="max-w-7xl mx-auto">
                        <CarouselTabs
                            tabs={tabs}
                            activeTab={currentTabId}
                            onTabChange={handleTabChange}
                        />
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <ReferencesProvider>
                {/* <Content.Provider autoDetectHeadings showMarginNotes> */}
                <main className="px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className=" p-6 sm:p-8 min-h-[500px]">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* <Content.Sidebar /> */}
                                <div className="flex-1 min-w-0">
                                    {/* <Content.Area contentKey={currentTabId}> */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentTabId}
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -10, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >

                                            <Tab />
                                            <ReferencesList />
                                        </motion.div>
                                    </AnimatePresence>
                                    {/* </Content.Area> */}
                                </div>
                                {/* <Content.MarginNotes /> */}
                            </div>
                        </div>
                    </div>
                </main>
                {/* </Content.Provider> */}

            </ReferencesProvider>

            {/* Footer */}
            <footer className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-7xl mx-auto">
                    <p className="text-slate-700 text-sm text-center">
                        Educational resource for mental health professionals and students
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default ShellLayout;