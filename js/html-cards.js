import { html, render } from "lit-html";
import { FetchWrapper } from "./fetchwrapper.js";
import { SizeSetter } from "./sizeSetter.js";

const cardContainer = document.querySelector(".cvp-section");
const cards = [];
const API = new FetchWrapper("");
const sizeSetter = new SizeSetter();

const getSvgName = (string, index) => string.toLowerCase().split(" ")[index];
const className = (index, lastItemIndex) => {
	switch (index) {
		case 0:
			return "master-1";
		case lastItemIndex:
			return "slave-1";
		default:
			return null;
	}
};

const template = (title, text, pathname, className) => html`
	<li class="card-w-icon md--place-items-c ${className}">
		<img
			class="card-w-icon__img"
			src="${pathname}"
			width="72"
			height="72"
			alt="" />
		<h3 class="title-sm card-w-icon__title">${title}</h3>
		<p class="md--t-align-c">${text}</p>
	</li>
`;

const component = cards =>
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
		const card = template(
			title,
			text,
			pathname,
			className(index, lastItemIndex)
		);
		cards.push(card);
	});

	render(component(cards), cardContainer);

	sizeSetter.initWith([["master-1", "slave-1"]]);
});
