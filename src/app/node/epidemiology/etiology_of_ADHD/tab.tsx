"use client";

import { useEffect } from "react";
import {
  Citation,
  ReferencesList,
  useReferences,
} from "@/components/content/reference";
import { H1, Section, H2 } from "@/components/content/heading";
import { ComparisonFigure, Figure } from "@/components/content/figure";
import { InteractiveBrain } from "@/components/content/interactive-brain";

// Etiology references from Figma design
const pageReferences = [
  {
    id: "faraone2024",
    authors: "Faraone, S. V., et al.",
    year: 2024,
    title: "Attention-deficit/hyperactivity disorder",
    journal: "Nat Rev Dis Primers",
    volume: "10",
    pages: "11",
    doi: "10.1038/s41572-024-00495-0",
  },
  {
    id: "pourhamzeh2022",
    authors: "Pourhamzeh, M., et al.",
    year: 2022,
    title: "The Neurobiology of Attention-Deficit/Hyperactivity Disorder",
    journal: "Cell Mol Neurobiol",
    volume: "42",
    pages: "1671-1692",
  },
  {
    id: "faraone2025",
    authors: "Faraone, S. V., et al.",
    year: 2025,
    title: "Neuroscience of ADHD",
    journal: "Neurosci Biobehav Rev",
    volume: "176",
    pages: "106275",
  },
];

import { AnnotatedDiagram } from "@/components/ui/annotated-diagram";
import { AnnotationId, brainAnnotations } from "@/data/brain-annotations";
import image from "@/app/sandbox/annotated-diagram/brain-background.jpg";

