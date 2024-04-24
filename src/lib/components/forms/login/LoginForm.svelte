<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { loginSchema, type LoginSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { getIdToken, signInWithEmailAndPassword } from '@firebase/auth';
	import { auth } from '$lib/firebase';
	import { goto } from '$app/navigation';

	export let data: SuperValidated<Infer<LoginSchema>>;
	const form = superForm(data, {
		SPA: true,
		validators: zodClient(loginSchema),
		async onUpdate({ form }) {
			if (!form.valid) {
				return;
			}
			const { email, password } = form.data;
			try {
				const credential = await signInWithEmailAndPassword(auth, email, password);
				const idToken = await getIdToken(credential.user, true);
				await fetch('/api/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
						// 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
					},
					body: JSON.stringify({ idToken })
				});

				await goto('/');
			} catch (err) {
				console.log(err);
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<div class="grid gap-2">
							<Form.Label>Email</Form.Label>
							<Input {...attrs} bind:value={$formData.email} />
						</div>
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<div class="grid gap-2">
							<div class="flex items-center">
								<Form.Label>Password</Form.Label>
								<a href="/forgot-password" class="ml-auto inline-block text-sm underline">
									Forgot your password?
								</a>
							</div>
							<Input {...attrs} bind:value={$formData.password} type="password" />
						</div>
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
				<Button type="submit" class="w-full">Login</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/register" class="underline">Register</a>
			</div>
		</Card.Content>
	</Card.Root>
</form>
