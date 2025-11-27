/**
 * Centralized Bibliography Database
 *
 * This file contains all references used across the application.
 * References are organized by topic/category for easier management.
 *
 * Usage:
 *   import { getReferences, getReference } from '@/data/references';
 *   const refs = getReferences(['sibley2017', 'oie2018']);
 *   const singleRef = getReference('sibley2017');
 */

export interface Reference {
  id: string;
  authors: string;
  year: number;
  title: string;
  journal?: string;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
  // Optional metadata for organization
  category?: string;
  tags?: string[];
}

/**
 * Master bibliography - all references used in the application
 */
export const bibliography: Record<string, Reference> = {
  // ADHD Symptom Persistence & Development
  sibley2017: {
    id: "sibley2017",
    authors: "Sibley, M. H., Swanson, J. M., Arnold, L. E., et al.",
    year: 2017,
    title:
      "Defining ADHD symptom persistence in adulthood: optimizing sensitivity and specificity",
    journal: "J Child Psychol Psychiatry",
    volume: "58",
    pages: "655-662",
    doi: "10.1111/jcpp.12620",
    category: "symptom-persistence",
    tags: ["adult-adhd", "symptom-persistence", "diagnosis"],
  },
  oie2018: {
    id: "oie2018",
    authors:
      "Øie, M., Hovik, K. T., Andersen, P. N., Czajkowski, N. O., Skogli, E. W.",
    year: 2018,
    title:
      "Gender Differences in the Relationship Between Changes in ADHD Symptoms, Executive Functions, and Self- and Parent-Report Depression Symptoms in Boys and Girls With ADHD: A 2-Year Follow-Up Study",
    journal: "J Atten Disord",
    volume: "22",
    pages: "446-459",
    doi: "10.1177/1087054716664407",
    category: "gender-differences",
    tags: ["gender", "symptoms", "development", "depression"],
  },
  lapalme2017: {
    id: "lapalme2017",
    authors: "Lapalme, M., Déry, M., Dubé, M., Lemieux, A.",
    year: 2017,
    title:
      "Developmental Course of ADHD Symptoms Based on Multirater Report in Girls and Boys With or Without a Disruptive Behavior Disorder",
    journal: "J Emot Behav Disord",
    volume: "26",
    pages: "106-118",
    doi: "10.1177/1063426617712500",
    category: "symptom-persistence",
    tags: ["development", "gender", "symptoms"],
  },
  biederman2000: {
    id: "biederman2000",
    authors: "Biederman, J., Mick, E., Faraone, S. V.",
    year: 2000,
    title:
      "Age-dependent decline of symptoms of attention deficit hyperactivity disorder: impact of remission definition and symptom type",
    journal: "Am J Psychiatry",
    volume: "157",
    pages: "816-818",
    doi: "10.1176/appi.ajp.157.5.816",
    category: "symptom-persistence",
    tags: ["symptom-persistence", "age", "remission"],
  },

  // Prevalence & Epidemiology
  danielson2018: {
    id: "danielson2018",
    authors: "Danielson, M. L., Bitsko, R. H., Ghandour, R. M., et al.",
    year: 2018,
    title:
      "Prevalence of parent-reported ADHD diagnosis and associated treatment among U.S. children and adolescents",
    journal: "Journal of Clinical Child & Adolescent Psychology",
    volume: "47",
    pages: "199-212",
    doi: "10.1080/15374416.2017.1417860",
    category: "prevalence",
    tags: ["prevalence", "usa", "children", "adolescents", "treatment"],
  },
  staley2024: {
    id: "staley2024",
    authors: "Staley, B. S., Robinson, L. R., Claussen, A. H., et al.",
    year: 2024,
    title:
      "Attention-Deficit/Hyperactivity Disorder Diagnosis, Treatment, and Telehealth Use in Adults - National Center for Health Statistics Rapid Surveys System, United States, October-November 2023",
    journal: "MMWR Morb Mortal Wkly Rep",
    volume: "73",
    pages: "890-895",
    doi: "10.15585/mmwr.mm7340a1",
    category: "prevalence",
    tags: [
      "prevalence",
      "usa",
      "adults",
      "diagnosis",
      "treatment",
      "telehealth",
    ],
  },

  // Gender Differences
  mowlem2019: {
    id: "mowlem2019",
    authors:
      "Mowlem, F. D., Rosenqvist, M. A., Martin, J., Lichtenstein, P., Asherson, P., Larsson, H.",
    year: 2019,
    title:
      "Sex differences in predicting ADHD clinical diagnosis and pharmacological treatment",
    journal: "Eur Child Adolesc Psychiatry",
    volume: "28",
    pages: "481-489",
    doi: "10.1007/s00787-018-1211-3",
    category: "gender-differences",
    tags: ["gender", "diagnosis", "treatment", "sex-differences"],
  },
  dalsgaard2020: {
    id: "dalsgaard2020",
    authors: "Dalsgaard, S., McGrath, J., Østergaard, S. D., et al.",
    year: 2020,
    title:
      "Association of Mental Disorder in Childhood and Adolescence With Subsequent Educational Achievement",
    journal: "JAMA Psychiatry",
    volume: "77",
    pages: "797-805",
    doi: "10.1001/jamapsychiatry.2020.0217",
    category: "gender-differences",
    tags: ["gender", "education", "outcomes", "children"],
  },
  cortese2016: {
    id: "cortese2016",
    authors: "Cortese, S., Faraone, S. V., Bernardi, S., Wang, S., Blanco, C.",
    year: 2016,
    title:
      "Gender differences in adult attention-deficit/hyperactivity disorder: results from the National Epidemiologic Survey on Alcohol and Related Conditions (NESARC)",
    journal: "J Clin Psychiatry",
    volume: "77",
    pages: "e421-e428",
    doi: "10.4088/JCP.14m09630",
    category: "gender-differences",
    tags: ["gender", "adults", "prevalence", "symptoms"],
  },
  tung2016: {
    id: "tung2016",
    authors: "Tung, I., Li, J. J., Meza, J. I., et al.",
    year: 2016,
    title: "Patterns of Comorbidity Among Girls With ADHD: A Meta-analysis",
    journal: "Pediatrics",
    volume: "138",
    pages: "e20160430",
    doi: "10.1542/peds.2016-0430",
    category: "gender-differences",
    tags: ["gender", "comorbidity", "girls", "meta-analysis"],
  },
  young2020: {
    id: "young2020",
    authors: "Young, S., Adamo, N., Ásgeirsdóttir, B. B., et al.",
    year: 2020,
    title:
      "Females with ADHD: An expert consensus statement taking a lifespan approach providing guidance for the identification and treatment of attention-deficit/ hyperactivity disorder in girls and women",
    journal: "BMC Psychiatry",
    volume: "20",
    pages: "404",
    doi: "10.1186/s12888-020-02707-9",
    category: "gender-differences",
    tags: ["gender", "females", "lifespan", "treatment", "diagnosis"],
  },
  solberg2018: {
    id: "solberg2018",
    authors:
      "Solberg, B. S., Halmøy, A., Engeland, A., Igland, J., Haavik, J., Klungsøyr, K.",
    year: 2018,
    title:
      "Gender differences in psychiatric comorbidity: a population-based study of 40 000 adults with attention deficit hyperactivity disorder",
    journal: "Acta Psychiatr Scand",
    volume: "137",
    pages: "176-186",
    doi: "10.1111/acps.12845",
    category: "gender-differences",
    tags: ["gender", "comorbidity", "adults", "population-study"],
  },
  babinski2024: {
    id: "babinski2024",
    authors: "Babinski, D. E.",
    year: 2024,
    title: "Sex Differences in ADHD: Review and Priorities for Future Research",
    journal: "Curr Psychiatry Rep",
    volume: "26",
    pages: "151-156",
    doi: "10.1007/s11920-024-01492-6",
    category: "gender-differences",
    tags: ["gender", "review", "research-priorities"],
  },
};

