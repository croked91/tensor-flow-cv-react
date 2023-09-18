import { useCallback, useRef } from 'react'
import * as tf from "@tensorflow/tfjs";
import { load, ObjectDetection } from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect, useCoco } from "./lib/utils";



function App() {
  tf
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runCoco = useCallback(async () => {
    const net = await load();
    setInterval(() => {
      detect(net);
    }, 1000);
  }, []);

  const detect = async (net: ObjectDetection) => {

    if (
      webcamRef.current === null ||
      webcamRef.current.video === null ||
      canvasRef.current === null
    ) {
      return;
    }
    
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);

      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
    }
  };

  useCoco(runCoco);

  return (
    <div className="App">
        <Webcam
          ref={webcamRef}
          muted={true} 
          className='webcam'
        />
        <canvas
          ref={canvasRef}
          className='canvas'
        />
    </div>
  )
}

export default App
