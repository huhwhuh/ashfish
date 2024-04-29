<script>
	import { logout } from '$lib/firebase';
	import { Button } from '$lib/components/ui/button';
	import { user } from '$lib/stores/auth';
</script>

{#if $user}
	<Button on:click={async () => await logout()} variant="outline">Logout</Button>
{:else}
	<Button href="/login" variant="outline" data-sveltekit-preload-data="hover">Login</Button>
{/if}
