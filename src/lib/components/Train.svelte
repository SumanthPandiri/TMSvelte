<!--
 /src/lib/components/Train.svelte
 Train.svelte
 teachable-svelte
 
 Created by Ian Thompson on July 7th 2023
 icthomp@clemson.edu
 ianthompson@nicelion.com
 
 https://iancthompson.dev
 https://idealab.sites.clemson.edu
 
 MIT License
 
 Copyright (c) 2023 Nice Lion Technologies LLC
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
--->
<script lang="ts">
	import * as tf from '@tensorflow/tfjs';
	import * as tmImage from '@teachablemachine/image';

	import { TrainingStates, type Classification } from '$lib/types';
	import type { TrainingParameters } from '@teachablemachine/image/dist/teachable-mobilenet';
	import { onMount } from 'svelte';
	import type { ModelOptions } from '@teachablemachine/image/dist/custom-mobilenet';
	import Terminal from './Terminal.svelte';
	import { cropTo } from '../../util/Canvas';
	import { modelStore } from '../../util/Stores';

	export let classifications: [Classification];

	/**
	 * Track the training state
	 */
	let trainingState: TrainingStates = TrainingStates.inactive;
	let batchIndex: number = 0;

	const trainingParams: TrainingParameters = {
		denseUnits: 100,
		epochs: 50,
		learningRate: 0.001,
		batchSize: 16
	};

	const teachableMetadata: tmImage.Metadata = {
		tfjsVersion: tf.version.tfjs
	};

	const modelOptions: ModelOptions = {
		version: 2,
		alpha: 0.35
	};

	onMount(async () => {
		console.log(classifications);
	});

	const beginTraining = async () => {
		// Training has begun, we will update the training state
		trainingState = TrainingStates.training;

		// Initialize the TeachableMobileNet with metadata and model options defined abovee
		let model: tmImage.TeachableMobileNet = await tmImage.createTeachable(
			teachableMetadata,
			modelOptions
		);

		/**
		 * Create a labels variable. Map will run on the classifications array and place each element in the temporary x variable. We
		 * then return x.name property to a new array housed in the labels variable.
		 *
		 * Then, we set the model's labels to the array we have just created.
		 */
		let labels = classifications.map((x) => x.name);
		model.setLabels(labels);

		await tf.nextFrame().then(async () => {
			/**
			 * Loop through each of the training classes and grab the class and class index.
			 */
			classifications.forEach(async (classObject, classIndex) => {
				console.log(classObject);

				/**
				 * We will now access each of the training images and then add them as an example to the model
				 *
				 * Images should conform to a specific criteria. We should probable check that it conforms here,
				 * but i am not yet.
				 */
				classObject.trainingData.forEach(async (image) => {
					console.log(`${classObject.name} with ${image}`);

					await model.addExample(classIndex, image);
				});
			});

			/**
			 * Now, we will actually train the model with the proper training parameters. There are
			 * event callbacks we can access here, but really the only one were worried about now is the
			 * onTrainingEnd() which gets called when the training has finished. Here, we can set the training
			 * state accordingly.
			 */
			await model.train(trainingParams, {
				onBatchBegin: (logs) => {
					console.log('batch begin');
					batchIndex += 1;
				},
				onTrainBegin: () => {},
				onBatchEnd: () => {},
				onTrainEnd: () => {
					trainingState = TrainingStates.finish;
				}
			});

			/**
			 * We have created a model store and now we are setting it's data to the model we have just trained.
			 */
			modelStore.set(model);

			// let modelSave = await model.save('downloads://model');
			// let metadata = JSON.stringify(model.getMetadata());

			// var a = document.createElement('a');
			// document.body.appendChild(a);
			// var blob = new Blob([metadata], { type: 'text/json' }); // the blob
			// var url = window.URL.createObjectURL(blob);
			// a.href = url;
			// a.download = 'metadata.json';
			// a.click();
		});
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
			<Terminal />
		</div>
	{/if}
	<!-- <Terminal {logs}/> -->
</div>
