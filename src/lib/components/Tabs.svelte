<!--
 /src/lib/components/Tabs.svelte
 Tabs.svelte
 teachable-svelte
 
--->
<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let items;
	export let activeItem;
</script>

<div class="mt-2 p-2 text-white">
	<ul>
		{#each items as item}
			<li on:click={() => dispatch('tabChange', item)}>
				<div class:active={item === activeItem}>{item}</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	li:hover {
		opacity: 0.6;
	}

	ul {
		display: flex;
		justify-content: center;
		padding: 0;
		list-style-type: none;
	}

	li {
		margin: 0 16px;
		font-size: 18px;
		/* color: #555; */
		cursor: pointer;
	}

	.active {
		/* color: #36A9E7; */
		border-bottom: 2px solid #36a9e7;
		/* padding-bottom: 8px; */
	}
</style>
