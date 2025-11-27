/**
 * Script to export bibliography as JSON for use in Figma plugin
 *
 * Usage: npm run export:bibliography
 */

import { writeFileSync } from "fs";
import { join } from "path";
import {
  exportBibliographyAsJSON,
  getAllReferences,
} from "../src/data/references";

const json = exportBibliographyAsJSON();
const outputPath = join(__dirname, "../public/bibliography.json");

writeFileSync(outputPath, json, "utf-8");

const allRefs = getAllReferences();
console.log(`✅ Bibliography exported to: ${outputPath}`);
console.log(`📚 Total references: ${allRefs.length}`);
