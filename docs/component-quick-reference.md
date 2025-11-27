# Component Quick Reference

A quick lookup guide for selecting the right component.

## Visual Content → Use Figure Components

| What You're Building       | Component          | Example Use Case                                |
| -------------------------- | ------------------ | ----------------------------------------------- |
| Single chart/image/diagram | `Figure`           | Bar chart, line graph, brain scan image         |
| Multiple related visuals   | `MultiPanelFigure` | Before/after, treatment groups, age comparisons |
| Figure with explanations   | `AnnotatedFigure`  | Diagram with labeled parts and descriptions     |
| Side-by-side comparison    | `ComparisonFigure` | Treatment vs control, before vs after           |
| Timeline/progression       | `TimelineFigure`   | Disease progression, development stages         |

## Text Content → Use Heading Components

| Content Level | Component         | When to Use                           |
| ------------- | ----------------- | ------------------------------------- |
| Page title    | `H1`              | Main page heading (use once per page) |
| Major section | `H2` or `Section` | Top-level content sections            |
| Subsection    | `H3` or `Section` | Subsections within H2                 |
| Minor heading | `H4`, `H5`, `H6`  | Lower-level headings                  |

## Data → Use Table Component

| Data Type       | Component | Variant                                                 |
| --------------- | --------- | ------------------------------------------------------- |
| Structured data | `Table`   | `default`, `striped`, `bordered`, `compact`, `clinical` |

## References → Use Citation System

| Need             | Component            | Usage                       |
| ---------------- | -------------------- | --------------------------- |
| Inline citation  | `Citation`           | `<Citation refId="ref1" />` |
| Reference list   | `ReferencesList`     | At bottom of page           |
| Context provider | `ReferencesProvider` | Wrap page content           |

## Common Imports

```tsx
// Headings
import { H1, H2, H3, Section } from "@/components/content/heading";

// Figures
import {
  Figure,
  MultiPanelFigure,
  AnnotatedFigure,
  ComparisonFigure,
  TimelineFigure,
} from "@/components/content/figure";

// Tables
import { Table } from "@/components/content/table";

// References
import {
  ReferencesProvider,
  Citation,
  ReferencesList,
  useReferences,
} from "@/components/content/reference";

// Accordions
import { AccordionGroup, AccordionItem } from "@/components/content/accordion";
```

## Decision Tree

```
Is it visual content (chart/image/diagram)?
├─ Yes → Is it a single visual?
│  ├─ Yes → Use <Figure>
│  └─ No → Multiple visuals?
│     ├─ Comparison (2 items) → Use <ComparisonFigure>
│     ├─ Timeline/progression → Use <TimelineFigure>
│     ├─ Needs annotations → Use <AnnotatedFigure>
│     └─ Multiple panels → Use <MultiPanelFigure>
│
└─ No → Is it a heading?
   ├─ Yes → Use H1/H2/H3/Section
   └─ No → Is it structured data?
      ├─ Yes → Use <Table>
      └─ No → Regular paragraph/text
```

## ⚠️ Critical Rules

1. **NEVER** use raw `<div>` for figures - always use Figure components
2. **NEVER** use raw `<h1>`, `<h2>`, etc. - always use H1, H2, H3 components
3. **ALWAYS** provide `id` props to headings for navigation
4. **ALWAYS** use `Citation` component for references, not manual formatting
5. **ALWAYS** wrap page content in `ReferencesProvider` if using citations

## See Also

- Full documentation: `docs/page-structure-rules.md`
- Component showcase: Check `/docs` pages for examples
