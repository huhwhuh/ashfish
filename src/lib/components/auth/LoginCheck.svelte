<script lang="ts">
	import CircleAlert from 'lucide-svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { user } from '$lib/stores/auth';
</script>

{#if $user}
	<slot id="slot" />
{:else}
	<Alert.Root variant="destructive">
		<CircleAlert class="h-4 w-4" />
		<Alert.Title>Unauthorized</Alert.Title>
		<Alert.Description>You must be signed in to view this page!</Alert.Description>
	</Alert.Root>
{/if}
