import { describe, expect, it } from 'vitest';
import { setupGuestPlayButton } from '../startScreen.ts';

class MockElement {
	private listeners: Record<string, Array<() => void>> = {};
	public classList = {
		items: new Set<string>(),
		add: (...tokens: string[]) => {
			tokens.forEach((token) => this.classList.items.add(token));
		},
		contains: (token: string) => this.classList.items.has(token),
	};

	addEventListener(event: string, handler: () => void) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event].push(handler);
	}

	click() {
		this.listeners['click']?.forEach((handler) => handler());
	}
}

const asElement = (element: MockElement | null) => element as unknown as HTMLElement | null;

describe('setupGuestPlayButton', () => {
	it('adds the hidden class to the start screen when the button is clicked', () => {
		const startScreen = new MockElement();
		const guestButton = new MockElement();

		const result = setupGuestPlayButton(asElement(startScreen), asElement(guestButton));
		expect(result).toBe(true);
		expect(startScreen.classList.contains('hidden')).toBe(false);

		guestButton.click();
		expect(startScreen.classList.contains('hidden')).toBe(true);
	});

	it('does not fail when the start screen is missing', () => {
		const guestButton = new MockElement();

		const result = setupGuestPlayButton(null, asElement(guestButton));
		expect(result).toBe(true);
		expect(() => guestButton.click()).not.toThrow();
	});

	it('returns false when the guest button cannot be found', () => {
		const startScreen = new MockElement();

		const result = setupGuestPlayButton(asElement(startScreen), null);
		expect(result).toBe(false);
	});
});
