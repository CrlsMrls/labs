![workflow status badge](https://github.com/CrlsMrls/smart-webcam/workflows/CI/badge.svg)  
[![Netlify Status](https://api.netlify.com/api/v1/badges/1a49a666-ffbd-4c37-aaac-1b949b33cedc/deploy-status)](https://app.netlify.com/sites/smart-webcam/deploys)

# Smart webcam

Automatically detect common daily objects in the webcam using Machine Learning with [Tensorflow.js](https://www.tensorflow.org/js).

[Link to demo](https://smart-webcam.netlify.app/)

## Description

Create a webpage that uses machine learning directly in the web browser via [Tensorflow.js](https://www.tensorflow.org/js) to classify and detect common objects.

COCO-SSD is the name of a pre-trained object detection ML model used here. It localizes and identifies [90 common everyday objects](https://github.com/tensorflow/tfjs-models/blob/master/coco-ssd/src/classes.ts) in a single image.

The web application passes the video stream from the webcam into the cocoSsd object detection model, it then returns a list of bounding boxes with associated object classes and scores. The website uses this information to overlap the webcam stream.

<div style="text-align:center; height: 200px"><img src="screenshot.jpg" /></div>

## Goals of this lab

### Objectives

-   Use a pre-trained Machine Learning model on the web.
-   Use TypeScript for working with [Tensorflow.js](https://www.tensorflow.org/js)

## Commands

### Development

```bash
yarn

yarn dev
```

Browse to [http://localhost:8080/](http://localhost:8080/). Changes in code or CSS automatically update the web.

### Build

```bash
yarn

yarn build
```

The `/dist` folder contains `index.html` and static files for CSS and TS.
