<!--
 /src/lib/components/WebcamContainer.svelte
 WebcamContainer.svelte
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
	import { onMount } from "svelte";

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
    })

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