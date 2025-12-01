export type MaybeElement = Pick<HTMLElement, 'addEventListener' | 'classList'> | null;


/**
 * Binds the guest play button so clicking it hides the start screen.
 * Returns false when the button cannot be found.
 */
export function setupGuestPlayButton(startScreen: MaybeElement, guestButton: MaybeElement): boolean {
	if (!guestButton) {
		return false;
	}

	guestButton.addEventListener("click", () => {
		if (startScreen) {
			startScreen.classList.add("hidden");
		}
	});

	return true;
}
