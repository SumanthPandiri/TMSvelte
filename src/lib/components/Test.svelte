<!--
 /src/lib/components/Test.svelte
 Test.svelte
 teachable-svelte
 
 Created by Ian Thompson on July 8th 2023
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
	import { onMount } from 'svelte';
	import { modelStore } from '../../util/Stores';
	import * as tf from '@tensorflow/tfjs';
	import * as tmImage from '@teachablemachine/image';
	import WebcamContainer from './WebcamContainer.svelte';

	let model: tmImage.CustomMobileNet = $modelStore;

	let webcam;

	let predictions = [];

	onMount(async () => {
		console.log($modelStore);

		console.log(model.getClassLabels());

		webcam = new tmImage.Webcam(200, 200, true);
		await webcam.setup();

		document.getElementById('webcam-container').appendChild(webcam.canvas);

		webcam.play();
		window.requestAnimationFrame(loop);
	});

	const loop = async () => {
		webcam.update(); // update the webcam frame

		await predict();

		window.requestAnimationFrame(loop);
	};

	const predict = async () => {
		// let prediction = await model.predict(webcam.canvas)

		// let tempPredicitons = await model.predict(webcam.canvas);

		// tempPredicitons.map((prediciton) => {
		//     // console.log(prediciton);
		//     prediciton.probability = Math.round(prediciton.probability * 100) / 100
		// })

		predictions = await model.predict(webcam.canvas);
	};
</script>

<div class="flex flex-col items-center space-y-3 px-4 py-5">
	<!-- <WebcamContainer /> -->
	<div id="webcam-container" class="rounded-md" />

	<div class=" flex w-full justify-center space-x-6">
		{#each predictions as prediction}
			<div class="flex w-1/2 flex-col space-y-4 rounded-md bg-base-300 px-5 py-4">
				<p class="text-xl">{prediction.className}</p>
				<div class="flex w-full flex-col space-y-2">
					<p>Confidence: {prediction.probability * 100}%</p>
					<progress
						class={`progress w-56 ${
							prediction.probability <= 0.5 ? 'progress-error' : 'progress-success'
						}`}
						value={prediction.probability * 100}
						max="100" />
				</div>
			</div>
		{/each}
	</div>
</div>
