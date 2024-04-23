<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />

<div class="flex flex-col min-h-screen">
	<Header />

	<main class="flex flex-1 flex-col p-4 w-full max-w-5xl m-auto box-border">
		<slot />
	</main>

	<footer class="flex flex-col content-center items-center p-3 xs:py-3">
		<p>
			visit <a class="font-bold" href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
		</p>
	</footer>
</div>
