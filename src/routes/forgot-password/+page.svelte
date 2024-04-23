<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';

	export let data: PageData;
	console.log(data);
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Forgot Password</Card.Title>
		<Card.Description>Enter your email below request a password reset</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="email@example.com" required />
			</div>
			<Button type="submit" class="w-full">Login</Button>
		</div>
	</Card.Content>
</Card.Root>
