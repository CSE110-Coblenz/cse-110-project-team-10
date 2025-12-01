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

	
	guestButton.addEventListener('click', () => {

		const input = document.getElementById("player-name") as HTMLInputElement;
		const name = input.value.trim();
		const finalName = name || "Guest";

		getOrCreateUser(finalName);

		localStorage.setItem("currentUser", finalName);

		if (startScreen) {
			startScreen.classList.add('hidden');
		}

		window.location.href = "home.html";
	});

	return true;
}
