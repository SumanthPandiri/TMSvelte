<!--
 /src/lib/components/CreateModel.svelte
 CreateModel.svelte
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
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import Class from '$lib/components/Class.svelte';
	import type { Classification } from '$lib/types';

	export let classifications: [Classification] = [];

	const handleAddClass = () => {
		classifications = [
			...classifications,
			{
				name: '',
				trainingData: []
			}
		];
	};

	const handleTrainModel = () => {
		dispatch('trainModel');
	};
</script>

<div class="flex flex-col justify-between space-y-4 p-8">
	<h2 class="w-full text-left text-3xl">Create Your Classes</h2>
	<div class="flex w-full flex-col space-y-6">
		{#each classifications as classification, index}
			<Class bind:classification {index} />
		{/each}
	</div>
	<button class="btn-primary btn" on:click={handleAddClass}>Add Class</button>
	<button class="btn-success btn" on:click={handleTrainModel}>Train Model</button>
</div>
