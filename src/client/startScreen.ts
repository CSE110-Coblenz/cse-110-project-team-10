export type MaybeElement = Pick<HTMLElement, 'addEventListener' | 'classList'> | null;
import { getOrCreateUser } from './userdata.ts';

/**
 * Binds the guest play button so clicking it hides the start screen.
 * Returns false when the button cannot be found.
 */
export function setupGuestPlayButton(startScreen: MaybeElement, guestButton: MaybeElement): boolean {
	if (!guestButton) {
		return false;
	}

	const input = document.getElementById("player-name") as HTMLInputElement;
	guestButton.addEventListener('click', () => {
		if (startScreen) {
			const name = input.value.trim();

			const finalName = name || "Guest";

			getOrCreateUser(finalName);

			localStorage.setItem("currentUser", finalName);

			window.location.href = "home.html";
			startScreen.classList.add('hidden');
		}
	});

	return true;
}
