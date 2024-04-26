<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { type Infer, setError, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { loginSchema, type LoginSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { getIdToken, signInWithEmailAndPassword } from 'firebase/auth';
	import { goto, invalidateAll } from '$app/navigation';
	import { CircleAlert } from 'lucide-svelte';
	import { FirebaseError } from 'firebase/app';
	import { setSessionCookieByIDToken } from '$lib/authutils';
	import { initFirebase } from '$lib/firebase';

	export let ref: string = '/';
	export let message: string;
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
				const { clientAuth } = initFirebase();
				const credential = await signInWithEmailAndPassword(clientAuth, email, password);
				const idToken = await getIdToken(credential.user, true);
				const res = await setSessionCookieByIDToken(idToken);

				if (!res.ok) {
					throw res.body;
				}
				await invalidateAll();
				await goto(`/${ref.slice(1)}`);
			} catch (err) {
				if (err instanceof FirebaseError) {
					if (err.code === 'auth/invalid-credential') {
						setError(form, 'password', 'Invalid username and/or password!');
					} else {
						setError(form, 'password', err.message);
					}
				} else if (typeof err === 'string') {
					setError(form, 'password', err);
				} else {
					throw err;
				}
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-10">
	{#if message}
		<Alert.Root variant="destructive" class="mx-auto max-w-sm">
			<CircleAlert class="h-4 w-4" />
			<Alert.Title>Unauthorized</Alert.Title>
			<Alert.Description>
				{message}
			</Alert.Description>
		</Alert.Root>
	{/if}
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
