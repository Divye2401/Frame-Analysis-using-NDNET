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

* To initialize and load the model, we decided to integrate it within the player’s init session itself, thereby loading it up
once the video was initially fetched. However ,since the original format was in keras we had to ensure that the model was converted to the desired .json format compatible with node.js.
To convert a Keras model into a TensorFlow.js-compatible model, we employed the TensorFlow.js converter to transform
the Keras model into a format suitable for web deployment by executing tfjs.converters.save_keras_model() function


![image](https://github.com/Divye2401/Frame-Analysis-using-NDNET/assets/52701687/b65a123e-eebe-4896-96ee-232466b86421)

* To begin calculating the frame quality, we needed to first access the current frames which were playing in the dash.js
window, and for that we developed a function called process Frame().The processFrame function’s main objective was to capture the frame that was currently playing in the video window and execute additional operations on it. The function initiated the process by creating a canvas element along with its rendering context, an image element, and a download link. It then extracted the current time of the video and calculated the corresponding frame number based on a frame rate of 30 frames per second. the function set the dimensions of the canvas to match the video’s width and height and drew the current video frame onto the canvas. The pixel data of the drawn image was obtained using the getImageData method. This pixel data was converted to a data URL in PNG format, and the image element’s source was set to display the captured frame. Additionally, a download link was configured to allow users to download the frame as a PNG
file.

* The runModel() function was designed to take an image frame as input and produce an average prediction using the previously defined NDNET model. The resulting predictions were used to calculate the average prediction value. This was achieved by taking the mean of the predictions using predictions.mean().dataSync()[0]. The average prediction reflected average frame quality calculated for that set of frames,
which was then displayed in the frontend.

* The update metrics function was used as a main() call, to call the respective functions and correspondingly update the video metrics per each frame cycle. In order to prevent the buffer from emptying due to high computations required per model prediction, we decided to introduce a delay of about 5 seconds between each model prediction. This allowed the buffer to sufficiently recharge while simultaneously calculating all the other metrics as usual. The models inference was also put on hold when the player was paused so as to avoid unnecessary
wastage of resources. 

## Prequisites

The Bento4 package was employed to seamlessly convert a video into Dynamic Adaptive Streaming over HTTP (DASH)
format. After downloading the MSI installer, PowerShell was opened at the package’s bin folder. The video was initially
fragmented using the "mp4fragment input.mp4 output.mp4" command. Subsequently, the transformation to a Media Presentation Description (MPD) format suitable for DASH was achieved through the "mp4dash –hls input.mp4" command. This conversion process, executed in PowerShell, resulted in an output folder containing essential files for DASH playback. Bento4’s capabilities facilitated the efficient adaptation and distribution of video content across diverse platforms using the DASH standard.j


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








