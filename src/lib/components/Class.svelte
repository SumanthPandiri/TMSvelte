<!--
 /src/lib/components/Class.svelte
 Class.svelte
 teachable-svelte
 

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
