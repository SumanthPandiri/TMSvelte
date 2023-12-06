<!--
 /src/lib/components/Train.svelte
 Train.svelte
 teachable-svelte
 
--->
<script lang="ts">
	import * as tf from '@tensorflow/tfjs';
	//import * as tmImage from '@teachablemachine/image';

	import { TrainingStates, type Classification } from '$lib/types';
	//import type { TrainingParameters } from '@teachablemachine/image/dist/teachable-mobilenet';
	import { onMount } from 'svelte';
	//import type { ModelOptions } from '@teachablemachine/image/dist/custom-mobilenet';
	import Terminal from './Terminal.svelte';
	import { cropTo } from '../../util/Canvas';
	import { modelStore, labelsStore } from '../../util/Stores';

	export let classifications: [Classification];

	/**
	 * Track the training state
	 */
	let trainingState: TrainingStates = TrainingStates.inactive;
	let batchIndex: number = 0;


	onMount(async () => {
		console.log("YUH " + classifications);
	});

	const beginTraining = async () => {
		// Training has begun, we will update the training state
		trainingState = TrainingStates.training;

        let labels = classifications.map((x) => x.name);
        labelsStore.set(labels);

        //loads in the mobilenet model from a url -- we can change this later
        const URL =
        "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1";
  
        let mobilenet = await tf.loadGraphModel(URL, { fromTFHub: true });
    
        // // Warm up the model by passing zeros through it once.
        // tf.tidy(function () {
        //     let answer = mobilenet.predict(
        //         tf.zeros([1, 224, 224, 3])
        //     );
        //     console.log(answer.shape);
        // });

        let model = tf.sequential();
        model.add(
            tf.layers.dense({ inputShape: [1024], units: 128, activation: "relu" })
        );
        model.add(
            tf.layers.dense({ units: labels.length, activation: "softmax" })
        );

       //model.summary();

        // Compile the model with the defined optimizer and specify a loss function to use.
        model.compile({
        // Adam changes the learning rate over time which is useful.
            optimizer: "adam",
        // Use the correct loss function. If 2 classes of data, must use binaryCrossentropy.
        // Else categoricalCrossentropy is used if more than 2 classes.
            loss: "categoricalCrossentropy",
        // As this is a classification problem you can record accuracy in the logs too!
            metrics: ["accuracy"],
        });

        console.log("Compiled model");
        


        await tf.nextFrame().then(async () => {
			/**
			 * Loop through each of the training classes and grab the class and class index.
			 */

            let trainingdata = [];
            let outputdata = [];

			classifications.forEach(async (classObject, classIndex) => {
                console.log("Next frame");

				//console.log(classObject);

				/**
				 * We will now access each of the training images and then add them as an example to the model
				 *
				 * Images should conform to a specific criteria. We should probable check that it conforms here,
				 * but i am not yet.
				 */
				classObject.trainingData.forEach(async (image) => {
                    const rimage = tf.browser.fromPixels(image);
                    let resizedTensorFrame = tf.image.resizeBilinear(
                        rimage, [224, 224], true);
                    let normalizedTensorFrame = resizedTensorFrame.div(255);
                    let features = undefined;
                    features = mobilenet.predict(normalizedTensorFrame.expandDims()).squeeze();

                    trainingdata.push(features);
                    outputdata.push(classObject.name);
                    console.log(classObject.name);
                    

					//console.log(`${classObject.name} with ${image}`);

				});
			});

            console.log("ON TO TRAINING");
            
            var index = trainingdata.length;
            var rnd, tmp1, tmp2;

            while (index) {
                rnd = Math.floor(Math.random() * index);
                index -= 1;
                tmp1 = trainingdata[index];
                tmp2 = outputdata[index];
                trainingdata[index] = trainingdata[rnd];
                outputdata[index] = outputdata[rnd];
                trainingdata[rnd] = tmp1;
                outputdata[rnd] = tmp2;
            }
            let outputsAsTensor = tf.tensor1d(outputdata, "int32");
            let oneHotOutputs = tf.oneHot(outputsAsTensor, labels.length);
            let inputsAsTensor = tf.stack(trainingdata);
        
            let results = await model.fit(inputsAsTensor, oneHotOutputs, {
                shuffle: true,
                batchSize: 16,
                epochs: 50
            });
            batchIndex = 100;
            modelStore.set(model);
            console.log("Finished training");
            trainingState = TrainingStates.finish;

			/**
			 * Now, we will actually train the model with the proper training parameters. There are
			 * event callbacks we can access here, but really the only one were worried about now is the
			 * onTrainingEnd() which gets called when the training has finished. Here, we can set the training
			 * state accordingly.
			 */
        

        });
        

			// let modelSave = await model.save('downloads://model');
			// let metadata = JSON.stringify(model.getMetadata());

			// var a = document.createElement('a');
			// document.body.appendChild(a);
			// var blob = new Blob([metadata], { type: 'text/json' }); // the blob
			// var url = window.URL.createObjectURL(blob);
			// a.href = url;
			// a.download = 'metadata.json';
			// a.click();
		
	};
</script>

<div class="h-full w-full px-5">
	{#if trainingState == TrainingStates.inactive}
		<button class="btn-success btn" on:click={beginTraining}>Train Model</button>
	{:else if trainingState == TrainingStates.training}
		<div class="flex h-full w-full flex-col items-center justify-center space-y-4">
			<!-- <span class="loading loading-spinner loading-lg text-info" /> -->
			<div
				class="radial-progress bg-success text-primary-content"
				style={`--value:${(batchIndex / 50) * 100};`}>
				{(batchIndex / 50) * 100}%
			</div>

			<p class="text-content text-xl font-semibold">Model is training...</p>
			<p>{batchIndex} / 50</p>
		</div>
	{:else if trainingState == TrainingStates.finish}
		<div class="flex h-full w-full flex-col">
            <p class="text-content text-xl font-semibold">Model is done training!</p>
			<!-- <Terminal /> -->
		</div>
	{/if}
	<!-- <Terminal {logs}/> -->
</div>
