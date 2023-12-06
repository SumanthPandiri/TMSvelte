<!--
 /src/routes/+page.svelte
 +page.svelte
 teachable-svelte
 

--->
<script lang="ts">
	import { onMount } from 'svelte';
	//import { TeachableWrapper } from '../util/TM';
	import Class from '../lib/components/Class.svelte';
	import type { Classification } from '$lib/types';
	import Tabs from '$lib/components/Tabs.svelte';
	import CreateModel from '$lib/components/CreateModel.svelte';
	import About from '$lib/components/About.svelte';
	import Train from '$lib/components/Train.svelte';
	import Test from '$lib/components/Test.svelte';

	let classifications: [Classification] = [];

	// Tabs
	let items = ['Create Model', 'Train', 'Test', 'About'];
	let activeItem = 'Create Model';

	const tabChange = (e) => {
		activeItem = e.detail;
	};
</script>

<Tabs {activeItem} {items} on:tabChange={tabChange} />

{#if activeItem == 'Create Model'}
	<CreateModel bind:classifications on:trainModel={() => (activeItem = 'Train')} />
{:else if activeItem == 'Train'}
	<Train {classifications} />
{:else if activeItem == 'Test'}
	<Test />
{:else if activeItem == 'About'}
	<About />
{/if}
