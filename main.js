import "./css/main.css";
import { ToggleUrl } from "./js/toggle-url";
import { MobileNav } from "./js/mobile-nav.js";

const preloads = [...document.querySelectorAll(".preload")].reverse();
const imgPreloader = () => {
	preloads.forEach(preload => preload.focus());
	preloads.pop().blur();
};
imgPreloader();

const logos = document.querySelectorAll(".logo");
const toggleLogo = new ToggleUrl();
toggleLogo.init(logos, "logo", "gradient");

const mobileNav = new MobileNav();
mobileNav.initOn(900);

const masters = document.querySelectorAll(".master");
const slaves = document.querySelectorAll(".slave");
const observer = new ResizeObserver(masters => {
	for (const [index, master] of masters.entries()) {
		const width = master.borderBoxSize[0].inlineSize;
		slaves[index].style.maxWidth = `${width}px`;
	}
});
masters.forEach(master => observer.observe(master));

console.log(
	"%cCoded by ✨Nazhdaque✨\nhttps://www.frontendmentor.io/profile/Nazhdaque",
	"background: #222; color: chartreuse; font-size: 1.25rem"
);
