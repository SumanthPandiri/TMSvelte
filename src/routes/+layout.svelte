<!--
 /src/routes/+layout.svelte
 +layout.svelte
 teachable-svelte

--->
<script>
	import '../app.css';
	import Modal from 'svelte-simple-modal';
</script>

<Modal>
	<div class="flex h-screen flex-col overflow-hidden">
		<h1 class="bg-blue-500 py-3 text-center text-3xl font-bold text-white underline">
			Teachable Svelte
		</h1>
		<div class="h-full overflow-scroll">
			<slot />
		</div>
		<div class="bg-black py-2 text-center text-sm text-white">Created by Ian Thompson</div>
	</div>
</Modal>
