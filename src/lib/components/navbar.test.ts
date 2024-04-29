import { render } from '@testing-library/svelte';
import Navbar from '$lib/components/Navbar.svelte';

const { mockUserStore } = await vi.hoisted(async () => await import('$lib/stores/mocks'));
describe('LoginLogout Component', () => {
	vi.mock('$lib/stores/auth', () => ({
		user: mockUserStore
	}));
	it('Unauthenticated shows login', () => {
		const { getByText } = render(Navbar);
		expect(getByText('Login')).toBeInTheDocument();
	});
	it('Authenticated shows logout', () => {
		mockUserStore.set({ uid: '', name: '', email: '' });
		const { getByText } = render(Navbar);
		expect(getByText('Logout')).toBeInTheDocument();
	});
});
