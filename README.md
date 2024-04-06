## Introduction

The increase in popularity of live streaming of segmented videos has given content providers the ability to offer multiple representations of the same video. This study investigates the relationship between the average frame quality as a metric and gaming experiences by connecting a Neural Network model, named NDNetGaming, to a DASH player. The primary
objective of this study was to assess frame quality across different gaming genres, and also evaluate different adaptive bitrate algorithms’ performance when applied to video content with
various bitrate representations using that frame quality metric. The experiment encompassed a comprehensive analysis under varying network conditions, including reduced throughput scenarios. The methodology of the experiment involved integrating NDNetGaming with a JavaScript DASH player
to capture and measure the average frame qualities across different gaming genres. The evaluation includes assessing this frame quality metric in Unrestricted Throughput and Slow 3G scenarios while applying different adaptive bitrate strategies to determine the one with the least stalling and latency. 

The findings reveal significant insights between frame quality and gaming experiences. Further, the study sheds light on the efficacy of Dynamic, Throughput, Buffer-based (BOLA), L2A-LL and
LoL+ adaptive bitrate algorithms when subjected to varying network conditions, with an aim to provide an enhanced user experience.
This research contributes to the understanding of how the frame quality effects gaming immersion to offer practical implications for optimizing video streaming applications to deliver high quality content, improving user satisfaction. From the results of our evaluation, Dota2 displayed the most consistent frame quality, Rainbow Six Siege being a slower First Person Shooter (FPS) also displayed consistency in frame
quality, Valorant showed a drop in frame quality in some sequences and FIFA had many fluctuations in average frame quality.



## NDNET Model

NDNETGAMING MODEL OVERVIEW
The authors of ’NDNetGaming’, Markus et al aimed to design a CNN based quality model, but were faced with many challenges while attempting to do so. They mention that inputting an entire video instead of an image comes with drawbacks such as the requirement of higher processing power and more data. To overcome these challenges, they designed the model
NDNetGaming Model Architecture in three phases. As the authors mention, in the first phase, the model is allowed to learn typical video compression artifacts depending on the frame - level objective quality metric. Since every objective quality metric involves error, the second phase was created to fine-tune the model using subjective ratings
of image quality. They pool the frame-level predictions to a video quality score in the third stage. The three phases of their model is described as below.


## CODE Overview

The entire code consists of two major sections: main.js and index.html, responsible for managing the overall backend code
and updating the frontend section of the player respectively. The main.js file contains all the necessary parameters and global variables responsible for updating the required video
metrics such as buffer length, bitrate etc. Hence for the purposes of our project, we decided to create another global scope variable by the name of ‘AvgFrameQuality’ which would be
further displayed in the UI.

*To initialize and load the model, we decided to integrate it within the player’s init session itself, thereby loading it up
once the video was initially fetched. However ,since the original format was in keras we had to ensure that the model was converted to the desired .json format compatible with node.js.
To convert a Keras model into a TensorFlow.js-compatible model, we employed the TensorFlow.js converter to transform
the Keras model into a format suitable for web deployment by executing tfjs.converters.save_keras_model() function


![image](https://github.com/Divye2401/Frame-Analysis-using-NDNET/assets/52701687/b65a123e-eebe-4896-96ee-232466b86421)

*




### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._
1. Clone the repo
   ```sh
   git clone 
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the code
   ```sh
   npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>








