"use client";
import { CarouselTabs, type Tab } from "@/components/navigation/tab-navigation";
import { TabsProvider, useTabs } from "@/components/navigation/tabs-context";
import { ArrowLeft } from "lucide-react";
import { ReferencesProvider } from "../content/reference";
import { Content } from "@/components/layout/content-with-sidebar";

interface ShellLayoutProps {
  nodeName: string;
  subnodeName: string;
  tabs: Tab[];
}

const ShellLayout = ({ nodeName, subnodeName, tabs }: ShellLayoutProps) => {
  return (
    <ReferencesProvider>
      <TabsProvider tabs={tabs}>
        <div
          className="min-h-screen"
          style={{
            background: "linear-gradient(to bottom right, #cfe2ff, #b8dfe6)",
          }}
        >
          {/* Fixed Header Section */}
          <div className="sticky top-0 z-50">
            <header className="bg-blue-100 px-4 py-4 shadow-sm sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="rounded-full p-1.5 transition-colors hover:bg-blue-200">
                      <ArrowLeft size={24} className="text-slate-700" />
                    </button>
                    <div>
                      <h1 className="text-2xl text-slate-900">{nodeName}</h1>
                      <p className="text-sm text-slate-600">{subnodeName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Tab Navigation */}
            <nav className="bg-blue-100 px-4 pt-2 pb-0 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <CarouselTabs.Header />
              </div>
            </nav>
          </div>

            <main className="mx-auto flex min-h-[500px] max-w-7xl flex-col gap-8 p-6 px-4 pb-8 sm:p-8 sm:px-6 lg:flex-row lg:px-8">
              <CarouselTabs.Body />
            </main>

          {/* Footer */}
          <footer className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="text-center text-sm text-slate-700">
                Educational resource for mental health professionals and
                students
              </p>
            </div>
          </footer>
        </div>
      </TabsProvider>
    </ReferencesProvider>
  );
};

export default ShellLayout;
