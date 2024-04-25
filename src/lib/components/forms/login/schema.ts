import { z } from 'zod';

export const loginSchema = z
	.object({
		email: z
			.string({
				invalid_type_error: 'Invalid email',
				required_error: 'Email is required'
			})
			.email('Invalid email')
			.max(50, 'Email too long'),
		password: z
			.string({
				required_error: 'Password is required'
			})
			.min(8, 'Password must be at least 8 characters')
			.max(50, 'Password too long')
	})
	.required({
		email: true,
		password: true
	});

export type LoginSchema = typeof loginSchema;
