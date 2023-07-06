// --- legacy code --- disabled

import { TIMEOUTS } from "./del__timeouts.js";

export class MobileNav {
	constructor() {
		this.toggles = document.querySelectorAll(".toggle");
		this.modal = document.querySelector(".modal");
		this.proxy = document.querySelector(".proxy");
		this.header = document.querySelector(".main-header");
		this.links = document.querySelectorAll(".modal__nav-link");
	}

	toggleActive = () =>
		this.toggles.forEach(toggle => toggle.classList.toggle("active"));

	toggleProxy = () => this.proxy.classList.toggle("v-visible");

	handleClickOpen = () => {
		this.toggleActive();
		this.modal.showModal();
		this.toggles[1].addEventListener("click", this.handleClickClose);
		window.addEventListener("keydown", this.handleEsc);
		this.links.forEach(link =>
			link.addEventListener("click", this.handleClickClose)
		);
		removeEventListener("click", this.handleClickOpen);
		TIMEOUTS.setTimeout(() => this.toggleProxy(), 500);
	};

	handleClickClose = () => {
		this.toggleActive();
		this.toggleProxy();
		this.modal.close();
		removeEventListener("click", this.handleClickClose);
		window.removeEventListener("keydown", this.handleEsc);
		this.links.forEach(link =>
			link.removeEventListener("click", this.handleClickClose)
		);
		TIMEOUTS.clearAllTimeouts();
		this.header.classList.remove("headerPlaceholder");
	};

	handleEsc = event => {
		this.modal.hasAttribute("open") &&
			event.code === "Escape" &&
			this.handleClickClose();
	};

	setState = isMobile => {
		if (isMobile) {
			this.toggles[0].addEventListener("click", this.handleClickOpen);
		} else {
			this.toggles[0].removeEventListener("click", this.handleClickOpen);
			this.modal.hasAttribute("open") &&
				this.header.classList.add("headerPlaceholder");
		}
	};

	checkState = breakpoint =>
		window.innerWidth <= breakpoint && this.setState(true);

	toggleState = isMobileSize =>
		isMobileSize ? this.setState(true) : this.setState(false);

	watchState = breakpoint => {
		const mediaQueryList = window.matchMedia(`(max-width: ${breakpoint}px)`);
		mediaQueryList.addEventListener("change", event =>
			this.toggleState(event.matches)
		);
	};

	initOn = breakpoint => {
		this.checkState(breakpoint);
		this.watchState(breakpoint);
	};
}
