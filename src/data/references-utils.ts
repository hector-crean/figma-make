/**
 * Utility functions for working with references in pages
 *
 * This provides a cleaner API for pages to import and use references
 */

import { getReference, getReferences, type Reference } from "./references";

/**
 * Hook-like function to get references for a page
 * Returns an array of references that can be used with useReferences().addReference()
 */
export function usePageReferences(refIds: string[]): Reference[] {
  return getReferences(refIds);
}

/**
 * Get a single reference (useful for inline usage)
 */
export function usePageReference(refId: string): Reference | undefined {
  return getReference(refId);
}

/**
 * Type-safe reference ID constants
 * This helps prevent typos and provides autocomplete
 */
export const REF_IDS = {
  // Symptom Persistence
  SIBLEY_2017: "sibley2017",
  OIE_2018: "oie2018",
  LAPALME_2017: "lapalme2017",
  BIEDERMAN_2000: "biederman2000",

  // Prevalence
  DANIELSON_2018: "danielson2018",
  STALEY_2024: "staley2024",

  // Gender Differences
  MOWLEM_2019: "mowlem2019",
  DALSGAARD_2020: "dalsgaard2020",
  CORTESE_2016: "cortese2016",
  TUNG_2016: "tung2016",
  YOUNG_2020: "young2020",
  SOLBERG_2018: "solberg2018",
  BABINSKI_2024: "babinski2024",
} as const;
