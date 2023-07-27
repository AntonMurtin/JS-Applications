import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllElements } from '../data/elOfServer.js';

const catalogTamplete=(fruits)=> html`
<section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
          ${fruits.length>0?fruits.map(el=>create(el)):html`<h2>There are no items added yet.</h2>`}
          </ul>
        </section>

         `

export async function catalogPage(ctx){
const fruits=await getAllElements();
ctx.render(catalogTamplete(fruits))
}
const create=(shoes)=>html`
<li class="card">
              <img src=${shoes.imageUrl} alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${shoes.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${shoes.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${shoes.value}</span>$</p>
              <a class="details-btn" href="/details/${shoes._id}">Details</a>
            </li>`