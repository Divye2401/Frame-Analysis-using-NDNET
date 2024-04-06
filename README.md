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


### Results And Comparisions

As the dataset created and used by the authors of the NDNetGaming model was not publicly available (requried password), we decided to create a dataset comprising of four distinct genres of games which include Multiplayer Online Battle Arenas (MOBAs), First Person Shooters (FPS), single player and sports titles, to ensure a diverse range of contents to test the performance of the model with. The videos were all in 720p resolution and had a framerate of 30 Frames Per Second (FPS). Basic preprocessing was conducted to run our experiments ith the CNN model. Our goal was ensuring the effectiveness
of the model for different genres of games.

#### Model Efficacy Evaluation

To evaluate our first experiment, we used the DASH player integrated with the NDNetGaming model to run and display the videos in our gaming dataset. The results of the experiment were plotted as Average Frame
Quality vs Iterations for the different genres of games From the graph, we can see that: Rainbow Six Siege and Dota were deemed as higher-quality games, likely attributed to their
in-game actions being more prominent and distinctive.Valorant exhibited the lowest mean average, with the model recording lower values during tense non-animated situations.
Additionally, it seemed to struggle with classifying important and non-important actions.
Fifa experienced notable drops in quality, primarily stemming from frame freezes during specific replays or cutscenes.
![image](https://github.com/Divye2401/Frame-Analysis-using-NDNET/assets/52701687/cfe5586a-43b3-4fcd-b8bd-c6a3c33ba531)


#### Adaptive Bitrate Algorithms Comparison

Due to our inability to create different bitrate-based encodings for our custom dataset, the selected videos were stalling excessively as it tried to maintain the one desired bitrate. Hence,
even though frame quality was maintained the actual user QOE was extensively degraded. Hence, we decided to use
the default ‘bunny’ video located in the official dash player repository for ABR testing purposes.

* #### No Throttling
The videos were tested under the maximum available bandwidth to identify differences in normal scenarios. The default ABR algorithm initially faced challenges as the model loaded, but eventually caught up with the others. All other algorithms displayed nearly identical behavior, with LoL+ demonstrating
the best performance.

![image](https://github.com/Divye2401/Frame-Analysis-using-NDNET/assets/52701687/7a8bdeda-04e0-4730-872a-77e992d398d5)

* #### Slow 3G
A constrained bandwidth scenario was simulated by selecting the slow 3G option in the Dash player. Bola exhibited the poorest performance among all the options, leading to frequent stutters and quality drops. L2A-LL experienced significant buffering at the start of the video but gradually caught up. Lol+ consistently delivered the highest average quality, although it
experienced slight degradation towards the end. 
* BOLA might have struggled in adapting to the constrained
bandwidth of slow 3G due to its conservative approach or
slower reaction time in adjusting the video bitrate. This hesitation or delay of BOLA in adapting to fluctuating network
conditions could have caused frequent stutters and drops in
quality, as the available bandwidth varied based on slow 3G,
causing disruptions in the streaming experience.

* L2A-LL probably encountered initial buffering because of its attempt to optimize video quality based on predicted future bandwidth availability. This predictive nature may have caused a delay in the start of the video as it attempted to ensure a smoother streaming experience. However, once it adjusted to
the limited bandwidth, it gradually caught up by adapting the
bitrate, resulting in improved performance over time.

* LoL+ showcased a fairly superior performance by consistently
delivering higher average frame quality when compared to
other algorithms under slow 3G conditions. Its efficient adaptation ability may have allowed it to maintain a higher quality
for a longer duration. However, towards the end, a slight
degradation might have occurred due to prolonged exposure
to constrained bandwidth, causing a minor decline in performance.

![image](https://github.com/Divye2401/Frame-Analysis-using-NDNET/assets/52701687/c8265a92-ed32-40d6-b2ed-df40146f98dd)







