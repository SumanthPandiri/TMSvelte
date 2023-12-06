<!--
 /src/lib/components/About.svelte
 About.svelte
 teachable-svelte
 
 
--->

<div class="h-full space-y-7 overflow-scroll px-12 py-5 text-lg leading-relaxed text-white">
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
	<!-- <p>
		This project was created by Sumanth Pandiri as a part of his work for the
		<a href="https://idealab.sites.clemson.edu/" class="text-blue-400 hover:underline"
			>IDEA Lab @ Clemson University</a
		>.
	</p> -->
	<h2 class="text-4xl font-bold">License</h2>
</div>
