# Figma Plugin for Reference Insertion

This document outlines the approach for creating a Figma plugin that allows designers to easily insert citations and references into Figma text layers.

## Overview

The plugin will:

1. Load the centralized bibliography from the codebase
2. Provide a searchable interface to find references
3. Insert citation tags (e.g., `<Citation refId="sibley2017" />`) into selected text layers
4. Optionally display reference previews in Figma

## Architecture

### Option 1: Standalone Plugin (Recommended)

Create a separate Figma plugin that:

- Reads the bibliography JSON file
- Provides a UI for searching and inserting references
- Inserts citation tags into text layers

**Pros:**

- Works independently of the codebase
- Can be distributed to design team
- No build process required for designers

**Cons:**

- Requires maintaining bibliography in plugin
- Need to sync updates between codebase and plugin

### Option 2: Plugin with API/File Sync

Plugin that:

- Reads bibliography from a shared location (GitHub, CDN, or local file)
- Auto-updates when bibliography changes
- Can validate citations against current bibliography

**Pros:**

- Always in sync with codebase
- Single source of truth

**Cons:**

- More complex setup
- Requires network access or file system access

## Implementation Approach

### Step 1: Export Bibliography

The bibliography is exported as JSON from `src/data/references.ts`:

```typescript
import { exportBibliographyAsJSON } from "@/data/references";
// This generates a JSON file that can be used by the plugin
```

### Step 2: Plugin Structure

```
figma-plugin-references/
├── manifest.json          # Plugin manifest
├── code.ts                # Plugin main code
├── ui.html                # Plugin UI
├── ui.ts                  # UI logic
└── bibliography.json      # Exported bibliography (auto-generated or synced)
```

### Step 3: Plugin Features

#### Core Features

1. **Reference Search**
   - Search by author, title, year, DOI
   - Filter by category/tags
   - Show preview of reference

2. **Citation Insertion**
   - Insert as: `<Citation refId="id" />`
   - Or as formatted text: `(Author, Year)` or `[1]`
   - Support for multiple citations: `<Citation refId="id1" /> <Citation refId="id2" />`

3. **Text Layer Selection**
   - Detect selected text layers
   - Insert at cursor position or replace selection
   - Handle multiple text layers

4. **Reference Preview**
   - Show full reference details in plugin UI
   - Display formatted citation preview

#### Advanced Features (Future)

- Batch insert citations across multiple frames
- Validate existing citations in document
- Export citation list for a page
- Sync with codebase references

### Step 4: Plugin UI Design

```
┌─────────────────────────────────────┐
│  Reference Citation Plugin          │
├─────────────────────────────────────┤
│  [Search references...]        [🔍] │
│                                     │
│  Filters:                           │
│  [Category ▼] [Year ▼] [Tags ▼]    │
│                                     │
│  Results:                           │
│  ┌───────────────────────────────┐ │
│  │ Sibley et al. (2017)          │ │
│  │ Defining ADHD symptom...       │ │
│  │ J Child Psychol Psychiatry    │ │
│  │ [Insert] [Preview]             │ │
│  └───────────────────────────────┘ │
│                                     │
│  Selected Text Layer:               │
│  "Text layer name"                  │
│                                     │
│  Insert Format:                     │
│  ○ Tag: <Citation refId="id" />    │
│  ● Formatted: (Author, Year)        │
│  ○ Numbered: [1]                   │
│                                     │
│  [Insert Citation] [Cancel]        │
└─────────────────────────────────────┘
```

## Usage Workflow

1. **Designer selects text layer** in Figma
2. **Opens plugin** from Plugins menu
3. **Searches for reference** (e.g., "Sibley" or "2017")
4. **Selects reference** from results
5. **Chooses insertion format** (tag, formatted, or numbered)
6. **Clicks "Insert Citation"** - citation is inserted at cursor or replaces selection
7. **Text layer now contains** citation tag that will be processed by the codebase

