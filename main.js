import "./css/main.css";
import { ToggleUrl } from "./js/toggle-url";
import { MobileNav } from "./js/mobile-nav.js";
import { FetchWrapper } from "./js/fetchwrapper.js";
import { html, render } from "lit-html";
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
const mobileNav = new MobileNav();
mobileNav.initOn(900);

//---
const masters = document.querySelectorAll(".master");
const slaves = document.querySelectorAll(".slave");
const observer = new ResizeObserver(masters => {
	for (const [index, master] of masters.entries()) {
		const width = master.borderBoxSize[0].inlineSize;
		slaves[index].style.maxWidth = `${width}px`;
	}
});
masters.forEach(master => observer.observe(master));

//---
const API = new FetchWrapper("");
API.get("slider-data.json").then(data => {
	const slider = document.querySelector(".swiper-wrapper");
	const slides = [];

	data.forEach(entry => {
		const { img: imgName, desc: alt, author, title, text } = entry;
		const pathname = `images/image-${imgName}.jpg`;

		const template = (alt, pathname, author, title, text) => html`
			<li class="swiper-slide">
				<a class="card-w-img" href="#">
					<img class="card-w-img__img" src="${pathname}" alt="${alt}" />
					<div class="card-w-img__info">
						<span class="txt-xs">By ${author}</span>
						<h3 class="title-xs">${title}</h3>
						<p class="txt-trunc-line-4 txt-trunc-line-3 lh-min">
							${text}
							<i class="demo"
								>then comes the text automatically truncated on the fourth /
								third line Lorem ipsum dolor sit, amet consectetur adipisicing
								elit. Minima, temporibus!</i
							>
						</p>
					</div>
				</a>
			</li>
		`;
		const slide = template(alt, pathname, author, title, text);
		slides.push(slide);
	});

	const duplex = slides.concat(slides);
	render(duplex, slider);
});

//---
console.log(
	"%cCoded by ✨Nazhdaque✨\nhttps://www.frontendmentor.io/profile/Nazhdaque",
	"background: #222; color: chartreuse; font-size: 1.25rem"
);
