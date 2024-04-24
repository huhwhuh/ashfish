<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { logout, user } from '$lib/firebase';
	import { page } from '$app/stores';
</script>

<header class="w-screen">
	<span class="flex flex-row items-center pl-2 space-x-2">
		<ul class="flex flex-row space-x-2">
			<li>
				<Button on:click={toggleMode} variant="outline" size="icon">
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</li>
			<li>
				{#if $user}
					<Button on:click={async () => await logout()} variant="outline">Logout</Button>
				{:else}
					<Button href="/login" variant="outline" data-sveltekit-preload-data="hover">Login</Button>
				{/if}
			</li>
		</ul>
		<Separator orientation="vertical" class="h-8" />
		<nav class="min-h-10 items-center py-1">
			<ul class="flex flex-row justify-end space-x-5">
				<li>
					<Button href="/" variant={$page.route.id === '/' ? 'secondary' : 'ghost'}>Home</Button>
				</li>
				<li>
					<Button href="/chat" variant={$page.route.id === '/chat' ? 'secondary' : 'ghost'}
						>Chat</Button
					>
				</li>
				<li>
					<Button href="/profile" variant={$page.route.id === '/profile' ? 'secondary' : 'ghost'}
						>Profile</Button
					>
				</li>
			</ul>
		</nav>
	</span>
	<Separator />
</header>
