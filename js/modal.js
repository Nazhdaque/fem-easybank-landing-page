export class Modal {
	constructor() {
		this.modal = document.querySelector(".modal");
		this.toggles = document.querySelectorAll(".toggle");
		this.mainToggle = this.toggles[0];
		this.modalToggle = this.toggles[1];
		this.mainHeader = document.querySelector(".main-header");
		this.modalHeader = document.querySelector(".modal-header");
		this.controls = [...document.querySelectorAll(".modal__controls")];
	}

	toggleActive = () =>
		this.toggles.forEach(toggle => toggle.classList.toggle("active"));
	toggleHeader = () => this.mainHeader.classList.toggle("header-placeholder");
	toggleModalHeader = () => this.modalHeader.classList.toggle("v-visible");

	handleClick = () => {
		const isModalOpen = this.modal.hasAttribute("open");
		this.toggleModalHeader();
		this.toggleListenters(isModalOpen);
		switch (isModalOpen) {
			case true:
				this.modal.close();
				break;
			case false:
				this.modal.showModal();
				this.toggleListenters(isModalOpen);
				break;
		}
		this.toggleActive();
		this.toggleHeader();
	};

	handleEsc = event =>
		this.modal.hasAttribute("open") &&
		event.code === "Escape" &&
		this.handleClick();

	handleLightDismiss = event =>
		event.target === event.currentTarget && this.handleClick();

	manageListeners = (items, isModalOpen) => {
		switch (isModalOpen) {
			case true:
				window.removeEventListener("keydown", this.handleEsc);
				this.modal.removeEventListener("click", this.handleLightDismiss);
				this.mainToggle.addEventListener("click", this.handleClick);
				break;
			case false:
				window.addEventListener("keydown", this.handleEsc);
				this.modal.addEventListener("click", this.handleLightDismiss);
				this.mainToggle.removeEventListener("click", this.handleClick);
				break;
		}

		items.forEach(item =>
			!Array.isArray(item)
				? isModalOpen
					? item.removeEventListener("click", this.handleClick)
					: item.addEventListener("click", this.handleClick)
				: this.manageListeners(item, isModalOpen)
		);
	};

	toggleListenters = isModalOpen =>
		this.manageListeners([this.controls], isModalOpen);

	setState = isMobile =>
		isMobile
			? this.mainToggle.addEventListener("click", this.handleClick)
			: this.mainToggle.removeEventListener("click", this.handleClick);

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
