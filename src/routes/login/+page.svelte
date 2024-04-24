<script lang="ts">
	import type { PageData } from './$types';
	import LoginForm from '$lib/components/forms/login/LoginForm.svelte';

	export let data: PageData;
</script>

<LoginForm data={data.form} ref={data.ref} message={data.message} />
