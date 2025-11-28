"use client"

import { AnnotatedDiagramEditor } from "@/components/ui/annotated-diagram-editor";
// We'll start with empty annotations to test drawing
// import { brainAnnotations } from "@/data/brain-annotations"; 
import image from '../annotated-diagram/brain-background.jpg';

export default function EditorPage() {
  return (
    <AnnotatedDiagramEditor
      src={image.src}
      alt="Brain Anatomy Editor"
      width={1280}
      height={720}
      initialAnnotations={[]}
    />
  );
}

