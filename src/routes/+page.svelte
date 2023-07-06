<script lang="ts">
	import { onMount } from 'svelte';
	import { TeachableMachine, TeachableWrapper } from '../util/TM';


	
	const loadFaces = () => {
		return new Promise((resolve, reject) => {
			let faces: [HTMLImageElement] = []

			for (let index = 0; index < 10; index++) {
				let img = document.createElement('img')
				img.src = `/face/${index}.png`
				faces = [...faces, img]
			}

			resolve(faces)
		});
	}

	const loadHands = () => {
		return new Promise((resolve, reject) => {
			let hands: [HTMLImageElement] = []

			for (let index = 0; index < 10; index++) {
				let img = document.createElement('img')
				img.src = `/hand/${index}.png`
				hands = [...hands, img]
			}

			resolve(hands)
		});
	}

	onMount(async () => {


		/**
		 * Because loading these images takes time and JS is dumb, we need to wait
		 * for the load functions to "resolve" or complete. These are known as promises 
		 * and you can read more about it online. They are a little complicated and more 
		 * advanced feature, but essentially it allows us to create synchronous code.
		 * 
		 * Both of the above functions return arrays of HTMLImageElements which are expected in 
		 * training.
		 */

		let faces = await loadFaces()
		let hands = await loadHands()


		TeachableWrapper.initTeachable(faces, hands);


	});
</script>

<h1 class="text-3xl font-bold underline">TeachableMachine Svelte-wrapper</h1>


