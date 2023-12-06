<!--
 /src/lib/components/Terminal.svelte
 Terminal.svelte
 teachable-svelte
 
--->
<script lang="ts">
	export let logs: [string] = [];
</script>

<div class="mockup-code">
	{#each logs as log}
		<pre class="text-warning"><code>{log}</code></pre>
	{/each}
	<!-- <pre data-prefix="$"><code>npm i daisyui</code></pre> 
    <pre data-prefix=">" class="text-warning"><code>installing...</code></pre> 
    <pre data-prefix=">" class="text-success"><code>Done!</code></pre> -->
</div>
