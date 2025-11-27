# Centralized References System - Implementation Summary

## What We've Built

### 1. Centralized Bibliography Database

**Location:** `src/data/references.ts`

- Single source of truth for all references
- TypeScript interface for type safety
- Organized by category with tags for easy searching
- Currently contains 13 references from your existing pages

**Key Features:**

- `getReference(id)` - Get a single reference
- `getReferences(ids[])` - Get multiple references
- `getAllReferences()` - Get all references
- `searchReferences(query)` - Search by category, tags, year, author, or title
- `exportBibliographyAsJSON()` - Export for Figma plugin

### 2. Reference Utilities

**Location:** `src/data/references-utils.ts`

- Type-safe reference ID constants (`REF_IDS`)
- Prevents typos and provides autocomplete
- Helper functions for page usage

### 3. Updated Page Example

**Location:** `src/app/node/epidemiology/prevalence/ADHD_through_the_years/page.tsx`

Demonstrates the new pattern:

- Import references from centralized database
- Use type-safe constants for reference IDs
- No local reference definitions needed

### 4. Figma Plugin Documentation

**Location:** `docs/figma-plugin-references.md`

Complete guide for creating a Figma plugin that:

- Loads bibliography from JSON
- Provides searchable reference interface
- Inserts citation tags into Figma text layers
- Supports multiple citation formats

### 5. Export Script

**Location:** `scripts/export-bibliography.ts`

Script to export bibliography as JSON for Figma plugin use.

**To use:**

```bash
# Install tsx if not already installed
npm install -D tsx

# Export bibliography
npm run export:bibliography
```

This creates `public/bibliography.json` that can be loaded by the Figma plugin.

## Benefits

1. **No Duplication** - References defined once, used everywhere
2. **Type Safety** - TypeScript ensures valid reference IDs
3. **Easy Updates** - Change a reference once, updates everywhere
4. **Searchable** - Built-in search functionality
5. **Figma Ready** - JSON export for plugin integration
6. **Maintainable** - Clear structure and documentation

## Next Steps

### Immediate

1. **Install tsx** (if not already):

   ```bash
   npm install -D tsx
   ```

2. **Export bibliography**:

   ```bash
   npm run export:bibliography
   ```

3. **Migrate remaining pages** to use centralized references:
   - `prevalence_of_ADHD_in_the_USA/page.tsx`
   - `gender_differences/page.tsx`
   - Any other pages with local references

### Figma Plugin Development

1. **Create plugin structure** following the guide in `docs/figma-plugin-references.md`
2. **Load bibliography.json** in the plugin
3. **Build search UI** for finding references
4. **Implement citation insertion** into text layers
5. **Test with design team** and iterate

### Future Enhancements

- **Validation script** - Check for unused or missing references
- **Reference management UI** - Web interface for adding/editing references
- **Auto-sync** - Plugin automatically updates when bibliography changes
- **Citation validation** - Check citations in codebase against bibliography
- **Reference analytics** - Track which references are used most

## Migration Guide

To migrate an existing page:

1. **Identify reference IDs** used in the page
2. **Import utilities**:
   ```tsx
   import { getReferences } from "@/data/references";
   import { REF_IDS } from "@/data/references-utils";
   ```
3. **Replace local references**:

   ```tsx
   // Before
   const pageReferences = [{ id: 'sibley2017', ... }];

   // After
   const pageReferenceIds = [REF_IDS.SIBLEY_2017];
   const pageReferences = getReferences(pageReferenceIds);
   ```

4. **Update Citation components**:

   ```tsx
   // Before
   <Citation refId="sibley2017" />

   // After
   <Citation refId={REF_IDS.SIBLEY_2017} />
   ```

5. **Remove local reference definitions**

## File Structure

```
src/data/
├── references.ts          # Master bibliography
├── references-utils.ts    # Utilities and constants
└── README.md              # Usage documentation

docs/
├── figma-plugin-references.md  # Plugin development guide
└── references-system-summary.md  # This file

scripts/
└── export-bibliography.ts  # Export script

public/
└── bibliography.json       # Generated JSON (after export)
```

## Questions?

- See `src/data/README.md` for detailed usage examples
- See `docs/figma-plugin-references.md` for plugin development guide
- Check `src/app/node/epidemiology/prevalence/ADHD_through_the_years/page.tsx` for migration example
