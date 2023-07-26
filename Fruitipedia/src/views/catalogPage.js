import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllElements } from '../data/elOfServer.js';

const catalogTamplete=(fruits)=> html`
        <h2>Fruits</h2>
        <section id="dashboard">
         ${fruits.length>0?fruits.map(create):html`<h2>No fruit info yet.</h2>`}
        </section>
         `

export async function catalogPage(ctx){
const fruits=await getAllElements();
ctx.render(catalogTamplete(fruits))
}
const create=(fruit)=>html`
</div><div class="fruit">
            <img src=${fruit.imageUrl} alt="example1" />
            <h3 class="title">${fruit.name}</h3>
            <p>${fruit.description}</p>
            <a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>`