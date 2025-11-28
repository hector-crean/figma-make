import fs from 'fs';
import path from 'path';

const regionsPath = path.join(process.cwd(), 'src/app/sandbox/annotated-diagram/brain-regions.json');
const pathwaysPath = path.join(process.cwd(), 'src/app/sandbox/annotated-diagram/brain-pathways.json');
const outputPath = path.join(process.cwd(), 'src/data/brain-annotations.ts');

interface Point {
  x: number;
  y: number;
}

interface RegionData {
  fillColor: string;
  name: string;
  label?: {
    text?: string; // Sometimes label might be an object with text, or just metadata
    // In the snippet, label has position and altDrawMode, but name is the label text usually.
  };
  description?: string; // If available
  points: Point[];
}

interface PathwayData {
  color: string;
  width: number;
  labels: Array<{
    position: Point;
    text?: string;
  }>;
  points: Point[];
}

// We'll define the output types based on what we want to generate
// (matches src/components/ui/annotated-diagram.tsx types but converted to string for file writing)

function generateAnnotations() {
  const annotations: any[] = [];

  // Process Regions
  try {
    const regionsRaw = fs.readFileSync(regionsPath, 'utf-8');
    const regions = JSON.parse(regionsRaw);

    for (const [id, data] of Object.entries(regions) as [string, RegionData][]) {
      // Skip if no points
      if (!data.points || data.points.length === 0) continue;

      annotations.push({
        id: `region-${id}`,
        type: 'region',
        label: data.name,
        color: data.fillColor,
        points: data.points.map(p => [p.x, p.y]),
        description: data.description || undefined
      });
    }
  } catch (e) {
    console.error("Error processing regions:", e);
  }

  // Process Pathways
  try {
    const pathwaysRaw = fs.readFileSync(pathwaysPath, 'utf-8');
    const pathways = JSON.parse(pathwaysRaw);

    for (const [id, data] of Object.entries(pathways) as [string, PathwayData][]) {
      if (!data.points || data.points.length < 2) continue;

      const labels = data.labels || [];
      // Heuristic to find start/end/path labels
      // This is tricky without explicit semantics in JSON.
      // We'll just take the first label as the path label if it exists,
      // or map them based on proximity to start/end if we wanted to be fancy.
      // For now, let's map the first label text to pathLabel if it seems central,
      // or just use the first available text.
      
      // In the snippet: "labels" is an array. 
      // 0: "Bottom-up Emotional Processing" (seems to be the main label)
      // 1: "Limbic System" (near start/end?)
      // 2: "Prefrontal Cortex" (near start/end?)
      
      // Let's assume:
      // 1st label = pathLabel
      // Subsequent labels = startLabel / endLabel based on proximity?
      // Or just keep it simple for now.

      let pathLabel = undefined;
      let startLabel = undefined;
      let endLabel = undefined;

      if (labels.length > 0 && labels[0].text) {
        pathLabel = labels[0].text;
      }
      if (labels.length > 1 && labels[1].text) {
        startLabel = labels[1].text; // Assigning arbitrarily for now, user can refine
      }
      if (labels.length > 2 && labels[2].text) {
        endLabel = labels[2].text;
      }

      annotations.push({
        id: `path-${id}`,
        type: 'path-with-points',
        color: data.color,
        points: data.points.map(p => [p.x, p.y]),
        pathLabel,
        startLabel,
        endLabel,
        markers: true,
        curve: true // Default to curved for elegance
      });
    }
  } catch (e) {
    console.error("Error processing pathways:", e);
  }

  // Write file
  const fileContent = `import { Annotation } from "@/components/ui/annotated-diagram";

export const brainAnnotations: Annotation[] = ${JSON.stringify(annotations, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent);
  console.log(`Generated ${annotations.length} annotations at ${outputPath}`);
}

generateAnnotations();

