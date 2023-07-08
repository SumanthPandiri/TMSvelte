<!--
 /src/lib/components/Class.svelte
 Class.svelte
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
	import { getContext } from 'svelte';
	import CameraModal from './modal/CameraModal.svelte';
	import ImageUploadModal from './modal/ImageUploadModal.svelte';
	import type { Classification } from '$lib/types';
	const { open } = getContext('simple-modal');

	export let classification: Classification;
	export let index: number;

	let webcamImages: [HTMLImageElement] = [];

	const onFinish = (images: [HTMLImageElement]) => {
		webcamImages = images;
		classification.trainingData = images;
	};

	const openWebcam = () => {
		open(CameraModal, {
			onFinish
		});
	};

	const openUploader = () => {
		open(ImageUploadModal);
	};
</script>

<div class="flex w-full flex-col space-y-6 rounded-md bg-primary-content px-4 py-3">
	<div class=" flex w-full justify-around ">
		<div class="form-control w-1/3">
			<label class="label">
				<span class="label-text text-lg font-bold text-black">Class #{index + 1}</span>
			</label>
			<input
				type="text"
				placeholder="Name this class (ex: face)"
				class="input-bordered input w-full max-w-xs"
				bind:value={classification.name} />
		</div>

		<div class="flex space-x-5">
			<button class="flex flex-col items-center justify-center align-middle" on:click={openWebcam}>
				<img src="/webcam.svg" alt="" class="w-12" />
				<p>Webcam</p>
			</button>
			<button
				class="flex flex-col items-center justify-center align-middle"
				on:click={openUploader}>
				<img src="/photo.svg" alt="" class="w-12" />
				<p>Upload</p>
			</button>
		</div>
	</div>
	<div class="rounded-md  border-2 border-dashed p-2">
		<div class="flex justify-between">
			<p class="text-lg font-bold text-black">Training Data:</p>
			<p>{webcamImages.length} images</p>
		</div>
		<div class="flex space-x-1 overflow-scroll">
			{#each classification.trainingData as image}
				<img src={image.src} alt="" class="h-14 rounded-md shadow-lg" />
			{/each}
		</div>
	</div>
</div>