/**
 * Get a single reference by ID
 */
export function getReference(id: string): Reference | undefined {
  return bibliography[id];
}

/**
 * Get multiple references by their IDs
 */
export function getReferences(ids: string[]): Reference[] {
  return ids
    .map((id) => bibliography[id])
    .filter((ref): ref is Reference => ref !== undefined);
}

/**
 * Get all references
 */
export function getAllReferences(): Reference[] {
  return Object.values(bibliography);
}

/**
 * Search references by various criteria
 */
export function searchReferences(query: {
  category?: string;
  tags?: string[];
  year?: number;
  author?: string;
  title?: string;
}): Reference[] {
  return Object.values(bibliography).filter((ref) => {
    if (query.category && ref.category !== query.category) return false;
    if (query.tags && !query.tags.some((tag) => ref.tags?.includes(tag)))
      return false;
    if (query.year && ref.year !== query.year) return false;
    if (
      query.author &&
      !ref.authors.toLowerCase().includes(query.author.toLowerCase())
    )
      return false;
    if (
      query.title &&
      !ref.title.toLowerCase().includes(query.title.toLowerCase())
    )
      return false;
    return true;
  });
}

/**
 * Export bibliography as JSON (useful for Figma plugin)
 */
export function exportBibliographyAsJSON(): string {
  return JSON.stringify(bibliography, null, 2);
}
