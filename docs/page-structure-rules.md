# Page Structure Rules & Component Guidelines

This document outlines the approved components and structure patterns for building content pages in this project.

## Table of Contents

1. [Component Library](#component-library)
2. [Page Structure](#page-structure)
3. [Component Usage Guidelines](#component-usage-guidelines)
4. [Common Patterns](#common-patterns)
5. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)

---

## Component Library

### Content Components

#### 1. **Heading Components** (`@/components/content/heading`)

**Available Components:**

- `H1` - Page title (use only once per page)
- `H2` - Major sections (TOC level 1)
- `H3` - Subsections (TOC level 2)
- `H4` - Sub-subsections (typically not in TOC)
- `H5`, `H6` - Minor headings
- `Section` - Wrapper component with automatic heading

**When to Use:**

- Always use semantic heading components instead of raw `<h1>`, `<h2>`, etc.
- Use `H1` for the main page title
- Use `H2` for major content sections
- Use `H3` for subsections within `H2` sections
- Always provide an `id` prop for navigation and TOC generation

**Example:**

```tsx
import { H1, H2, H3, Section } from '@/components/content/heading';

<H1 id="page-title">Main Page Title</H1>
<Section id="introduction" title="Introduction" level={2}>
  <p>Content here...</p>
</Section>
```

---

#### 2. **Figure Components** (`@/components/content/figure`)

**Available Components:**

- `Figure` - Standard figure with caption and optional zoom/download
- `MultiPanelFigure` - Multi-panel comparisons (horizontal, vertical, or grid layout)
- `AnnotatedFigure` - Figure with interactive annotations/callouts
- `ComparisonFigure` - Side-by-side before/after comparisons
- `TimelineFigure` - Timeline/progression visualization

**When to Use:**

- **`Figure`**: For single images, charts, diagrams, or visualizations
- **`MultiPanelFigure`**: When comparing multiple related visuals side-by-side
- **`AnnotatedFigure`**: When you need to highlight specific parts of a figure with explanations
- **`ComparisonFigure`**: For before/after, treatment/control, or A/B comparisons
- **`TimelineFigure`**: For showing progression, development stages, or chronological data

**⚠️ CRITICAL:** Always use figure components instead of raw `<div>` elements for visual content. Do NOT create custom styled divs for figures.

**Example:**

```tsx
import { Figure, MultiPanelFigure, TimelineFigure } from '@/components/content/figure';

// Standard figure
<Figure
  number="1"
  caption="ADHD prevalence by age group. Data shows decreasing prevalence with age."
  credit="Data from Smith et al., 2023"
  variant="elevated"
  size="large"
  allowZoom
>
  {/* Your chart, image, or visualization */}
  <div className="bg-white rounded-lg p-6">
    {/* Chart content */}
  </div>
</Figure>

// Multi-panel figure
<MultiPanelFigure
  number="2"
  caption="Comparison of ADHD symptoms across different age groups"
  layout="horizontal"
  panels={[
    {
      label: "Children",
      content: <div>Children content</div>,
      description: "Ages 6-12"
    },
    {
      label: "Adolescents",
      content: <div>Adolescent content</div>,
      description: "Ages 13-17"
    }
  ]}
/>

// Timeline figure
<TimelineFigure
  number="3"
  caption="ADHD symptom progression from childhood to adulthood"
  stages={[
    {
      age: "6-12 years",
      title: "Childhood Onset",
      description: "Symptoms typically manifest during early school years"
    },
    {
      age: "13-17 years",
      title: "Adolescent Period",
      description: "Symptoms may change or intensify during puberty"
    }
  ]}
/>
```

---

#### 3. **Table Component** (`@/components/content/table`)

**Available Component:**

- `Table` - Data table with sorting, variants, and styling options

**When to Use:**

- For displaying structured data in rows and columns
- When data needs to be sortable or searchable
- For clinical data, statistics, or comparative information

**Variants:**

- `default` - Standard table with subtle styling
- `striped` - Alternating row colors
- `bordered` - Clear borders between cells
- `compact` - Reduced padding for dense data
- `clinical` - Enhanced styling for medical/clinical data

**Example:**

```tsx
import { Table } from "@/components/content/table";

<Table
  columns={[
    { key: "region", header: "Region" },
    { key: "prevalence", header: "Prevalence (%)" },
    { key: "study", header: "Study" },
  ]}
  data={[
    {
      region: "North America",
      prevalence: "6.0%",
      study: "Smith et al., 2023",
    },
    { region: "Europe", prevalence: "4.5%", study: "Jones et al., 2022" },
  ]}
  variant="striped"
  caption="ADHD prevalence by geographic region"
  tableNumber="1"
/>;
```

---

#### 4. **Reference & Citation Components** (`@/components/content/reference`)

**Available Components:**

- `ReferencesProvider` - Context provider (wrap page content)
- `Citation` - Inline citation component
- `ReferencesList` - Display all references at page bottom
- `useReferences` - Hook to manage references

**When to Use:**

- Always use `Citation` component for inline citations
- Use `ReferencesProvider` to wrap page content
- Use `ReferencesList` at the bottom of the page to display all references

**Example:**

```tsx
import {
  ReferencesProvider,
  Citation,
  ReferencesList,
  useReferences,
} from "@/components/content/reference";
import { useEffect } from "react";

const pageReferences = [
  {
    id: "smith2023",
    authors: "Smith, J., Doe, A.",
    year: 2023,
    title: "ADHD Research Study",
    journal: "Journal of Medicine",
    volume: "45",
    pages: "123-145",
    doi: "10.1234/example",
  },
];

function PageContent() {
  const { addReference } = useReferences();

  useEffect(() => {
    pageReferences.forEach((ref) => addReference(ref));
  }, [addReference]);

  return (
    <div>
      <p>
        ADHD affects many individuals <Citation refId="smith2023" />.
      </p>
      <ReferencesList />
    </div>
  );
}

export default function Page() {
  return (
    <ReferencesProvider>
      <PageContent />
    </ReferencesProvider>
  );
}
```

---

#### 5. **Accordion Component** (`@/components/content/accordion`)

**Available Components:**

- `AccordionItem` - Individual collapsible item
- `AccordionGroup` - Container for multiple accordion items

**When to Use:**

- For collapsible FAQ sections
- For expandable detailed information
- For progressive disclosure of content

**Example:**

```tsx
import { AccordionGroup, AccordionItem } from "@/components/content/accordion";

<AccordionGroup>
  <AccordionItem title="What is ADHD?" defaultOpen>
    <p>ADHD is a neurodevelopmental disorder...</p>
  </AccordionItem>
  <AccordionItem title="What are the symptoms?">
    <p>Symptoms include inattention, hyperactivity...</p>
  </AccordionItem>
</AccordionGroup>;
```

---

#### 6. **Other Content Components**

- `BentoBox` - Grid layout for content cards
- `HeroInfographic` - Hero section with infographic
- `InteractiveBrain` - Interactive brain visualization

---

## Page Structure

### Standard Page Template

```tsx
"use client";
import {
  ReferencesProvider,
  Citation,
  ReferencesList,
  useReferences,
} from "@/components/content/reference";
import { H1, H2, H3, Section } from "@/components/content/heading";
import { Figure, MultiPanelFigure } from "@/components/content/figure";
import { Table } from "@/components/content/table";
import { useEffect } from "react";

// Define references at the top of the file
const pageReferences = [
  // ... reference objects
];

function PageContent() {
  const { addReference } = useReferences();

  useEffect(() => {
    pageReferences.forEach((ref) => addReference(ref));
  }, [addReference]);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <H1 id="page-title">Page Title</H1>

      {/* Introduction Section */}
      <Section id="introduction" title="Introduction" level={2}>
        <p className="leading-relaxed text-slate-700">
          Introduction text with <Citation refId="ref1" /> citations.
        </p>
      </Section>

      {/* Main Content Section */}
      <Section id="main-content" title="Main Content" level={2}>
        <H3 id="subsection">Subsection Title</H3>

        {/* Use Figure components for visual content */}
        <Figure
          number="1"
          caption="Description of the figure"
          credit="Credit information"
        >
          {/* Visual content here */}
        </Figure>

        <p className="leading-relaxed text-slate-700">
          Supporting text with <Citation refId="ref2" />.
        </p>
      </Section>

      {/* References List */}
      <ReferencesList />
    </div>
  );
}

export default function Page() {
  return (
    <ReferencesProvider>
      <PageContent />
    </ReferencesProvider>
  );
}
```

---

## Component Usage Guidelines

### 1. **Visual Content Must Use Figure Components**

❌ **DON'T:**

```tsx
<div className="mx-auto max-w-3xl rounded-xl bg-[#d3e4ee] p-5">
  <svg>...</svg>
  <div className="flowchart">...</div>
</div>
```

✅ **DO:**

```tsx
<Figure
  number="1"
  caption="USA map showing ADHD prevalence distribution"
  variant="spotlight"
>
  <div className="rounded-xl bg-[#d3e4ee] p-5">
    <svg>...</svg>
    <div className="flowchart">...</div>
  </div>
</Figure>
```

### 2. **Always Use Semantic Heading Components**

❌ **DON'T:**

```tsx
<h1>Page Title</h1>
<h2>Section Title</h2>
```

✅ **DO:**

```tsx
<H1 id="page-title">Page Title</H1>
<H2 id="section-title">Section Title</H2>
```

### 3. **Use Section Component for Major Sections**

❌ **DON'T:**

```tsx
<div>
  <H2 id="section">Section Title</H2>
  <p>Content</p>
</div>
```

✅ **DO:**

```tsx
<Section id="section" title="Section Title" level={2}>
  <p>Content</p>
</Section>
```

### 4. **Always Provide IDs for Navigation**

All headings should have unique `id` props for:

- Table of contents generation
- Anchor links
- Scroll navigation

### 5. **Use Citation Component for References**

❌ **DON'T:**

```tsx
<p>According to Smith et al. (2023)...</p>
```

✅ **DO:**

```tsx
<p>
  According to <Citation refId="smith2023" />
  ...
</p>
```

---

## Common Patterns

### Pattern 1: Statistics Panel with Figure

```tsx
<Figure
  number="1"
  caption="ADHD prevalence statistics in the United States"
  variant="spotlight"
>
  <div className="rounded-xl bg-[#d3e4ee] p-6">
    <p className="mb-4 text-slate-700">
      Approximately <span className="font-bold">15.5 million adults</span>
      and <span className="font-bold">6.5 million children</span>
      have ADHD <Citation refId="ref1" />.
    </p>
    {/* Visual content */}
  </div>
</Figure>
```

### Pattern 2: Flowchart/Process Diagram

```tsx
<TimelineFigure
  number="2"
  caption="ADHD symptom progression from childhood to adulthood"
  stages={[
    {
      age: "Childhood",
      title: "Symptom Onset",
      description: "ADHD manifests in childhood",
    },
    {
      age: "Adulthood",
      title: "Symptom Persistence",
      description: "~60% continue to experience symptoms",
    },
  ]}
/>
```

### Pattern 3: Comparison Visualization

```tsx
<ComparisonFigure
  number="3"
  caption="Comparison of ADHD prevalence between children and adults"
  leftPanel={{
    label: "Children",
    content: <div>Children data visualization</div>,
  }}
  rightPanel={{
    label: "Adults",
    content: <div>Adults data visualization</div>,
  }}
  differences={[
    {
      label: "Prevalence Rate",
      description: "Children: 10.5% vs Adults: 6.0%",
    },
  ]}
/>
```

### Pattern 4: Multi-Panel Data Display

```tsx
<MultiPanelFigure
  number="4"
  caption="ADHD prevalence across different demographic groups"
  layout="grid"
  panels={[
    {
      label: "By Age",
      content: <AgeChart />,
      description: "Prevalence by age group",
    },
    {
      label: "By Gender",
      content: <GenderChart />,
      description: "Prevalence by gender",
    },
    {
      label: "By Region",
      content: <RegionChart />,
      description: "Prevalence by geographic region",
    },
  ]}
/>
```

---

## Anti-Patterns to Avoid

### ❌ Anti-Pattern 1: Custom Styled Divs for Figures

**Problem:** Creating custom styled divs instead of using Figure components

```tsx
<div className="rounded-xl bg-white p-6 shadow-lg">
  <div className="mb-2 text-center">Figure 1</div>
  <svg>...</svg>
  <p className="mt-2 text-sm">Caption text</p>
</div>
```

**Solution:** Use the `Figure` component

```tsx
<Figure number="1" caption="Caption text">
  <svg>...</svg>
</Figure>
```

### ❌ Anti-Pattern 2: Raw HTML Headings

**Problem:** Using raw HTML heading tags

```tsx
<h1>Title</h1>
<h2>Section</h2>
```

**Solution:** Use semantic heading components

```tsx
<H1 id="title">Title</H1>
<H2 id="section">Section</H2>
```

### ❌ Anti-Pattern 3: Manual Reference Formatting

**Problem:** Manually formatting citations

```tsx
<p>According to Smith et al. (2023) [1]...</p>
```

**Solution:** Use Citation component

```tsx
<p>
  According to <Citation refId="smith2023" />
  ...
</p>
```

### ❌ Anti-Pattern 4: Inconsistent Spacing

**Problem:** Using inconsistent spacing classes

```tsx
<div className="mb-4">...</div>
<div className="mt-6">...</div>
```

**Solution:** Use consistent spacing with `space-y-*` or Section components

```tsx
<div className="space-y-6">
  <Section>...</Section>
  <Section>...</Section>
</div>
```

### ❌ Anti-Pattern 5: Missing IDs on Headings

**Problem:** Headings without IDs

```tsx
<H2>Section Title</H2>
```

**Solution:** Always provide IDs

```tsx
<H2 id="section-title">Section Title</H2>
```

---

## Component Import Checklist

When creating a new page, ensure you import:

- ✅ `H1, H2, H3, Section` from `@/components/content/heading`
- ✅ `Figure, MultiPanelFigure, etc.` from `@/components/content/figure`
- ✅ `Table` from `@/components/content/table` (if needed)
- ✅ `ReferencesProvider, Citation, ReferencesList, useReferences` from `@/components/content/reference`
- ✅ `AccordionGroup, AccordionItem` from `@/components/content/accordion` (if needed)

---

## Quick Reference

| Content Type             | Component to Use                 |
| ------------------------ | -------------------------------- |
| Page title               | `H1`                             |
| Major section            | `H2` or `Section` with level={2} |
| Subsection               | `H3` or `Section` with level={3} |
| Single image/chart       | `Figure`                         |
| Multiple related visuals | `MultiPanelFigure`               |
| Figure with callouts     | `AnnotatedFigure`                |
| Before/after comparison  | `ComparisonFigure`               |
| Timeline/progression     | `TimelineFigure`                 |
| Data table               | `Table`                          |
| Inline citation          | `Citation`                       |
| Collapsible content      | `AccordionItem`                  |

---

## Migration Guide

If you have existing pages using custom divs for figures:

1. **Identify visual content** - Find all `<div>` elements containing charts, images, or visualizations
2. **Wrap with Figure** - Replace with appropriate Figure component
3. **Extract caption** - Move caption text to `caption` prop
4. **Add figure number** - Assign sequential figure numbers
5. **Update references** - Ensure all citations use `Citation` component
6. **Test navigation** - Verify TOC and anchor links work correctly

### Example: Refactoring a Page

**Before (Incorrect):**

```tsx
<div className="mx-auto max-w-3xl rounded-xl bg-[#d3e4ee] p-5">
  <p className="mb-6 text-slate-700">
    ADHD affects approximately 15.5 million adults...
  </p>
  <div className="flex flex-col items-center">
    <svg>...</svg>
    <div className="flowchart">...</div>
  </div>
</div>
```

**After (Correct):**

```tsx
<Figure
  number="1"
  caption="ADHD prevalence in the United States. Approximately 15.5 million (~6.0%) adults and 6.5 million (~10.5%) children and adolescents in the United States are estimated to have ADHD."
  credit="Danielson et al., 2018; Staley et al., 2024"
  variant="spotlight"
  size="large"
>
  <div className="rounded-xl bg-[#d3e4ee] p-5">
    <p className="mb-6 text-slate-700">
      ADHD is a chronic neurodevelopmental disorder and approximately{" "}
      <span className="font-bold text-[#343e4d]">
        15.5 million (~6.0%) adults
      </span>{" "}
      and{" "}
      <span className="font-bold text-[#343e4d]">
        6.5 million (~10.5%) children and adolescents
      </span>{" "}
      in the United States are estimated to have ADHD{" "}
      <Citation refId="danielson2018" /> <Citation refId="staley2024" />
    </p>

    <div className="flex flex-col items-center">
      {/* USA Map */}
      <div className="mb-6 w-full max-w-[266px]">
        <svg>...</svg>
      </div>

      {/* Flowchart */}
      <div className="w-full max-w-[266px] space-y-3">
        {/* Flowchart content */}
      </div>
    </div>
  </div>
</Figure>
```

**Key Changes:**

- Wrapped visual content in `Figure` component
- Moved descriptive text to `caption` prop
- Added citations using `Citation` component
- Used appropriate `variant` and `size` props
- Maintained internal structure and styling

---

## Questions or Issues?

If you're unsure which component to use or encounter issues:

1. Check the component showcase pages in `/docs`
2. Review existing pages that use similar content
3. Refer to this document for component selection guidance
