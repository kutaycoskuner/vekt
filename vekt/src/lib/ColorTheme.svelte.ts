import { writable } from 'svelte/store';
import { browser } from '$app/environment';

class Theme {
	// private _theme = writable(browser && localStorage.getItem('color-scheme') || 'light');
	private _theme = writable(this.getInitialTheme());

	private getInitialTheme() {
		if (!browser) return 'light';

		const stored = localStorage.getItem('color-scheme');
		if (stored) return stored;

		const hour = new Date().getHours();
		return (hour >= 8 && hour < 20) ? 'light' : 'dark';
	}

	get current() {
		let value;
		this._theme.subscribe(v => value = v)();
		return value;
	}

	get themeStore() {
		return this._theme; 
	}

	toggle = () => {
		const theme = this.current === 'dark' ? 'light' : 'dark';
		// console.log(theme, localStorage.getItem('color-scheme'))
		document.documentElement.setAttribute('color-scheme', theme);
		if (browser) localStorage.setItem('color-scheme', theme);
		this._theme.set(theme); // Update the store
	};
}

export const theme = new Theme();
