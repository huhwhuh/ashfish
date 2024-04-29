import { render } from '@testing-library/svelte';
import LoginCheck from '$lib/components/auth/LoginCheck.svelte';

const { mockUserStore } = await vi.hoisted(async () => await import('$lib/stores/mocks'));
describe('LoginCheck Component', () => {
	vi.mock('$lib/stores/auth', () => ({
		user: mockUserStore
	}));

	it('Unauthenticated shows message', () => {
		const { getByText } = render(LoginCheck);
		expect(getByText('Unauthorized')).toBeInTheDocument();
	});

	it('Authenticated shows page', () => {
		mockUserStore.set({ uid: 'test', email: '', name: '' });
		const { queryByText } = render(LoginCheck);
		expect(queryByText('Unauthorized')).toBeNull();
	});
});
