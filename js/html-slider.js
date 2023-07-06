import { html, render } from "lit-html";
import { FetchWrapper } from "./fetchwrapper.js";

const slider = document.querySelector(".swiper-wrapper");
const slides = [];
const API = new FetchWrapper("");

const slideTemplate = (alt, pathname, author, title, text) => html`
	<li class="swiper-slide">
		<a class="card-w-img" href="#">
			<img class="card-w-img__img" src="${pathname}" alt="${alt}" />
			<div class="card-w-img__info">
				<span class="txt-xs">By ${author}</span>
				<h3 class="title-xs">${title}</h3>
				<p class="txt-trunc-line-4 txt-trunc-line-3 lh-min">
					${text}
					<i class="demo"
						>then comes the text automatically truncated on the fourth / third
						line Lorem ipsum dolor sit, amet consectetur adipisicing elit.
						Minima, temporibus!</i
					>
				</p>
			</div>
		</a>
	</li>
`;

API.get("slider-data.json").then(data => {
	data.forEach(entry => {
		const { img: imgName, desc: alt, author, title, text } = entry;
		const pathname = `images/image-${imgName}.jpg`;
		const slide = slideTemplate(alt, pathname, author, title, text);
		slides.push(slide);
	});

	const duplex = slides.concat(slides);
	render(duplex, slider);
});
