<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	console.log(data);
</script>

<div>
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="email@example.com" required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="/forgot-password" class="ml-auto inline-block text-sm underline">
							Forgot your password?
						</a>
					</div>
					<Input id="password" type="password" required />
				</div>
				<Button type="submit" class="w-full">Login</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/register" class="underline">Register</a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
