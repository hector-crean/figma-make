# Centralized References System

This directory contains the centralized bibliography and utilities for managing references across the application.

## Files

- `references.ts` - Master bibliography database with all references
- `references-utils.ts` - Utility functions and type-safe reference ID constants

## Usage

### In Pages

Instead of defining references locally, import from the centralized database:

```tsx
import { getReferences } from "@/data/references";
import { REF_IDS } from "@/data/references-utils";
import { useReferences } from "@/components/content/reference";
import { useEffect } from "react";

// Define which references this page uses
const pageReferenceIds = [REF_IDS.SIBLEY_2017, REF_IDS.OIE_2018];

function PageContent() {
  const { addReference } = useReferences();

  useEffect(() => {
    const references = getReferences(pageReferenceIds);
    references.forEach((ref) => addReference(ref));
  }, [addReference]);

  return (
    <div>
      <p>
        Text with <Citation refId={REF_IDS.SIBLEY_2017} />.
      </p>
    </div>
  );
}
```

### Adding New References

1. Add the reference to `references.ts` in the `bibliography` object:

```typescript
newReference2024: {
  id: 'newReference2024',
  authors: 'Author, A., Coauthor, B.',
  year: 2024,
  title: 'Title of the Paper',
  journal: 'Journal Name',
  volume: '123',
  pages: '45-67',
  doi: '10.1234/example',
  category: 'category-name',
  tags: ['tag1', 'tag2']
}
```

2. Add the ID constant to `references-utils.ts`:

```typescript
export const REF_IDS = {
  // ... existing IDs
  NEW_REFERENCE_2024: "newReference2024",
} as const;
```

3. Use the reference in your pages using `REF_IDS.NEW_REFERENCE_2024`

### Searching References

```typescript
import { searchReferences } from "@/data/references";

// Search by category
const genderRefs = searchReferences({ category: "gender-differences" });

// Search by tags
const adultRefs = searchReferences({ tags: ["adults"] });

// Search by year
const recentRefs = searchReferences({ year: 2024 });

// Search by author
const authorRefs = searchReferences({ author: "Sibley" });
```

### Exporting for Figma Plugin

To export the bibliography as JSON for use in the Figma plugin:

```bash
npm run export:bibliography
```

This creates `public/bibliography.json` which can be loaded by the Figma plugin.

## Benefits

1. **Single Source of Truth** - All references in one place
2. **No Duplication** - References defined once, used everywhere
3. **Type Safety** - TypeScript ensures reference IDs are valid
4. **Easy Updates** - Update a reference once, it updates everywhere
5. **Searchable** - Built-in search functionality
6. **Figma Integration** - Export to JSON for plugin use

## Migration from Local References

To migrate an existing page:

1. Find all reference IDs used in the page
2. Import `getReferences` and `REF_IDS`
3. Replace local reference arrays with `getReferences([...ids])`
4. Replace string refIds in `<Citation>` with `REF_IDS.CONSTANT`
5. Remove local reference definitions

Example:

**Before:**

```tsx
const pageReferences = [
  { id: 'sibley2017', authors: '...', ... }
];

<Citation refId="sibley2017" />
```

**After:**

```tsx
import { getReferences } from "@/data/references";
import { REF_IDS } from "@/data/references-utils";

const pageReferenceIds = [REF_IDS.SIBLEY_2017];
const pageReferences = getReferences(pageReferenceIds);

<Citation refId={REF_IDS.SIBLEY_2017} />;
```