## Citation Format Options

### 1. Tag Format (Recommended)

```
<Citation refId="sibley2017" />
```

- Used in codebase
- Processed by React component
- Allows dynamic formatting

### 2. Formatted Text

```
(Sibley et al., 2017)
```

- Human-readable
- Static formatting
- Good for design mockups

### 3. Numbered

```
[1]
```

- Simple numbered reference
- Matches numbered citation style

## Integration with Codebase

### Exporting Bibliography

Create a script to export bibliography:

```typescript
// scripts/export-bibliography.ts
import { exportBibliographyAsJSON } from "@/data/references";
import { writeFileSync } from "fs";
import { join } from "path";

const json = exportBibliographyAsJSON();
writeFileSync(
  join(__dirname, "../figma-plugin-references/bibliography.json"),
  json
);
```

### Validating Citations

Create a utility to validate citations in codebase:

```typescript
// scripts/validate-citations.ts
import { getAllReferences } from "@/data/references";
import { readFileSync } from "fs";
import { glob } from "glob";

// Find all Citation components
// Validate refId exists in bibliography
// Report missing references
```

## Plugin Code Example

### manifest.json

```json
{
  "name": "Reference Citation",
  "id": "reference-citation-plugin",
  "api": "1.0.0",
  "main": "code.js",
  "ui": "ui.html",
  "capabilities": [],
  "enableProposedApi": false,
  "editorType": ["figma"],
  "networkAccess": {
    "allowedDomains": []
  }
}
```

### code.ts (Main Plugin Logic)

```typescript
// Show the plugin UI
figma.showUI(__html__, { width: 400, height: 600 });

// Load bibliography
const bibliography = require("./bibliography.json");

// Handle messages from UI
figma.ui.onmessage = (msg) => {
  if (msg.type === "insert-citation") {
    const selection = figma.currentPage.selection;

    if (selection.length === 0 || selection[0].type !== "TEXT") {
      figma.notify("Please select a text layer");
      return;
    }

    const textNode = selection[0] as TextNode;
    const citation =
      msg.format === "tag"
        ? `<Citation refId="${msg.refId}" />`
        : formatCitation(bibliography[msg.refId], msg.format);

    // Insert citation at cursor or replace selection
    insertText(textNode, citation, msg.position);
  }

  if (msg.type === "search-references") {
    const results = searchBibliography(bibliography, msg.query);
    figma.ui.postMessage({ type: "search-results", results });
  }
};
```

### ui.ts (Plugin UI)

```typescript
// Search functionality
function searchReferences(query: string) {
  parent.postMessage(
    {
      pluginMessage: {
        type: "search-references",
        query,
      },
    },
    "*"
  );
}

// Insert citation
function insertCitation(refId: string, format: string) {
  parent.postMessage(
    {
      pluginMessage: {
        type: "insert-citation",
        refId,
        format,
        position: getCursorPosition(),
      },
    },
    "*"
  );
}
```

## Next Steps

1. **Create plugin structure** - Set up basic Figma plugin project
2. **Implement bibliography loader** - Load and parse bibliography JSON
3. **Build search UI** - Create searchable reference interface
4. **Implement insertion logic** - Handle text layer selection and citation insertion
5. **Add format options** - Support tag, formatted, and numbered formats
6. **Test with design team** - Get feedback and iterate
7. **Add validation** - Check citations against bibliography
8. **Documentation** - Create user guide for designers

## Alternative: Figma Variables

If Figma Variables are available, we could also:

- Store reference IDs as variables
- Use variables to link citations
- Export variable values to codebase

This would provide a more native Figma integration but requires Figma Variables support.

## Resources

- [Figma Plugin API Documentation](https://www.figma.com/plugin-docs/)
- [Figma Plugin Examples](https://github.com/figma/plugin-samples)
- [Figma Text API](https://www.figma.com/plugin-docs/api/properties/nodes-setcharacters/)
