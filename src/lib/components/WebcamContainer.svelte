<!--
 /src/lib/components/WebcamContainer.svelte
 WebcamContainer.svelte
 teachable-svelte
 

--->
<script lang="ts">
	import { onMount } from 'svelte';

	const width = 224;
	let height = 224;

	let streaming = false;

	let video: HTMLVideoElement = null;
	let canvas: HTMLCanvasElement = null;
	let photo = null;
	let button = null;

	let images: [HTMLImageElement] = [];

	onMount(async () => {
		try {
			let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

			video.srcObject = stream;
			video.play();
			// clearPhoto();
		} catch (error) {
			console.error(error);
		}
	});

	const handleCanPlay = () => {
		if (!streaming) {
			// height = (video.videoHeight / video.videoWidth) * width;
			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			streaming = true;
		} else {
			clearPhoto();
		}
	};
</script>

<div class="flex h-full w-full flex-col items-center space-y-6">
	<video bind:this={video} src="" class="rounded-md" id="video" on:canplay={handleCanPlay}
		>Video stream not availible</video>
	<div class="flex space-x-3">
		<!-- <button class="btn-secondary btn" on:click={takePicture}>Capture</button> -->
		<!-- <button class="btn-success btn" on:click={_onFinish}>Done</button> -->
	</div>
</div>

<canvas bind:this={canvas} id="canvas" class="hidden" />
