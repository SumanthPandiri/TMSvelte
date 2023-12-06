<!--
 /src/lib/components/CreateModel.svelte
 CreateModel.svelte
 teachable-svelte
 
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
