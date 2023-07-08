<!--
 /src/routes/+page.svelte
 +page.svelte
 teachable-svelte
 
 Created by Ian Thompson on December 28th 2022
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
	import { TeachableWrapper } from '../util/TM';
	import Class from '../lib/components/Class.svelte';
	import type { Classification } from '$lib/types';
	import Tabs from '$lib/components/Tabs.svelte';
	import CreateModel from '$lib/components/CreateModel.svelte';
	import About from '$lib/components/About.svelte';
	import Train from '$lib/components/Train.svelte';

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
{:else if activeItem == 'About'}
	<About />
{/if}
