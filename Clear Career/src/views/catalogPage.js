import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllCards } from "../data/cards.js";

const catalogTamplete=(cards)=>html`
 <section id="dashboard">
          <h2>Job Offers</h2>
          ${cards.length>0?cards.map(create):html`<h2>No offers yet.</h2>`}
        </section>
`

export async function catalogPage(ctx){
const cards=await getAllCards();
ctx.render(catalogTamplete(cards))
}
const create=(card)=> html`
<div class="offer">
            <img src=${card.imageUrl} alt="./images/example3.png" />
            <p>
              <strong>Title: </strong
              ><span class="title">${card.title}</span>
            </p>
            <p><strong>Salary:</strong><span class="salary">${card.salary}</span></p>
            <a class="details-btn" href="/details/${card._id}">Details</a>
          </div>`