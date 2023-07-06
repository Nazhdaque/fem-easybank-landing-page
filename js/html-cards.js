import { html, render } from "lit-html";
import { FetchWrapper } from "./fetchwrapper.js";

const cardContainer = document.querySelector(".cvp-section");
const cards = [];
const API = new FetchWrapper("");

const getSvgName = (string, index) => string.toLowerCase().split(" ")[index];
const className = (index, lastItemIndex) => {
	switch (index) {
		case 0:
			return "master";
		case lastItemIndex:
			return "slave";
		default:
			return null;
	}
};

const cvpCardTemplate = (title, text, pathname, className) => html`
	<li class="card-w-icon md--place-items-c ${className}">
		<img class="card-w-icon__img" src="${pathname}" alt="" />
		<h3 class="title-sm card-w-icon__title">${title}</h3>
		<p class="md--t-align-c">${text}</p>
	</li>
`;

const cvpCardsComponent = cards =>
	html`
		<ul class="flex-grid-4">
			${cards}
		</ul>
	`;

API.get("cvp-cards-data.json").then(data => {
	const lastItemIndex = data.length - 1;
	data.forEach((entry, index) => {
		const { title, text } = entry;
		const pathname = `images/icon-${getSvgName(
			title,
			index === 0 ? 0 : 1
		)}.svg`;
		const card = cvpCardTemplate(
			title,
			text,
			pathname,
			className(index, lastItemIndex)
		);
		cards.push(card);
	});

	render(cvpCardsComponent(cards), cardContainer);
	// ---
	import("./widthSetter.js").then(data => data);
});
