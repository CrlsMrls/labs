import './style.css';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

window.onload = start;

async function start() {
    await import('@tensorflow/tfjs-backend-cpu');
    await import('@tensorflow/tfjs-backend-webgl');

    const video: HTMLVideoElement = document.querySelector('#webcam')!;

    const model: cocoSsd.ObjectDetection = await cocoSsd.load();

    // The COCO-SSD has finished loading.
    document.querySelector('#demos')?.classList.remove('hidden');
    document.querySelector('#waiting')?.classList.add('hidden');

    setupWebcam();

    async function setupWebcam() {
        const enableWebcamButton = document.querySelector('#webcamButton')!;

        // Check if webcam access is supported.
        if (navigator.mediaDevices?.getUserMedia === undefined) {
            throw new Error('getUserMedia() is not supported by your browser');
        }

        // Enable the live webcam view and start classification.
        const enableCam = async () => {
            // hide the button once clicked.
            enableWebcamButton.classList.add('hidden');

            // activate the webcam stream
            const stream = await navigator.mediaDevices.getUserMedia({
                // force video but not audio.
                video: true,
            });
            video.srcObject = stream;
            video.addEventListener('loadeddata', predictWebcam);
        };

        enableWebcamButton.addEventListener('click', enableCam);
    }

    async function predictWebcam() {
        const liveViewBoxes = document.querySelector('#liveViewBoxes')!;
        // clear previous boxes
        liveViewBoxes.replaceChildren();

        // detect objects for the video returning a list of bounding boxes with associated class and score
        const predictions: cocoSsd.DetectedObject[] = await model.detect(video);

        // filter out the low confidence score and print a box for good classified predictions
        predictions
            .filter((prediction) => prediction.score > 0.66)
            .forEach((prediction) => {
                const confidence = document.createElement('div');
                const percentage = Math.round(prediction.score * 100);
                confidence.classList.add('confidence');
                confidence.innerText = `${prediction.class} - with ${percentage}% confidence`;
                confidence.style.marginLeft = `${prediction.bbox[0]}px`;
                confidence.style.marginTop = `${prediction.bbox[1] - 10}px`;
                confidence.style.width = `${prediction.bbox[2] - 10}px`;
                liveViewBoxes.appendChild(confidence);

                const highlighter = document.createElement('div');
                highlighter.classList.add('highlighter');
                highlighter.style.left = `${prediction.bbox[0]}px`;
                highlighter.style.top = `${prediction.bbox[1]}px`;
                highlighter.style.width = `${prediction.bbox[2]}px`;
                highlighter.style.height = `${prediction.bbox[3]}px`;
                liveViewBoxes.appendChild(highlighter);
            });

        window.requestAnimationFrame(predictWebcam);
    }
}