export function NetworkDiagram() {
  const neurotransmitters = [
    { id: "da", name: "DA", color: "bg-orange-500", x: 100, y: 50 },
    { id: "ne", name: "NE", color: "bg-blue-500", x: 200, y: 50 },
    { id: "gaba", name: "GABA", color: "bg-red-500", x: 50, y: 150 },
    { id: "sht", name: "5-HT", color: "bg-yellow-500", x: 150, y: 180 },
    { id: "glu", name: "Glu", color: "bg-green-500", x: 250, y: 150 },
  ];

  const connections = [
    { from: "da", to: "sht", color: "stroke-orange-400" },
    { from: "ne", to: "sht", color: "stroke-blue-400" },
    { from: "gaba", to: "sht", color: "stroke-red-400" },
    { from: "glu", to: "sht", color: "stroke-green-400" },
    { from: "da", to: "ne", color: "stroke-purple-400" },
    { from: "gaba", to: "da", color: "stroke-pink-400" },
    { from: "glu", to: "ne", color: "stroke-teal-400" },
  ];

  const getPosition = (id: string) => {
    const nt = neurotransmitters.find((n) => n.id === id);
    return nt ? { x: nt.x, y: nt.y } : { x: 0, y: 0 };
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl">
      <div
        className="relative mx-auto w-full max-w-md"
        style={{ height: "250px" }}
      >
        {/* SVG for connections */}
        <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
          {connections.map((conn, index) => {
            const from = getPosition(conn.from);
            const to = getPosition(conn.to);
            return (
              <line
                key={index}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={`${conn.color}`}
                strokeWidth="2"
                opacity="0.5"
              />
            );
          })}
        </svg>

        {/* Neurotransmitter nodes */}
        {neurotransmitters.map((nt) => (
          <div
            key={nt.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transform"
            style={{ left: `${nt.x}px`, top: `${nt.y}px`, zIndex: 10 }}
          >
            <div
              className={`${nt.color} flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-white shadow-lg`}
            >
              <span className="font-bold">{nt.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-6 grid max-w-2xl grid-cols-5 gap-3">
        <div className="text-center">
          <div className="mb-1 rounded-lg bg-orange-500 py-2 text-white">
            DA
          </div>
          <p className="text-xs text-gray-600">Dopamine</p>
        </div>
        <div className="text-center">
          <div className="mb-1 rounded-lg bg-blue-500 py-2 text-white">NE</div>
          <p className="text-xs text-gray-600">Norepinephrine</p>
        </div>
        <div className="text-center">
          <div className="mb-1 rounded-lg bg-yellow-500 py-2 text-white">
            5-HT
          </div>
          <p className="text-xs text-gray-600">Serotonin</p>
        </div>
        <div className="text-center">
          <div className="mb-1 rounded-lg bg-red-500 py-2 text-white">GABA</div>
          <p className="text-xs text-gray-600">GABA</p>
        </div>
        <div className="text-center">
          <div className="mb-1 rounded-lg bg-green-500 py-2 text-white">
            Glu
          </div>
          <p className="text-xs text-gray-600">Glutamate</p>
        </div>
      </div>
    </div>
  );
}

const EtiologyOfADHDTab = () => {
  const { addReference } = useReferences();

  useEffect(() => {
    pageReferences.forEach((ref) => addReference(ref));
  }, [addReference]);

  return (
    <div className="animate-in fade-in space-y-12 duration-500">
      <Section
        id="overview"
        title="Etiology of ADHD"
        level={2}
        className="mb-8"
      >
        <div className="rounded-r-lg border-l-4 border-blue-600 bg-blue-50 p-6">
          <p className="text-lg leading-relaxed text-slate-800">
            ADHD has a multifactorial etiology and is clinically heterogeneous,
            suggesting that multiple neurobiological pathways are involved in
            the development of this disorder <Citation refId="faraone2024" />.
          </p>
        </div>
      </Section>

      <Section id="genetics" title="Genetics" level={2}>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  •
                </span>
                <span className="leading-relaxed text-slate-700">
                  Heritability of ADHD is <strong>~80%</strong>{" "}
                  <Citation refId="faraone2024" />.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  •
                </span>
                <span className="leading-relaxed text-slate-700">
                  Polygenic risk scores or single genetic variants are
                  insufficient for diagnosing ADHD{" "}
                  <Citation refId="faraone2024" />.
                </span>
              </li>
            </ul>
          </div>
          <div className="relative flex h-full min-h-[200px] items-center justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-blue-600">~80%</div>
              <div className="font-medium text-slate-600">
                Heritability Estimate
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="environmental" title="Environmental Factors" level={2}>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6">
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-blue-600">•</span>
                <span className="leading-relaxed">
                  Rare events (e.g., TBI) may be associated with ADHD{" "}
                  <Citation refId="faraone2024" />.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-blue-600">•</span>
                <span className="leading-relaxed">
                  Many <strong>environmental factors</strong> associated with
                  ADHD have low risk ratios that are{" "}
                  <strong>difficult to interpret</strong>{" "}
                  <Citation refId="faraone2024" />.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-blue-600">•</span>
                <span className="leading-relaxed">
                  These include events or complications that occur during
                  pregnancy, delivery or early after birth (e.g. low
                  birthweight, perinatal hypoxia and advanced paternal age){" "}
                  <Citation refId="faraone2024" />.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section
        id="functional-structural"
        title="Functional / Structural"
        level={2}
      >
        <p className="mb-6 leading-relaxed text-slate-700">
          Cortical and subcortical regions of the brain and key networks are
          affected in ADHD <Citation refId="faraone2024" />.
        </p>

        <ComparisonFigure
          number="1"
          caption={
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 font-bold text-blue-600">•</span>
                <span className="leading-relaxed">
                  <strong>Interplay between NE, DA, and 5-HT</strong> plays a
                  key role in the full clinical presentation of ADHD{" "}
                  <Citation refId="faraone2024" />.
                </span>
              </li>
              <li className="ml-4 flex items-start gap-3">
                <span className="mt-1 text-slate-400">•</span>
                <span className="text-sm leading-relaxed">
                  5-HT modulates other neurotransmitters (DA and NE, as well as
                  GABA and Glu) <Citation refId="pourhamzeh2022" />.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 font-bold text-blue-600">•</span>
                <span className="leading-relaxed">
                  5-HT–DA opposing and synergistic interactions regulate brain
                  network activity <Citation refId="faraone2025" />.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 font-bold text-blue-600">•</span>
                <span className="leading-relaxed">
                  5-HT–NE opposing interactions control stimulus-driven neuronal
                  firing <Citation refId="faraone2025" />.
                </span>
              </li>
            </ul>
          }
          leftPanel={{
            label: "Cortical Regions Implicated in ADHD",
            content: (
              <AnnotatedDiagram
                src={image.src}
                alt="Brain Anatomy"
                // Coordinates in the JSON seem to assume a coordinate space around 1000x600 based on max values
                // Adjust these to match the actual intrinsic dimensions of brain-background.jpg for perfect alignment
                width={1280 * 0.75}
                height={720 * 0.75}
                annotations={brainAnnotations.filter((annotation) =>
                  [
                    "region-prefrontal-cortex",
                    "region-anterior-cingulate-cortex",
                  ].includes(annotation.id)
                )}
              />
            ),
          }}
          rightPanel={{
            label: "Subcortical Structures Involved in ADHD",
            content: (
              <AnnotatedDiagram
                src={image.src}
                alt="Brain Anatomy"
                // Coordinates in the JSON seem to assume a coordinate space around 1000x600 based on max values
                // Adjust these to match the actual intrinsic dimensions of brain-background.jpg for perfect alignment
                width={1280 * 0.75}
                height={720 * 0.75}
                annotations={brainAnnotations.filter((annotation) =>
                  [
                    "region-prefrontal-cortex",
                    "region-anterior-cingulate-cortex",
                  ].includes(annotation.id)
                )}
              />
            ),
          }}
        />

        <Figure
          number="2"
          caption="Schematic of Neurotransmitter Interactions: DA (Dopamine), NE (Norepinephrine), 5-HT (Serotonin), Glu (Glutamate), GABA."
        >
          <NetworkDiagram />
        </Figure>
      </Section>

      <ReferencesList />
    </div>
  );
};

export default EtiologyOfADHDTab;
