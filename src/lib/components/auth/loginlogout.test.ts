import { render } from '@testing-library/svelte';
import LoginLogout from '$lib/components/auth/LoginLogout.svelte';

const { mockUserStore } = await vi.hoisted(async () => await import('$lib/stores/mocks'));
describe('LoginLogout Component', () => {
	vi.mock('$lib/stores/auth', () => ({
		user: mockUserStore
	}));

	it('Unauthenticated shows login', () => {
		const { getByText } = render(LoginLogout);
		expect(getByText('Login')).toBeInTheDocument();
	});

	it('Authenticated shows logout', () => {
		mockUserStore.set({ uid: 'test', email: '', name: '' });
		const { getByText } = render(LoginLogout);
		expect(getByText('Logout')).toBeInTheDocument();
	});
});
