<script lang="ts">
	import Navbar from './Navbar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />

<div class="flex flex-col min-h-screen">
	<Navbar />

	<main class="flex flex-1 flex-col p-4 w-full max-w-5xl m-auto box-border">
		<slot />
	</main>

	<footer class="flex flex-col content-center items-center p-3 xs:py-3"></footer>
</div>
