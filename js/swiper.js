import Swiper, { Autoplay, Keyboard, Mousewheel } from "swiper";
import "swiper/css";
//---
const getGap = () => {
	const root = document.documentElement;
	const string = getComputedStyle(root, null).getPropertyValue("--gap");
	const number = Number.parseFloat(string, 10);
	const pixels = number * 16;
	return pixels;
};
const gap = getGap();
//---
const swiper = new Swiper(".swiper", {
	modules: [Autoplay, Keyboard, Mousewheel],
	loop: true,
	speed: 1000,
	autoplay: { delay: 2000 },
	spaceBetween: gap,
	direction: "horizontal",
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	mousewheel: {
		sensitivity: 2,
		invert: true,
	},
	grabCursor: true,
	slidesPerView: 1,
	breakpoints: {
		576: { slidesPerView: 2 },
		768: { slidesPerView: 3 },
		992: { slidesPerView: 4 },
	},
});
