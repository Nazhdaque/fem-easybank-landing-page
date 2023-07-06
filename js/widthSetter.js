const masters = document.querySelectorAll(".master");
const slaves = document.querySelectorAll(".slave");
const observer = new ResizeObserver(masters => {
	for (const [index, master] of masters.entries()) {
		const width = master.borderBoxSize[0].inlineSize;
		slaves[index].style.maxWidth = `${width}px`;
	}
});
masters.forEach(master => observer.observe(master));
