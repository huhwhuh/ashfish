<script lang="ts">
	// import { page } from '$app/stores';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { logout, user } from '$lib/firebase';
</script>

<header class="w-screen">
	<span class="flex flex-row items-center pl-2 space-x-1">
		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
		<Separator orientation="vertical" class="h-8" />
		<nav class="min-h-10 items-center py-1">
			<ul class="flex flex-row justify-end space-x-5">
				<li>
					<Button href="/" variant="ghost">Home</Button>
				</li>
				<li>
					<Button href="/" variant="ghost">Chat</Button>
				</li>
				{#if $user}
					<li>
						<Button
							on:click={async () => await logout()}
							variant="ghost"
							data-sveltekit-preload-data="hover">Logout</Button
						>
					</li>
				{:else}
					<li>
						<Button href="/login" variant="ghost" data-sveltekit-preload-data="hover">Login</Button>
					</li>
				{/if}
			</ul>
		</nav>
	</span>
	<Separator />
</header>
