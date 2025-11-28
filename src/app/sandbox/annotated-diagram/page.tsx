import { AnnotatedDiagram } from "@/components/ui/annotated-diagram";
import { AnnotationId, brainAnnotations } from "@/data/brain-annotations";
import image from './brain-background.jpg';


const annotationIds: Array<AnnotationId> =  ['region-amyloid-stage-1-mild-region-1', 'region-locus-coeruleus', 'region-parietal-lobe', 'region-striatum']

export default function MyPage() {
  return (
    <AnnotatedDiagram
      src={image.src}
      alt="Brain Anatomy"
      // Coordinates in the JSON seem to assume a coordinate space around 1000x600 based on max values
      // Adjust these to match the actual intrinsic dimensions of brain-background.jpg for perfect alignment
      width={1280 * 0.75} 
      height={720 * 0.75}
      annotations={brainAnnotations.filter(annotation => annotationIds.includes(annotation.id))}
      
    />
  );
}
