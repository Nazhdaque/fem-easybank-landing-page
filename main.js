import "./css/main.css";
import { ToggleUrl } from "./js/toggle-url";
import { Modal } from "./js/modal.js";
import "./js/html-cards.js";
import "./js/html-slider.js";
import "./js/swiper.js";

//---
const preloads = [...document.querySelectorAll(".preload")].reverse();
const imgPreloader = () => {
	preloads.forEach(preload => preload.focus());
	preloads.pop().blur();
};
imgPreloader();

//---
const logos = document.querySelectorAll(".logo");
const toggleLogo = new ToggleUrl();
toggleLogo.init(logos, "logo", "gradient");

//---
const modal = new Modal();
modal.initOn(900);

console.log(
	"%cCoded by ✨Nazhdaque✨\nhttps://www.frontendmentor.io/profile/Nazhdaque/solutions",
	"background: #222; color: chartreuse; font-size: 1.25rem"
);
