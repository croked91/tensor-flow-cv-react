import { DetectedObject } from "@tensorflow-models/coco-ssd";
import { useEffect } from 'react';
export const drawRect = (detections: DetectedObject[], ctx: CanvasRenderingContext2D | null) => {

  if (!ctx) {
    return
  }
  detections.forEach(prediction => {
    const [x, y, width, height] = prediction['bbox'];
    const text = prediction['class'];

    // Set styling
    const color = Math.floor(Math.random() * 16777215).toString(16);
    ctx.strokeStyle = '#' + color
    ctx.font = '18px Arial';

    // Draw rectangles and text
    ctx.beginPath();
    ctx.fillStyle = '#' + color
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
}

export const useCoco = (runCoco: () => Promise<void>) => {
  useEffect(() => {
    runCoco()
  }, [runCoco])
}