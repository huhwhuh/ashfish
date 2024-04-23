<script lang="ts">
	import type { PageData } from './$types';

	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let data: PageData;
	console.log(data);
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-xl">Register</Card.Title>
		<Card.Description>Enter your information to create an account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="username">Username</Label>
				<Input id="username" placeholder="Max" required />
			</div>
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" placeholder="email@example.com" required />
			</div>
			<div class="grid gap-2">
				<Label for="password">Password</Label>
				<Input id="password" type="password" />
			</div>
			<Button type="submit" class="w-full">Create an account</Button>
		</div>
		<div class="mt-4 text-center text-sm">
			Already have an account?
			<a href="/login" class="underline"> Log in </a>
		</div>
	</Card.Content>
</Card.Root>
