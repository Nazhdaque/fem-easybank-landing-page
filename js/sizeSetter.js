export class SizeSetter {
	observer = slaves =>
		new ResizeObserver(masters =>
			masters.forEach(master => {
				const width = master.borderBoxSize[0].inlineSize;
				slaves.forEach(slave => (slave.style.maxWidth = `${width}px`));
			})
		);

	initWith = relatedItems =>
		relatedItems.forEach(([master, slave]) =>
			this.observer(document.querySelectorAll(`.${slave}`)).observe(
				document.querySelector(`.${master}`)
			)
		);
}
