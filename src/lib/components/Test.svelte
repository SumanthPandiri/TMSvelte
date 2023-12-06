<!--
 /src/lib/components/Test.svelte
 Test.svelte
 teachable-svelte
 
--->
<script lang="ts">
	import type { Classification } from '$lib/types';
	import { onMount } from 'svelte';
	import { modelStore, labelsStore} from '../../util/Stores';
	import * as tf from '@tensorflow/tfjs';
	//import * as tmImage from '@teachablemachine/image';

    let VIDEO = document.getElementById("webcam");


    export let classification: [Classification];

	let model = $modelStore;
    let labels;
    labelsStore.subscribe((value) => {
        labels = value;
    });

    console.log($modelStore);

    const URL =
    "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1";

    let mobilenet;

	let prediction;
    let percent = 0.5;


  
    function enableCam() {
    // checks if they have the media device
        if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            // getUsermedia parameters.
            const constraints = {
            video: true,
            width: 640,
            height: 480,
            };

            // Activate the webcam stream.
            navigator.mediaDevices.getUserMedia(constraints).then(
            function (stream) {
            VIDEO.srcObject = stream;
            VIDEO.play();
            
            }
            );
        } else {
            console.warn("getUserMedia() is not supported by your browser");
        }
    }

    function delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
    onMount(async () => {
        enableCam();
        mobilenet = await tf.loadGraphModel(URL, { fromTFHub: true });
        processVideo();
        console.log(" Labels " + labels);
        
    });
	// const loop = async () => {

    //     while (VIDEO.srcObject) {
    //         tf.tidy(function () {
    //         let videoFrameAsTensor = tf.browser.fromPixels(VIDEO).div(255);
    //         let resizedTensorFrame = tf.image.resizeBilinear(
    //             videoFrameAsTensor,
    //             [224, 224],
    //             true
    //       );
    
    //         let imageFeatures = mobilenet.predict(resizedTensorFrame.expandDims());
    //         let prediction = model.predict(imageFeatures).squeeze();
    //         let highestIndex = prediction.argMax().arraySync();
    //         let predictionArray = prediction.arraySync();
    
    //         prediction =
    //             "Prediction: " +
    //             highestIndex +
    //             "% confidence";
            
    //     });
	//     }
    // };
    const processVideo = async () => {
            while (VIDEO && VIDEO.srcObject) {
                await tf.nextFrame();

                let videoFrameAsTensor = tf.browser.fromPixels(VIDEO).div(255);

                let resizedTensorFrame = tf.image.resizeBilinear(
                    videoFrameAsTensor,
                    [224, 224],
                    true
                );


                let imageFeatures = mobilenet.predict(resizedTensorFrame.expandDims());
                console.log(imageFeatures.shape);
                let predictionTensor = model.predict(imageFeatures).squeeze();
                console.log(predictionTensor.array());
                let highestIndex = predictionTensor.argMax().arraySync();
                console.log(highestIndex);
                percent = predictionTensor.arraySync()[highestIndex];

                prediction = `Prediction: ${labels[highestIndex]}`;
                console.log(prediction);
                await delay (1001);
            }
        };

    processVideo(); // Start processing video when the component mounts
    
        
</script>

<div class="flex flex-col items-center space-y-3 px-4 py-5">
    <video bind:this={VIDEO} class="rounded-md"></video>

	<div class=" flex w-full justify-center space-x-6">
        <div class="flex w-1/2 flex-col space-y-4 rounded-md bg-base-300 px-5 py-4">
            <p class="text-xl">{prediction}</p>
            <div class="flex w-full flex-col space-y-2">
                <p>Confidence: {percent * 100}%</p>
                <progress
                    class={`progress w-56 ${
                        percent <= 0.5 ? 'progress-error' : 'progress-success'
                    }`}
                    value={percent * 100}
                    max="100" />
            </div>
        </div>
	</div>
</div>
