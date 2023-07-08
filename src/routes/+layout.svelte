<!--
 /src/routes/+layout.svelte
 +layout.svelte
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
