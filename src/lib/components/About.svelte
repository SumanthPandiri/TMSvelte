<!--
 /src/lib/components/About.svelte
 About.svelte
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

<div class="space-y-7 px-12 py-5 text-lg leading-relaxed text-white h-full overflow-scroll">
	<h2 class="text-4xl font-bold ">About</h2>
	<p class="">
		This is a simple demonstration of creating, training, and using a TeachableMachine model. What
		makes this project special is its utilization of Svelte.
	</p>
	<p>
		In this application, you are able to create image classifications and train a model using webcam
		or uploaded image data. This project utilizes @teachablemachine/image and @tensorflow/tfjs
		packages. Once the model has been created and trained, the model becomes available for download
		and is serialized into a <code>model.json</code> <code>metadata.json</code> and
		<code>model.weights.bin</code> file. These can then be utilized else where.
	</p>
	<p>This project is licensed under the MIT License.</p>
	<h2 class="text-4xl font-bold">Purpose?</h2>
	<p>
		We discovered there was no way to create TeachableMachine model without using the official
		TeachableMachine website. We wanted our own way to create this model for use in a research
		application. This demo project shows how to consume the API and is a great starting point for
		utilizing TeachableMachine in your own application.
	</p>
	<p>
		This project was created by <a
			href="https://www.iancthompson.dev"
			class="text-blue-400 hover:underline">Ian Thompson</a>
		as a part of his work for the
		<a href="https://idealab.sites.clemson.edu/" class="text-blue-400 hover:underline"
			>IDEA Lab @ Clemson University</a
		>.
	</p>
	<h2 class="text-4xl font-bold">License</h2>
	<p>
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
	</p>
</div>
