import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllCards } from "../data/cards.js";

const catalogTamplete=(cards)=>html`
<h2>Current Events</h2>
        <section id="dashboard">
        ${cards.length>0?cards.map(el=>create(el)):html`<h4>No Events yet.</h4>`}
        </section>
`

export async function catalogPage(ctx){
const cards=await getAllCards();

ctx.render(catalogTamplete(cards))
}
const create=(card)=> html`
<div class="event">
            <img src=${card.imageUrl} alt="example1" />
            <p class="title">${card.name}</p>
            <p class="date">${card.date}</p>
            <a class="details-btn" href="/details/${card._id}">Details</a>
</div>
`