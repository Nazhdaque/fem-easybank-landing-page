export class ToggleUrl {
	setUrl = (container, img, entry, add, mode, delimiter) => {
		const src = img.getAttribute("src");
		const index = src.indexOf(entry);
		const end = src.substring(index);
		const name = end.split(".")[0];
		const crop = name.slice(0, entry.length);
		let newSrc = "";
		if (src.includes(add)) {
			return;
		} else {
			switch (mode) {
				case "name":
					newSrc = src.replace(name, `${crop + delimiter + add}`);
					break;
				case "folder":
					newSrc = src.replace(name, `${add + "/" + crop}`);
					break;
				case "both":
					newSrc = src.replace(name, `${add + "/" + crop + delimiter + add}`);
					break;
				default:
					newSrc = src;
			}
		}
		img.setAttribute("src", newSrc);
		const handleOff = () => {
			img.setAttribute("src", src);
			img.removeEventListener("mouseout", handleOff);
			container.removeEventListener("blur", handleOff);
		};
		img.addEventListener("mouseout", handleOff);
		container.addEventListener("blur", handleOff);
	};

	init = (containers, entry, add, mode = "folder", delimiter = "-") => {
		containers.forEach(container => {
			const img = container.firstElementChild;
			const handleOn = () =>
				this.setUrl(container, img, entry, add, mode, delimiter);
			img.removeEventListener("mouseover", handleOn);
			img.addEventListener("mouseover", handleOn);
			container.removeEventListener("focus", handleOn);
			container.addEventListener("focus", handleOn);
		});
	};
}
