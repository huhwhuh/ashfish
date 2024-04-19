import { describe, it, expect } from 'vitest';
import { Game } from './game';

describe('sverdle game test', () => {
	it('returns true when a valid word is entered', () => {
		const game = new Game();
		expect(game.enter('happy'.split(''))).toBe(true);
	});
	it('returns false when a non-word is entered', () => {
		const game = new Game();
		expect(game.enter('sdfjh'.split(''))).toBe(false);
	});
	it('returns false when word of invalid length is entered', () => {
		const game = new Game();
		expect(game.enter('car'.split(''))).toBe(false);
	});
});
